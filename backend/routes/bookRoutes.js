// routes/bookRoutes.js
import express from 'express';
import Book from '../models/book.js';

const router = express.Router();

// GET /api/books - Fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Fetch single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

export default router;
