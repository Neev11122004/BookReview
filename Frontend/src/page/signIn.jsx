import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // allows cookie to be sent
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        alert('Login successful!');
        window.location.reload(); //  reload the page so Navbar updates
         window.location.href = '/book_listings';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-[#ECDFCC] mb-6 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <button
            type="submit"
            className="w-full bg-[#ECDFCC] text-zinc-900 font-semibold py-3 rounded hover:bg-[#e4d6bb]"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-zinc-400 mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#ECDFCC] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
