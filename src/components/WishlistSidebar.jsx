import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const WishlistSidebar = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart,
    isWishlistOpen, 
    setIsWishlistOpen,
    wishlistCount,
    triggerFlyAnimation
  } = useStore();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isWishlistOpen]);

  return (
    <>
      {isWishlistOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/40 z-[100] backdrop-blur-sm transition-opacity"
          onClick={() => setIsWishlistOpen(false)}
        ></div>
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isWishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-magenta/5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif font-bold text-brand-dark">Wishlist</h2>
              <span className="bg-brand-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>
            </div>
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-brand-dark hover:text-brand-magenta hover:bg-brand-magenta/5 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F9F9F9]">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-dark">Your wishlist is empty</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">Save items you love to find them later.</p>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-8 py-3 bg-[#8A1B5E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="relative bg-white border border-[#F5E6E8] rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                  
                  {/* Remove Button in Top Right */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3.5 right-3.5 text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm relative transition-transform duration-300 group-hover:scale-[1.02]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-2">
                      <h4 className="text-[14px] font-serif font-bold text-brand-dark line-clamp-1 pr-6 tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-[12px] font-sans font-bold text-[#8A1B5E] mt-1">{item.price}</p>
                    </div>
                    
                    {/* Move to Bag Button */}
                    <button 
                      onClick={(e) => {
                        triggerFlyAnimation(e, item.image);
                        addToCart(item);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-[#8A1B5E] to-[#B02875] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-xl hover:from-[#B02875] hover:to-[#8A1B5E] shadow-sm hover:shadow active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
