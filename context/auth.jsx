
"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// const API_URL = "https://excel-auth.onrender.com"; 
const API_URL = 'http://localhost:4002'


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const pathname = usePathname(); 
  const router = useRouter();

  
  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/user`, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return null;
    }
  };

 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (!res) {
        console.log("No user found");
      } else {
        console.log("User found");
        if ((pathname === "/login")||(pathname === "/signup")) {
          router.push("/workbench");
        }
        setUser(res);
      }
    };
  
    fetchUser();
  }, [pathname]); 
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
