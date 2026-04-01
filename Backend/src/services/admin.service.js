import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { Counsellor } from "../models/counsellor.models.js";

export const getAdminDashboardService = async () => {
 
  const totalStudents = await Booking.distinct("user");

  const bookings = await Booking.find();
  const statusCount = {
    pending: 0,
    approved: 0,
    completed: 0,
  };

  bookings.forEach((b) => {
    statusCount[b.status]++;
  });

  const sessionNames = bookings.map((b) => b.problem);

  const totalCounsellors = await Counsellor.countDocuments();

  return {
    totalStudents: totalStudents.length,
    totalSessions: bookings.length,
    sessionNames,
    statusCount,
    totalCounsellors,
  };
};