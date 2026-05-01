import mongoose from "mongoose";
import { Schema } from "mongoose";
// const chatSchema=new Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     title:{
//         type:String,
//         required:true
//     },
//     lastActivity:{
//         type:Date,
//         default:Date.now
//     }
// },
// {
//     timestamps:true
// })
const chatSchema = new Schema({
  users: [   
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],

  type: {
    type: String,
    enum: ["model", "human"],
    default: "model"
  },

  title: {
    type: String,
  },

  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
export const chatmodel=mongoose.model("chat",chatSchema)


