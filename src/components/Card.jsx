import { useRouter } from "next/router"
import { Storage } from "appwrite";
import { client } from "@/utils/appwrite";

export default function Card({fr_details}){
    const router = useRouter()
    const img_id = fr_details.refs;
    const storage = new Storage(client);
    const url = storage.getFilePreview("662e5dc5001705c6eaeb",img_id)
    return(

        <div className=" bg-primary p-4 m-4 text-white rounded-xl">
            <img className="rounded-lg mb-4" src={url}/>
            <p className="text-xl mb-2">{fr_details.title}</p>
            <p className="text-sm">Amount to be raised: {fr_details.amount}</p>
            <p className="text-sm mb-4">Amount raised: {fr_details.ramount}</p>
            <button onClick={()=>router.push(`/fundraisers/${fr_details.id}`)} className="p-2 w-full bg-white rounded-full text-primary">Donate Now</button>
        </div>
    )
}