import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import studentimage from "../../../assets/Student image.webp";
import Sidebar from "../SidebarForAdmin/Sidebar2";
import admin from "../../../assets/admin.png";

const Navbar = () => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const showDashboard = location.pathname === "/Admin";

  return (
    <div className="layout">
      <Sidebar extended={extended} setExtended={setExtended} />

      <div
        className={`main-content ${
          extended ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
        
        <div className="navbar">
          <div className="navbar-icon">
            <img src={studentimage} alt="logo" />
          </div>

          <div className="navbar-text">
            <p>About Us</p>
            <p>Guide</p>
            <p onClick={() => navigate("/AdminLogin")}>Login</p>
            <div className="signup">
              <p onClick={() => navigate("/AdminSignup")}>SignUp</p>
            </div>
          </div>
        </div>
        <div className="AdminDashboardpages">
          <Outlet />

          {showDashboard && (
            <div className="dashboard-page">
              <img
                src={admin}
                alt="Classroom"
                className="dashboard-banner"
              />
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <h2 className="dashboard-card-number dashboard-blue">
                    12,000+
                  </h2>
                  <p className="dashboard-card-title">Students Benefited</p>
                  <small className="dashboard-card-subtext">
                    Direct student wellness support.
                  </small>
                </div>

                <div className="dashboard-card">
                  <h2 className="dashboard-card-number dashboard-green">
                    100+
                  </h2>
                  <p className="dashboard-card-title">Counselors Connected</p>
                  <small className="dashboard-card-subtext">
                    Bridging students with many experts.
                  </small>
                </div>

                <div className="dashboard-card">
                  <h2 className="dashboard-card-number dashboard-purple">
                    8+
                  </h2>
                  <p className="dashboard-card-title">Languages Supported</p>
                  <small className="dashboard-card-subtext">
                    Multilingual accessibility across India.
                  </small>
                </div>

                <div className="dashboard-card">
                  <h2 className="dashboard-card-number dashboard-red">
                    100%
                  </h2>
                  <p className="dashboard-card-title">Anonymous Insights</p>
                  <small className="dashboard-card-subtext">
                    Secure, aggregated data for admins.
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
