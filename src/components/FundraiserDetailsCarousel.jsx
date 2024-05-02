import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Storage } from 'appwrite';
import { useState } from 'react';
import { client } from '@/utils/appwrite';

const FundraiserDetailsCarousel = ({imgs}) => {
  
  const storage = new Storage(client)
  const [urls,setUrls] = useState([])

  const getImages=()=>{
    for (let index = 0; index < imgs.length; index++) {
      const url = storage.getFilePreview("662e5dc5001705c6eaeb",imgs[index])
      setUrls((all)=>[...all,url])
    }
  }

  useEffect(()=>{
    getImages()
  },[])
  
  
  return (
    <div className='text-white text-[20px] w-full max-w-[1360px] mx-auto top-[50px]'>
        <Carousel
            infiniteLoop={true}
            showIndicators={false}
            showStatus={false}
            thumbWidth={60}
            className="productCarousel"
        >
        {
          urls.map((url)=><img src={url}/>)
        }
        </Carousel>
        
    </div>
  )
}

export default FundraiserDetailsCarousel;