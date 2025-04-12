import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ ok: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ ok: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ ok: false, message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ ok: false, message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ ok: true, message: 'Login successful', username: user.username });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true, message: 'Logged out successfully' });
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ ok: false, message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json({ ok: true, user });
  } catch (err) {
    res.status(401).json({ ok: false, message: 'Invalid token' });
  }
});

// Verify if logged in
router.get('/verify', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ ok: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('username email');
    if (!user) return res.json({ ok: false });
    res.json({ ok: true, user });
  } catch (err) {
    res.json({ ok: false });
  }
});

export default router;
