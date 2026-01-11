import React, { useState } from 'react';
import './UserNavbar.css';
import userimage from '../../../assets/Student image.webp';
import UserSidebar from "../../UserPage/UserSidebar/UserSidebar";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Banner from "../../../assets/MainPoster.png";

const UserNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showDashboard = location.pathname === "/user";

  return (
    <>
      <div className="user-layout">
        <UserSidebar expanded={expanded}  setExpanded={setExpanded} />

        <div
          className={`user-main-content ${
            expanded ? "user-sidebar-expanded" : "user-sidebar-collapsed"
          }`}
        >
          {/* Top Navbar */}
          <div className="user-navbar">
            <div className="user-navbar-icon">
              <img src={userimage} alt="logo" />
            </div>

            <div className="user-navbar-text">
              <p>About Us</p>
              <p>Guide</p>

              <p onClick={() => navigate("/login")}>Login</p>

              <div className="user-signup">
                <p onClick={() => navigate("/Signup")}>SignUp</p>
              </div>
            </div>
          </div>

          
          <div className="UserDashboardpages">

          
            <Outlet/>
            {showDashboard && (
              <div className="user-dashboard">
                <img src={Banner} alt="Classroom" className="user-banner" />

                

                <div className="user-cards">
                  <div className="user-card">
                    <h2 className="user-card-number user-blue">12,000+</h2>
                    <p className="user-card-title">Students Benefited</p>
                    <small className="user-card-subtext">Direct student wellness support.</small>
                  </div>

                  <div className="user-card">
                    <h2 className="user-card-number user-green">100+</h2>
                    <p className="user-card-title">Counselors Connected</p>
                    <small className="user-card-subtext">Bridging students with experts.</small>
                  </div>

                  <div className="user-card">
                    <h2 className="user-card-number user-purple">8+</h2>
                    <p className="user-card-title">Languages Supported</p>
                    <small className="user-card-subtext">Multilingual accessibility across India.</small>
                  </div>

                  <div className="user-card">
                    <h2 className="user-card-number user-red">100%</h2>
                    <p className="user-card-title">Anonymous Insights</p>
                    <small className="user-card-subtext">Secure, aggregated data for admins.</small>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
