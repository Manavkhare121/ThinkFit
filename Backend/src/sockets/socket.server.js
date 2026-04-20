import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "../models/user.model.js";
import { Counsellor } from "../models/counsellor.models.js";
import { Admin } from "../models/admin.model.js";
import { generateResponse, generateVectors } from "../services/ai.service.js";
import { messageModel } from "../models/message.model.js";
import { createMemory, queryMemory } from "../services/vector.service.js";
import { chatmodel } from "../models/chatbot.model.js";

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  // --- Auth Middleware (Matching your verifyJWT) ---
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    // FIX: Using accessToken as found in your logs
    const token = socket.handshake.auth?.token || cookies.accessToken;

    if (!token) {
      return next(new Error("Authentication error: No token Provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      let userData = null;
      // Detect role and fetch data
      if (decoded.role === "user") {
        userData = await User.findById(decoded._id);
        socket.user = userData;
      } else if (decoded.role === "counsellor") {
        userData = await Counsellor.findById(decoded._id);
        socket.counsellor = userData;
      } else if (decoded.role === "admin") {
        userData = await Admin.findById(decoded._id);
        socket.admin = userData;
      }

      if (!userData) {
        return next(new Error("Authentication error: User not found"));
      }

      socket.role = decoded.role;
      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {

    // =========================
    // 🤖 AI CHAT (ORIGINAL LOGIC)
    // =========================
    socket.on("ai-message", async (messagePayload) => {
      // AI chatbot processing
      const [message, vectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          sender: socket.user._id, // schema uses sender
          content: messagePayload.content,
          role: "user",
        }),
        generateVectors(messagePayload.content),
      ]);

      await createMemory({
        vectors,
        messageId: message._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      const [memory, chathistory] = await Promise.all([
        queryMemory({
          queryVector: vectors,
          limit: 3,
          metadata: { user: socket.user._id },
        }),
        messageModel
          .find({ chat: messagePayload.chat })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((messages) => messages.reverse()),
      ]);

      const stm = chathistory.map((item) => {
        return { role: item.role, parts: [{ text: item.content }] };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `these are some previous messages from the chat, use them to generate a response\n\n${memory.map((item) => item.metadata.text).join("\n")}`,
            },
          ],
        },
      ];

      const response = await generateResponse([...ltm, ...stm]);

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });

      const [responseMessage, responseVectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          sender: socket.user._id,
          content: response,
          role: "model",
        }),
        generateVectors(response),
      ]);

      await createMemory({
        vectors: responseVectors,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
      });
    });

    // =========================
    // 👥 HUMAN CHAT (ORIGINAL LOGIC)
    // =========================

    socket.on("join-chat", async (chatId) => {
      const chat = await chatmodel.findById(chatId);
      if (!chat) return;

      // Identify current user ID regardless of role
      const currentId = (socket.user || socket.counsellor || socket.admin)?._id;
      
      const isUserInChat = chat.users.some(
        (id) => id.toString() === currentId.toString()
      );

      if (!isUserInChat) return;

      socket.join(chatId);
      console.log("User joined room:", chatId);
    });

    socket.on("send-message", async (payload) => {
      const chat = await chatmodel.findById(payload.chat);
      if (!chat) return;

      const currentId = (socket.user || socket.counsellor || socket.admin)?._id;

      const isUserInChat = chat.users.some(
        (id) => id.toString() === currentId.toString()
      );

      if (!isUserInChat) return;

      const message = await messageModel.create({
        chat: payload.chat,
        sender: currentId,
        content: payload.content,
        role: payload.role, 
      });

      io.to(payload.chat).emit("receive-message", message);
    });

  });
}

export default initSocketServer;