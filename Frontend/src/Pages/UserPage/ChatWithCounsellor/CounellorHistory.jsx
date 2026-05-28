import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "./CounsellorHistory.css";

const BACKEND_URL =
  import.meta.env.VITE_API_BASE ||
  "https://thinkfit.onrender.com";

const CounsellorHistory = () => {

  const [chats, setChats] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    axios.get(

      `${BACKEND_URL}/api/chat/human-chats`,

      {
        withCredentials: true
      }

    )

    .then((res) => {

      console.log(res.data);

      setChats(res.data.chats);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);


  return (

    <div className="counsellorhistory-container">

      <h1 className="counsellorhistory-title">

        Previous Counsellor Chats

      </h1>


      <div className="counsellorhistory-list">

        {
          chats.length > 0 ? (

            chats.map((chat, index) => {

              return (

                <div

                  key={chat._id}

                  className="counsellorhistory-card"

                  onClick={() =>

                    navigate(
                      `/user/chatting/${chat._id}`
                    )

                  }

                >

                  <div className="counsellorhistory-left">

                    <div className="counsellorhistory-image">

                      <img

                        src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"

                        alt="Counsellor"

                      />

                    </div>


                    <div className="counsellorhistory-details">

                      <h3 className="counsellorhistory-name">

                        Counsellor Chat {index + 1}

                      </h3>

                      <p className="counsellorhistory-message">

                        Click to continue chat

                      </p>

                    </div>

                  </div>


                  <div className="counsellorhistory-time">

                    Old Chat

                  </div>

                </div>

              );

            })

          ) : (

            <div className="counsellorhistory-empty">

              No Previous Chats Found

            </div>

          )
        }

      </div>

    </div>

  );

};

export default CounsellorHistory;