"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import client from "@repo/db/client";


export async function P2PTransfers(to : string, amount : number) {
    
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if(!from) {

        return {
            message : "You Are Not Logged In!",
        }
    }

    const toUser = await client.user.findFirst({
        where : {
            number : to,
        }
    });

    if(!toUser) {

        return {
            message : "User Not Found"
        }
    }

    await client.$transaction(async(tx) => {

        // check if the user has sufficient balance
        const availableBalance = await client.balance.findFirst({
            where : {
                userId : Number(from)
            }
        });

        if(!availableBalance || availableBalance.amount < amount) {

            throw new Error("Insufficient Funds");
        }

        // deduct amount from the sender 
        await tx.balance.update({
            where : {userId : Number(from)},
            data : {amount : {decrement : amount}}
        });

        await tx.balance.update({
            where : {userId : Number(toUser.id)},
            data : {amount : {increment : amount}}
        })
    });
}