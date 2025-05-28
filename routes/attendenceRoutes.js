import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addAttendance,
  endAttendance,
  addManualAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();
//localhost:8000/api/v1/attendance/manual
router.post("/start", authMiddleware, addAttendance);
router.post("/manual", authMiddleware, addManualAttendance);
router.put("/logout/:id", authMiddleware, endAttendance);

export default router;
