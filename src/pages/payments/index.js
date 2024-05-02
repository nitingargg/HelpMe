import {useRouter} from "next/router";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function Payments() {
    
    const router = useRouter()
    const [amt,setAmt] = useState(0);
    const [toPay,setPay] = useState(0);
    const [time,setTime] = useState(0);

    const handle=()=>{
      if(amt>0){
        setPay(amt)
        setTime(60)
        const myint = setInterval(()=>{setTime((tm)=>tm-1)},1000)
        setTimeout(()=>{clearInterval(myint); router.push({pathname:"/payments/response",query:{"amount":amt,"id":router.query.id}})},60000)
        
      }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-1/3 max-w-4xl items-center justify-center">
        <div className="flex flex-col items-center py-6">
        <p className="text-lg mb-4 text-bold text-primary">Welcome to the Payments Page!</p>
        <p>{router.query.slug}</p>
        <input width={8} className="border-2 text-primary rounded-xl p-2 mb-4 border-primary placeholder-tertiary placeholder-opacity-50 focus:outline-none " placeholder="Enter Amount" type="number" value={amt} onChange={(e)=>setAmt(e.target.value)}></input>
        <button onClick={handle} className="bg-primary text-white text-lg rounded-lg p-2">Generate UPI QR</button>
        {time ? <>
        <QRCode
            className="mt-4"
            size={200}
            value={`upi://pay?pa=${router.query.upi_vpa}&pn=Recipient&am=${toPay}&cu=INR`}
        />
        <p className="text-sm mt-4">Scan the QR with desired UPI App</p>
        <p className="text-sm mt-4 text-primary">Complete the payment within <span className="bg-primary text-white px-2">{time}</span> seconds</p>
        </>:<></>}
        </div>
   
        </div>
      </main>
    </div>
    );
  }

