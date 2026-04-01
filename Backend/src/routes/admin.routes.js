import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin
} from "../controllers/admin.controller.js";

import { getAdminDashboard } from "../controllers/admin.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);

router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles("admin"),
  getAdminDashboard
);


export default router;