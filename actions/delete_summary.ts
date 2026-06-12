"use server";
import { getDbConnection } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false };
    }
    const sql = await getDbConnection();
    const result = await sql`DELETE FROM pdf_summary WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id`;  
  if(result.length>0){
    revalidatePath('/dashboard');
    return {success:true};
    }
  return {success:false};
  }catch(error){
    console.log("Error deleting summary",error);
    return {success:false};
  }
}
