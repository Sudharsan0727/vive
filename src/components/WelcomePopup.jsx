import React, { useState, useEffect } from 'react';
import popupBg from '/boutique_popup_bg_1778236451144.png'; // Using the generated image

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('vive_welcome_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('vive_welcome_popup_seen', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-xl animate-in fade-in duration-700">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(45,27,36,0.3)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Editorial Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-brand-cream/10">
          <img 
            src={popupBg} 
            alt="Organic Botanicals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-magenta/10 to-transparent"></div>
          
          {/* Brand Logo Overlay */}
          <div className="absolute top-10 left-10">
            <span className="text-white font-serif text-3xl italic font-bold drop-shadow-lg">Vive</span>
          </div>
        </div>

        {/* Right Side: Narrative Content */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative bg-white">
          {/* Close Button */}
          <button 
            onClick={closePopup}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-brand-magenta/5 text-brand-magenta flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-all z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-xs mx-auto text-center md:text-left">
            <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">Boutique Exclusive</span>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-none mb-2">
               Welcome <br /> <span className="text-brand-magenta italic">Offer</span>
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 mt-4 font-medium">
              Join our sacred circle of organic beauty and enjoy a special gift on your first journey with us.
            </p>

            <div className="space-y-6 mb-10 text-left">
              {/* Offer Badge */}
              <div className="p-5 rounded-2xl bg-brand-magenta/5 border border-brand-magenta/10">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-brand-magenta font-bold text-lg">20% OFF</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-magenta/60">Code: VIVE20</span>
                 </div>
                 <p className="text-[11px] text-gray-400">Valid on all artisan products above ₹1,000</p>
              </div>

              {/* Masterclass Highlight */}
              <div className="flex items-start gap-4 p-2">
                 <div className="w-10 h-10 shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="text-brand-dark font-bold text-xs uppercase tracking-wider">Online Masterclasses</h4>
                    <p className="text-[11px] text-gray-400 leading-tight mt-1">Complimentary access to select modules for new members.</p>
                 </div>
              </div>
            </div>

            <button 
              onClick={closePopup}
              className="w-full py-5 bg-brand-magenta text-white font-bold rounded-2xl hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-brand-magenta/20 text-[10px] uppercase tracking-[0.3em]"
            >
              Start your Journey
            </button>
            
            <button 
              onClick={closePopup}
              className="mt-4 text-gray-400 text-[10px] uppercase tracking-widest hover:text-brand-magenta transition-colors"
            >
              No thanks, I'll browse first
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
