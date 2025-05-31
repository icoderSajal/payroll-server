import express from "express";
import {
  addTasks,
  getAlltasks,
  updateTasks,
  gettaskByUserId,
  getSingletask,
} from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, getAlltasks);
router.get("/list/:id", authMiddleware, gettaskByUserId);
router.get("/edit/:id", authMiddleware, getSingletask);
router.post("/add", authMiddleware, addTasks);
router.put("/update/:id", authMiddleware, updateTasks);

export default router;
