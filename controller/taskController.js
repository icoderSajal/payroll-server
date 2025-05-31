import Employee from "../models/Employee.js";
import Task from "../models/Task.js";

const addTasks = async (req, res) => {
  try {
    const { employeeId, taskType, startDate, endDate, comments } = req.body;

    const newTask = new Task({
      employeeId,
      taskType,
      startDate,
      endDate,
      comments,
    });

    await newTask.save();

    return res.status(200).json({ success: true, leave: newTask });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const getAlltasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate({
      path: "employeeId",
      populate: [{ path: "userId", select: "name" }],
    });
    //console.log(tasks);
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const gettaskByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    let tasks = await Task.find({ employeeId: id });
    if (!tasks || tasks.length === 0) {
      const employee = await Employee.findOne({ userId: id });

      tasks = await Task.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getSingletask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });
    console.log(task);

    return res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, taskType, startDate, endDate, comments, status } =
      req.body;
    const updataTask = await Task.findByIdAndUpdate(
      { _id: id },
      { employeeId, taskType, startDate, endDate, comments, status }
    );

    return res.status(200).json({ success: true, updataTask });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export { addTasks, getAlltasks, updateTasks, gettaskByUserId, getSingletask };
