"use client";

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CursorTracker from '@/app/components/CursorTracker';
import { usePathname } from 'next/navigation';
import Spreadsheet from '../../components/SpreadSheetComponent';
import socket from '@/app/components/socket';
import { useAuth } from '../../../../context/auth';
import AvatarStack from '@/app/components/AvatarStack';
import {useRouter} from 'next/navigation'
const Page = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const router=useRouter()
  
  const [avatars, setAvatars] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/login');
      }
    }, 100);

    return () => clearTimeout(timer); 
  }, [user]);
  const roomid = pathname.split("/")[2];

  return (
    <>
      {user && (
        <div>
          <ToastContainer />
          <div className="flex gap-2">
          <button className='px-4 py-2 text-slate-800 rounded-xl bg-slate-200 shadow-md font-bold ' onClick={
            ()=>{
              router.push('/workbench')
            }
          }>back</button>
          <h1>Room ID: {roomid}</h1>
          </div>
      
          <AvatarStack avatars={avatars} />
          <CursorTracker
            roomId={roomid}
            socket={socket}
            user={user.username}
            setAvatars={setAvatars}
          />
          <Spreadsheet roomId={roomid} socket={socket} />
        </div>
      )}
    </>
  );
}

export default Page;
