import React from 'react';
import { Link } from 'react-router-dom';

const QuizCTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-8 md:p-12 bg-brand-cream/20 rounded-[24px] md:rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-cream/50 relative overflow-hidden group">
           {/* Decorative Background Glow */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-magenta/5 rounded-full blur-3xl group-hover:bg-brand-magenta/10 transition-colors"></div>
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>

           <div className="space-y-4 text-center md:text-left relative z-10">
              <span className="text-brand-magenta font-bold tracking-[0.3em] uppercase text-[9px] block">Personalized Care</span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Can't find what you need?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-md">
                Every skin type is unique. Take our expert assessment to discover the perfect botanical ritual tailored specifically for your needs.
              </p>
           </div>

           <div className="relative z-10">
             <Link 
               to="/quiz"
               className="inline-flex items-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-brand-magenta text-white font-bold rounded-xl hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-2xl shadow-brand-magenta/20 text-xs uppercase tracking-widest whitespace-nowrap"
             >
                Start Your Assessment
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </Link>
           </div>
        </div>
      </div>
    </section>
  );
};

export default QuizCTA;
