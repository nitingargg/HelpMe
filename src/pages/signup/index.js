import { FaRegEnvelope, FaUserAlt } from "react-icons/fa";
import { MdLockOutline, MdLockReset } from "react-icons/md";
import { account } from "../../utils/appwrite";
import { user } from "../../utils/global";
import { useRecoilState } from "recoil";
import { useState } from "react";
import {ID} from "appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


export default function Signup() {
  
  const router = useRouter()

  const [usr,setUser] = useRecoilState(user)

  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm,setConfirm] = useState("")

  const showError = (msg) => {
    toast.error(msg, {
  });}

  const showSuccess = (msg) => {
    toast.success(msg, {
  });}  

  const createUser=async(e)=>{
    e.preventDefault()
    if(password!=confirm){
      return
    }   
    try{
      const out = await account.create(ID.unique(),email,password,name)
      setName("")
      setEmail("")
      setPassword("")
      setConfirm("")
      showSuccess("User successfully created!")
      showSuccess("Redirecting to the Login Page")
      setTimeout(()=>router.push("/login"),5000)
    }
    catch(err){
      if(err.type==="general_argument_invalid"){
        showError("Enter a Strong Password!")
      }
      else{
        showError("Some error occured while creating account!")
      }
    }
  }


  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <ToastContainer/>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-full p-5">
            <div className="flex justify-center font-bold text-lg">
              <span className="text-primary">Help</span>Me!
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">
                Create Account
              </h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <p className="text-gray-500 text-md my-3">
                Start your journey with us!
              </p>
              <form onSubmit={createUser}>
              <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaUserAlt className="text-gray-400 m-2 text-sm" />
                  <input
                    required
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
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
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockReset className="text-gray-400 m-2" />
                  <input
                  required
                    type="confirm password"
                    name="confirm password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e)=>setConfirm(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                {password!=confirm && <p className="text-sm">Passwords Doesn't Match</p>}
                <button className="border-2 border-primary text-primary my-4 rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer">
                  Create Account
                </button>
              </div>
              </form>
              <button onClick={()=>router.push("/login")} className="text-primary bg-white border-primary border-2 hover:bg-primary hover:text-white hover:cursor-pointer px-4 py-1 rounded-full text-sm">Switch to Login Page</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  }
