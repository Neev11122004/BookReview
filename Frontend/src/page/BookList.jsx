import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { FiList, FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortType === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortType === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="px-6 py-8 bg-zinc-900 min-h-screen">
      <div className="flex flex-col items-center p-5">
        <h2 className="text-5xl font-bold text-white text-center mb-4">
          Dive Into a Universe of Books
        </h2>
        <p className="text-center text-[#ECDFCC] italic mb-6">
          Library of <strong>{books.length}</strong> books at your fingertips
        </p>

        <input
          type="text"
          placeholder="Enter the Book name here"
          className="px-6 py-3 rounded-full bg-zinc-800 text-white border-[#ECDFCC] w-90 "
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Search + View Toggle + Sort */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
        <div className="flex items-center gap-2">
          <button
            className={`p-2 border rounded ${
              !isGrid ? "bg-[#ECDFCC] text-zinc-900" : "text-[#ECDFCC]"}`
            }
            onClick={() => setIsGrid(false)}
          >
            <FiList />
          </button>
          <button
            className={`p-2 border rounded ${
              isGrid ? "bg-[#ECDFCC] text-zinc-900" : "text-[#ECDFCC]"}`
            }
            onClick={() => setIsGrid(true)}
          >
            <FiGrid />
          </button>
        </div>

        <select
          onChange={(e) => setSortType(e.target.value)}
          className="bg-zinc-800 text-[#ECDFCC] border border-zinc-600 rounded px-4 py-2"
        >
          <option value="">Sort</option>
          <option value="title">Title (A-Z)</option>
          <option value="date">Date (Newest)</option>
        </select>
      </div>

      {/* Book Display */}
      <div className={`grid ${isGrid ? "md:grid-cols-3" : "grid-cols-1"} gap-6`}>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id}>
              <Card book={book} isGrid={isGrid} />
            </Link>
          ))
        ) : (
          <p className="text-center text-[#ECDFCC] col-span-full">
            No books found !!
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded text-[#ECDFCC] hover:bg-zinc-800"
        >
          Prev
        </button>
        <span className="text-[#ECDFCC] mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 border rounded text-[#ECDFCC] hover:bg-zinc-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
