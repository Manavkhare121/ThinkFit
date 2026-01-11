import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSidebar.css";
import dashboardicon from "../../../assets/Homepageicon.png";
import Logouticon from "../../../assets/Logouticon.png";
import themeicon from "../../../assets/themeicon.png";
import ThinkFitimage from "../../../assets/ThinkFitimage.png";
import settingIcon from "../../../assets/settingIcon.png";
import Booking from "../../../assets/Booking.png";
import Chatbot from "../../../assets/Chatbot.png";
import Guide from "../../../assets/Guideicon.png"

const UserSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`user-sidebar ${
        expanded ? "user-expanded" : "user-collapsed"
      }`}
    >
      <div
        className="user-sidebar-header"
        onClick={() => setExpanded(!expanded)}
      >
        <img src={ThinkFitimage} alt="logo" />
        {expanded && <h1>ThinkFit</h1>}
      </div>

      <div className="user-sidebar-body">
        <div className="user-sidebar-links">
          <div className="user-sidebar-item" onClick={() => navigate("/user")}>
            <img src={dashboardicon} alt="dashboard" />
            {expanded && <p>Dashboard</p>}
          </div>

          <div
            className="user-sidebar-item"
            onClick={() => navigate("/user/Chatbot")}
          >
            <img src={Chatbot} alt="chatbot" />
            {expanded && <p>Chatbot</p>}
          </div>

          <div
            className="user-sidebar-item"
            onClick={() => navigate("/user/appointment")}
          >
            <img src={Booking} alt="booking" />
            {expanded && <p> Appointment</p>}
          </div>

           <div className="user-sidebar-item"  onClick={() => navigate("/user/Resource")}>
            <img  src={Guide} alt="ResourcePage" height="5px" />
            {expanded && <p>Resources</p>}
          </div>

          <div className="user-sidebar-item">
            <img src={settingIcon} alt="settings" />
            {expanded && <p>Settings</p>}
          </div>
        </div>

        <div className="user-sidebar-footer">
          <div className="user-sidebar-theme">
            <img src={themeicon} alt="theme" />
            {expanded && <p>Dark Theme</p>}
          </div>
          <div
            className="user-sidebar-logout"
            onClick={() => navigate("/login")}
          >
            <img src={Logouticon} alt="logout" />
            {expanded && <p>Logout</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
