import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking
} from "../controllers/booking.controller.js";

import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();


// =========================
// 👤 USER ROUTES
// =========================
router.post(
  "/create",
  verifyJWT,
  authorizeRoles("user"),
  createBooking
);

router.get(
  "/my",
  verifyJWT,
  authorizeRoles("user"),
  getUserBookings
);


// =========================
// 🧑‍⚕️ COUNSELLOR ROUTES
// =========================

router.get(
  "/all",
  verifyJWT,
  authorizeRoles("counsellor"),
  getAllBookings
);

router.put(
  "/update/:bookingId",
  verifyJWT,
  authorizeRoles("counsellor"),
  updateBooking
);


export default router;