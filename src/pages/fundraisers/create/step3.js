import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { FaRupeeSign, FaCalendarTimes } from "react-icons/fa";
import {client} from "../../../utils/appwrite"
import { Storage, Databases} from "appwrite";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Step3() {
  
  const showSuccess = (msg) => {
    toast.success(msg, {
  });}

  const showMsg=(msg)=>{
    toast.info(msg, {
    });}  
  
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const [state,setState] = useState({"title":"","desc":"","target":"","enddate":new Date().toLocaleDateString('en-CA')})

  const storage = new Storage(client);

  const db = new Databases(client)

  const uploadImages=async()=>{
    let ids = []    
    try{
      for (let index = 0; index < images.length; index++) {
        const id = uuidv4()
        ids.push(id)
        const fl = await storage.createFile("662e5dc5001705c6eaeb",id,document.getElementById("filesin").files[index])
      }
      setImages([])
      document.getElementById("filesin").value=[]
      return ids
      }
    catch(err){
      showMsg(err)
    }

  }

  async function handleSubmit(){
    if(state.title==="" || state.desc==="" || state.target==="" || state.enddate==="" || images.length==0){
      showMsg("Please fill the required fields!")
      return
    }
    showMsg("Uploading...")
    try{
      const allFileRefs = await uploadImages()
      const allData = {...router.query, ...state, "file_refs":allFileRefs}
      const doc_id = uuidv4()
      const doc = {"title":allData.title,"description":allData.desc,"file_refs":allData.file_refs,"start_date":new Date().toLocaleDateString('en-CA'),"end_date":allData.enddate,"amount":Number(allData.target),"raised":0,"ac_holder_name":allData.ac_name,"ac_number":Number(allData.ac_num),"ifsc_code":allData.ifsc,"upi_vpa":allData.vpa,"org_name":allData.name,"org_email":allData.email,"org_phone":allData.phone,"donation_refs":[]}
      const up = await db.createDocument("662a5d910b143e51eb24","662a5da69dda8f72af1b",doc_id,doc)
      setState({"title":"","desc":"","target":"","enddate":new Date().toLocaleDateString('en-CA')})
      showSuccess(`Fundraiser Created Successfully with id = ${up.$id}`)
      setTimeout(()=>router.push(`/fundraisers/${doc_id}`),5000)
    }
    catch(err){
      showMsg(err)
    }

  } 

  function selectFiles() {
    fileInputRef.current.click();
  }


  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      //if (files[i].type.split("/")[0] != "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          // files[i]
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!images.some((image) => image.name === file.name)) {
        setImages((prevImages) => [
          ...prevImages,
          // file
          {
            name: file.name,
            url: URL.createObjectURL(file),
          },
        ]);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ToastContainer/>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl">
          <div className="w-full p-5">
            <div className="flex justify-center font-bold text-lg">
              <span className="text-primary">Help</span>Me!
            </div>
            <div className="w-full py-10">
              <h2 className="text-3xl font-bold text-primary">
                Fundraiser details
              </h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <p className="text-gray-500 text-md my-3 mt-2">
                Step <span className="text-primary">3</span> of 3
              </p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-6/12 p-2 flex mb-3">
                  <input
                    type="title"
                    name="title"
                    value={state.title}
                    onChange={(e)=>setState({...state, "title":e.target.value})}
                    placeholder="Title"
                    className="bg-gray-100 outline-none text-md flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-6/12 p-2 flex mb-3">
                  <textarea
                    type="description"
                    name="description"
                    placeholder="Enter description"
                    value={state.desc}
                    onChange={(e)=>setState({...state, "desc":e.target.value})}
                    className="bg-gray-100 outline-none text-md flex-1"
                    rows={10}
                  />
                </div>
                <div className="bg-gray-100 w-6/12 p-2 flex items-center mb-3">
                  <FaRupeeSign className="text-gray-400 m-2 text-sm" />
                  <input
                    type="amount"
                    name="amount"
                    value={state.target}
                    onChange={(e)=>setState({...state, "target":e.target.value})}
                    placeholder="Target Amount"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-6/12 p-2 flex items-center mb-3">
                  <FaCalendarTimes className="text-gray-400 m-2" />
                  <input
                    type="date"
                    name="date"
                    placeholder="Ending Date"
                    value={state.enddate}
                    onChange={(e)=>setState({...state,"enddate":e.target.value})}
                    className="bg-gray-100 outline-none text-sm flex-1 inputDate"
                  />
                </div>
                <div className="card w-6/12">
                  <div
                    className="drag-area"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    {isDragging ? (
                      <span className="select">Drop images here</span>
                    ) : (
                      <>
                        {" "}
                        <span
                          className="select"
                          role="button"
                          onClick={selectFiles}
                        >
                          Drag & Drop image here or Browse
                        </span>
                      </>
                    )}

                    <input
                      name="file"
                      type="file"
                      id="filesin"
                      className="file"
                      multiple
                      ref={fileInputRef}
                      onChange={onFileSelect}
                    ></input>
                  </div>

                  <div className="container">
                    {images.map((images, index) => (
                      <div className="image" key={index}>
                        <span
                          className="delete"
                          onClick={() => deleteImage(index)}
                        >
                          &times;
                        </span>
                        <img src={images.url} alt={images.name} />
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={handleSubmit}
                  className="border-2 border-primary text-primary my-4 rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                >Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
