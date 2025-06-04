import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSummary,
  countEmployeesByDepartment,
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);

router.get(
  "/employees-by-department",

  countEmployeesByDepartment
);

export default router;
