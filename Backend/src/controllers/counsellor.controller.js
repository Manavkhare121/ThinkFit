import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Counsellor } from "../models/counsellor.models.js";

const generateAccessandRefreshToken = async (counsellorId) => {
  try {
    const counsellor = await Counsellor.findById(counsellorId);

    const accessToken = counsellor.generateAccessToken();
    const refreshToken = counsellor.generateRefreshToken();

    counsellor.refreshToken = refreshToken;

    await counsellor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens"
    );
  }
};

const registerCounsellor = asyncHandler(async (req, res) => {
  const { username, email, password, specialization } = req.body;

  if (
    [username, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedCounsellor = await Counsellor.findOne({ email });

  if (existedCounsellor) {
    throw new ApiError(409, "Counsellor already exists");
  }

  const counsellor = await Counsellor.create({
    username,
    email,
    password,
    specialization
  });

  const createdCounsellor = await Counsellor
    .findById(counsellor._id)
    .select("-password -refreshToken");

  if (!createdCounsellor) {
    throw new ApiError(
      500,
      "Something went wrong while registering the counsellor"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdCounsellor,
        "Counsellor registered successfully"
      )
    );
});

const loginCounsellor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const counsellor = await Counsellor.findOne({ email });

  if (!counsellor) {
    throw new ApiError(404, "Counsellor does not exist");
  }

  const isPasswordvalid = await counsellor.isPasswordCorrect(password);

  if (!isPasswordvalid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessandRefreshToken(counsellor._id);

  const loggedinCounsellor = await Counsellor
    .findById(counsellor._id)
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          counsellor: loggedinCounsellor,
          accessToken,
          refreshToken,
        },
        "Counsellor logged in successfully"
      )
    );
});

const logoutCounsellor = asyncHandler(async (req, res) => {
  await Counsellor.findByIdAndUpdate(
    req.counsellor._id,
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "Counsellor logged out"
      )
    );
});

const getTotalCounsellorsCount = asyncHandler(async (req, res) => {
  const totalCounsellors = await Counsellor.countDocuments();

  return res.status(200).json(
    new ApiResponse(200, { totalCounsellors }, "Total counsellors count fetched successfully")
  );
});
export {
  generateAccessandRefreshToken,
  registerCounsellor,
  loginCounsellor,
  logoutCounsellor,
  getTotalCounsellorsCount
};