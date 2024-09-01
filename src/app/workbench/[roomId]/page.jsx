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

const Page = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Initialize avatars as state
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    console.log(avatars);
  }, [avatars]);

  const roomid = pathname.split("/")[2];

  return (
    <>
      {user && (
        <div>
          <ToastContainer />
          <h1>Room ID: {roomid}</h1>
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
