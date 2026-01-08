import React from 'react';
import "./CounsellorPageBooking.css";

const CounsellorPageBooking = () => {
  return (
    <>
    <div className="counsellor-dashboard">

      <div className="dashboard-session-container">
        <div className="dashboard-header">
          <h1>Session Status</h1>
        </div>

        <div className="dashboard-details">
          <div className="dashboard-details-left">
            <div className="dashboard-box">
              <h1>Session Name</h1>
            </div>
            <div className="dashboard-box">
              <h1>Session Status</h1>
            </div>
            <div className="dashboard-box">
              <h1>Session Date</h1>
            </div>
             <div className="dashboard-box">
              <h1>Session Time</h1>
            </div>
          </div>

          <div className="dashboard-details-right">
            <div className="dashboard-button">
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CounsellorPageBooking;
