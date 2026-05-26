import React, { useRef } from 'react';
import { BESTSELLERS } from '../constants/BrandAssets';
import ProductCard from './ProductCard';

const Bestsellers = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white relative group/section" id="shop">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-20 relative">
        <div className="text-center mb-10">
           <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">The Gold Standard</span>
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
              Our <span className="text-brand-magenta italic relative">
                Best Sellers
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
           </h2>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center text-brand-dark hover:bg-brand-magenta hover:text-white transition-all opacity-100 md:opacity-0 group-hover/section:opacity-100 border border-brand-gold/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center text-brand-dark hover:bg-brand-magenta hover:text-white transition-all opacity-100 md:opacity-0 group-hover/section:opacity-100 border border-brand-gold/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-8 md:pb-12 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {BESTSELLERS.map((product) => (
            <div key={product.id} className="min-w-full md:min-w-[calc(25%-1.5rem)] snap-center px-2 md:px-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
