import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Counsellor } from "../models/counsellor.models.js";
import { Admin } from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized request - Token missing");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken?._id || !decodedToken?.role) {
      throw new ApiError(401, "Invalid Access Token");
    }

    let userData = null;

    if (decodedToken.role === "user") {
      userData = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      req.user = userData;
    }

    else if (decodedToken.role === "counsellor") {
      userData = await Counsellor.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      req.counsellor = userData;
    }

    else if (decodedToken.role === "admin") {
      userData = await Admin.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      req.admin = userData;
    }

    if (!userData) {
      throw new ApiError(401, "Invalid Access Token");
    }

    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    let currentRole = null;

    // detect role based on your existing req structure
    if (req.user) currentRole = "user";
    else if (req.counsellor) currentRole = "counsellor";
    else if (req.admin) currentRole = "admin";

    console.log("USER:", req.user);
console.log("COUNSELLOR:", req.counsellor);
console.log("ADMIN:", req.admin);
console.log("ROLE DETECTED:", currentRole);

if (!roles.includes(currentRole)) {
  throw new ApiError(403, "Access denied");
}
    if (!currentRole) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(currentRole)) {
      throw new ApiError(403, "Access denied");
    }
  
    next();
  };
};