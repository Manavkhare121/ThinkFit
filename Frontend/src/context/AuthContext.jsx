import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useBooking = () => useContext(AuthContext);

// ✅ Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/booking",
  withCredentials: true,
});

// ✅ Token interceptor
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
  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/my"); 
      setBookings(response.data.data);
    } catch (error) {
      console.error("User bookings error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 2. ALL bookings (Admin / Counsellor only)
  const fetchAllBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/all");

      setBookings(response.data.data);
    } catch (error) {
      console.error("All bookings error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. CREATE booking (User only)
  const addBooking = async (problem, date) => {
    try {
      const response = await api.post("/create", { problem, date });

      setBookings((prev) => [...prev, response.data.data]);

      return response.data;
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  // ✅ 4. UPDATE booking (Admin / Counsellor)
  const updateBookingStatus = async (bookingId, updateData) => {
    try {
      const response = await api.put(`/update/${bookingId}`, updateData);

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? response.data.data : b))
      );
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const deleteBooking = async (id) => {
  try {
    await api.delete(`/delete/${id}`);

    setBookings((prev) => prev.filter((b) => b._id !== id));
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
  }
};

  return (
    <AuthContext.Provider
      value={{
        bookings,
        loading,
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