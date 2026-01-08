import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CounsellorPageSidebar.css";
import dashboardicon from "../../../assets/Homepageicon.png";
import Logouticon from "../../../assets/Logouticon.png";
import themeicon from "../../../assets/themeicon.png";
import ThinkFitimage from "../../../assets/ThinkFitimage.png";
import settingIcon from "../../../assets/settingIcon.png";
import Booking from "../../../assets/Booking.png"
import message from '../../../assets/chatbot.png'

const CounsellorPageSidebar = () => {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`counsellor-sidebar ${
        extended ? "counsellor-expanded" : "counsellor-collapsed"
      }`}
    >
      <div
        className="counsellor-sidebar-header"
        onClick={() => setExtended(!extended)}
      >
        <img src={ThinkFitimage} alt="logo" />
        {extended && <h1>ThinkFit</h1>}
      </div>

      <div className="counsellor-sidebar-body">
        <div className="counsellor-sidebar-links">
          <div
            className="counsellor-sidebar-item"
            onClick={() => navigate("/counsellor")}
          >
            <img src={dashboardicon} alt="dashboard" />
            {extended && <p>Dashboard</p>}
          </div>
          <div
            className="counsellor-sidebar-item"
            onClick={() => navigate("/counsellor/chatting")}
          >
            <img src={message} alt="dashboard" />
            {extended && <p>Chatting</p>}
          </div>
          <div
            className="counsellor-sidebar-item"
            onClick={()=>navigate("/counsellor/booking")}
            
          >
            <img src={Booking} alt="booking" />
            {extended && <p>Session Status</p>}
          </div>

          <div className="counsellor-sidebar-item">
            <img src={settingIcon} alt="settings" />
            {extended && <p>Settings</p>}
          </div>
        </div>

        <div className="counsellor-sidebar-footer">
          <div className="counsellor-sidebar-theme">
            <img src={themeicon} alt="theme" />
            {extended && <p>Dark Theme</p>}
          </div>
          <div className="counsellor-sidebar-logout" onClick={() => navigate("/login")}>
            <img src={Logouticon} alt="logout" />
            {extended && <p>Logout</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorPageSidebar;
