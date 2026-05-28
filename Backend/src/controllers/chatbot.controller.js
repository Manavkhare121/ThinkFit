import { chatmodel } from "../models/chatbot.model.js";
import { messageModel } from "../models/message.model.js";


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

const getChats = async (req, res) => {

  const userId =
    req.user?._id ||
    req.counsellor?._id ||
    req.admin?._id;

  if (!userId) {

    return res.status(401).json({
      message: "Unauthorized"
    });

  }


  const chats = await chatmodel.find({

      users: userId,

      type: "model"

  });

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

async function getHumanChats(req, res) {

    try {

        const currentUser =
            req.user ||
            req.counsellor ||
            req.admin;

        if (!currentUser) {

            return res.status(401).json({

                message: "Unauthorized"

            });

        }

        const chats = await chatmodel

        .find({

            users: currentUser._id,

            type: "human"

        })

        .populate("users", "name email");

        res.status(200).json({

            chats

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

async function getSingleChat(req, res) {

    try {

        const chat = await chatmodel

        .findById(req.params.id)

        .populate("users", "name email");

        if (!chat) {

            return res.status(404).json({

                message: "Chat not found"

            });

        }

        res.status(200).json({

            chat

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

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

    

    const existingChat =
    await chatmodel.findOne({

        users: {
            $all: [userId, counsellorId]
        },

        type: "human"

    });

    

    if (existingChat) {

        return res.status(200).json({

            chat: existingChat

        });

    }

    

    const chat = await chatmodel.create({

        users: [userId, counsellorId],

        type: "human"

    });

    res.status(201).json({

        chat

    });

}
export { createchat, getMessages, getChats, createMessageChat, deleteChat,getSingleChat,getHumanChats};