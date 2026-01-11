import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const Chatbot = () => {
  const [active, setActive] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="chatbot-navbar">
      <div className="chat-contain">
        <div className="text-part">
          <h1>Welcome To Our AI Therapist</h1>
          <p>leading to healthier, happier, and more productive lives</p>
        </div>

        <div className="chat-left">
          <div
            ref={searchRef}
            className={`search-box ${active ? 'active' : ''}`}
            onClick={() => setActive(true)}
          >
            <div className="search">
              <input type="text" placeholder="How Can I Help You..." />
            </div>
            <div className="search-img">
              <i className="ri-send-plane-fill"></i>
            </div>
          </div>
        </div>

        <div className="chat-right">
          <div className="new-add">
            <div className="new-add-img">
              <i className="ri-add-line"></i>
            </div>
            <div className="new-chat">Add Chat</div>
          </div>

          <div className="new-chat-show">
            <div className="message-icon">
              <i className="ri-chat-4-line"></i>
            </div>
            <div className="new-chat-show-text">
              <p>New Chat</p>
            </div>
            <div className="delete-icon">
              <i className="ri-delete-bin-line"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chatbot;
