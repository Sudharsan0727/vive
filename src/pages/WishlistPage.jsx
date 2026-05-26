import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WishlistPage = () => {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    triggerFlyAnimation
  } = useStore();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMoveAllToBag = (e) => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart(item);
    });
    alert("All treasures successfully added to your Bag! ✨");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FDFBFB] to-[#FDFBFB] flex flex-col font-sans">
      <Navbar />
      
      {/* Main Container */}
      <div className="flex-1 w-full mx-auto px-4 md:px-8 pb-20 pt-24 md:pt-28 max-w-7xl">
        
        {/* Breadcrumb - Centered & Editorial */}
        <div className="text-[11px] font-sans font-bold tracking-widest text-[#8A1B5E] uppercase mb-4 text-center flex items-center justify-center gap-1.5">
          <a href="/" className="hover:text-brand-magenta transition-colors">Home</a>
          <span className="text-brand-gold/60">•</span>
          <span className="text-gray-400">Curated Wishlist</span>
        </div>

        {/* Header Block - Centered Luxury */}
        <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-dark tracking-wide leading-none">
            Sacred Wishlist
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-serif italic leading-relaxed">
            “A collection of botanical elixirs and sacred recipes curated for your personal daily beauty ritual.”
          </p>
          
          {wishlist.length > 0 && (
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-[11px] font-sans font-bold text-[#8A1B5E] bg-[#8A1B5E]/5 border border-[#8A1B5E]/10 px-4.5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                {wishlist.length} Curated Treasures
              </span>
              <button 
                onClick={handleMoveAllToBag}
                className="text-[10px] font-sans font-bold text-white bg-brand-dark border border-brand-dark hover:bg-brand-magenta hover:border-brand-magenta px-6 py-2 rounded-full uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Move All To Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          /* Elegant Empty State Card */
          <div className="max-w-md mx-auto bg-white border border-[#8A1B5E]/10 rounded-[32px] p-8 md:p-12 text-center shadow-sm space-y-6">
            <div className="w-24 h-24 bg-[#FAF6F0] rounded-full flex items-center justify-center text-[#8A1B5E] mx-auto shadow-sm border border-[#8A1B5E]/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-brand-dark">Your Wishlist is Empty</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                Explore our pure botanical recipes and save your favorites here.
              </p>
            </div>
            <a 
              href="/"
              className="inline-block px-8 py-3.5 bg-[#8A1B5E] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-full hover:bg-brand-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              Explore Collection
            </a>
          </div>
        ) : (
          /* Premium Custom-Designed Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="relative bg-white border border-[#8A1B5E]/10 rounded-[32px] p-4 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(138,27,94,0.06)] hover:border-[#8A1B5E]/20 transition-all duration-500 group overflow-hidden"
              >
                
                {/* Product Image Frame */}
                <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 relative shadow-sm mb-5 transition-transform duration-500">
                  
                  {/* Floating Glassmorphic Close Trigger */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-105 shadow-sm transition-all z-10 cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Organic Badge Overlay */}
                  <span className="absolute top-3.5 left-3.5 bg-[#FAF6F0] text-[#8A1B5E] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm z-10 border border-[#8A1B5E]/10 leading-none">
                    Pure Essence
                  </span>

                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-brand-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product Information */}
                <div className="flex-1 flex flex-col justify-between px-1">
                  <div className="mb-4 space-y-1">
                    <h4 className="text-[15px] font-serif font-bold text-brand-dark tracking-wide leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[13px] font-sans font-bold text-[#8A1B5E]">{item.price}</p>
                  </div>
                  
                  {/* Move to Bag Button */}
                  <button 
                    onClick={(e) => {
                      triggerFlyAnimation(e, item.image);
                      addToCart(item);
                    }}
                    className="w-full py-3.5 bg-[#8A1B5E] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-2xl hover:bg-[#8A1B5E]/90 shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
