import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import axios from 'axios';

import { socket, connectSocket } from "../../../Socket/socket.js";

import './CounsellorPage.css';

const BACKEND_URL =
  import.meta.env.VITE_API_BASE ||
  "https://thinkfit.onrender.com";

const CounsellorPage = () => {

  const { chatId } = useParams();

  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  const [inputActive, setInputActive] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    if (!chatId) {

      axios
        .get(
          `${BACKEND_URL}/api/chat/human-chats`,
          {
            withCredentials: true
          }
        )

        .then((res) => {
          setChats(res.data.chats);
        })

        .catch((err) => {
          console.error("Error fetching chats:", err);
        });
    }

  }, [chatId]);

  useEffect(() => {

    if (!chatId || chatId === ":chatId") return;

    console.log("Joining chat room:", chatId);

    if (!socket.connected) {
      connectSocket();
    }

    const joinRoom = () => {
      socket.emit(
        "join-chat",
        chatId.toString()
      );
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on(
        "connect",
        joinRoom
      );
    }

    socket.on(
      "chat-history",
      (history) => {
        setMessages(history);
      }
    );

    socket.on(
      "receive-message",
      (msg) => {
        setMessages((prev) => [
          ...prev,
          msg
        ]);
      }
    );

    return () => {

      socket.off(
        "connect",
        joinRoom
      );

      socket.off("chat-history");

      socket.off("receive-message");

    };

  }, [chatId]);

  const handleSend = () => {

    if (
      !input.trim() ||
      !chatId
    ) return;

    socket.emit(
      "send-message",
      {
        chat: chatId.toString(),
        content: input.trim(),
        role: "counsellor",
      }
    );

    setInput("");

  };

  if (!chatId) {

    return (

      <div className="chatting-container">

        <div className="chatting-layout">

          <div className="chatting-sidebar-panel">

            <h2 className="chatting-title">
              Active Chats
            </h2>

            {
              chats.length === 0 ? (

                <p className="chatting-empty-text">
                  No active chats found...
                </p>

              ) : (

                chats.map((chat) => (

                  <div
                    key={chat._id}
                    className="chatting-history-card"
                    onClick={() =>
                      navigate(
                        `/counsellor/chatting/${chat._id}`
                      )
                    }
                  >

                    <h4>
                      Chat Session
                    </h4>

                    <p>
                      ID : {chat._id}
                    </p>

                    <span>
                      Click to open conversation
                    </span>

                  </div>

                ))

              )
            }

          </div>

        </div>

      </div>

    );

  }

  return (

    <div
      className="chatting-container"
      onClick={() =>
        setInputActive(false)
      }
    >

      <div className="chatting-layout">

        <div className="chatting-main-panel">

          <div className="chatting-header">

            <span className="chatting-room-id">
              Room : {chatId}
            </span>

            <button
              className="chatting-back-btn"
              onClick={() =>
                navigate("/counsellor/chatting")
              }
            >
              Back to Chat List
            </button>

          </div>

          <div className="chat-messages-container">

            {
              messages.map((m, i) => (

                <div
                  key={i}
                  className={
                    m.role === "counsellor"
                      ? "my-message"
                      : "other-message"
                  }
                >

                  <strong>

                    {
                      m.role === "counsellor"
                        ? "You"
                        : "User"
                    }
                    :

                  </strong>

                  <p>
                    {m.content}
                  </p>

                </div>

              ))
            }

          </div>

          <div
            className={`chatting-input-box ${
              inputActive
                ? "active"
                : ""
            }`}

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
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSend()
                }
              />

            </div>

            <div
              className="chatting-send-icon"
              onClick={handleSend}
            >

              <i className="ri-send-plane-fill"></i>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CounsellorPage;