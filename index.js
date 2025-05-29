import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import attendenceRoutes from "./routes/attendenceRoutes.js";
import adminreportRoutes from "./routes/adminreportRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

//dotenv configuration
dotenv.config();

// declare the server
const server = express();
//database connect function
connectDB();

//middleware
server.use(express.json());
server.use(cors());
server.use(express.static("public/uploads"));

//test route
server.get("/demo", (eeq, res) => {
  res.send("server running");
});

//routes

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/department", departmentRoutes);
server.use("/api/v1/employee", employeeRoutes);
server.use("/api/v1/salary", salaryRoutes);
server.use("/api/v1/leave", leaveRoutes);
server.use("/api/v1/setting", settingRoutes);
server.use("/api/v1/dashboard", dashboardRoutes);
server.use("/api/v1/attendance", attendenceRoutes);
server.use("/api/v1/admin-report", adminreportRoutes);
server.use("/api/v1/task", taskRoutes);
//dotenv variables
const port = process.env.PORT;
const mode = process.env.MODE;

//server listen or running
server.listen(process.env.PORT, () => {
  console.log(`${mode} server runnning on Port ${port}`);
});
