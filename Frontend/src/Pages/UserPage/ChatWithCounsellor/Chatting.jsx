import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './Chatting.css';
// ✅ connectSocket ko import kiya
import { socket, connectSocket } from "../../../Socket/socket.js"; 

const Chatting = () => {
  const { chatId } = useParams();
  console.log(chatId);
  console.log("DEBUG: chatId received as prop:", chatId);
  const [inputActive, setInputActive] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId || chatId === ":chatId") return; 

  console.log("Joining chat room:", chatId);
    if (!socket.connected) {
      connectSocket();
    }

    // ✅ Room ID string mein bhejein
    socket.emit("join-chat", chatId.toString());

    // ✅ Purane messages receive karein
    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    // ✅ Naye messages receive karein
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-history");
      socket.off("receive-message");
    };
  }, [chatId]);

  const handleSend = () => {
    if (!input) return;

    socket.emit("send-message", {
      chat: chatId.toString(), // ✅ Room ID string mein
      content: input,
      role: "user", // User ka role
    });

    setInput("");
  };

  return (
    <div 
      className="chatting-container"
      onClick={() => setInputActive(false)}   
    >
      <div className="chatting-layout">
        <div className="chatting-main-panel">

          <div className="chat-messages-container">
            {messages.map((m, i) => (
              <p key={i} className={m.role === 'user' ? 'my-message' : 'other-message'}>
                <strong>{m.role === 'user' ? 'You' : 'Counsellor'}: </strong>
                {m.content}
              </p>
            ))}
          </div>

          <div 
            className={`chatting-input-box ${inputActive ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();            
              setInputActive(true);
            }}
          >
            <div className="chatting-input-field">
              <input 
                type="text" 
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              />
            </div>

            <div className="chatting-send-icon" onClick={handleSend}>
              <i className="ri-send-plane-fill"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chatting;