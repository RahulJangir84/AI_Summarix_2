import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText } from 'ai';
import { logger } from "@/lib/logger";
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {

  const {userId}= await auth();
  if(!userId){
    logger.error("User not authenticated");
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    if(!process.env.GEMINI_API_KEY){
      logger.error("Gemini API key missing in environment variables");
      throw new Error("GEMINI_API_KEY is not defined");
    }
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    //take the request from chat widget and extract messages history and summary_text from the json payload
    const { messages, summary_text } = await req.json();

    const systemPrompt = `You are a highly capable AI assistant for a document summarization app called Summarix. 
You are currently helping the user understand a document they uploaded.
Here is the content/summary of the document:

"""
${summary_text || "No document context provided."}
"""

Please answer the user's questions based primarily on the document above. Be friendly, formatting your responses clearly in Markdown.`;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages:await convertToModelMessages(messages),
    });

    // Send the raw stream down directly to the client
    return result.toUIMessageStreamResponse();
  } catch (error) {
    logger.error({error},"Error in chat API route");
    return new Response(JSON.stringify({ error: "Failed to generate chat response" }), { status: 500 });
  }
}
