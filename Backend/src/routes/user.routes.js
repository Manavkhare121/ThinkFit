import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutuser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutuser);
router.route("/register").post(registerUser);

export default router;