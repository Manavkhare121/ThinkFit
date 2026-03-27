import { Router } from "express";
import {
  registerCounsellor,
  loginCounsellor,
  logoutCounsellor
} from "../controllers/counsellor.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post(loginCounsellor);
router.route("/logout").post(verifyJWT, logoutCounsellor);
router.route("/register").post(registerCounsellor);

export default router;