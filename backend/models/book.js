import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  cover: {
    type: String,
    default: ''
  },

  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  totalReviews: {
    type: Number,
    default: 0
  }
});

// ✅ Use export default for ES Modules
const Book = mongoose.model('Book', bookSchema);
export default Book;
