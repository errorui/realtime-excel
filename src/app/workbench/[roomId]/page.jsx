"use client";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CursorTracker from '@/app/components/CursorTracker';
import { usePathname } from 'next/navigation';

const Page = ({roomId}) => {
   const a=usePathname();

   let roomid=a.split("/")[2]
 
  return (
    <div>
      <ToastContainer />
      <h1>Room ID: {roomid}</h1>
      <CursorTracker roomId={roomid} />
    </div>
  );
}

export default Page;
