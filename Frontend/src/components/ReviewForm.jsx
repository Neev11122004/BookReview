import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      onSubmit({ name, text, date: new Date().toLocaleDateString() });
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="bg-zinc-800 border border-zinc-600 rounded px-4 py-2 w-full text-white"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="bg-zinc-800 border border-zinc-600 rounded px-4 py-2 w-full text-white"
        rows="4"
        placeholder="Your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
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
