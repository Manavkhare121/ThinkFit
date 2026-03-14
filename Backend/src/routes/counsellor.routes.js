import { Router } from "express";
import {
  registerCounsellor,
  loginCounsellor,
  logoutCounsellor
} from "../controllers/counsellor.controller.js";
import { verifyCounsellorJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post(loginCounsellor);
router.route("/logout").post(verifyCounsellorJWT, logoutCounsellor);
router.route("/register").post(registerCounsellor);

export default router;