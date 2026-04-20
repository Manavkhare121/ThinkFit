import React from "react";
import "./ChatComposer.css";

const ChatComposer = ({ input, setInput, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) onSend();
    }
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="How Can I Help You..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      <div className="search-img" onClick={onSend}>
        <i className="ri-send-plane-fill"></i>
      </div>
    </>
  );
};

export default ChatComposer;