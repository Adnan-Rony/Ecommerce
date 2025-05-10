import bcrypt from 'bcryptjs';
import usersModel from '../models/users.model.js';
import { validatePassword } from './../utils/validatePassword.js';
import { generateToken } from './../utils/generateToken.js';



// Register User
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


