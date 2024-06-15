import express, {Request, Response} from "express";
const app = express();
import client from "@repo/db/client";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000

app.use(express.json());

app.post("/hdfcWebhook", async(req : Request, res : Response) => {

    // TODO : ZOD validations
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    
    const isProcessing = await client.onRampTransaction.findFirst({
        where : {
            userId : Number(req.body.user_identifier),
            amount : Number(req.body.amount),
            token : req.body.token,
        }
    });

    if(isProcessing?.status !== "Processing") {

        return res.status(411).json({
            success : false,
            message : "Transaction Already Completed"
        })

    }

    const paymentInformation : {
        token : string,
        userId : string,
        amount : string,
    } = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount,
    }

    try {

        await client.$transaction([

               client.balance.updateMany({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),

            client.onRampTransaction.updateMany({
                where: {
                    token : paymentInformation.token
                },
                data : {
                    status : "Success"
                }
            })
        ]);

        res.status(200).json({
            message : "Captured"
        })

    } catch(error) {

        console.log(error);
        res.status(411).json({
            message: "Error while processing webhook",
        })
    }
})

app.listen(PORT, () => {
    console.log(`Your Server is Up and Running on PORT ${PORT}`);
})