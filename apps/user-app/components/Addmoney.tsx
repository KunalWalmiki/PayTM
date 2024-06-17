"use client";
import Card from '@repo/ui/Card';
import React, { useState } from 'react'
import Textbox from "@repo/ui/TextBox";
import Select from '@repo/ui/Select';
import { Button } from '@repo/ui/button';
import { createOnRampTransaction } from '../app/lib/actions/createOnRampTransaction';

const supported_banks = [{
    name : "HDFC bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},
{
    name : "Axis bank",
    redirectUrl : "https://netbanking.axisbank.com"
}]


const Addmoney = () => {

    const [redirectUrl, setRedirectUrl] = useState(supported_banks[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(supported_banks[0]?.name || "");

    return (
    <Card title='Add Money'>
        <div className="w-full">
            <Textbox label='Amount' placeholder='Amount' onchange={(value) => {
                setAmount(value)
            }}/>

            <div className='py-4 text-left'>
                Bank
            </div>
            <Select onSelect={(value) => {
                 setRedirectUrl(supported_banks.find(x => x.name == value)?.redirectUrl || "");
                 setProvider(supported_banks.find(x => x.name == value)?.name || "")
            }} options={supported_banks.map((x) => ({
                key : x.name,
                value : x.name,
            }))}/>

            <div className="flex justify-center pt-4">

                <Button onClick={async() => {

                    if(amount > 0) {

                    await createOnRampTransaction(amount * 100, provider);
                    window.location.href = redirectUrl || "";
                    
                    } else {

                        alert("Amount Must Be Greater Than Zero")
                    }
                }}>
                    Add Money 
                </Button>
            </div>

        </div>
      
    </Card>
  )
}

export default Addmoney
