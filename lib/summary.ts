import { getDbConnection } from "./database"

export interface Summary {
  id: string;
  user_id?: string;
  title: string;
  file_name?: string;
  summary_text: string;
  original_file_url?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  word_count?: number;
}

export async function getSummaries(userId: string): Promise<Summary[]> {
    const sql=await getDbConnection();
    const summaries=await sql`SELECT * FROM pdf_summary WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return summaries as unknown as Summary[];
}

export async function getSummaryById(id: string) {
    try{
    const sql=await getDbConnection();
    const [summary]=await sql `SELECT
    id,
    user_id,
    title,
    file_name,
    summary_text,
    original_file_url,
    status, 
    created_at,
    updated_at,
    LENGTH(summary_text)-LENGTH(REPLACE(summary_text,' ',''))+1 AS word_count
    FROM pdf_summary WHERE id = ${id}`;
    return summary;
    }
    catch(error){
        console.error("Error fetching summary:", error);
        return null;
    }
}