import React from "react";
import Wrapper from "@/components/Wrapper";
import FundraiserDetailsCarousel from "@/components/FundraiserDetailsCarousel";
import Progressbar from "@/components/ProgressBar";
import { useRouter } from "next/router";
import { Databases } from "appwrite";
import { client } from "@/utils/appwrite";

const FundraiserDetails = ({fundraiser, error}) => {

  const router = useRouter()

  return (
    <>
      {error?<p className="m-2 text-center">The specified fundraiser doesn't exists anymore.</p>:
      <div className="w-full my-10">
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <FundraiserDetailsCarousel imgs={fundraiser.file_refs} />
              <div className="pl-20 mt-3">
                <div>
                  <div>
                    <p className="text-[30px] ">
                      ₹ {fundraiser.raised}
                      <span className="text-gray-500 text-[16px] ml-2">
                        raised of ₹ {fundraiser.amount} goal
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <Progressbar bgcolor="#D9434E" progress={fundraiser.raised/fundraiser.amount * 100} height={25} />
            </div>
            <div className="flex-[1]">
              <p className="font-bold text-[24px] text-left mb-3 text-primary">
                {fundraiser.title}
              </p>
              <div className="w-full border border-gray-300 my-5"></div>
              <p className="my-2">
                {fundraiser.description}
              </p>
              <div className="mt-10">
                <p className="text-primary font-semibold text-[18px]">Organiser details</p>
                <div className="w-full border border-gray-300 my-2"></div>
                <p><span className="text-primary">Name: </span>{fundraiser.org_name}</p>
                <p><span className="text-primary">Email: </span>{fundraiser.org_email}</p>
                <p><span className="text-primary">Phone Number: </span>{fundraiser.org_phone}</p>
              </div>
            </div>
          </div>
          <div className="w-full border border-gray-300 my-6"></div>
          <div className="px-20">
            <div className="text-primary text-center font-bold text-xl pb-5">
              Payment Related Details
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src="/bank.png"
                  alt="Bank logo"
                  className="w-34 h-32 mr-4"
                />
                <div className="text-left">
                  <p className="text-base font-medium mb-2">A/C Holder Name: {fundraiser.ac_holder_name}</p>
                  <p className="text-base font-medium mb-2">A/C Number: {fundraiser.ac_number}</p>
                  <p className="text-base font-medium">IFSC Code: {fundraiser.ifsc_code}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div className="flex justify-center align-center">
            <button onClick={()=>router.push({"pathname":"/payments",query:{"upi_vpa":fundraiser.upi_vpa,"id":fundraiser.$id}})} className="border-2 border-primary text-primary rounded-full text-lg px-24 py-2 my-8 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer ">
              Pay using UPI
            </button>
          </div>
        </Wrapper>
      </div>}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const db = new Databases(client);
  try{
    const response = await db.getDocument("662a5d910b143e51eb24","662a5da69dda8f72af1b",params.slug)
    return {
        props: { fundraiser : response, error : false }
    }
  }
  catch(err){
    return{
      props: {fundraiser:{}, error:true}
    }
  }
}
export default FundraiserDetails;

