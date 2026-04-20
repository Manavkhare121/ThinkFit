import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createchat, getMessages, getChats, createMessageChat, deleteChat } from "../controllers/chatbot.controller.js";

const router = Router();

router.post("/", verifyJWT, createchat);
router.get('/', verifyJWT, getChats);
router.get('/messages/:id', verifyJWT, getMessages);
router.delete('/:id', verifyJWT, deleteChat);
router.post("/create-message-chat", verifyJWT, createMessageChat);

export default router;