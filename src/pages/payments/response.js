import {useRouter} from "next/router";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Response() {
    
    const router = useRouter()

    const showSuccess = (msg) => {
        toast.success(msg, {
      });}

    const showMsg=(msg)=>{
        toast.info(msg, {
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const value = router.query.amount
        const dName = e.currentTarget.dname.value
        const review = e.currentTarget.review.value
        console.log("Adding"+value+"to the database")
        showSuccess("Thanks for donating...")
        setTimeout(()=>router.push("/"),5000)
    }

    const failSubmit=()=>{
        showMsg("Sorry for any inconvinience from our end!")
        showMsg("Redirecting to the Home Page...")
        setTimeout(()=>router.push("/"),5000)
    }
    

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
    <ToastContainer/>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col p-4 w-1/3 max-w-4xl">
        <p className="text-lg text-bold mb-2 text-primary">Was Your Payment Successful?</p>
        <button onClick={failSubmit} className="bg-tertiary mb-2 text-white rounded-lg p-2">No, there was some error!</button>
        <p className="text-lg mb-2 text-bold text-primary">If Yes then...</p>
        <form className="space-y-2  flex flex-col" onSubmit={handleSubmit}>
        <p className="text-md">What is your name</p>
        <input type="text" name="dname" className="border-2 border-primary rounded-lg px-2 py-1 w-full placeholder-tertiary placeholder-opacity-50 focus:outline-none" placeholder="Leave if you want to keep it anonymous"></input>
        <p className="text-md">Your review about the fundraiser</p>
        <input type="text" name="review" className="border-2 border-primary rounded-lg px-2 py-1 w-full placeholder-tertiary placeholder-opacity-50 focus:outline-none" placeholder="Present your authentic views only..."></input>
        <button type="submit" className="bg-tertiary mb-2 text-white rounded-lg p-2">Submit</button>
        </form>
        </div>
      </main>
    </div>
    );
  }

