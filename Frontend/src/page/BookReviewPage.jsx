import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewItem from '../components/ReviewItem';

const BookReviewPage = () => {
  const { id } = useParams(); // this should be the MongoDB _id
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (!book) return <div className="text-white p-4">Book not found.</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-[#ECDFCC] px-6 py-8">
      <Link
        to="/book_listings"
        className="flex flex-row mx-[90%] bg-[#ECDFCC] text-zinc-900 font-semibold px-6 py-2 rounded hover:bg-[#e6d3b3] w-40"
      >
        ← Back to list
      </Link>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <img
          src={book.cover}
          alt={book.title}
          className="w-40 h-60 object-cover rounded shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="italic text-lg">{book.author}</p>
          <p className="text-sm mt-1">{book.genre}</p>
          <p className="text-sm mt-1 text-zinc-400">{book.description}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Write a Review ✍️</h2>
        <ReviewForm onSubmit={addReview} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">User Reviews 💬</h2>
        {reviews.length > 0 ? (
          reviews.map((rev, i) => <ReviewItem key={i} review={rev} />)
        ) : (
          <p className="text-sm text-zinc-400">
            No reviews yet. Be the first to write one!
          </p>
        )}
      </div>
    </div>
  );
};

export default BookReviewPage;
