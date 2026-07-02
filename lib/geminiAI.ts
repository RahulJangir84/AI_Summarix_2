import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { logger } from "./logger";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);
type ErrorWithStatus = {
  status?: number;
  message?: string;
};

function hasStatus(error: unknown): error is ErrorWithStatus {
  return typeof error === "object" && error !== null && "status" in error;
}

export async function generateSummaryFromGeminiAPI(pdfText: string) {
  const maxRetries=3;
  for(let attempt=1;attempt<=maxRetries;attempt++){
    try {
      const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // or "gemini-1.5-pro"
      });

      const result = await model.generateContent([
        {
          text: `${SUMMARY_SYSTEM_PROMPT} Transform the following document into a concise, clear summary: ${pdfText}`,
        },
      ]);

      const summary = result.response.text();

      if (!summary) {
        throw new Error("Empty response from Gemini");
      }

      return summary;
  } catch (error: unknown) {
  logger.error({error},"Gemini API error:");

  if (hasStatus(error) && error.status === 503 && attempt < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    continue;
  }

  throw error;
}
  }
  throw new Error("Failed to generate summary after maximum retries");
}
