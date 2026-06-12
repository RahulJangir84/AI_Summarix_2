"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openAI";
import { generateSummaryFromGeminiAPI } from "@/lib/geminiAI";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/database";
import { formatPdfNameAsTitle } from "@/utils/format";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface PdfSummaryProps {
  userId?: string;
  pdfUrl: string;
  summary: string;
  title: string;
  pdfName: string;
}

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[],
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

const { url: pdfUrl, name: pdfName } = uploadResponse[0].serverData.file;

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryFromGeminiAPI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message === "Rate limit exceeded") {
        try {
          summary = await generateSummaryFromOpenAI(pdfText);
          console.log(summary);
        } catch (geminiError) {
          console.error(
            "OpenAI API failed after Gemini rate limit exceeded",
            geminiError,
          );
          throw new Error("Summary generation failed");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Summary generation failed",
        data: null,
      };
    }
    const formattedPdfName = formatPdfNameAsTitle(pdfName);
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedPdfName,
        summary,
      },
    };
  } catch (error) {
    console.log("Error uploading file", error);
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  pdfUrl,
  summary,
  title,
  pdfName,
}: PdfSummaryProps) {
  //sql inserting pdf summary
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
        INSERT INTO pdf_summary(
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
        )
        VALUES(
            ${userId},
            ${pdfUrl},
            ${summary},
            ${title},
            ${pdfName}
        )
        RETURNING id, summary_text;
        `;
    return savedSummary;
  } catch (error) {
    console.log("Error saving pdf", error);
    throw error;
  }
}

export async function saveSummaryToDatabase({
  pdfUrl,
  summary,
  title,
  pdfName,
}: PdfSummaryProps) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    //assigning savePdfSummary to savedSummary
    savedSummary = await savePdfSummary({
      userId,
      pdfUrl,
      summary,
      title,
      pdfName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Summary saving failed, please try again...",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error saving summary to database",
      data: null,
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  redirect(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "Summary saved successfully",
    return: {
      id: savedSummary.id,
    },
  };
}
