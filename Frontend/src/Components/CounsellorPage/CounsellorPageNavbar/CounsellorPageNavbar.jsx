import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import "./CounsellorPageNavbar.css";
import studentimage from "../../../assets/Student image.webp";
import CounsellorPageSidebar from "../../CounsellorPage/CounsellorPageSidebar/CounsellorPageSidebar.jsx";
import { Outlet, useLocation } from "react-router-dom";

import { Calendar, Clock, Users, BarChart3, TrendingUp } from "lucide-react";
const stats = [
  {
    title: "Today's Appointments",
    value: "6",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Pending Sessions",
    value: "3",
    trend: "down",
    icon: Clock,
  },
  {
    title: "Total Patients",
    value: "34",
    trend: "up",
    icon: Users,
  },
  {
    title: "This Week's Sessions",
    value: "18",
    trend: "up",
    icon: BarChart3,
  },
];


const CounsellorNavbarPage = () => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  const navigate=useNavigate()
const showDashboard = location.pathname === "/counsellor";

  return (
    <div className="counsellor-layout">
      <CounsellorPageSidebar extended={extended} setExtended={setExtended} />
      <div
        className={`counsellor-main-content ${
          extended
            ? "counsellor-sidebar-expanded"
            : "counsellor-sidebar-collapsed"
        }`}
      >
        <div className="counsellor-navbar">
          <div className="counsellor-navbar-icon">
            <img src={studentimage} alt="logo" />
          </div>
          <div className="counsellor-navbar-text">
            <p>About Us</p>
            <p>Guide</p>
             <p onClick={() => navigate("/login")}>Login</p>
            <div className="counsellor-signup">
              <p onClick={() => navigate("/Signup")}>SignUp</p>
            </div>
          </div>
        </div>

        <div className="page-content">
          <Outlet/>
          {showDashboard && (
            <div className="dashboard-page">

              <div className="dashboard-row">
                <div className="dashboard-cards">
                  {stats.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="dashboard-card">
                        <div className="dashboard-card-right">
                          <div className="dashboard-card-left">
                          <Icon className="icon" size={36} />
                        </div>
                          <p className="dashboard-card-title">{item.title}</p>
                          <p className="dashboard-card-number">{item.value}</p>
 
                          <span
                            className={`dashboard-card-subtext ${
                              item.trend === "up" ? "positive" : "negative"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                        
                      </div>
                    );
                  })}
                </div>

                <div className="below-section">
                  <div className="sessions-box">
                  <h2 className="sessions-title">Today's Sessions</h2>
                  <div className="sessions-list">
                    <div className="session-card">
                        <div className="session-box-item">
                          <div className="right-side-session-box">
                            <h3>Pending</h3>
                            <p>Stress Session</p>
                          </div>
                          <div className="left-side-session-box">
                            <span className="time">3:30 PM</span>
                            <span className="stage">02-06-2025</span>
                          </div>
                        </div>
                      </div>
                      <div className="session-card">
                        <div className="session-box-item">
                          <div className="right-side-session-box">
                            <h3>Pending</h3>
                            <p>Stress Session</p>
                          </div>
                          <div className="left-side-session-box">
                            <span className="time">3:30 PM</span>
                            <span className="stage">02-06-2025</span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    
                </div>
                <div className="insights-card">
                  <div className="insights-header">
                    <TrendingUp className="icon" size={22} />
                    <h3>This Week's Insights</h3>
                  </div>
                  <div className="insights-content">
                    <div className="insight-row">
                      <span>Improvement Rate</span>
                      <span>85%</span>
                    </div>
                    <div className="insight-row">
                      <span>Session Completion</span>
                      <span>94%</span>
                    </div>
                    <div className="insight-row">
                      <span>Patient Satisfaction</span>
                      <span>4.8/5</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounsellorNavbarPage;
