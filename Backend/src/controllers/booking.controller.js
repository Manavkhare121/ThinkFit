import {
  createBookingService,
  getUserBookingsService,
  getAllBookingsService,
  updateBookingService,
} from "../services/booking.service.js";
import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.user._id, req.body);

  res.status(201).json(new ApiResponse(200, booking, "Booking created"));
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const id = req.user?._id || req.counsellor?._id;
  const role = req.user ? "user" : req.counsellor ? "counsellor" : null;

  const bookings = await getUserBookingsService(id, role);

  res.status(200).json(new ApiResponse(200, bookings));
});

export const getAllBookings = asyncHandler(async (areq, res) => {
  const bookings = await getAllBookingsService();

  res.status(200).json(new ApiResponse(200, bookings));
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await updateBookingService(
    req.params.bookingId,
    req.body
  );

  res.status(200).json(new ApiResponse(200, booking, "Updated"));
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to delete this booking");
  }

  await booking.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Booking deleted"));
});