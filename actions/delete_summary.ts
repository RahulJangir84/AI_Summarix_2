"use server";
import { getDbConnection } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      logger.warn( { summaryId },"Unauthorized delete attempt");
      return { success: false, error: "Unauthorized" };
    }

    const sql = await getDbConnection();
    const result = await sql`DELETE FROM pdf_summary WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id`;  
    
    if (result.length > 0) {
      logger.info({ summaryId, userId },"Successfully deleted summary" );
      revalidatePath('/dashboard');
    return {success:true};
    }
    
    logger.warn({ summaryId, userId },"Delete attempt for non-existent or unauthorized summary");
    return { success: false, error: "Summary not found" };
  } catch (error) {
    logger.error({ error, summaryId },"Error deleting summary" );
    return { success: false, error: "Internal server error" };
  }
}
