import { FaRegEnvelope, FaUserAlt , FaPhone} from "react-icons/fa";
import { MdLockOutline, MdLockReset } from "react-icons/md";
import { useRouter } from "next/router";
import {user} from "../../../utils/global"
import { useRecoilState } from "recoil";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";


export default function Step1() {
  
  const router = useRouter();

  const showWarn = (msg) => {
    toast.warn(msg, {
  });}

  const showSuccess = (msg) => {
    toast.success(msg, {
  });}
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    router.push({"pathname":"/fundraisers/create/step2","query":{"name":e.currentTarget.name.value,"email":e.currentTarget.email.value,"phone":e.currentTarget.phone.value}})
  }

  const [usr,setUser] = useRecoilState(user)

  useEffect(()=>{
    if(usr==""){
      showWarn("To create a fundraiser, you must  be logged in")
      showWarn("Redirecting to the Login Page!")
      setTimeout(()=>{router.push("/login")},5000)
    }
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ToastContainer/>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-full p-5">
            <div className="flex justify-center font-bold text-lg">
              <span className="text-primary">Help</span>Me!
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">
                Create Fundraiser
              </h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <p className="text-gray-500 text-md my-3 mt-2">
                Step <span className="text-primary">1</span> of 3
              </p>
              <form onSubmit={handleSubmit}> 
              <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaUserAlt className="text-gray-400 m-2 text-sm" />
                  <input
                    type="name"
                    name="name"
                    value={usr?usr.name:""}
                    placeholder="Name"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    value={usr?usr.email:""}
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaPhone className="text-gray-400 m-2" />
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <button type="submit" className="border-2 border-primary text-primary my-4 rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer">
                  Continue
                </button>
              </div>
              </form>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
