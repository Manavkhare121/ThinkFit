import { io } from "socket.io-client";
const BACKEND_URL =
  import.meta.env.VITE_API_BASE ||
  "https://thinkfit.onrender.com";

export const socket = io(BACKEND_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = () => {
  const token = localStorage.getItem("accessToken");

  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }
};

