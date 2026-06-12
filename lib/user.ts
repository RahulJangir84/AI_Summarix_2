import pricingPlans from "@/utils/constants";
import { getDbConnection } from "./database";

export async function getPriceId(email:string){
    const sql=await getDbConnection();
    const user = await sql`SELECT price_id FROM users WHERE email_id=${email} AND status='active'`;
    return user[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId:string,email:string){
    const sql=await getDbConnection();
    const uploadCount = await sql`SELECT count(*) as count FROM pdf_summary WHERE user_id=${userId}`;
    const price_id=await getPriceId(email);
    const plan = pricingPlans().plans.find((plan)=>plan.priceId===price_id);
    let uploadLimit;
    if(plan?.title==='Pro'){
        uploadLimit=1000;
    }else if(plan?.title==='Basic'){
        uploadLimit=30;
    }else{
        uploadLimit=5;
    }
    
    return {
        hasReachedLimit:Number(uploadCount[0]?.count||0)>=uploadLimit,
        currentCount:Number(uploadCount[0]?.count||0),
        limit:uploadLimit,
        planName:plan?.title
    }
}