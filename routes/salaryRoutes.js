import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addSalary,
  allEmployeSalaries,
  getSalary,
} from "../controller/salaryController.js";
const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/:id", authMiddleware, getSalary);
router.get("/", authMiddleware, allEmployeSalaries);

export default router;
