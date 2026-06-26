import { GoogleGenerativeAI } from "@google/generative-ai";
import { QUIZ_PROMPT } from "@/utils/quizprompt";
import { fetchAndExtractPdfText } from "./langchain";
import { logger } from "./logger";

if(!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export default async function generateQuiz (pdfUrl:string) {
    try{
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        logger.info({pdfUrl},"Generating quiz questions from extracted PDF text");
        
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = await model.generateContent(`
            ${QUIZ_PROMPT}

            PDF content:
            ${pdfText}
        `);
        
        const rawText = result.response.text();
        if (!rawText) {
            throw new Error("Empty text returned from Gemini for quiz generation");
        }
        
        const cleaned = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        logger.info("Successfully received raw quiz data from Gemini; parsing JSON");
        const quiz = JSON.parse(cleaned);
        return quiz;
    } catch (error) {
        logger.error({error},"Error generating quiz from PDF");
        throw error;
    }
}