import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegistration = async (req, res) => {
  const { name, email, mobileNumber, password, address } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or mobile number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      address,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
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

    // Optional cookie (kept for compatibility)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ IMPORTANT: send token in body for SPA to store
    res.status(200).json({
      success: true,
      message: "User Logged In successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
      token, // <-- HERE
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const userLogOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
