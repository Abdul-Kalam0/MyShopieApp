import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegistration = async (req, res) => {
  const { mobileNumber, password, email, address = "", name } = req.body;
  try {
    const existingData = await User.findOne({
      $or: [{ mobileNumber }, { email }],
    });
    if (existingData)
      return res.status(409).json({
        success: false,
        message: "Mobile Number or Email already exist",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      mobileNumber,
      email,
      password: hashPassword,
      name,
      address,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const user = await User.findOne({ mobileNumber });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User Logged In successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const userLogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Logout failed. Try again later." });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        mobileNumber: req.user.mobileNumber,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
