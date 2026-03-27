import { chatmodel } from "../models/chatbot.model.js";
import {messageModel} from "../models/message.model.js"
async function createchat(req,res) {
    const {title}=req.body
    const user=req.user
    const chat=await chatmodel.create({
        user:user._id,
        title
    });
    res.status(201).json({
        message:"Chat created successfully",
        chat:{
            _id:chat._id,
            title:chat.title,
            lastActivity:chat.lastActivity
        }
    })
}

async function getChats(req, res) {
    const user = req.user;

    const chats = await chatmodel.find({ user: user._id });

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats: chats.map(chat => ({
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
    });
}

async function getMessages(req, res) {

    const chatId = req.params.id;

    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages: messages
    })

}

async function createMessageChat(req, res) {
  const { counsellorId } = req.body;
  const userId = req.user._id;

  const chat = await chatmodel.create({
    users: [userId, counsellorId],
    type: "human",
  });

  res.status(201).json({
    message: "Chat created",
    chat
  });
}
export {createchat,getMessages,getChats,createMessageChat}