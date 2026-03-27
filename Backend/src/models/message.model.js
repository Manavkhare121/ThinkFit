import mongoose, { mongo } from "mongoose"
import { Schema } from "mongoose"
// const messageSchema=new Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     chat:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"chat"
//     },content:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:["User","model"],
//         default:"User"

//     }
// },
// {
//     timestamps:true
// })

const messageSchema = new Schema({
  sender: {   // ✅ rename from user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat"
  },

  content: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "counsellor", "ai"],
    default: "user"
  }

}, { timestamps: true });

export const messageModel=mongoose.model("Message",messageSchema)