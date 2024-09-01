"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import CreateSpreadsheet from "../components/CreateSpreadSheet";
import PreviousWork from "../components/PreviousWork";


const Page = () => {
  const { user } = useAuth();
  const [previousWork, setPreviousWork] = useState([]);

  useEffect(() => {
    if (user && user.projects) {
      const updatedPreviousWork = user.projects.map((project) => ({
        id: project.spreadsheetId,
        name: project.name || "Unnamed Spreadsheet",
      }));
      setPreviousWork(updatedPreviousWork);
    }
  }, [user]);

  const handleDeletePreviousWork = (index) => {
    const updatedPreviousWork = [...previousWork];
    updatedPreviousWork.splice(index, 1);
    setPreviousWork(updatedPreviousWork);
  };

  return (
    <div className="bg-black flex flex-col items-center gap-6 py-10 min-h-screen">
      <CreateSpreadsheet />
      <PreviousWork
        previousWork={previousWork}
        onDelete={handleDeletePreviousWork}
      />
    </div>
  );
};

export default Page;
