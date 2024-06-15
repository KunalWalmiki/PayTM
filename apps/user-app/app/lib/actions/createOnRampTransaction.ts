"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import client from "@repo/db/client";


export async function createOnRampTransaction(amount : number, provider : string) {

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = (Math.random() * 1000).toString();

    if(!userId) {

        return {
            message : "User Not Logged In...!"
        }
    }

    await client.onRampTransaction.create({
        data : {
            userId : Number(userId),
            amount : amount,
            provider : provider,
            status : "Processing",
            token,
            startTime : new Date(),
        }
    });


    return {
        message : "On Ramp Transaction Added"
    }
    
}