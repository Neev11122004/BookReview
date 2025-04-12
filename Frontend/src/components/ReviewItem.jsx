import React from 'react';
import { Star } from 'lucide-react'; // Optional: use any star icon library

const ReviewItem = ({ review }) => {
  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-700 mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-[#ECDFCC]">
          {review.user?.username || 'Anonymous'}
        </span>
        <span className="text-sm text-zinc-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center gap-1 mb-2 text-yellow-400">
        <Star size={16} fill="currentColor" /> {review.rating} / 5
      </div>
      <p className="text-zinc-200">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
