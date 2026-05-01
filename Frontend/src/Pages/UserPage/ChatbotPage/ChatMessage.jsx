import React, { useEffect, useRef } from "react";
import "./ChatMessage.css";

const ChatMessages = ({ messages, isSending }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={msg.id || `msg-${index}`}
          className={`chat-bubble ${msg.role}`}
        >
          {msg.content}
        </div>
      ))}

      {isSending && (
        <div className="chat-bubble ai typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatMessages;