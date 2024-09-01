"use client";

import { File, Plus, Upload } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBarHome from "../NavBarHome";

const page = () => {
  const uploadFileRef = useRef();
  const [fileName, setFileName] = useState("");
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, { withCredentials: true });
      setUser(null); // Reset user state
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [divs, setDivs] = useState([]);
  const handleAddClick = () => {
    setDivs([...divs, { id: divs.length }]);
  };

  return (
    <div className="flex flex-col items-center gap-10 min-h-[100vh] ">
    
    <NavBarHome></NavBarHome>

      <input
        className="hidden"
        type="file"
        ref={uploadFileRef}
        onChange={(e) => {
          e.preventDefault();
          setFileName(e.target.files[0].name);
        }}
      />

      <div className="flex flex-wrap w-[98%] justify-around">
        <div
          className="w-[45%] h-[40vh] border-dashed border-2 border-gray-600 flex flex-col gap-2 justify-center items-center text-lg rounded-xl z-50 cursor-pointer"
          onDrop={(e) => {
            e.preventDefault();
            setFileName(e.dataTransfer.files[0].name);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.preventDefault();
            uploadFileRef.current.click();
          }}
        >
          {fileName ? (
            <span>{fileName}</span>
          ) : (
            <>
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

      {/* Additional UI Components like Modal can go here */}

      <div className="flex flex-col gap-10 w-[95%]">
        <h2 className="text-start w-full text-5xl">Previous Work</h2>
        <div className="w-full flex flex-wrap justify-around gap-y-6">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="min-w-[30%] min-h-20 border-2 p-3 rounded-xl">
              {index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
