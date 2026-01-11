import React from "react";
import DashboardBanner from '../../../assets/Dashbord-banner.png';
import "./Dashboard.css";

const Dashboard = ({ darkMode }) => {
  return (
    <div className={`dashboard-page ${darkMode ? "dashboard-dark" : "dashboard-light"}`}>
      <img src={DashboardBanner} alt="Classroom" className="dashboard-banner" />

      <p className="dashboard-quote">
        "All data is 100% anonymous and aggregated to protect student privacy."
      </p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2 className="dashboard-card-number dashboard-blue">12,000+</h2>
          <p className="dashboard-card-title">Students Benefited</p>
          <small className="dashboard-card-subtext">
            Direct student wellness support.
          </small>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-number dashboard-green">100+</h2>
          <p className="dashboard-card-title">Counselors Connected</p>
          <small className="dashboard-card-subtext">
            Bridging students with many experts.
          </small>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-number dashboard-purple">8+</h2>
          <p className="dashboard-card-title">Languages Supported</p>
          <small className="dashboard-card-subtext">
            Multilingual accessibility across India.
          </small>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-number dashboard-red">100%</h2>
          <p className="dashboard-card-title">Anonymous Insights</p>
          <small className="dashboard-card-subtext">
            Secure, aggregated data for admins.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

