'use client'
import React, { useState, useEffect } from 'react';

const DemoVid = () => {

    const [isClient, setIsClient] = useState(false);
    const videoUrl = 'https://res.cloudinary.com/dg5ddxvko/video/upload/v1725134861/SIH/klmivb4tl6m8bd2ovufk.mp4';
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null; // Return nothing during SSR
    }

  return (
    <div className="relative w-10/12 max-w-[1240px] wrapper xl:h-[600px] md:h-[400px] sm:h-[200px] xs:h-[150px] bg-[#323232] flex items-center justify-center rounded-lg shadow-lg">
      <div className="absolute max-w-[200px] w-2/12 md:top-[-50px] xs:top-[-25px] rounded-tl-[90px] rounded-tr-lg z-[1] right-0 md:h-[100px] xs:h-[50px] bg-[#3E3E3E]"></div>
      <div className="absolute top-0  left-0 w-full h-full z-10 bg-[#323232] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.25)]"></div>
      <div className="absolute md:top-7 xs:top-3 left-0 w-full h-full z-10 bg-[#424242] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.25)]"></div>
      <div className="absolute md:top-14 xs:top-7 left-0 z-20 w-full h-full bg-[#1E1E1E] rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.25)]"></div>
      <video
          className="w-full absolute z-50 md:top-14 xs:top-7 h-full object-cover rounded-lg"
          controls
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
}

export default DemoVid; 