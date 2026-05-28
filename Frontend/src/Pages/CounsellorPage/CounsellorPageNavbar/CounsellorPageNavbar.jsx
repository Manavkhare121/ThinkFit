import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import "./CounsellorPageNavbar.css";
import studentimage from "../../../assets/Student image.webp";
import CounsellorPageSidebar from "../../CounsellorPage/CounsellorPageSidebar/CounsellorPageSidebar.jsx";

import { Calendar, Clock, Users, BarChart3, TrendingUp } from "lucide-react";


import { useBooking } from "../../../context/AuthContext.jsx";

const CounsellorNavbarPage = () => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showDashboard = location.pathname === "/counsellor";

  const { bookings, fetchAllBookings } = useBooking();

  useEffect(() => {
    fetchAllBookings();
  }, []);


  const today = new Date().toDateString();

 
  const todayAppointments = bookings.filter(
    (b) => new Date(b.date).toDateString() === today
  );

  const pendingSessions = bookings.filter(
    (b) => b.status === "pending"
  );

  const totalPatients = bookings.length;

  const thisWeekSessions = bookings.filter((b) => {
    const bookingDate = new Date(b.date);
    const now = new Date();

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() - now.getDay() + 6);

    return bookingDate >= weekStart && bookingDate <= weekEnd;
  });

 
  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Pending Sessions",
      value: pendingSessions.length,
      trend: "down",
      icon: Clock,
    },
    {
      title: "Total Patients",
      value: totalPatients,
      trend: "up",
      icon: Users,
    },
    {
      title: "This Week's Sessions",
      value: thisWeekSessions.length,
      trend: "up",
      icon: BarChart3,
    },
  ];

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
            <p onClick={() => navigate("/Counsellorlogin")}>Login</p>

            <div className="counsellor-signup">
              <p onClick={() => navigate("/CounsellorSignup")}>SignUp</p>
            </div>
          </div>
        </div>

        
        <div className="page-content">
          <Outlet />

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

                        </div>
                      </div>
                    );
                  })}
                </div>

               
                <div className="below-section">

                 
                  <div className="sessions-box">
                    <h2 className="sessions-title">Today's Sessions</h2>

                    <div className="sessions-list">
                      {pendingSessions.length === 0 ? (
                        <p>No sessions today</p>
                      ) : (
                        pendingSessions.map((b) => (
                          <div key={b._id} className="session-card">
                            <div className="session-box-item">

                              
                              <div className="right-side-session-box">
                                <h3>{b.status}</h3> 
                                <p>{b.problem}</p>
                              </div>

                             
                              <div className="left-side-session-box">
                                <span className="time">
                                  {b.time || "Not Set"}
                                </span>

                                <span className="stage">
                                  {new Date(b.date).toLocaleDateString()}
                                </span>
                              </div>

                            </div>
                          </div>
                        ))
                      )}
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