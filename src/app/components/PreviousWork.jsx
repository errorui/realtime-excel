"use client";
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Link from "next/link";

const PreviousWork = ({ previousWork, onDelete }) => {
  return (
    <div className="flex flex-col gap-10 w-[95%] bg-black">
      <h2 className="text-start w-full text-5xl text-white">Previous Work</h2>
      <div
        className="w-full flex flex-wrap justify-around gap-y-6"
        id="previousWorkTable"
      >
       <Table
            aria-label="Previous Work"
            className="text-white"
            style={{ background: "black !important" }}
          >
            <TableHeader>
              <TableColumn className="bg-gray-600 text-white">
                S. No
              </TableColumn>
              <TableColumn className="bg-gray-600 text-white">Name</TableColumn>
              {/* <TableColumn className="bg-gray-600 text-white">
                Last Modified
              </TableColumn> */}
              <TableColumn className="bg-gray-600 text-white">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody>
              {previousWork.map((item, i) => (
                <TableRow key={i} className="hover:bg-slate-500">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Link href={`/workbench/${item.id}`} passHref>
                    <span className="hover:underline">{item.name}</span>
                    </Link>
                  </TableCell>
                  {/* <TableCell>{item.date}</TableCell> */}
                  <TableCell>
                    <button className="p-1 px-3 rounded-full bg-red-500 hover:bg-red-700 transition-all duration-500" onClick={()=>{onDelete(i)}}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
      </div>
    </div>
  );
};

export default PreviousWork;
