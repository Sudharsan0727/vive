import React from 'react';
import { CATEGORIES } from '../constants/BrandAssets';

const FeaturedCategories = () => {
  return (
    <section className="pt-4 pb-16 bg-white" id="categories">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
        {/* Synchronized Boutique Heading */}
        <div className="text-center mb-12">
           <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">The Collections</span>
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
              Shop By <span className="text-brand-magenta italic relative">
                Category
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                   <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
           </h2>
        </div>

        {/* 4-Column Minimalist Circular Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-16 justify-items-center">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group cursor-pointer flex flex-col items-center">
              {/* Refined Circular Image with Pulsing Border */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-6 md:mb-8">
                <div className="absolute inset-0 rounded-full border border-brand-gold/20 group-hover:scale-110 group-hover:border-brand-gold/60 transition-all duration-700"></div>
                <div className="absolute inset-3 rounded-full overflow-hidden shadow-[0_40px_80px_-15px_rgba(138,27,94,0.15)] border border-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                {/* Floating indicator */}
                <div className="absolute -bottom-2 right-8 w-14 h-14 bg-brand-magenta text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-2xl scale-95">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                   </svg>
                </div>
              </div>

              {/* Branded Serif Label */}
              <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-brand-magenta group-hover:text-brand-dark transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/40 group-hover:text-brand-gold transition-colors">
                Explore Range
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
