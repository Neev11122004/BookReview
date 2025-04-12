import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      onSubmit({ rating, comment });
      setRating(5);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="bg-zinc-800 border border-zinc-600 rounded px-4 py-2 text-white"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
        ))}
      </select>
      <textarea
        className="bg-zinc-800 border border-zinc-600 rounded px-4 py-2 w-full text-white"
        rows="4"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-[#ECDFCC] text-zinc-900 font-semibold px-6 py-2 rounded hover:bg-[#e6d3b3]"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
