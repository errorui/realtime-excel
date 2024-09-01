// "use client"

import { File, Plus, Upload } from "lucide-react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBarHome from "../NavBarHome";
// import { File, Plus, Upload } from "lucide-react";
// import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
// import React, { useRef, useState } from "react";
// import { useAuth } from "../../../context/auth";
// import { useRouter } from "next/navigation";
// import axios from "axios";


// const API_URL = process.env.NEXT_PUBLIC_API_URL

// const page = () => {

//   const uploadFileRef = useRef();
//   const [fileName, setFileName] = useState("")

//   const {user, setUser} = useAuth()
//   const router = useRouter()

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${API_URL}/api/user/logout`, {withCredentials: true});
//       setUser(null); //Reset user state
//       router.push('/')
//     } catch (error) {
//       console.error('Logout failed', error)
//     }
//   }


//   return (
//     <div className="flex flex-col items-center justify-center gap-10">
//         <div className="w-[98%] min-h-20 backdrop-blur-md bg-[#2a2a2a] rounded-xl flex justify-end items-center p-3">
//           <div className="flex gap-4 items-center justify-center">
//             <p>User Name</p>


//             <Dropdown>
//               <DropdownTrigger>
//                 <div className="w-12 h-12 rounded-full bg-gray-600"></div>
//               </DropdownTrigger>
//               <DropdownMenu aria-label="static Actions">
//                 <DropdownItem onClick={handleLogout} className="px-3 py-2 text-white text-xl bg-red-500 rounded-xl hover:bg-red-400 active:bg-red-300">LogOut</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>


//           </div>
//         </div>

//       <input className="hidden" type="file" ref={uploadFileRef} onChange={(e) => {
//         e.preventDefault(); 
//         setFileName(e.target.files[0].name);
//         // console.log(e)
//         // console.log(e.files)
//       }} />
//       <div className="flex flex-wrap w-[98%] justify-around">
//         <div className="w-[45%] h-[40vh] border-dashed border-2 border-gray-600 flex flex-col gap-2 justify-center items-center text-lg rounded-xl z-50 cursor-pointer" onDrop={(e) => {
//           e.preventDefault();
//           setFileName(e.dataTransfer.files[0].name);
//           console.log(e)
//           console.log(e.dataTransfer)
//           console.log("dropped")
//         }}
//           onDragOver={(e) => {
//             e.preventDefault();
//           }}
//           onClick={(e) => {
//             e.preventDefault();
//             uploadFileRef.current.click()
//           }}
//         >
//           {fileName ? (<span>{fileName}</span>) : (<>
//           <div className="relative">
//             <File color="white" size={50} />
//             <Upload className="absolute -bottom-1 right-0 bg-black rounded-full p-1" size={28} />
//           </div>
            
//             <span>
//             Drag and Drop file here or{" "}
//             <span className="underline font-semibold">Choose File</span>
//           </span>
//           </>
//           )}
//         </div>
//         <div className="w-[45%] h-[40vh] border-dashed border-2 border-gray-600 flex gap-2 justify-center items-center text-lg">
//           Drag and Drop file here or{" "}
//           <span className="underline font-semibold">Choose File</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '../../components/ui/animated-modal';
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Select, SelectItem } from "@nextui-org/select";
import { PlusCircle, PlusSquare } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [divs, setDivs] = useState([]);
  const handleAddClick = () => {
    setDivs([...divs, { id: divs.length }]);
  };
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
    <div className="flex flex-col items-center gap-10 min-h-[100vh] bg-black">
      <div className="w-[98%] min-h-20 backdrop-blur-md bg-[#2a2a2a] rounded-xl mt-5 flex justify-end items-center p-3">
        <div className="flex gap-4 items-center justify-center">
          <p>User Name</p>
          <div className="w-12 h-12 rounded-full bg-gray-600"></div>
        </div>
      </div>
      <Modal>
        <ModalTrigger className="bg-black w-full dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <div className="flex flex-wrap w-[98%] justify-around">
            <div className="w-[45%] h-[40vh] border-dashed hover:border-solid transition-all duration-500 cursor-pointer border-2 border-gray-600 flex gap-2 justify-center items-center text-lg rounded-xl">
              <PlusSquare size={50} absoluteStrokeWidth />
              Click to add
              <span className="underline font-semibold">New File</span>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className={"bg-black border-2 border-white"}>
          <ModalContent className={" flex flex-col items-center gap-4"}>
            <ScrollShadow
              hideScrollBar
              className="w-full h-[400px] flex flex-col items-center gap-4"
            >
              <div className="flex justify-center items-center gap-4">
                <span className="text-xl">File Name</span>
                <input
                  type="text"
                  placeholder="foobar"
                  className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl p-2 h-10 w-fit min-w-40"
                />
              </div>
              {divs.map((div, index) => (
                <div key={div.id} className="mt-4">
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-xl">Member Email {index + 1}</span>
                    <input
                      type="email"
                      placeholder="foobar"
                      className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl p-2 h-10 w-fit min-w-40"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-4 w-full mt-4">
                    <span className="text-xl">Permission</span>
                    <Select className="w-full">
                      <SelectItem
                        key={`read-${index}`}
                        className="text-black w-full"
                      >
                        Can Read
                      </SelectItem>
                      <SelectItem
                        key={`write-${index}`}
                        className="text-black w-full"
                      >
                        Can Write
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              ))}
              <div id="addMembers"></div>
              <button
                className="flex justify-center items-center gap-2 w-1/2 px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 text-sm rounded-xl"
                onClick={handleAddClick}
              >
                <PlusCircle /> Add Members
              </button>
            </ScrollShadow>
          </ModalContent>
          <ModalFooter className="flex w-full justify-around gap-4">
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 border border-black w-1/2 rounded-xl">
              Create
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
      <div className="flex flex-col gap-10 w-[95%]">
        <h2 className="text-start w-full text-5xl">Previous Work</h2>
        <div className="w-full flex flex-wrap justify-around gap-y-6">
          {Array.from({ length: 5 }, (_, index) => index).map((item) => (
            <>
              <div className="min-w-[30%] min-h-20 border-2 p-3 rounded-xl">{item}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
