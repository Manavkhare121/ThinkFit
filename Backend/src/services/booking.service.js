import { Booking } from "../models/booking.model.js";
import ApiError from "../utils/ApiError.js";

export const createBookingService = async (userId, { problem, date }) => {
  if (!problem || !date) {
    throw new ApiError(400, "Problem and date required");
  }

  return await Booking.create({
    user: userId,
    problem,
    date,
  });
};

export const getUserBookingsService = async (id, role = "user") => {
  if (!id) return [];
  if (role === "user") {
    return await Booking.find({ user: id });
  } else if (role === "counsellor") {
    return await Booking.find({ counsellor: id }).populate("user", "username email");
  } else {
    return [];
  }
};

export const getAllBookingsService = async () => {
  return await Booking.find().populate("user", "username email");
};

export const updateBookingService = async (bookingId, data) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) throw new ApiError(404, "Booking not found");

  if (data.status) booking.status = data.status;
  if (data.time) booking.time = data.time;
  if (data.date) booking.date = data.date;

  await booking.save();

  return booking;
};