import {asyncHandler} from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { User } from "../models/user.models.js"

const generateAccessandRefreshToken=async(userId)=>{
    try{
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken}
    }
    catch(error){
        500,
      "Something went wrong while generating refresh and access token"
    }
}


export {generateAccessandRefreshToken}