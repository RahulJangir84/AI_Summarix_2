import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an concise ,engaging and easy to understand summary:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.OpenAIError && error.message.includes("Rate limit exceeded")) {
      throw new Error("Rate limit exceeded");
    }
    throw error;
  }
}
