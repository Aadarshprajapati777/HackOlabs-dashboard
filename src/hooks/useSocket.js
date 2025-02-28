import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useSocket(roomId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io('http://localhost:3001', {
      query: { roomId },
      transports: ['websocket']
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [roomId]);

  return socket;
}