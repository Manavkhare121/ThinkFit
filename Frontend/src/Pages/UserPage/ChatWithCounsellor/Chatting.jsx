import React, { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import "./Chatting.css";

import { socket, connectSocket } from "../../../Socket/socket.js";

const Chatting = () => {
  const { chatId } = useParams();

  const [inputActive, setInputActive] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [chatInfo, setChatInfo] = useState(null);

  // =========================
  // GET CHAT INFO
  // =========================

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/chat/single/${chatId}`,

        {
          withCredentials: true,
        },
      )

      .then((res) => {
        setChatInfo(res.data.chat);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [chatId]);

  // =========================
  // SOCKET CHAT
  // =========================

  useEffect(() => {
    if (!chatId || chatId === ":chatId") return;

    console.log("Joining chat room:", chatId);

    if (!socket.connected) {
      connectSocket();
    }

    socket.emit("join-chat", chatId.toString());

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-history");

      socket.off("receive-message");
    };
  }, [chatId]);

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSend = () => {
    if (!input) return;

    socket.emit("send-message", {
      chat: chatId.toString(),

      content: input,

      role: "user",
    });

    setInput("");
  };

  

  const otherUser = chatInfo?.users?.find(
    (u) => u._id !== localStorage.getItem("userId"),
  );

  return (
    <div className="chatting-container" onClick={() => setInputActive(false)}>
      <div className="chatting-layout">
        <div className="chatting-main-panel">
         

          <h2 className="chat-user-name">{otherUser?.name}</h2>


          <div className="chat-messages-container">
            {messages.map((m, i) => (
              <p
                key={i}
                className={m.role === "user" ? "my-message" : "other-message"}
              >
                <strong>{m.role === "user" ? "You" : "Counsellor"}:</strong>{" "}
                {m.content}
              </p>
            ))}
          </div>

          

          <div
            className={`chatting-input-box ${inputActive ? "active" : ""}`}
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
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
