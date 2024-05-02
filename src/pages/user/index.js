import { account } from "../../utils/appwrite"
import {user} from "../../utils/global"
import { useRecoilState } from "recoil"
import { useRouter } from "next/router"

export default function User(){

    const router = useRouter()

    const [usr,setUser] = useRecoilState(user)

    const logout=()=>{
        account.deleteSession("current").then(()=>{setUser("")}).catch((err)=>console.log(err))
    }
  
    return(
        <div>
            <div className="flex flex-col space-y-2 items-center py-4">
            {
                usr==""?<button onClick={()=>router.push("/login")} className="bg-primary px-4 py-2 text-white rounded-full">Login</button>:
                <>
                    <p className="text-lg">Logged in as <span className="text-primary">{usr.name}</span></p>
                    <button onClick={logout} className="bg-primary px-4 py-2 text-white rounded-full">LogOut</button>
                </>
            }
            
            </div>
        </div>
    )

}