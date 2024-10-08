import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    '/front.jpg',
    '/front2.jpg',
    '/front3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-[600px] md:h-[520px] relative overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Slideshow"
        className="w-full h-full object-cover  transition duration-500 ease-in-out"
      />
         <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
    </div>
  );
};

export default ImageSlider;
