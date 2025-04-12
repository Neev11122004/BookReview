import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-[#ECDFCC] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us 📚</h1>

        <p className="text-lg mb-6 text-zinc-300">
          Welcome to <span className="text-[#f9e7ca] font-semibold">BookReview</span> – your go-to place to discover, explore, and review your favorite books. 
          Our mission is to create a community for book lovers, tech enthusiasts, and lifelong learners.
        </p>

        <p className="text-zinc-400 mb-6">
          Whether you're into software development, fiction, design, or non-fiction, we aim to provide personalized and community-driven recommendations for everyone.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🚀 Tech Stack</h2>
          <ul className="list-disc list-inside text-zinc-300">
            <li>React + Tailwind CSS for frontend</li>
            <li>Node.js + Express (planned for backend)</li>
            <li>MongoDB (for review storage)</li>
            <li>React Router for navigation</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">✨ Credits</h2>
          <p className="text-zinc-400">
            Designed & built with ❤️ by passionate learners. Icons from <a href="https://react-icons.github.io/react-icons/" className="text-blue-400 underline" target="_blank" rel="noreferrer">React Icons</a>.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="bg-[#ECDFCC] text-zinc-900 font-semibold px-6 py-3 rounded hover:bg-[#e6d3b3] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
