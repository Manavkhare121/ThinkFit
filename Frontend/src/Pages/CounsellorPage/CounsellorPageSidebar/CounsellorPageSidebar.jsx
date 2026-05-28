import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./CounsellorPageSidebar.css";

import dashboardicon from "../../../assets/Homepageicon.png";

import Logouticon from "../../../assets/Logouticon.png";

import themeicon from "../../../assets/themeicon.png";

import ThinkFitimage from "../../../assets/ThinkFitimage.png";

import settingIcon from "../../../assets/settingIcon.png";

import Booking from "../../../assets/booking.png";

import message from '../../../assets/chatbot.png';

const BACKEND_URL =
  import.meta.env.VITE_API_BASE ||
  "https://thinkfit.onrender.com";

const CounsellorPageSidebar = () => {

  const [extended, setExtended] =
    useState(false);

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

      try {

        await axios.post(

          `${BACKEND_URL}/api/counsellors/logout`,

          {},

          {
            withCredentials: true,
          }

        );

        navigate("/");

      } catch (error) {

        console.error(
          "Error logging out:",
          error.response?.data ||
          error.message
        );

        navigate("/");

      }

    };

  return (

    <div
      className={`counsellor-sidebar ${
        extended
          ? "counsellor-expanded"
          : "counsellor-collapsed"
      }`}
    >

      <div
        className="counsellor-sidebar-header"
        onClick={() =>
          setExtended(!extended)
        }
      >

        <img
          src={ThinkFitimage}
          alt="logo"
        />

        {extended && <h1>ThinkFit</h1>}

      </div>

      <div className="counsellor-sidebar-body">

        <div className="counsellor-sidebar-links">

          <div
            className="counsellor-sidebar-item"
            onClick={() =>
              navigate("/counsellor")
            }
          >

            <img
              src={dashboardicon}
              alt="dashboard"
            />

            {extended && <p>Dashboard</p>}

          </div>

          <div
            className="counsellor-sidebar-item"
            onClick={() =>
              navigate("/counsellor/chatting")
            }
          >

            <img
              src={message}
              alt="chatting"
            />

            {extended && <p>Chatting</p>}

          </div>

          <div
            className="counsellor-sidebar-item"
            onClick={() =>
              navigate("/counsellor/booking")
            }
          >

            <img
              src={Booking}
              alt="booking"
            />

            {extended && <p>Session Status</p>}

          </div>

          <div className="counsellor-sidebar-item">

            <img
              src={settingIcon}
              alt="settings"
            />

            {extended && <p>Settings</p>}

          </div>

        </div>

        <div className="counsellor-sidebar-footer">

          <div className="counsellor-sidebar-theme">

            <img
              src={themeicon}
              alt="theme"
            />

            {extended && <p>Dark Theme</p>}

          </div>

          <div
            className="counsellor-sidebar-logout"
            onClick={handleLogout}
            style={{
              cursor: "pointer"
            }}
          >

            <img
              src={Logouticon}
              alt="logout"
            />

            {extended && <p>Logout</p>}

          </div>

        </div>

      </div>

    </div>

  );

};

export default CounsellorPageSidebar;