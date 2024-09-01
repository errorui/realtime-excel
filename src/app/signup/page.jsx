'use client'

import { Boxes } from "@/components/ui/background-boxes";
import { HomeIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    <div className="relative w-full min-h-screen h-fit flex flex-col items-center justify-center overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Boxes className="absolute inset-0 z-0" />
      </div>
      <p className="md:text-5xl tracking-wider font-light mb-8 z-[10] text-center">
          Sign up to start collaborating
        </p>
      <div
        className="relative z-50 w-[80%] min-h-[50vh] flex flex-col items-center backdrop-blur-md p-8 gap-10 rounded-3xl border-2 border-gray-700 hover:border-white/20 transition-all duration-500"
        style={{ boxShadow: "22px 22px 45px #000000" }}
      >
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
     
        <form onSubmit={handleSignup} className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center gap-4">
            <span className="text-xl">Username</span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="foobar"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 min-w-40"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-xl">Email</span>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="foobar@gmail.com"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 min-w-40"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-xl">Password</span>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="9876543210"
              required
              className="px-2 py-4 border-gray-700 bg-transparent border-2 hover:border-white transition-all duration-500 rounded-xl h-10 min-w-40"
            />
          </div>
          <button
            className="hover:bg-black hover:text-white border-2 border-gray-700 w-4/12 place-self-center hover:border-white transition-all duration-500 p-1 px-3 rounded-xl"
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
