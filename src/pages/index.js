import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {user} from "../utils/global"
import { account } from "../utils/appwrite";

export default function Home() {
  
  const router = useRouter()

  const [usr,setUser] = useRecoilState(user)

  useEffect(()=>{
    if(usr==""){
      account.get().then((user_)=>setUser(user_)).catch((err)=>console.log(err))
    }
  },[])

  // useEffect(() => {
  //   router.query.message && alert(router.query.message); 
  // },[])

  return (
    <main className="h-screen">
      <div className="flex h-full">
        <div className="w-1/2 bg-secondary">
        <img src="img.jpg" alt="HelpMe Image" className="w-full h-full object-cover object-left"/>
        </div>
        <div className="w-1/2 bg-primary flex flex-col items-center space-y-3 justify-center">
        <h1 className="text-3xl font-bold text-white">{usr==""?"HelpMe!":`Welcome ${usr.name}!`}</h1>
          <p className="text-xl leading-loose text-white">  
            Help those in need today!
          </p>
          <button onClick={()=>router.push("/fundraisers")} className="bg-white text-red-600 rounded-md px-4 py-2 hover:bg-gray-200 focus:ring-red-500 focus:outline-none">
            Donate Now
          </button>
        </div>
      </div>
      <footer className="footer bg-secondary text-white py-4 text-center">
        <p>&copy; HelpMe {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}