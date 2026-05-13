import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './counsellorDetails.css';

// Agar yeh details database se aa rahi hain, toh as a prop receive kar lena. 
// Abhi ke liye hum isko direct likh rahe hain.
const CounsellorDetails = () => {
  const navigate = useNavigate();

  const handleStartChat = async () => {
    try {
      // 🚨 DHYAN DEIN: "counsellorId" ki jagah database se ek ASLI Counsellor ki _id copy karke daalna testing ke liye!
      // Jaise: "64b7f9d8e4b0c1a2b3c4d5e6"
      const counsellorId = "6a0250c77c95f1cca3971e14"; 

      console.log("Creating new chat...");

      // 1. Backend ko Nayi chat banane ki request bhejo
      const response = await axios.post(
        "http://localhost:3000/api/chat/create-message-chat", 
        { counsellorId: counsellorId },
        { withCredentials: true }
      );

      // 2. Backend nayi bani hui chat ki ASLI ID return karega
      const realChatId = response.data.chat._id;
      console.log("Nayi Chat ban gayi! ID hai:", realChatId);

      // 3. User ko successfully nayi Chat ID par bhej do!
      navigate(`/user/chatting/${realChatId}`);

    } catch (error) {
      console.error("Chat banane mein error aayi:", error);
      alert("Chat start nahi ho payi, console check karo.");
    }
  };

  return (
    <div className="counsellordetails-container">
      <div className="counsellordetails-card">
        <div className="counsellordetails-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Counsellor"
          />
        </div>
        <div className="counsellordetails-info">
          <h2>Dr. Priya Sharma</h2>
          <p>
            Professional Mental Health Counsellor with 5+ years of experience
            in stress management, anxiety counselling, and student guidance.
          </p>
          <div className="counsellordetails-extra">
            <span>Experience: 5 Years</span>
            <span>Specialist: Anxiety & Stress</span>
          </div>

          {/* ✅ YAHAN ONCLICK FUNCTION ADD KIYA HAI */}
          <button className="counsellordetails-btn" onClick={handleStartChat}>
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDetails;