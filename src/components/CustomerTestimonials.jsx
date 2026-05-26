import React, { useState, useEffect } from 'react';

// Import testimonial images
import review1 from '../assets/Testimonial/review1.jpg';
import review2 from '../assets/Testimonial/review2.jpg';
import review3 from '../assets/Testimonial/review3.jfif';
import review4 from '../assets/Testimonial/review4.jfif';
import review5 from '../assets/Testimonial/review5.jfif';
import review6 from '../assets/Testimonial/review6.jfif';
import review7 from '../assets/Testimonial/review7.jfif';

const IMAGES = [review1, review2, review3, review4, review5, review6, review7];

const CustomerTestimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000); // Transitions every 5 seconds
    return () => clearInterval(timer);
  }, [current]);

  const next = () => setCurrent((prev) => (prev + 1) % IMAGES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <section className="py-12 bg-brand-cream/10 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Elegant Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-brand-magenta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">The Community Reel</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
              Stories of <span className="text-brand-magenta italic relative">
                Natural Radiance
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-brand-magenta/20 flex items-center justify-center text-brand-magenta hover:bg-brand-magenta hover:text-white transition-all shadow-sm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-brand-magenta/20 flex items-center justify-center text-brand-magenta hover:bg-brand-magenta hover:text-white transition-all shadow-sm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 3D Photo Stack Slider */}
        <div className="relative h-[450px] md:h-[600px] flex items-center justify-center">
          {IMAGES.map((img, idx) => {
            // Logic to determine position in the stack
            let position = 'hidden';
            if (idx === current) position = 'active';
            else if (idx === (current + 1) % IMAGES.length) position = 'next';
            else if (idx === (current - 1 + IMAGES.length) % IMAGES.length) position = 'prev';

            const styles = {
              active: 'z-30 scale-100 opacity-100 translate-x-0 rotate-0 shadow-2xl',
              next: 'z-20 scale-90 opacity-40 translate-x-[60%] rotate-6 grayscale',
              prev: 'z-20 scale-90 opacity-40 -translate-x-[60%] -rotate-6 grayscale',
              hidden: 'z-10 scale-75 opacity-0 translate-x-0 rotate-0',
            };

            return (
              <div 
                key={idx}
                className={`absolute transition-all duration-700 ease-in-out cursor-pointer group ${styles[position]}`}
                onClick={() => {
                  if (position === 'next') next();
                  if (position === 'prev') prev();
                }}
              >
                <div className="w-[85vw] md:w-[450px] h-[400px] md:h-[550px] bg-white p-4 pb-12 rounded-sm border border-brand-cream/50 shadow-xl relative">
                  {/* Image Container - Always Contain */}
                  <div className="w-full h-full bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
                    <img 
                      src={img} 
                      alt="" 
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  
                  {/* Polaroid Style Caption */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-[10px] font-bold text-brand-magenta tracking-[0.2em] uppercase">Glow Experience #{idx + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-16 max-w-xs mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-brand-dark/30 tracking-widest uppercase">Progress</span>
            <span className="text-[10px] font-bold text-brand-magenta">{current + 1} / {IMAGES.length}</span>
          </div>
          <div className="h-1 bg-brand-magenta/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-magenta transition-all duration-500"
              style={{ width: `${((current + 1) / IMAGES.length) * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CustomerTestimonials;




















