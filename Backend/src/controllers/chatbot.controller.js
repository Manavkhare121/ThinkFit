import { chatmodel } from "../models/chatbot.model.js";
import { messageModel } from "../models/message.model.js";

// 1. Create AI Chat
async function createchat(req, res) {
    const { title } = req.body;
    const userId = req.user._id;

    const chat = await chatmodel.create({
        users: [userId], // ✅ Fixed: plural users array
        title,
        type: "model"
    });

    res.status(201).json({
        message: "Chat created successfully",
        chat
    });
}

// 2. Get All Chats for User
const getChats = async (req, res) => {
  const userId =
    req.user?._id ||
    req.counsellor?._id ||
    req.admin?._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const chats = await chatmodel.find({ users: userId });

  res.status(200).json({
    message: "Chats retrieved successfully",
    chats: chats.map(chat => ({
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      users: chat.users
    }))
  });
};

// 3. Get Messages
async function getMessages(req, res) {
    const chatId = req.params.id;
    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });
    res.status(200).json({ messages });
}

// 4. Delete Chat (DB cleanup)
async function deleteChat(req, res) {
    const chatId = req.params.id;
    const userId = req.user._id;

    try {
        const chat = await chatmodel.findById(chatId);
        if (!chat) return res.status(404).json({ message: "Chat not found" });

        // Broken chats (empty users) or owner can delete
        const isOwner = chat.users.length === 0 || chat.users.includes(userId);
        if (!isOwner) return res.status(403).json({ message: "Unauthorized" });

        await messageModel.deleteMany({ chat: chatId });
        await chatmodel.findByIdAndDelete(chatId);

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// 5. Create Human Chat
async function createMessageChat(req, res) {

    const { counsellorId } = req.body;

    const currentUser =
      req.user || req.counsellor || req.admin;

    if (!currentUser) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const userId = currentUser._id;

    const chat = await chatmodel.create({
        users: [userId, counsellorId],
        type: "human",
    });

    res.status(201).json({ chat });
}

export { createchat, getMessages, getChats, createMessageChat, deleteChat };