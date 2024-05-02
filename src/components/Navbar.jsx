import { useRouter } from "next/router"
import {user} from "../utils/global"
import {useRecoilState } from "recoil"


export default function Navbar(){
    const router = useRouter()
    const [user_,setUser] = useRecoilState(user)
    return(
        <div className="h-16 px-5 flex flex-row items-center justify-between bg-secondary">
            <p className="font-bold text-xl text-white">HelpMe!</p>
            <div className="flex flex-row items-center space-x-4 pl-12 rounded-2xl  bg-primary justify-center">
                <p onClick={()=>router.push("/")} className="text-white cursor-pointer font-bold">HOME</p>
                <p className="text-white font-bold">|</p>
                <p onClick={()=>router.push("/fundraisers")} className="text-white cursor-pointer font-bold">DONATE</p>
                <p className="text-white font-bold">|</p>
                <p onClick={()=>router.push("/fundraisers/create/step1")} className="text-white cursor-pointer font-bold">RAISE FUND</p>
                {user_==""?<button onClick={()=>router.push("/login")} className="bg-white rounded-2xl text-secondary font-bold px-4 py-1">Login</button>:
                <button onClick={()=>router.push("/user")} className="bg-white rounded-2xl text-secondary font-bold px-4 py-1">{user_.name}</button>}
            </div>
        </div>
    )

}