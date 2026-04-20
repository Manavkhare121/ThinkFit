import React from "react";
import "./ChatSidebar.css";

const ChatSidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) => {
  return (
    <div className="chat-right">
      <div className="new-add" onClick={onNewChat}>
        <div className="new-add-img">
          <i className="ri-add-line"></i>
        </div>
        <div className="new-chat">Add Chat</div>
      </div>
      <div className="chat-history-list">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`new-chat-show ${chat._id === activeChatId ? "active" : ""}`}
            onClick={() => onSelectChat(chat._id)}
          >
            <div className="message-icon">
              <i className="ri-chat-4-line"></i>
            </div>
            <div className="new-chat-show-text">
              <p>{chat.title || "New Chat"}</p>
            </div>
            <div
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat._id);
              }}
            >
              <i className="ri-delete-bin-line"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatSidebar;
