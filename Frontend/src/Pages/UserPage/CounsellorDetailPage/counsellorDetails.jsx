import React from 'react';

import {
  useNavigate
} from 'react-router-dom';

import axios from 'axios';

import './counsellorDetails.css';

const BACKEND_URL =
  import.meta.env.VITE_API_BASE ||
  "https://thinkfit.onrender.com";

const CounsellorDetails = () => {

  const navigate = useNavigate();

  const counsellors = [

    {
      _id: "6a0250c77c95f1cca3971e14",

      name: "Dr. Priya Sharma",

      image:
        "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",

      description:
        "Professional Mental Health Counsellor with expertise in anxiety and stress management.",

      experience: "5 Years",

      specialist: "Anxiety & Stress",
    },

    {
      _id: "6a0250c77c95f1cca3971e15",

      name: "Dr. Rahul Verma",

      image:
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",

      description:
        "Expert in relationship counselling, emotional wellbeing, and youth guidance sessions.",

      experience: "7 Years",

      specialist: "Relationship Therapy",
    },

    {
      _id: "6a0250c77c95f1cca3971e16",

      name: "Dr. Sneha Kapoor",

      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",

      description:
        "Certified career and life coach helping students overcome pressure and confusion.",

      experience: "4 Years",

      specialist: "Career Counselling",
    },

  ];

  const handleStartChat = async (
    counsellorId
  ) => {

    try {

      const response =
        await axios.post(

          `${BACKEND_URL}/api/chat/create-message-chat`,

          {
            counsellorId
          },

          {
            withCredentials: true
          }

        );

      const realChatId =
        response.data.chat._id;

      navigate(
        `/user/chatting/${realChatId}`
      );

    }

    catch (error) {

      console.error(
        "Error creating chat:",
        error
      );

      alert(
        "Chat start nahi ho payi"
      );

    }

  };

  return (

    <div className="counsellordetails-container">

      <div className="counsellordetails-grid">

        {
          counsellors.map((counsellor) => (

            <div

              className="counsellordetails-card"

              key={counsellor._id}

            >

              <div className="counsellordetails-image">

                <img

                  src={counsellor.image}

                  alt={counsellor.name}

                />

              </div>

              <div className="counsellordetails-info">

                <h2>

                  {counsellor.name}

                </h2>

                <p>

                  {
                    counsellor.description
                  }

                </p>

                <div className="counsellordetails-extra">

                  <span>

                    Experience :
                    {" "}
                    {
                      counsellor.experience
                    }

                  </span>

                  <span>

                    Specialist :
                    {" "}
                    {
                      counsellor.specialist
                    }

                  </span>

                </div>

                <div className="button-end">

                  <button

                    className="counsellordetails-btn"

                    onClick={() =>
                      handleStartChat(
                        counsellor._id
                      )
                    }

                  >

                    Start Chat

                  </button>

                  <button

                    onClick={() =>
                      navigate(
                        "/user/CounsellorHistory"
                      )
                    }

                    className="counsellordetails-btn"
                  >

                    View Previous Chats

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

};

export default CounsellorDetails;