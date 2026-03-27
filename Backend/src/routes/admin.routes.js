import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin
} from "../controllers/admin.controller.js";

import { verifyJWT} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);

export default router;