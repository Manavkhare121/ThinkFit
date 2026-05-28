import React, { createContext, useContext, useState } from "react";

import axios from "axios";

const AuthContext = createContext();

export const useBooking = () => useContext(AuthContext);

const api = axios.create({
  baseURL: `${
    import.meta.env.VITE_API_BASE || "https://thinkfit.onrender.com"
  }/api`,

  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [counts, setCounts] = useState({
    students: 0,
    counsellors: 0,
  });

  const fetchGlobalStats = async () => {
    try {
      const [userRes, counsellorRes] = await Promise.all([
        api.get("/users/count"),

        api.get("/counsellor/count"),
      ]);

      setCounts({
        students: userRes.data?.data?.totalUsers || 0,

        counsellors: counsellorRes.data?.data?.totalCounsellors || 0,
      });
    } catch (error) {
      console.error("Stats error:", error.response?.data || error.message);
    }
  };

  const fetchUserBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/booking/my");

      setBookings(response.data.data);
    } catch (error) {
      console.error("User bookings error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/booking/all");

      setBookings(response.data.data);
    } catch (error) {
      console.error("All bookings error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (problem, date) => {
    try {
      const response = await api.post("/booking/create", {
        problem,
        date,
      });

      setBookings((prev) => [...prev, response.data.data]);

      return response.data;
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const updateBookingStatus = async (bookingId, updateData) => {
    try {
      const response = await api.put(
        `/booking/update/${bookingId}`,
        updateData,
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? response.data.data : b)),
      );
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/booking/delete/${id}`);

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        bookings,

        loading,

        counts,

        fetchGlobalStats,

        fetchUserBookings,

        fetchAllBookings,

        addBooking,

        updateBookingStatus,

        deleteBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
