// hooks/useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER = 'http://localhost:5000'; // Update with your server URL

export function useSocket(roomId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    // Connect to socket server
    const socketConnection = io(SOCKET_SERVER);
    setSocket(socketConnection);

    // Join room with user data
    socketConnection.on('connect', () => {
      const userData = {
        name: localStorage.getItem('userName') || 'Guest User',
        color: localStorage.getItem('userColor') || null
      };
      
      socketConnection.emit('join-room', roomId, userData);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [roomId]);

  return socket;
}