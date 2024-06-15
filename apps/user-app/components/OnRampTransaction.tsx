"use client"
import Card from '@repo/ui/card'
import React from 'react'

type Transactions = {
        time : Date,
        amount : number,
        status : string,
        provider : string,
}

type TransactionListProps = {
    transactions: Transactions[]
}

const OnRampTransaction : React.FC<TransactionListProps> = ({transactions}) => {

    if(!transactions) {
        return <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
        </Card>
    }


  return (
    <Card title='Recent Transactions'> 
          <div className="pt-2">
            {
                transactions.map((t) =>  {

                return <div className='flex justify-between'>
                    <div>
                       

                        <div className='text-sm'>
                            Received INR
                        </div>
                        <div className='text-slate-600 text-xs'> 
                          { t.time.toDateString()}
                        </div>
                        <div className='text-slate-600 text-xs'> 
                           Status : {
                               t.status
                           }
                        </div>
                                                    
                    </div>
                    <div> 
                        <div className='flex flex-col justify-center'>
                            + Rs {t.amount / 100} 
                        </div>
                    </div>
                </div> })
            }
          </div>
    </Card>
  )
}

export default OnRampTransaction