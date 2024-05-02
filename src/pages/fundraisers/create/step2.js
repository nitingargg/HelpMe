import { FaPiggyBank, FaUserAlt, FaSortNumericDown, FaQrcode } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Step2() {
  
  const router = useRouter()

  const handleSubmit=(e)=>{
      e.preventDefault()
      router.push({"pathname":"/fundraisers/create/step3","query":{...router.query, "ac_name":e.currentTarget.acName.value,"ac_num":e.currentTarget.accountNumber.value,"ifsc":e.currentTarget.code.value,"vpa":e.currentTarget.vpa.value}})
  }

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-full p-5">
            <div className="flex justify-center font-bold text-lg">
              <span className="text-primary">Help</span>Me!
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">
                Account details
              </h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <p className="text-gray-500 text-md my-3 mt-2">
                Step <span className="text-primary">2</span> of 3
              </p>
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
               
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaUserAlt className="text-gray-400 m-2" />
                  <input
                  required
                    type="name"
                    name="acName"
                    placeholder="Account Holder Name"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaPiggyBank className="text-gray-400 m-2" />
                  <input
                  required
                    type="number"
                    name="accountNumber"
                    placeholder="Account Number"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaSortNumericDown className="text-gray-400 m-2" />
                  <input
                  required
                    type="code"
                    name="code"
                    placeholder="IFSC Code"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaQrcode className="text-gray-400 m-2" />
                  <input
                  required
                    type="vpa"
                    name="vpa"
                    placeholder="VPA Code"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 border-primary text-primary my-4 rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                >
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
