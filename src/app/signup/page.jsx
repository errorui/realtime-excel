'use client'

import { Boxes } from "@/components/ui/background-boxes";
import { HomeIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const poppins = Poppins({weight: "500", subsets: ['latin']})

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      if (res.status === 201) {
        router.push("/workbench");
      }
    } catch (error) {
      setError(error.response?.data?.err || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full min-h-screen md:gap-0 xs:gap-1 h-fit flex flex-col items-center md:justify-center overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Boxes className="absolute inset-0 z-0" />
      </div>
      <p className={`xl:text-5xl md:text-4xl md:mt-0 xs:mt-4 xs:text-2xl ${poppins.className} tracking-wider font-light mb-8 z-[10] text-center`}>
          Sign up to start collaborating
        </p>
      <div
        className="relative z-50 w-[80%] md:h-[60vh] xs:h-[70vh] flex flex-col items-center backdrop-blur-md md:p-8 xs:p-2 lg:gap-x-10 md:gap-x-6 xs:gap-x-3 rounded-3xl border-2 border-gray-700 hover:border-white/20 transition-all duration-500"
        style={{ boxShadow: "22px 22px 45px #000000" }}
      >
        <h1 className="md:text-3xl xs:text-2xl font-bold mb-4">Sign Up</h1>
     
        <form onSubmit={handleSignup} className="flex h-full flex-col gap-y-4">
          <div className="md:flex-row xs:flex-col flex justify-between items-center md:gap-4 xs:gap-1">
            <span className="text-xl">Username</span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="foobar"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 md:w-8/12 xs:w-[200px]"
            />
          </div>
          <div className="md:flex-row xs:flex-col flex justify-between items-center md:gap-4 xs:gap-1">
            <span className="text-xl">Email</span>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="foobar@gmail.com"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 md:w-8/12 xs:w-[200px]"
            />
          </div>
          <div className="flex md:flex-row xs:flex-col justify-between items-center md:gap-4 xs:gap-1">
            <span className="text-xl">Password</span>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="9876543210"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 md:w-8/12 xs:w-[200px]"
            />
          </div>
          <button
            className="hover:bg-black hover:text-white border-2 border-gray-700 w-4/12 min-w-[100px] place-self-center hover:border-white transition-all duration-500 p-1 px-3 rounded-xl"
            style={{ boxShadow: "7px 7px 7px #000000" }}
          >
            Submit
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <a
          href="/login"
          className="text-gray-400 hover:text-white transition-all duration-500"
        >
          Already a member? Log in
        </a>
        <a href="/" className="w-full flex justify-end">
          <span
            className="border-2 border-gray-700 hover:border-white transition-all duration-500 p-1 px-3 rounded-xl"
            style={{ boxShadow: "7px 7px 7px #000000" }}
          >
            <HomeIcon />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Page;
