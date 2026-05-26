import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen, toggleWishlist, wishlist, setIsWishlistOpen, triggerFlyAnimation } = useStore();
  const [added, setAdded] = useState(false);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    addToCart(product);
    triggerFlyAnimation(e, product.image);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-xl border-2 border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <Link to={`/product/${product.id}`} className="relative p-2 block">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Discount Badge */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">
        11% OFF
      </div>
 
      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className={`absolute top-3 left-3 md:top-4 md:left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md transition-all z-10 ${isInWishlist ? 'text-brand-magenta scale-110' : 'text-gray-400 hover:text-brand-magenta hover:scale-110'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Content Section */}
      <div className="pt-2 px-4 pb-4 flex flex-col flex-grow text-left">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-[11px] font-display font-medium text-gray-700">4.8</span>
          <span className="text-[11px] font-display text-gray-400">(18)</span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="hover:text-brand-magenta transition-colors">
          <h3 className="text-lg font-serif font-bold text-brand-dark leading-tight mb-1 line-clamp-2 h-12">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-gray-400 mb-3 line-clamp-1 font-medium italic">{product.description}</p>

        {/* Price Row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-display font-semibold text-brand-magenta tracking-tight">{product.price}</span>
          <span className="text-xs font-display text-brand-dark/30 line-through">₹{parseInt(product.price.replace(/[^\d]/g, '')) + 100}</span>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAddToCart}
          disabled={added}
          className={`mt-auto w-full py-4 ${added ? 'bg-green-600' : 'bg-brand-dark'} text-white text-[10px] font-bold uppercase rounded-xl hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-dark/10 flex items-center justify-center gap-2 tracking-[0.2em]`}
        >
           {added ? (
             <>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
               Added!
             </>
           ) : (
             <>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
               Add to Cart
             </>
           )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
