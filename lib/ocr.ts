import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "./logger";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  logger.info({ bufferSize: pdfBuffer.length },"Executing Gemini OCR text extraction on PDF buffer");
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: pdfBuffer.toString("base64"),
          mimeType: "application/pdf",
        },
      },
      "You are an expert OCR system. Extract and transcribe all text from this PDF file. Do not summarize, just transcribe everything exactly as written.",
    ]);

    const text = result.response.text();
    if (!text) {
      throw new Error("Empty text returned from Gemini OCR");
    }
    
    logger.info({ textLength: text.length },"Successfully extracted text via Gemini OCR");
    return text;
  } catch (error) {
    logger.error({error},"Gemini OCR extraction failed");
    throw error;
  }
}
