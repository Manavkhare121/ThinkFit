import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { socket, connectSocket } from "../../../Socket/socket.js";
// CSS import agar zaroorat ho toh add kar lena
// import './Chatting.css';

const CounsellorPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  // === STATE FOR CHAT LIST ===
  const [chats, setChats] = useState([]);

  // === STATE FOR ACTIVE CHAT ===
  const [inputActive, setInputActive] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // 1️⃣ Effect: Fetch chat list when NO chatId is present
  useEffect(() => {
    if (!chatId) {
      // 🚨 APNA BACKEND URL CHECK KARKE YAHAN DAALO
      axios.get("http://localhost:3000/api/chat/", { withCredentials: true })
        .then(res => setChats(res.data.chats))
        .catch(err => console.error("Error fetching chats:", err));
    }
  }, [chatId]);

  // 2️⃣ Effect: Handle Socket connection when chatId IS present
  useEffect(() => {
    if (!chatId || chatId === ":chatId") return; 

  console.log("Joining chat room:", chatId);

    if (!socket.connected) {
      connectSocket();
    }

    const joinRoom = () => {
      socket.emit("join-chat", chatId.toString());
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
    }

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect", joinRoom);
      socket.off("chat-history");
      socket.off("receive-message");
    };
  }, [chatId]);

  // Send Message Logic
  const handleSend = () => {
    if (!input.trim() || !chatId) return;

    socket.emit("send-message", {
      chat: chatId.toString(),
      content: input.trim(),
      role: "counsellor",
    });

    setInput("");
  };

  // ==========================================
  // 🟢 VIEW 1: Show Chat List (If no chatId)
  // ==========================================
  if (!chatId) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Select a User to Chat</h2>
        {chats.length === 0 ? (
          <p>No active chats found...</p>
        ) : (
          chats.map(chat => (
            <div 
              key={chat._id} 
              onClick={() => navigate(`/counsellor/chatting/${chat._id}`)}
              style={{ 
                padding: "15px", 
                borderBottom: "1px solid #444", 
                cursor: "pointer",
                backgroundColor: "#2c2c2c",
                marginBottom: "10px",
                borderRadius: "8px"
              }}
            >
              <h4 style={{ margin: "0 0 5px 0" }}>Chat ID: {chat._id}</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#aaa" }}>
                Click here to join the session
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  // ==========================================
  // 🔵 VIEW 2: Show Chatting UI (If chatId exists)
  // ==========================================
  return (
    <div
      className="chatting-container"
      onClick={() => setInputActive(false)}
    >
      <div className="chatting-layout">
        <div className="chatting-main-panel">
          
          {/* Back Button added for convenience */}
          <div style={{ padding: "10px", backgroundColor: "#333", borderBottom: "1px solid #444" }}>
            <button 
              onClick={() => navigate("/counsellor/chatting")}
              style={{ padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
            >
              ⬅ Back to Chat List
            </button>
            <span style={{ marginLeft: "15px", color: "white" }}>Room: {chatId}</span>
          </div>

          <div className="chat-messages-container">
            {messages.map((m, i) => (
              <p
                key={i}
                className={m.role === 'counsellor' ? 'my-message' : 'other-message'}
              >
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