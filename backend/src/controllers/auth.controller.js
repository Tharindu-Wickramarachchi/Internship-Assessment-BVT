import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  // Store Access Token in a cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevent JavaScript access (protects against XSS attacks), Cross Site Scripting attack
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks, Cross-Site Request Forgery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Store Refresh Token in a separate cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevent JavaScript access (protects against XSS attacks), Cross Site Scripting attack
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks, Cross Site Request Forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set cookies with tokens
    setCookies(res, accessToken, refreshToken);

    // Save user to database
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
