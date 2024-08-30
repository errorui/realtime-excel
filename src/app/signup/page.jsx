import { Boxes } from "@/components/ui/background-boxes";
import { HomeIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen h-fit relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-0 w-full h-full left-0 top-0 overflow-hidden">
        <Boxes className={"z-0 relative"} />
      </div>
      <div
        className="z-50 relative w-[80%] min-h-[50vh] flex flex-col items-center backdrop-blur-md p-8 gap-10 rounded-3xl border-2 hover:border-white/20 border-transparent transition-all duration-500"
        style={{ boxShadow: "22px 22px 45px #343434" }}
      >
        <h1 className="text-3xl">Sign Up</h1>
        <div className="flex justify-center items-center gap-4">
          <span className="text-xl">Username</span>
          <input
            type="text"
            placeholder="foobar"
            className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-md h-10 w-fit min-w-40"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <span className="text-xl">Email</span>
          <input
            type="email"
            placeholder="foobar@gmail.com"
            className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-md h-10 w-fit min-w-40"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <span className="text-xl">Password</span>
          <input
            type="password"
            placeholder="9876543210"
            className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-md h-10 w-fit min-w-40"
          />
        </div>
        <button
          className="border-2 hover:border-white border-transparent transition-all duration-500 p-1 px-3 rounded-xl"
          style={{ boxShadow: "7px 7px 7px #343434" }}
        >
          Submit
        </button>
        <a href="/" className="w-full flex justify-end">
          <span
            className="border-2 hover:border-white border-transparent transition-all duration-500 p-1 px-3 rounded-xl"
            style={{ boxShadow: "7px 7px 7px #343434" }}
          >
            <HomeIcon />
          </span>
        </a>
      </div>
    </div>
  );
};

export default page;
