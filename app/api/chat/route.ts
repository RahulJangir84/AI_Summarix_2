import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText } from 'ai';

if(!process.env.GEMINI_API_KEY){
  throw new Error("GEMINI_API_KEY is not defined");
}
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
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
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Failed to generate chat response" }), { status: 500 });
  }
}
