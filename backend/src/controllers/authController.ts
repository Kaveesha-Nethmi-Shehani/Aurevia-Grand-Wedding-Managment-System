import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { AuthRequest } from '../middleware/authMiddleware';

// 1. User Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Email 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // User 
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'CUSTOMER',
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during registration', error });
  }
};

// 2. User Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during login', error });
  }
};

// 3. Get Current User Profile (Protected)
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};