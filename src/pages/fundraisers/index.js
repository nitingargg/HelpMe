import Card from "@/components/Card";
import { client } from "@/utils/appwrite";
import { Databases } from "appwrite";

export default function Fundraisers({fundraisers, error}) {
  return (
    <main className="py-4">
      {error?<p>There Was Some Error</p>:<>
      <p className="font-bold text-primary text-center text-2xl mb-2 underline">Browse the Ongoing Fundraisers</p>
      <div className="grid grid-cols-4">
       
        {fundraisers.map((f)=><Card fr_details={{"title":f.title,"amount":f.amount,"ramount":f.raised,"id":f.$id,"refs":f.file_refs[0]}}/>)}
      </div>
      </>
      }
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const db = new Databases(client);
  try{
    const response = await db.listDocuments("662a5d910b143e51eb24","662a5da69dda8f72af1b")
    return {  
        props: { fundraisers : response.documents, error : false }
    }
  }
  catch(err){
    return{
      props: {fundraisers:{}, error:true}
    }
  }
}
