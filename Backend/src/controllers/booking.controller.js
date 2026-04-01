import {
  createBookingService,
  getUserBookingsService,
  getAllBookingsService,
  updateBookingService,
} from "../services/booking.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.user._id, req.body);

  res.status(201).json(new ApiResponse(200, booking, "Booking created"));
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await getUserBookingsService(req.user._id);

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