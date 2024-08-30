"use client";

import React, { useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/auth';


const API_URL = "http://localhost:4002"; 

const page = () => {
  const { user, setUser } = useAuth()
  const router = useRouter();

  // Logout handler function
  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/user/logout`, { withCredentials: true });
      setUser(null); // Reset user state
      router.push('/'); // Redirect to home or login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/');
      }
    }, 100); 

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-2xl">Workbench</h1>
     
      {user ? (
        <div className="text-center">
          <p className="mb-2">Welcome, {user.username}!</p>
          <p className="mb-2">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="p-2 mt-4 text-white bg-red-500 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default page;
