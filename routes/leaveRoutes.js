import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeaves,
  getByIdLeaves,
  getAllLeaves,
  getLeaveDetails,
  updateLeave,
} from "../controller/leaveController.js";
const router = express.Router();
router.get("/", authMiddleware, getAllLeaves);
router.get("/:id", authMiddleware, getByIdLeaves);
router.get("/detail/:id", authMiddleware, getLeaveDetails);
router.post("/add", authMiddleware, addLeaves);
router.put("/:id", authMiddleware, updateLeave);

export default router;
