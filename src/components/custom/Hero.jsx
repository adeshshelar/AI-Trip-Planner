import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import ImageSlider from './ImageSlider';
import { FaArrowDown } from "react-icons/fa6";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
  
      <div className="relative">
      
        <ImageSlider />

        <Header />
       
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">STREAMLINED TRAVEL PLANNING, DRIVEN BY AI</h1>
            <p className="text-lg mt-1">
              Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to="/create-trip">
              <Button variant="secondary" className="mt-3 rounded-full">
                Get Started, It's Free
              </Button>
            </Link>
          </div>
        </div>
      </div>

     
      <div className="bg-white pt-8 pb-20 px-6 shadow-lg rounded-3xl mt-[-35px] relative z-10">
        <h2 className="text-3xl  font-extrabold text-center">
          EXPLORE TAILORED TRAVEL PACKAGES JUST FOR YOU
        </h2>

        <p className="text-gray-700 mt-2 text-center">
          Our diverse range of trip packages, thoughtfully designed to meet your travel preferences and create unforgettable experiences for everyone.
        </p>

        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 animate-float">
           <div className="bg-gray-200 rounded-full p-3">
            <FaArrowDown className="text-2xl" />
           </div>
        </div>

      </div>

      
    </div>
  );
};

export default App;
