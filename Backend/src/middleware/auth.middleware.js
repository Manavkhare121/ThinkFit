import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Counsellor } from "../models/counsellor.models.js";
import { Admin } from "../models/admin.model.js";
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

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});


export const verifyCounsellorJWT = asyncHandler(async (req, _, next) => {

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

    const counsellor = await Counsellor.findById(decodedToken?._id)
      .select("-password -refreshToken");

    if (!counsellor) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.counsellor = counsellor;

    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});



export const verifyAdminJWT = asyncHandler(async (req, _, next) => {

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

   if(decodedToken.role !== "admin"){
     throw new ApiError(403,"Admin access required")
  }
  
  const admin = await Admin.findById(decodedToken?._id)
    .select("-password -refreshToken");

  if (!admin) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.admin = admin;

  next();
});