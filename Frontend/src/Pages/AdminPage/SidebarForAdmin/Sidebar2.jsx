import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar2.css";
import dashboardicon from "../../../assets/Homepageicon.png";
import Logouticon from "../../../assets/Logouticon.png";
import themeicon from "../../../assets/themeicon.png";
import ThinkFitimage from "../../../assets/ThinkFitimage.png";
import settingIcon from "../../../assets/settingIcon.png";
import Booking from "../../../assets/booking.png";


const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/admin/logout", // Adjust '/api/admin' to match your Express app.use path
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/"); // Adjust this to your actual login route
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
      navigate("/");
    }
  };

  return (
    <div className={`sidebar ${extended ? "expanded" : "collapsed"}`}>
      <div className="first" onClick={() => setExtended(!extended)}>
        <img src={ThinkFitimage} alt="logo" />
        {extended && <h1>ThinkFit</h1>}
      </div>

      <div className="second">
        <div className="second-first">
          <div className="image1" onClick={() => navigate("/Admin")}>
            <img src={dashboardicon} alt="" />
            {extended && <p>Dashboard</p>}
          </div>

          <div className="image1" onClick={() => navigate("Adding")}>
            <img src={Booking} alt="" />
            {extended && <p>Booking Status</p>}
          </div>
          <div className="image1">
            <img src={settingIcon} alt="" />
            {extended && <p>Settings</p>}
          </div>
        </div>

        <div className="second-second">
          <div className="theme">
            <img src={themeicon} alt="" />
            {extended && <p>Dark Theme</p>}
          </div>
          <div 
            className="image2" 
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <img src={Logouticon} alt="" />
            {extended && <p>Logout</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;