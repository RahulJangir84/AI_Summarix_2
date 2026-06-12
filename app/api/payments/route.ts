import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCheckoutSession,deleteSubscription } from "@/lib/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(req: NextRequest) {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({status:"error",message:"Missing signature"}, {status:400});
    }
    let event;
    try{
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    }catch(error){
        console.log(error);
        return NextResponse.json({status:"error",message:"Invalid signature"}, {status:400});
    }

    const response = NextResponse.json({status:"success"});
    try{
        switch (event.type){
            case "checkout.session.completed":
                console.log("customer session created");
                const sessionID = event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionID,{
                    expand:["line_items"]
                });
                await handleCheckoutSession({session,stripe});
                break;
            case "customer.subscription.deleted":
                console.log("customer subscription deleted");
                const subscription = event.data.object ;
                const subscriptionId=event.data.object.id;
                await deleteSubscription({subscriptionId,stripe});
                console.log(subscription);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({status:"error",message:"webhook handler issue"}, {status:400});
    }

    return response;

};