import Stripe from "stripe";
import { getDbConnection } from "./database";

export async function handleCheckoutSession({session,stripe}:{
    session:Stripe.Checkout.Session,
    stripe:Stripe
    }
){
    console.log("handle checkout session",session);
    const customerId=session.customer as string;
    const customer=await stripe.customers.retrieve(customerId);
    const priceId=session.line_items?.data[0].price?.id as string;

    if ('email' in customer && priceId) {
        const email = customer.email as string;
        const fullName = customer.name as string;
        await createOrUpdateUser({
            email: email,
            fullName: fullName,
            customerId: customerId, 
            priceId: priceId,
            status: 'active'
        });
        await createPaymentSession({session,email});
    }
}

async function createOrUpdateUser({
    email,
    fullName,
    customerId,
    priceId,
    status
}:{
    email:string,
    fullName:string,
    customerId:string,
    priceId:string,
    status:string
}){
    try{
        const sql=await getDbConnection();
        const user = await sql`SELECT * FROM users WHERE email_id=${email}`;
        if(user.length===0){
            await sql`INSERT INTO users (email_id,full_name,customer_id,price_id,status) VALUES (${email},${fullName},${customerId},${priceId},${status})`;
        }
    }catch(error){
        console.log(error);
    }
}
async function createPaymentSession({
    session,
    email
}:{
    session:Stripe.Checkout.Session,
    email:string
}){
    try{
        const sql=await getDbConnection();
        const amount=session.amount_total as number;
        const status=session.status as string;
        const stripe_payment_id=session.id as string;
        const price_id=session.line_items?.data[0].price?.id as string;
        await sql`INSERT INTO payments (amount ,status,stripe_payment_id,price_id,user_email) VALUES (${amount},${status},${stripe_payment_id},${price_id},${email})`;
        
    }
    catch(error){
        console.log(error);
    }
}

export async function deleteSubscription({subscriptionId,stripe}:{
    subscriptionId:string,
    stripe:Stripe
}){
    try{
        const sql=await getDbConnection();
        const subscription=await stripe.subscriptions.retrieve(subscriptionId);
        await sql`UPDATE users SET status='inactive' WHERE customer_id=${subscription.customer}`;
        console.log("subscription deleted successfully");
    }
    catch(error){
        console.log(error);
    }
}