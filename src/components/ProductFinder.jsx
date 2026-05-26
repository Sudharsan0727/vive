import React from 'react';
import { Link } from 'react-router-dom';

const ProductFinder = () => {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Minimalist Discovery Bar */}
        <div className="bg-brand-cream/30 border border-brand-cream rounded-[40px] px-6 py-10 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-brand-magenta/20 transition-all duration-500 shadow-sm hover:shadow-md">
           
           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              {/* Animated Icon Box */}
              <div className="relative flex-shrink-0">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm transform group-hover:rotate-12 transition-transform duration-500">
                    🔍
                 </div>
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-magenta rounded-full border-2 border-white animate-pulse"></div>
              </div>

              {/* Text Content */}
              <div className="max-w-xs md:max-w-md">
                 <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark leading-tight">
                    Find the <span className="text-brand-magenta italic">right product</span> for you
                 </h3>
                 <p className="text-brand-dark/40 text-[10px] md:text-xs font-medium uppercase tracking-[0.1em] md:tracking-[0.2em] mt-2 leading-relaxed">
                    Take our quick 2-minute quiz to get personalized product recommendations
                 </p>
              </div>
           </div>
           
           {/* Action Section */}
            <div className="flex items-center justify-center gap-6 relative group">
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 animate-bounce-horizontal opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-magenta transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <Link 
                to="/quiz" 
                className="flex items-center gap-2 px-10 py-5 bg-brand-magenta text-white font-bold rounded-full hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-brand-magenta/20 text-[10px] md:text-xs uppercase tracking-[0.2em] whitespace-nowrap animate-soft-pulse animate-shimmer"
              >
                 Start Quiz
                 <span className="text-lg animate-bounce">👆</span>
              </Link>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ProductFinder;
