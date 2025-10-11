import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userRegistration = async (req, res) => {
  const { mobileNumber, password, email, address, name } = req.body;
  try {
    //check if mobile no and email already exist
    const existingData = await User.findOne({
      $or: [{ mobileNumber }, { email }],
    });
    if (existingData)
      return res.status(409).json({
        success: false,
        message: "Mobile Number or Email already exist ",
      });

    //before storing into DB we hash it first
    const hashPassword = await bcrypt.hash(password, 10);

    //if new mobile no then create new user
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
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    //check is user eist or not
    const user = await User.findOne({ mobileNumber });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    //is user, then password verification
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //store token in secure cookie
    res.cookie("Token", token, {
      httpOnly: true, // prevents access by JS
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
      token, // optionally return token if you want to store it in frontend
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const userLogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed. Try again later.",
    });
  }
};

export { userRegistration, userLogin, userLogOut };
