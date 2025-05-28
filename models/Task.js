import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    taskType: {
      type: String,
      enum: ["Development", "Design", "Database"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    comments: {
      type: String,

      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Work In Process"],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
