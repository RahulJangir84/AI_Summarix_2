'use server'
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { Client, isFullPage } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

function chunkText(text: string, chunkSize = 1900): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function exportSummaryToNotion({
    summary_text , title
}: {
    summary_text:string;
    title:string;
}){
    const {userId} =await auth();
    if(!userId){
        logger.error("Unauthorized access attempt");
        redirect("/sign-in");
    }
    try{
    const client =await clerkClient();
    // const user=await client.users.getUser(userId);
    // const notionAccount= user.externalAccounts.find(
    //     (account)=>account.provider==="notion"
    // );
    // if(!notionAccount){
    //     logger.warn({userId},"No notion account found for user");
    //     throw new Error("User has not connected Notion");
    // }
    const tokens = await client.users.getUserOauthAccessToken(userId,"notion");
    console.log("OAuth Tokens:", JSON.stringify(tokens, null, 2));
    const accessToken= tokens.data[0]?.token;
    if(!accessToken){
        logger.error({userId},"Failed to fetch OAuth token");
        throw new Error("Failed to get OAuth token");
    }
    const notion =new Client({
        auth:accessToken,
    });

        const paragraphBlocks: BlockObjectRequest[] = chunkText(summary_text).map(
      (chunk) => ({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: chunk } }],
        },
      })
    );

    const workspaceResponse = await notion.search({ filter: { property: "object", value: "page" } });
    const parentPageId = workspaceResponse.results[0]?.id;
if (!parentPageId) throw new Error("No pages found in user's Notion workspace");
    const response = await notion.pages.create({
    parent: { type:"page_id", page_id: parentPageId },
    properties: {
      title: {
        title:[{type:"text" ,text:{content:title}}]
      }
    },
    children: [
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [{type:"text", text: { content: "Document Summary" } }],
        },
      },
      ...paragraphBlocks,
    ],
});
    if (!isFullPage(response)) {
        throw new Error("Created Notion page is a partial page object and does not have a URL.");
    }
    return {url:response.url}; //direct link to their new notion page
    }
    catch(error){
        logger.error(error);
        throw error;
    }
}

