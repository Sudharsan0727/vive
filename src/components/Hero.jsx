import React, { useState, useEffect, useRef } from 'react';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

const banners = [banner1, banner2, banner3];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Auto-slide every 5 seconds
    
    return () => clearInterval(timer);
  }, [currentSlide]); // Reset timer when slide changes manually

  const scrollToSlide = (index) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * index;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    const nextSlide = currentSlide === banners.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
    scrollToSlide(nextSlide);
  };

  const handlePrev = () => {
    const nextSlide = currentSlide === 0 ? banners.length - 1 : currentSlide - 1;
    setCurrentSlide(nextSlide);
    scrollToSlide(nextSlide);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    scrollToSlide(index);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const slideWidth = scrollRef.current.clientWidth;
      // Calculate which slide is currently most visible
      const newSlide = Math.round(scrollPosition / slideWidth);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < banners.length) {
        setCurrentSlide(newSlide);
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-brand-cream/20">
      {/* Slider Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative snap-center">
               <img 
              src={banner} 
                 alt={`Vive Beauty Banner ${index + 1}`} 
              className="w-full h-full object-cover object-center"
               />
          </div>
        ))}
      </div>

         {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/60 hover:bg-white text-brand-dark rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 shadow-sm"
            >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/60 hover:bg-white text-brand-dark rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 shadow-sm"
            >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              currentSlide === index ? 'bg-brand-magenta w-8' : 'bg-white/80 hover:bg-white w-2.5'
            }`}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Hero;
