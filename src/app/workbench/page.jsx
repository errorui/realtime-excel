"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import CreateSpreadsheet from "../components/CreateSpreadSheet";
import PreviousWork from "../components/PreviousWork";
import NavBarHome from "../NavBarHome";
import axios from "axios";
import {useRouter} from 'next/navigation'
import { toast } from "react-toastify";

const Page = () => {
  const { user } = useAuth();
  const router=useRouter()
  const [previousWork, setPreviousWork] = useState([]);
  const API_URL= process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    if(user){
      const getProject=async ()=>{
        const body= {email: user.email};
        try{
          const response = await axios.post(`${API_URL}/api/file/getspreadsheetnames`, body);
          const data= response.data.spreadsheetnamesandIds;
          // console.log(data);
          const updatedPreviousWork= data.map((spreadsheet)=>({
            id:spreadsheet.spreadhsheetId,
            name: spreadsheet.spreadsheetName || 'Untitled Spreadsheet'
          }));
          setPreviousWork(updatedPreviousWork);
        }
        catch(err){
          console.log('Error getting the projets', err);
        }
      }
      getProject();
    }
  
  }, [user]);

  const handleDeletePreviousWork = async (index) => {
    try {
      // Send POST request to delete the item
      console.log(previousWork);
      console.log(previousWork[index]);
      const id= previousWork[index].id;
      const body= {email: user.email}
       const response= await axios.post(`${API_URL}/api/file/delete/${id}`, body);
       if(response.status==200){
        const newPreviousWork = [...previousWork];
        newPreviousWork.splice(index, 1);
        setPreviousWork(newPreviousWork);
       }
      // Update state to remove the deleted item
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  return (
    <div className="bg-black flex flex-col items-center gap-6 py-10 min-h-screen">
      <NavBarHome/>
      <CreateSpreadsheet />
      <PreviousWork
        previousWork={previousWork}
        onDelete={handleDeletePreviousWork}
      />
    </div>
  );
};

export default Page; 
