import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller.js";

import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyJWT,
  authorizeRoles("user"),
  createBooking
);

router.get(
  "/my",
  verifyJWT,
  authorizeRoles("user","counsellor"),
  getUserBookings
);

router.get(
  "/all",
  verifyJWT,
  authorizeRoles("counsellor","admin"),
  getAllBookings
);

router.put(
  "/update/:bookingId",
  verifyJWT,
  authorizeRoles("counsellor"),
  updateBooking
);

router.delete(
  "/delete/:bookingId",
  verifyJWT,
  authorizeRoles("user"), 
  deleteBooking
);


export default router;