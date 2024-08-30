"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:4002"; 

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-2xl">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 mt-2 text-white bg-blue-500 rounded">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default page;
