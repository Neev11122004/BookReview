import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Account created! Now sign in.');
        navigate('/login');
      } else {
        const data = await res.json();
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-[#ECDFCC] mb-6 text-center">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
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
            Sign Up
          </button>
        </form>
        <p className="text-sm text-zinc-400 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ECDFCC] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
