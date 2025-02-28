import React, { useState, useEffect } from 'react';
import SubjectGrid from './SubjectGrid';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: '/assets/banner-images1.jpg' },
    { image: '/assets/banner-images5.jpg' },
    { image: '/assets/banner-images6.jpg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-8xl h-48 sm:h-64 md:h-72 lg:h-96 rounded-lg overflow-hidden mb-8 shadow-xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 transform ${
              currentSlide === index 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <img 
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ImageSlider />
      <SubjectGrid />
    </div>
  );
};

export default MainContent;
