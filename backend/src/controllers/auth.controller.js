import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });
};

export async function signup(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = req.user;

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.error("Error in getCurrentUser controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
