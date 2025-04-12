import React from 'react';

const Card = ({ book, isGrid }) => {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex ${
        isGrid ? 'flex-col items-center text-center' : 'flex-row'
      } gap-4 text-[#ECDFCC]`}
    >
      <img
        src={book.cover}
        alt={book.title}
        className={`rounded object-cover ${
          isGrid ? 'w-32 h-48' : 'w-24 h-36'
        }`}
      />

      <div
        className={`flex flex-col justify-center ${
          isGrid ? 'items-center' : 'items-start'
        }`}
      >
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="italic text-sm mt-1">{book.author}</p>

        {/* Show more details in list view only */}
        {!isGrid && (
          <p className="text-xs mt-2 text-gray-300 line-clamp-3">{book.description}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
