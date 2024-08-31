"use client";
import React, { useEffect, useState } from 'react';

import CursorSVG from './../../../public/assets/Cursor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/auth';

const CursorTracker = ({ roomId ,socket,user}) => {

  const [cursors, setCursors] = useState([]);
  console.log(user)
  useEffect(() => {
    if (roomId) {
      socket.emit('join room', roomId);
      toast.success(`Successfully joined room ${roomId}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const handleCursorUpdate = (data) => {
     console.log("hello")
      setCursors((prevCursors) => {
        const cursorIndex = prevCursors.findIndex(cursor => cursor.id === data.id);

        if (cursorIndex > -1) {
          const updatedCursors = [...prevCursors];
          updatedCursors[cursorIndex] = { ...updatedCursors[cursorIndex], x: data.x, y: data.y };
          return updatedCursors;
        } else {
          return [...prevCursors, { id: data.id, x: data.x, y: data.y, color: getRandomColor(),user:data.user }];
        }
      });
    };

    const handleCursorDisconnect = (id) => {
      console.log('Received cursor-disconnect:', id);
      setCursors((prevCursors) => prevCursors.filter(cursor => cursor.id !== id));
    };

    
    socket.on('cursor-update', handleCursorUpdate);
    socket.on('cursor-disconnect', handleCursorDisconnect);

    
    return () => {
      socket.emit('disconnect-room', { roomId });
      socket.off('cursor-update', handleCursorUpdate);
      socket.off('cursor-disconnect', handleCursorDisconnect);
    };
  }, [roomId]);

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      socket.emit('cursor-move', { x: e.clientX, y: e.clientY, roomId,user });
    }, 90);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [roomId]);

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date()).getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  };

  return (
    <>
      {cursors.map(({ id, x, y, color,user }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            top: y,
            left: x,
          }}
        >
          <CursorSVG color={color} />
          <h1>{user}</h1>
        </div>
      ))}
    </>
  );
};

export default CursorTracker;
