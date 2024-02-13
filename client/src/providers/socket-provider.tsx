import React, { createContext, useContext, useEffect, useState } from "react";
import { io as SocketIO, Socket } from "socket.io-client";
type SocketProviderType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketProviderType>({
  isConnected: false,
  socket: null,
});

// creating a hook for so that our app can use the hook to access the context
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setisConnected] = useState(false);
  useEffect(() => {
    // initialising socketa
    const socketInstance = SocketIO("localhost:8000/", {
      //   path: "/api/socket",
      //   addTrailingSlash: false,
    });
    socketInstance.on("connect", () => {
      setisConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setisConnected(false);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
