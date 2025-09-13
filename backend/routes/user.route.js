import { Router } from "express";
import { authCheck, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/authcheck", protectRoute, authCheck);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
