
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
      socket = io(process.env.BACKEND_URL || "http://localhost:8000");
      socket.emit("join_room", process.env.ROOM_CODE || "capibara");
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }
};

