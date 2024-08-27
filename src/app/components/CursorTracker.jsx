"use client"
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import CursorSVG from './../../../public/assets/Cursor';

const socket = io('http://localhost:3001');

const CursorTracker = () => {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    socket.on('cursor-update', (data) => {
      setCursors((prevCursors) => {
        // Check if cursor already exists
        const cursorIndex = prevCursors.findIndex(cursor => cursor.id === data.id);
        
        if (cursorIndex > -1) {
          // Update cursor position
          const updatedCursors = [...prevCursors];
          updatedCursors[cursorIndex] = { ...updatedCursors[cursorIndex], x: data.x, y: data.y };
          return updatedCursors;
        } else {
          // Add a new cursor with a random color
          return [...prevCursors, { id: data.id, x: data.x, y: data.y, color: getRandomColor() }];
        }
      });
    });

    socket.on('cursor-disconnect', (id) => {
      setCursors((prevCursors) => prevCursors.filter(cursor => cursor.id !== id));
    });

    return () => {
      socket.off('cursor-update');
      socket.off('cursor-disconnect');
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      socket.emit('cursor-move', { x: e.clientX, y: e.clientY });
    }, 90); 

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date()).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };

  return (
    <>
      {cursors.map(({ id, x, y, color }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            top: y,
            left: x,
          }}
        >
          <CursorSVG color={color} />
          <h1>{id}</h1>
        </div>
      ))}
    </>
  );
};

export default CursorTracker;
