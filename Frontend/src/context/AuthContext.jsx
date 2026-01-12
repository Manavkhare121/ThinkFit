
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [sessions, setSessions] = useState([]);

  const addBooking = (problem, date) => {
    setBookings([...bookings, { problem, date }]);
  };

  const updateBooking = (index, problem, date) => {
    const updated = [...bookings];
    updated[index] = { problem, date };
    setBookings(updated);
  };

  const deleteBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  const addSession = (session) => {
    setSessions([...sessions, session]);
  };

  const updateSession = (index, session) => {
    const updated = [...sessions];
    updated[index] = session;
    setSessions(updated);
  };

  const deleteSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
        sessions,
        addSession,
        updateSession,
        deleteSession
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
