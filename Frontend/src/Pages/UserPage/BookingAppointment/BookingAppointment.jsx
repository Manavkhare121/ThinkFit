import React, { useState } from "react";
import { useBooking } from "../../../context/AuthContext.jsx";
import "./BookingAppointment.css";
import { useNavigate } from "react-router-dom";

const BookingAppointment = () => {
  const { bookings, addBooking, updateBooking, deleteBooking } = useBooking();
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [showProblemInput, setShowProblemInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const navigate=useNavigate()

  const handleConfirm = () => {
    if (!problem || !date) return;

    if (editIndex !== null) {
      updateBooking(editIndex, problem, date);
      setEditIndex(null);
    } else {
      addBooking(problem, date);
    }

    setProblem("");
    setDate("");
    setShowProblemInput(false);
    setShowDateInput(false);
  };

  const handleEdit = (index) => {
    setProblem(bookings[index].problem);
    setDate(bookings[index].date);
    setEditIndex(index);
    setShowProblemInput(true);
    setShowDateInput(true);
  };

  return (
    <div className="booking-container">
      <div className="dashboard-session-container">
        <div className="dashboard-header"><h1>Session Status</h1></div>

        <div className="dashboard-details">
          <div className="dashboard-details-left">
            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => setShowProblemInput(!showProblemInput)}>
                <h1>Problem</h1>
              </div>
              {showProblemInput && (
                <input
                  type="text"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="dashboard-input"
                />
              )}
            </div>

            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => setShowDateInput(!showDateInput)}>
                <h1>Date</h1>
              </div>
              {showDateInput && (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="dashboard-input"
                />
              )}
            </div>
            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => navigate("/user/Chatting")}>
                <h1>Chatting</h1>
              </div>
              
            </div>
            <div className="dashboard-item">
              <div className="dashboard-box" onClick={() => navigate("/user/Chatting")}>
                <h1>Counsellor</h1>
              </div>
              
            </div>
          </div>

          <div className="dashboard-details-right">
            <div className="dashboard-button" onClick={handleConfirm}>
              <p>{editIndex !== null ? "Update" : "Confirm"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="booked-details">
        <h2>Booking Status</h2>
        {bookings.length === 0 ? (
          <p className="no-booking">No bookings yet.</p>
        ) : (
          bookings.map((b, i) => (
            <div key={i} className="booking-entry">
              <div>
                <p><strong>Problem:</strong> {b.problem}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Status:</strong>Pending</p>
              </div>
              <div className="booking-actions">
                <button className="edit-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteBooking(i)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingAppointment;

