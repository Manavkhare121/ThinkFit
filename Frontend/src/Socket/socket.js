import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false, // ❗ VERY IMPORTANT
  withCredentials: true,
});

// ✅ dynamic connect
export const connectSocket = () => {
  const token = localStorage.getItem("accessToken");

  socket.auth = { token };
  socket.connect();
};