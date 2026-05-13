import { io } from "socket.io-client";

export const socket = io(
   "http://localhost:3000",
   {
      autoConnect:false,
      withCredentials:true
   }
);

export const connectSocket = () => {
   if(!socket.connected){
      socket.connect();
   }
};