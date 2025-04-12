// routes/review.js
import express from 'express';
import Review from '../models/Review.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify user from token
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ ok: false, message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new Error('User not found');
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Invalid token' });
  }
};


router.post('/:bookId', authenticateUser, async (req, res) => {
  const { rating, comment } = req.body;
  const { bookId } = req.params;

  try {
    const newReview = new Review({
      user: req.user._id,
      book: bookId,
      rating,
      comment
    });

    await newReview.save();
    await newReview.populate('user', 'username'); 

    res.status(201).json({ ok: true, review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Failed to submit review' });
  }
});


router.get('/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username') 
      .sort({ createdAt: -1 });

    res.json({ ok: true, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Failed to fetch reviews' });
  }
});

export default router;
