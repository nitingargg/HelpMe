import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { account } from "../../utils/appwrite";
import {user} from "../../utils/global"
import {useRecoilState} from "recoil"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  
  const router = useRouter()
  
  const [usr,setUser] = useRecoilState(user)
  
  const showError = (msg) => {
    toast.error(msg, {
  });}

  const showSuccess = (msg) => {
    toast.success(msg, {
  });}  

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const loginUser=async(e)=>{
    e.preventDefault()
    try{
      const session_info = await account.createEmailSession(email,password)
      const user_detail = await account.get()
      setUser(user_detail)
      setEmail("")
      setPassword("")
      showSuccess(`User ${user_detail.name} logged in successfully!`)
      showSuccess("Redirecting to the Home Page")
      setTimeout(()=>router.push("/"),5000)
      // router.push({
      //   pathname: '/',
      //   query: { message: `User ${user_detail.name} Logged in Successfully`},
      // })
    }
    catch(err){
      showError(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <ToastContainer/>
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-primary">Help</span>Me!
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">
                Sign In to Account
              </h2>
              <div className="border-2 w-10 border-primary inline-block m-2"></div>
              <form onSubmit={loginUser}>
              <div className="flex flex-col items-center my-8">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-4">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                  required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex w-64 mb-5 justify-between my-1">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1.5" />{" "}
                    Remember me
                  </label>
                  <p
                    className="text-xs text-primary hover:cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>
                <button className="border-2 border-primary text-primary rounded-full my-3 px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer">
                  Sign In
                </button>
              </div>
              </form>
            </div>
          </div>
          <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-whote inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start your journey with us.
            </p>
              <button onClick={()=>router.push("/signup")} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-primary hover:cursor-pointer">
                Sign Up
              </button>
          </div>
        </div>
      </main>
    </div>
  );
}
