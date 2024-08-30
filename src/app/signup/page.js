"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const API_URL = "http://localhost:4002"; 
const page = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-2xl">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border rounded"
          required
        />
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
          Sign Up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default page;
