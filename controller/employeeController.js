import User from "../models/User.js";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addemployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already register" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res
      .status(201)
      .json({ success: true, message: "Employee Created!!!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: true, error });
  }
};

const getallemployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not Found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department,
        salary,
      }
    );
    if (!updateUser || !updateEmployee) {
      return res
        .status(404)
        .json({ success: false, error: "document not Found" });
    }

    return res.status(200).json({ success: true, message: "employee updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getEmployeeByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error to get employees",
    });
  }
};
export {
  addemployee,
  upload,
  getallemployees,
  getEmployee,
  updateEmployee,
  getEmployeeByDepId,
};
