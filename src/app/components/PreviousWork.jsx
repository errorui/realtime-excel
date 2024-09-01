"use client";
import React from "react";
import WorkCard from "./WorkCard";

const PreviousWork = ({ previousWork, onDelete }) => {
  return (
    <div className="flex flex-col gap-5 w-full px-10 bg-black">
      <h3 className="md:text-5xl xs:text-4xl text-white">PastSheets</h3>
      <div className="flex  flex-wrap gap-y-8 gap-x-3 items-center">
      {previousWork.map((work, index) => {
        return(
          <div>
            <WorkCard work={work} onDelete={onDelete} index={index} key={index}/>
          </div>
        )
      })}
     </div>
    </div>
  );
};

export default PreviousWork;
