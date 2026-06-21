import { GoogleGenerativeAI } from "@google/generative-ai";
import { QUIZ_PROMPT } from "@/utils/quizprompt";
import { fetchAndExtractPdfText } from "./langchain";

if(!process.env.GEMINI_API_KEY){
    throw new Error("GEMINI_API_KEY not found");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export default async function generateQuiz (pdfUrl:string) {
    try{
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        const model=  genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        });
         const result = await model.generateContent(`
        ${QUIZ_PROMPT}

        PDF content:
        ${pdfText}
    `);
    const rawText=result.response.text();
    const cleaned = rawText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

  console.log({cleaned})
  if (!rawText) {
      throw new Error("Empty text returned from Gemini OCR");
    }
    const quiz = JSON.parse(cleaned);
    return quiz;
    }
    catch(error){
        console.log("Error generating quiz", error);
        throw error;
    }
}