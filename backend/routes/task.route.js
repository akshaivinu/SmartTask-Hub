import { Router } from "express";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/task.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/", protectRoute, createTask)
router.get("/", protectRoute, getTask)
router.get("/:id", protectRoute, getTaskById)
router.put("/:id", protectRoute, updateTask)
router.delete("/:id", protectRoute, deleteTask)

export default router;