import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thinkfit-1.onrender.com",
      "https://thinkfit.onrender.com",
    ],
    credentials: true,
  })
);

import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

import CounsellorRoutes from "./routes/counsellor.routes.js";
app.use("/api/counsellor", CounsellorRoutes);

import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

import chatroutes from "./routes/chat.routes.js";
app.use("/api/chat", chatroutes);

import bookingRoutes from "./routes/booking.routes.js";
app.use("/api/booking", bookingRoutes);

export default app;