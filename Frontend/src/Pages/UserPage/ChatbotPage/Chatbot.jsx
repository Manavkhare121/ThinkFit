import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { startNewChat, selectChat, setInput, sendingStarted, sendingFinished, setChats, deleteChat } from '../../../store/chatSlice.js';
import './Chatbot.css';

import ChatSidebar from './ChatSidebar.jsx';
import ChatMessages from './ChatMessage.jsx';
import ChatComposer from './ChatComposer.jsx';

const BACKEND_URL = 'http://localhost:3000';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { chats, activeChatId, input, isSending } = useSelector(state => state.chat);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/chat`, { withCredentials: true })
      .then(res => dispatch(setChats(res.data.chats.reverse())))
      .catch(err => console.error(err));

    const tempSocket = io(BACKEND_URL, { withCredentials: true });
    tempSocket.on('ai-response', (payload) => {
      setMessages(prev => [...prev, { role: 'ai', content: payload.content, id: Date.now() }]);
      dispatch(sendingFinished());
    });
    setSocket(tempSocket);
    return () => tempSocket.disconnect();
  }, [dispatch]);

  const getMessages = async (chatId) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/chat/messages/${chatId}`, { withCredentials: true });
      setMessages(res.data.messages.map(m => ({ id: m._id, role: m.role, content: m.content })));
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = () => {
    if (!input.trim() || !activeChatId || isSending) return;
    dispatch(sendingStarted());
    setMessages(prev => [...prev, { role: 'user', content: input.trim(), id: Date.now() }]);
    socket.emit('ai-message', { chat: activeChatId, content: input.trim() });
    dispatch(setInput(''));
  };

  const handleDeleteChat = async (id) => {
    if (!window.confirm("Delete Chat?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/chat/${id}`, { withCredentials: true });
      dispatch(deleteChat(id));
      if (activeChatId === id) setMessages([]);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="chatbot-navbar">
      <div className="chat-contain">
        <div className="chat-left">
          {activeChatId ? (
            <ChatMessages messages={messages} isSending={isSending} />
          ) : (
            <div className="text-part-details">
              <h1>Welcome To Aurora</h1>
              <p>Leading to healthier and happier lives</p>
            </div>
          )}
          <div ref={searchRef} className={`search-box ${active ? 'active' : ''}`} onClick={() => setActive(true)}>
             {activeChatId && <ChatComposer input={input} setInput={(v) => dispatch(setInput(v))} onSend={handleSendMessage} />}
          </div>
        </div>
        <ChatSidebar 
          chats={chats} 
          activeChatId={activeChatId} 
          onSelectChat={(id) => { dispatch(selectChat(id)); getMessages(id); }} 
          onNewChat={async () => {
            let t = window.prompt('Title:');
            if (t) {
              const res = await axios.post(`${BACKEND_URL}/api/chat`, { title: t }, { withCredentials: true });
              dispatch(startNewChat(res.data.chat));
              setMessages([]);
            }
          }}
          onDeleteChat={handleDeleteChat}
        />
      </div>
    </div>
  );
};

export default Chatbot;