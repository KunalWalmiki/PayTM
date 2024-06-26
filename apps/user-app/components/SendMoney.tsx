"use client"
import { Button } from "@repo/ui/button";
import  Card  from "@repo/ui/Card";
import  Center  from "@repo/ui/Center";
import  TextInput  from "@repo/ui/TextBox";
import  {useState}  from "react";
import  { P2PTransfers } from "../app/lib/actions/P2PTransfers";

export function SendMoney() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onchange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onchange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                            await P2PTransfers(number, Number(amount) * 100)
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}