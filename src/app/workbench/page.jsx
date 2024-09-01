"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import CreateSpreadsheet from "../components/CreateSpreadSheet";
import PreviousWork from "../components/PreviousWork";
import NavBarHome from "../NavBarHome";
import axios from "axios";

const Page = () => {
  const { user } = useAuth();
  const [previousWork, setPreviousWork] = useState([]);
  const API_URL= process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    if (user && user.projects) {
      const updatedPreviousWork = user.projects.map((project) => ({
        id: project.spreadsheetId,
        name: project.name || "Unnamed Spreadsheet",
      }));
      setPreviousWork(updatedPreviousWork);
    }
  }, [user]);

  const handleDeletePreviousWork = async (index) => {
    try {
      // Send POST request to delete the item
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
