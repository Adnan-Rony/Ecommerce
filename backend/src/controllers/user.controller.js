import bcrypt from 'bcryptjs';
import usersModel from "../models/user.model.js";
import { generateToken } from './../utils/generateToken.js';
import { validatePassword } from './../utils/validatePassword.js';

// ── Consistent cookie options ─────────────────────────────────────────────
const cookieOptions = {
  httpOnly: true,
  secure: true,       // always true — both Render and Vercel are HTTPS
  sameSite: 'none',   // required for cross-domain (Render → Vercel)
  maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
};

const clearCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

// ── Register ──────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    let user;
    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await usersModel.create({ name, email, password: hashedPassword });
    } else {
      user = await usersModel.create({ name, email, password: 'google-oauth' });
    }

    const token = generateToken(user);
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: password ? 'User registered with email/password' : 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

// ── Login ─────────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    res.cookie('token', token, cookieOptions);

    console.log("✅ Logged in user:", user.email);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};

// ── Logout ────────────────────────────────────────────────────────────────
export const logoutUser = (req, res) => {
  console.log("✅ User logged out");
  res.clearCookie("token", clearCookieOptions);
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ── Get Profile ───────────────────────────────────────────────────────────
export const getUserProfile = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: err.message });
  }
};

// ── Update Profile ────────────────────────────────────────────────────────
export const updateUserProfile = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await usersModel.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
};

// ── Admin: Get All Users ──────────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ── Admin: Make Admin ─────────────────────────────────────────────────────
export const makeAdmin = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const user = await usersModel.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};

// ── Admin: Delete User ────────────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: {
        _id: deletedUser._id,
        name: deletedUser.name,
        email: deletedUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error deleting user", error: err.message });
  }
};