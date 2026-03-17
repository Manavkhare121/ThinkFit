import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createchat,getMessages,getChats} from "../controllers/chatbot.controller.js";
const router=Router();

router.post("/",verifyJWT,createchat)
router.get('/', verifyJWT,getChats)


/* GET /api/chat/messages/:id */
router.get('/messages/:id', verifyJWT, getMessages)

export default router;