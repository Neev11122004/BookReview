// utils/sortBooks.js
export const sortBooks = (books, sortType) => {
    if (sortType === "title") {
      return [...books].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "date") {
      return [...books].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return books;
  };
  