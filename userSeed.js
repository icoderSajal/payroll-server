import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDB from "./config/db";
export const userRegister = async () => {
  try {
    connectDB();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "admin@admin.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
