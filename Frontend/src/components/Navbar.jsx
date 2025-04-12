import React, { useEffect, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
          credentials: "include",
        });
        const data = await res.json();
        setIsAuthenticated(data.ok);
        if (data.ok) {
          setUserData(data.user); // Save user data
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-zinc-900 text-[#ECDFCC] relative">
      <div>
        <span className="text-2xl font-[Calvino] font-semibold">
          <Link to="/" className="flex items-center font-medium">
            BookReview
          </Link>
        </span>
      </div>

      <ul className="flex items-center gap-6 text-[#ECDFCC] font-[Calvino] text-balance">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-white font-bold underline" : "text-[#ECDFCC]")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/book_listings" className={({ isActive }) => (isActive ? "text-white font-bold underline" : "text-[#ECDFCC]")}>
            Listings
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-white font-bold underline" : "text-[#ECDFCC]")}>
            About
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4 relative">
        <FiSearch size={20} />
        {isAuthenticated ? (
          <div
            className="relative"
            onClick={() => setShowDropdown(prev => !prev)}
            // onMouseEnter={() => setShowDropdown(true)}
            // onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-[#ECDFCC] hover:text-zinc-900 transition">
              <FiUser size={18} /> Profile
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-4 z-10">
                <p className="text-white mb-2">Hello, {userData?.username}</p>
                <Link to="/edit-profile" className="block text-sm text-[#ECDFCC] hover:underline mb-2">
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-[#ECDFCC] hover:text-zinc-900 transition">
              <FiUser size={18} />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
