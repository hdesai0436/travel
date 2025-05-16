import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 gap-9 max-w-[90%] md:mx-56 bg-gray-900 text-white mt-6">
        <h1 className="font-extrabold text-center text-4xl md:text-5xl lg:text-6xl">
          "Unlock the World with AI—Your Dream Trip, Instantly Designed!" 🚀🌍
        </h1>
        <p className="text-lg text-gray-300 text-center mt-4">
          Plan your next adventure with AI-powered recommendations tailored just
          for you.
        </p>
      </div>

      {/* Stylish Button Under Hero */}
      <div className="flex justify-center mt-6">
        <Link to={'/create-trip'}>
        <button className="px-6 py-3 text-xl font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
