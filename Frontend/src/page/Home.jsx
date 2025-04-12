import React from 'react';
import { BiRightArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
const Home= () => {
  return (
    <div className="bg-zinc-900 text-zinc-300 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-8xl font-semibold leading-snug tracking-wide">
          <span className="font-[Calvino] text-[#ECDFCC] italic">Which</span> book{' '}
          <span className="font-[Calvino] text-[#ECDFCC] italic">do</span> you
          <br />
          want to <span className="font-[Calvino] text-[#ECDFCC] italic">read?</span>
        </h1>
      </div>
      
      <p className="text-lg md:text-xl text-center font-[Calvino] text-[#ECDFCC] max-w-xl mb-8">
        Lost in choices? Explore our handpicked collection and find your next great read!
      </p>

      <Link to="/book_listings"><button className="flex gap-3 items-center bg-[#ECDFCC] text-zinc-900 font-semibold px-6 py-3 rounded-3xl shadow-md hover:bg-zinc-900 hover:text-[#ECDFCC] hover:border-1 cursor-pointer transition-all duration-300 ease-in-out">
        Explore <BiRightArrowCircle size={25}  />
      </button></Link>
    </div>
  );
}

export default Home;