import React, { useState, useEffect } from 'react';
import { useBooking } from "../../../context/AuthContext.jsx";
import "./CounsellorPageBooking.css";

const CounsellorPageBooking = () => {
  const { bookings, fetchAllBookings, updateBookingStatus } = useBooking();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  
  const [showStatusInput, setShowStatusInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleSelect = (b) => {
    setSelectedBooking(b);
    setStatus(b.status);
    setTime(b.time || "");
    setShowStatusInput(false);
    setShowTimeInput(false);
  };


  const handleUnselect = () => {
    setSelectedBooking(null);
    setStatus("");
    setTime("");
    setShowStatusInput(false);
    setShowTimeInput(false);
  };

  const handleSave = async () => {
    if (!selectedBooking) return alert("Pehle niche se ek booking select karein!");
    
    await updateBookingStatus(selectedBooking._id, { status, time });
    alert("Session Updated!");
    
    setShowStatusInput(false);
    setShowTimeInput(false);
    fetchAllBookings(); 
  };

  return (
    <>
    <div className="counsellor-dashboard" onClick={handleUnselect}>
      <div className="dashboard-session-container" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <h1>Session Status</h1>
        </div>

        <div className="dashboard-details">
          <div className="dashboard-details-left">
            
            <div className="dashboard-box">
              <h1>Session Name</h1>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => setShowStatusInput(!showStatusInput)}>
                <h1>Session Status</h1>
              </div>
              {showStatusInput && (
                <select 
                  className="dashboard-input"
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                </select>
              )}
            </div>

            <div className="dashboard-box">
              <h1>Session Date</h1>
            </div>


            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => setShowTimeInput(!showTimeInput)}>
                <h1>Session Time</h1>
              </div>
              {showTimeInput && (
                <input 
                  type="text"
                  className="dashboard-input"
                  placeholder="e.g. 10:00 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              )}
            </div>

          </div>

          <div className="dashboard-details-right">
            <div className="dashboard-button" onClick={handleSave}>
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>

      <div className="appointments-management-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Incoming Appointments</h2>
        {bookings.length === 0 ? (
          <p className="no-appointments-msg">No bookings yet.</p>
        ) : (
          bookings.map((b, i) => (
            <div 
              key={b._id || i} 
              className={`appointment-record-row ${selectedBooking?._id === b._id ? "active-row" : ""}`} 
              onClick={() => handleSelect(b)}
            >
              <div className="record-info">
                <p><strong>User:</strong> {b.user?.username}</p>
                <p><strong>Problem:</strong> {b.problem}</p>
                <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {b.status}</p>
                
                <p><strong>Time:</strong> {b.time || "Not Scheduled"}</p>
              </div>
              <div className="record-actions-area">
                <button className="select-action-btn">Select</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default CounsellorPageBooking;