'use client'

import { Boxes } from "@/components/ui/background-boxes";
import { HomeIcon } from "lucide-react";
import React, {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const page = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        router.push("/workbench");
      }
    } catch (error) {
      setError(error.response?.data?.err || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen h-fit relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-0 w-full h-full left-0 top-0 overflow-hidden">
        <Boxes className={"z-0 relative"} />
      </div>
      <div
        className="z-50 relative w-[80%] min-h-[50vh] flex flex-col items-center justify-between backdrop-blur-md p-8 gap-10 rounded-3xl border-2 hover:border-white/20 border-transparent transition-all duration-500"
        style={{ boxShadow: "22px 22px 45px #343434" }}
      >
        <h1 className="text-3xl">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
          <div className="flex justify-center items-center gap-4">
            <span className="text-xl">Email</span>
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="foobar@gmail.com"
              className="p-1 bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl h-10 w-fit min-w-40"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-xl">Password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="9876543210"
              className="p-1 bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl h-10 w-fit min-w-40"
            />
          </div>
          <button
            className="border-2 w-4/12 place-self-center hover:border-white border-transparent transition-all duration-500 p-1 px-3 rounded-xl"
            style={{ boxShadow: "7px 7px 7px #343434" }}
          >
            Submit
          </button>
        {error && <p className="text-red-500">{error}</p>}
        </form>
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
