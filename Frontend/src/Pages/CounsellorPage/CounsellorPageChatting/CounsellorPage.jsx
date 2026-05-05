import React, { useState, useEffect } from 'react';
// ✅ connectSocket ko import kiya
import { socket, connectSocket } from "../../../Socket/socket.js";

const CounsellorPage = ({ chatId }) => {
  const [inputActive, setInputActive] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    // ✅ Agar socket disconnected hai, toh connect karein
    if (!socket.connected) {
      connectSocket();
    }

    socket.emit("join-chat", chatId.toString());

    // ✅ Purane messages
    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    // ✅ Naye messages
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
      chat: chatId.toString(), 
      content: input,
      role: "counsellor", // Counsellor ka role
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
               <p key={i} className={m.role === 'counsellor' ? 'my-message' : 'other-message'}>
                <strong>{m.role === 'counsellor' ? 'You' : 'User'}: </strong>
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
                placeholder="How Can I Help You..."
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

export default CounsellorPage;