"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../components/ui/animated-modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../../context/auth";
import { useRouter } from "next/navigation";

const CreateSpreadsheet = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();
const router=useRouter()
  const [spreadsheetName, setSpreadsheetName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) {
      setSelectedUsers([{email:user.email, canWrite:true}]);
    }else{
      router.push('/login')
    }
  }, [user]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/users`);
        setAllUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSearchUsers = () => {
    const filtered = allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (user) => {
    const hasWritePermission = confirm("Give write permission to this user?");
    const newUser = {
      email: user.email,
      canWrite: hasWritePermission,
    };
    setSelectedUsers([...selectedUsers, newUser]);
  };

  const handleRemoveUser = (userEmail) => {
    setSelectedUsers((prev) =>
      prev.filter((user) => user.email !== userEmail)
    );
  };

  const handleCreateSpreadsheet = async () => {
    if (!spreadsheetName || selectedUsers.length === 0) {
      setError("Please provide a name for the spreadsheet and select users.");
      return;
    }
    try {
     let route= await axios.post(`${API_URL}/api/file/create-spreadsheet`, {
        spreadSheetName: spreadsheetName,
        users: selectedUsers,
      });

    router.push(`workbench/${route.data.spreadsheetId}`)
      setSpreadsheetName("");
      setSelectedUsers([]);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to create spreadsheet.");
    }
  };

  return (
    <Modal>
      <ModalTrigger className="bg-black w-full dark:bg-white  text-white flex justify-center group/modal-btn">
        <div className="flex flex-wrap w-[98%] justify-around">
          <div
            className="w-[45%] md:h-[40vh] xs:h-[30vh] px-6 border-dashed hover:border-solid transition-all duration-500 cursor-pointer border-2 border-gray-600 flex lg:flex-row xs:flex-col gap-2 justify-center items-center text-lg rounded-xl"
          >
            <div className="md:block xs:hidden relative">
              <PlusCircle size={50} />
            </div>
            <div className="md:hidden xs:block relative">
              <PlusCircle size={33} />
            </div>
            <span className="md:text-xl xs:text-md">Create New Spreadsheet</span>
          </div>
        </div>
      </ModalTrigger>
      <ModalBody className="bg-black border-2 border-white">
        <ModalContent className="flex flex-col items-center gap-4 text-white">
          <ScrollShadow
            hideScrollBar
            className="w-full h-[400px] flex flex-col items-center gap-4"
          >
            <div className="p-5">
              <h1 className="text-3xl text-white text-center my-2">
                Add New File
              </h1>
              <div className="my-4">
                <span className="text-xl mr-2">File Name</span>
                <input
                  type="text"
                  value={spreadsheetName}
                  onChange={(e) => setSpreadsheetName(e.target.value)}
                  placeholder="Spreadsheet Name"
                  className="  bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl p-2 h-10 w-full"
                />
              </div>
              <div className="my-4">
                <span className="flex text-xl mr-2">Search Users</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Users by Email"
                  className="bg-transparent border-2 hover:border-white border-white/10 transition-all duration-500 rounded-xl p-2 h-10 w-full"
                />
                <button
                  onClick={handleSearchUsers}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                >
                  Search
                </button>
              </div>
              {filteredUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex justify-between items-center my-2 p-2 border-b border-white"
                >
                  <span>{user.email}</span>
                  <button
                    onClick={() => handleSelectUser(user)}
                    className="bg-green-500 text-white px-4 py-1 rounded-md"
                  >
                    Select
                  </button>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedUsers.map((user) => (
                  <span
                    key={user.email}
                    className="bg-gray-700 text-white px-2 py-1 rounded-full cursor-pointer"
                    onClick={() => handleRemoveUser(user.email)}
                  >
                    {user.email} {user.canWrite ? "(Write)" : ""}
                  </span>
                ))}
              </div>
              {error && <div className="text-red-500 m-2">{error}</div>}
              <button
                onClick={handleCreateSpreadsheet}
                className="bg-[#4CAF50] border-none px-4 py-2 rounded-md cursor-pointer w-full mt-4"
              >
                Create Spreadsheet
              </button>
            </div>
          </ScrollShadow>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default CreateSpreadsheet;
