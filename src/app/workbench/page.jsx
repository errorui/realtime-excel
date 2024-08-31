"use client"

import { File, Plus, Upload } from "lucide-react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBarHome from "../NavBarHome";

// const API_URL = "https://excel-auth.onrender.com"
const API_URL = 'http://localhost:4002'

const page = () => {

  const uploadFileRef = useRef();
  const [fileName, setFileName] = useState("")

  const {user, setUser} = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/user/logout`, {withCredentials: true});
      setUser(null); //Reset user state
      router.push('/')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }


  return (
    // <div className="flex flex-col items-center justify-center gap-10">
    //     <div className="w-[98%] min-h-20 backdrop-blur-md bg-[#2a2a2a] rounded-xl flex justify-end items-center p-3">
    //       <div className="flex gap-4 items-center justify-center">
    //         <p>User Name</p>


    //         <Dropdown>
    //           <DropdownTrigger>
    //             <div className="w-12 h-12 rounded-full bg-gray-600"></div>
    //           </DropdownTrigger>
    //           <DropdownMenu aria-label="static Actions">
    //             <DropdownItem onClick={handleLogout} className="px-3 py-2 text-white text-xl bg-red-500 rounded-xl hover:bg-red-400 active:bg-red-300">LogOut</DropdownItem>
    //           </DropdownMenu>
    //         </Dropdown>


    //       </div>
    //     </div>
    <div className="flex flex-col items-center justify-center gap-10">
      <div className='flex w-full justify-center items-center pt-5'>
        <NavBarHome/>
      </div>
      <input className="hidden" type="file" ref={uploadFileRef} onChange={(e) => {
        e.preventDefault(); 
        setFileName(e.target.files[0].name);
        // console.log(e)
        // console.log(e.files)
      }} />
      <div className="flex flex-wrap w-[98%] justify-around">
        <div className="w-[45%] h-[40vh] border-dashed border-2 border-gray-600 flex flex-col gap-2 justify-center items-center text-lg rounded-xl z-50 cursor-pointer" onDrop={(e) => {
          e.preventDefault();
          setFileName(e.dataTransfer.files[0].name);
          console.log(e)
          console.log(e.dataTransfer)
          console.log("dropped")
        }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.preventDefault();
            uploadFileRef.current.click()
          }}
        >
          {fileName ? (<span>{fileName}</span>) : (<>
          <div className="relative">
            <File color="white" size={50} />
            <Upload className="absolute -bottom-1 right-0 bg-black rounded-full p-1" size={28} />
          </div>
            
            <span>
            Drag and Drop file here or{" "}
            <span className="underline font-semibold">Choose File</span>
          </span>
          </>
          )}
        </div>
        <div className="w-[45%] h-[40vh] border-dashed border-2 border-gray-600 flex gap-2 justify-center items-center text-lg">
          Drag and Drop file here or{" "}
          <span className="underline font-semibold">Choose File</span>
        </div>
      </div>
    </div>
  );
};

export default page;
