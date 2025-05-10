import bcrypt from 'bcryptjs';
import usersModel from '../models/users.model.js';
import { validatePassword } from './../utils/validatePassword.js';
import { generateToken } from './../utils/generateToken.js';



//public User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    let user;
    if (password) {
      const passwordError = validatePassword(password); // Ensure this function exists
      if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await usersModel.create({ name, email, password: hashedPassword });
    } else {
      user = await usersModel.create({ name, email, password: 'google-oauth' });
    }

    const token = generateToken(user);

    // Set token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    return res.status(201).json({
      success: true,
      message: password ? 'User registered with email/password' : 'User registered successfully (Google Sign-In)',
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

    // Set token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days, matching expiresIn: '5d'
    });

    console.log("✅ Logged in user:", user.email);
    res.status(200).json({
      success: true, // Added for frontend compatibility
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};
export const logoutUser = (req, res) => {
     console.log("✅ User logged out");
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
 
};





export const getUserProfile = async (req, res) => {
 try {
    const user = await usersModel.findById(req.user.id).select('-password'); // Exclude password
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



//admin route
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find({}).select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const makeAdmin = async (req, res) => {

  const { id } = req.params;

  console.log('Current user:', req.user);  


  // Only allow if current user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const user = await usersModel.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: {
        _id: deletedUser._id,
        name: deletedUser.name,
        email: deletedUser.email,
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message,
    });
  }
};