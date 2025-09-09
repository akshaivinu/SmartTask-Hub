import { Router } from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";


const router = Router();

router.post("/", createTask)
router.get("/", getTask)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)

export default router;