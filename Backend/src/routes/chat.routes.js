import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createchat,getMessages,getChats,createMessageChat} from "../controllers/chatbot.controller.js";
const router=Router();

router.post("/",verifyJWT,createchat)
router.get('/', verifyJWT,getChats)


/* GET /api/chat/messages/:id */
router.get('/messages/:id', verifyJWT, getMessages)

router.post("/create-message-chat",verifyJWT, createMessageChat);

export default router;