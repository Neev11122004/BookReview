import React from 'react';

const ReviewItem = ({ review }) => {
  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-700 mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold">{review.name}</span>
        <span className="text-sm text-zinc-400">{review.date}</span>
      </div>
      <p className="text-zinc-200">{review.text}</p>
    </div>
  );
};

export default ReviewItem;
