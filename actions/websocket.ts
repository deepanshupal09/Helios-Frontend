
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  if (!socket) {
    // Initialize socket if not already done
    initializeSocket();
  }
  return socket;
};

const initializeSocket = async (): Promise<void> => {
  if (!socket) {
    try {
        console.log("pro ", process.env.NEXT_PUBLIC_BACKEND_URL)
      socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000");
      socket.emit("join_room", process.env.ROOM_CODE || "capibara");
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }
};

