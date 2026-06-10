"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useStore } from '@/context/StoreContext';
import { BESTSELLERS, FEATURED_PRODUCTS } from '@/constants/BrandAssets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateSize,
    cartTotal,
    cartCount,
    wishlist,
    toggleWishlist,
    appliedPromo,
    promoDiscount,
    promoError,
    setPromoError,
    applyPromoCode,
    removePromoCode,
    shippingCost,
    setShippingCost
  } = useStore();

  const [selectedItems, setSelectedItems] = useState([]);
  const [activeRemoveItem, setActiveRemoveItem] = useState(null);
  const [activeSelector, setActiveSelector] = useState(null);
  const [promoInput, setPromoInput] = useState('');

  // Auto-select all items on initial mount / cart load
  useEffect(() => {
    if (cart.length > 0 && selectedItems.length === 0) {
      setSelectedItems(cart.map(item => item.id));
    }
  }, [cart]);

  // Scroll to the top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => item.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Bulk actions for selected items
  const removeSelected = () => {
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
  };

  const moveSelectedToWishlist = () => {
    selectedItems.forEach(id => {
      const item = cart.find(i => i.id === id);
      if (item) {
        const inWishlist = wishlist.some(w => w.id === id);
        if (!inWishlist) {
          toggleWishlist(item);
        }
        removeFromCart(id);
      }
    });
    setSelectedItems([]);
  };

  // Custom premium checkbox component
  const CustomCheckbox = ({ checked, onChange }) => (
    <div 
      onClick={onChange}
      className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer border transition-all duration-200 ${
        checked 
          ? 'bg-[#8A1B5E] border-[#8A1B5E] text-white shadow-sm' 
          : 'border-gray-300 bg-white hover:border-[#8A1B5E]'
      }`}
    >
      {checked && (
        <svg className="w-3.5 h-3.5 stroke-[3.5] stroke-current animate-scale-up" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )}
    </div>
  );

  const allProducts = [...BESTSELLERS, ...FEATURED_PRODUCTS];

  // Dynamic recommendations: show products not in the cart
  const getCartRecommendations = () => {
    const inCartIds = cart.map(item => item.id);
    const filtered = allProducts.filter(p => !inCartIds.includes(p.id));
    return filtered.slice(0, 4);
  };

  const loyaltyPointsEarned = Math.round((cartTotal - promoDiscount) * 0.1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1450px] mx-auto px-4 sm:px-10 lg:px-16 py-12 md:py-16 w-full animate-fade-in">
        
        {/* Page Title */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-3 block">Your Wellness Selection</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
            Your Sacred <span className="text-brand-magenta italic relative">
              Bag
              <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-md mx-auto bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
            <div className="w-24 h-24 bg-brand-cream/50 rounded-full flex items-center justify-center text-brand-magenta mx-auto shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-brand-dark">Your bag feels light</h2>
              <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed">Fill it with sacred self-care remedies, active serums, and botanical oils to start your ritual.</p>
            </div>
            <Link  href="/"
              className="inline-block px-10 py-4 bg-brand-magenta text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95"
            >
              Discover Remedies
            </Link>
          </div>
        ) : (
          /* Cart Page Columns */
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Column 1: Items List */}
            <div className="w-full lg:w-[70%] space-y-6">
              
              {/* Selection Bar */}
              <div className="flex items-center justify-between pb-4 mb-2 font-sans border-b border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <CustomCheckbox 
                    checked={selectedItems.length === cart.length && cart.length > 0}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-[13px] md:text-[15px] font-bold text-[#282c3f] tracking-wide">
                    {selectedItems.length}/{cart.length} ITEMS SELECTED
                  </span>
                </label>
                <div className="flex items-center gap-3 md:gap-4 hidden sm:flex">
                  <button 
                    onClick={removeSelected}
                    disabled={selectedItems.length === 0}
                    className="text-[12px] md:text-[13px] font-bold text-gray-500 hover:text-brand-dark tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    REMOVE
                  </button>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <button 
                    onClick={moveSelectedToWishlist}
                    disabled={selectedItems.length === 0}
                    className="text-[12px] md:text-[13px] font-bold text-gray-500 hover:text-brand-dark tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    MOVE TO WISHLIST
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item) => {
                  const unitPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                  const totalPrice = unitPrice * item.quantity;
                  const totalMrp = Math.round(unitPrice * 1.2) * item.quantity;
                  const discountPercent = Math.round(((totalMrp - totalPrice) / totalMrp) * 100);

                  return (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-md p-3 md:p-4 relative flex gap-5 md:gap-8 font-sans shadow-sm">
                      
                      {/* Checkbox overlay on Image for mobile, top-left for desktop */}
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                        <CustomCheckbox 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                        />
                      </div>
                      
                      {/* Image */}
                      <Link  href={`/product/${item.id}`} className="w-[100px] sm:w-[130px] md:w-[150px] aspect-[3/4] bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex-shrink-0 relative">
                        <img src={typeof (item.image) === 'object' ? (item.image)?.src : (item.image)} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </Link>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-start pt-1.5 md:pt-2.5">
                        {/* Remove Button */}
                        <button 
                          onClick={() => setActiveRemoveItem(item)}
                          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-800 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <h3 className="text-[16px] md:text-[18px] font-extrabold text-[#282c3f] mb-0.5 leading-none pt-1 md:pt-0">{item.name.split(' ')[0]}</h3>
                        <Link  href={`/product/${item.id}`} className="text-[18px] md:text-[20px] font-semibold text-gray-700 hover:text-brand-magenta transition-colors line-clamp-1 mb-1 pr-6 md:pr-8">
                          {item.name}
                        </Link>
                        <p className="text-[11px] md:text-[12px] text-gray-400 mb-3">Sold by: Vive Beauty</p>
                        
                        {/* Selectors */}
                        <div className="flex items-center gap-2 md:gap-3 mb-4">
                          <button 
                            onClick={() => setActiveSelector({ item, type: 'size' })}
                            className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2 py-1 md:py-1.5 rounded text-[12px] md:text-[14px] font-bold text-brand-dark transition-colors cursor-pointer"
                          >
                            Size: {item.selectedSize || '30ml'}
                            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <button 
                            onClick={() => setActiveSelector({ item, type: 'qty' })}
                            className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2 py-1 md:py-1.5 rounded text-[12px] md:text-[14px] font-bold text-brand-dark transition-colors cursor-pointer"
                          >
                            Qty: {item.quantity}
                            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-2 md:mb-3 mt-1 md:mt-2">
                          <span className="text-[14px] md:text-[16px] font-bold text-[#282c3f]">₹{totalPrice.toLocaleString()}</span>
                          <span className="text-[12px] md:text-[14px] text-gray-400 line-through">₹{totalMrp.toLocaleString()}</span>
                          <span className="text-[12px] md:text-[14px] font-bold text-[#ff905a]">{discountPercent}% OFF</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add More from Wishlist */}
              <Link  href="/wishlist" className="block w-full mt-4">
                <button className="w-full bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between text-[#282c3f] hover:shadow-sm transition-shadow font-sans cursor-pointer">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    <span className="text-[14px] md:text-[15px] font-bold">Add More From Wishlist</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </Link>


            </div>

            {/* Column 2: Cart Summary Box */}
            <div className="w-full lg:w-[30%] sticky top-36">
              
              <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-4">
                
                <h3 className="text-xl font-serif font-bold text-brand-dark pb-3 border-b border-gray-100">Order Summary</h3>
                
                {/* Dynamic Loyalty Badge - Extremely Compact */}
                <div className="bg-brand-cream/40 border border-brand-gold/30 rounded-xl p-2.5 px-3 flex items-center gap-2 shadow-sm">
                  <span className="text-sm text-brand-gold leading-none">✨</span>
                  <p className="text-[11px] text-gray-600 font-medium">
                    Earn <span className="font-bold text-brand-magenta">{loyaltyPointsEarned} Loyalty Points</span> on this purchase!
                  </p>
                </div>

                {/* Courier Shipping Selection */}
                <div className="space-y-2 pt-3 border-t border-gray-100 font-sans">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">Select Shipping Partner</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div 
                      onClick={() => setShippingCost(40)}
                      className={`border-[2px] rounded-xl p-2 flex flex-col justify-between cursor-pointer transition-all hover:bg-gray-50/50 ${
                        shippingCost === 40
                          ? 'border-brand-magenta bg-[#8A1B5E]/5 shadow-sm scale-[1.01]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-brand-dark">ST Courier</span>
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${shippingCost === 40 ? 'border-brand-magenta' : 'border-gray-300'}`}>
                          {shippingCost === 40 && <div className="w-1.5 h-1.5 bg-brand-magenta rounded-full"></div>}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-brand-magenta mt-1">₹40</span>
                    </div>

                    <div 
                      onClick={() => setShippingCost(60)}
                      className={`border-[2px] rounded-xl p-2 flex flex-col justify-between cursor-pointer transition-all hover:bg-gray-50/50 ${
                        shippingCost === 60
                          ? 'border-brand-magenta bg-[#8A1B5E]/5 shadow-sm scale-[1.01]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-brand-dark">Professional</span>
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${shippingCost === 60 ? 'border-brand-magenta' : 'border-gray-300'}`}>
                          {shippingCost === 60 && <div className="w-1.5 h-1.5 bg-brand-magenta rounded-full"></div>}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-brand-magenta mt-1">₹60</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-[13px] md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Subtotal ({cartCount} items)</span>
                    <span className="text-brand-dark font-display font-semibold text-[14px] md:text-[15px]">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-₹{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Shipping ({shippingCost === 40 ? 'ST Courier' : 'Professional'})</span>
                    <span className="text-brand-dark font-semibold">₹{shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Tax Details</span>
                    <span className="text-gray-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider">Included</span>
                  </div>
                  
                  <div className="pt-3.5 border-t border-gray-100 flex justify-between items-end">
                    <span className="text-brand-dark font-bold text-sm md:text-base">Grand Total</span>
                    <div className="text-right">
                      <span className="text-xl md:text-2xl font-display font-bold text-brand-magenta">₹{(cartTotal - promoDiscount + shippingCost).toLocaleString()}</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">Inclusive of GST and local taxes</p>
                    </div>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">Apply Promo Code</label>
                  <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-magenta/30 bg-white">
                    <input 
                      type="text" 
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        if (promoError) setPromoError('');
                      }}
                      placeholder="e.g. VIVE15" 
                      className="w-full px-3 py-2 text-xs text-brand-dark focus:outline-none uppercase font-semibold"
                    />
                    <button 
                      onClick={() => {
                        applyPromoCode(promoInput);
                      }}
                      className="bg-brand-magenta text-white px-4 text-xs font-bold hover:bg-brand-dark transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] font-bold text-red-600 mt-1">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <div className="mt-2 bg-green-50 border border-green-200/50 rounded-xl p-2.5 flex items-center justify-between text-xs font-bold text-green-700 font-sans shadow-sm animate-fade-in">
                      <span className="flex items-center gap-1.5">
                        🎟️ <span className="font-serif font-black tracking-wider text-[#8A1B5E]">{appliedPromo}</span> Applied!
                      </span>
                      <button 
                        onClick={() => {
                          removePromoCode();
                          setPromoInput('');
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors font-bold cursor-pointer uppercase tracking-wider scale-95"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Action Checkout Button */}
                <Link  href="/checkout" onClick={() => window.scrollTo(0, 0)} className="block w-full">
                  <button className="w-full py-3 bg-brand-magenta text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 shadow-xl shadow-brand-magenta/15 flex items-center justify-center gap-3 cursor-pointer">
                    Proceed to Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>

                <div className="text-center pt-2">
                  <Link  href="/" 
                    className="text-xs text-brand-magenta hover:text-brand-dark font-bold underline underline-offset-4"
                  >
                    ← Continue Shopping
                  </Link>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Complete the Ritual Slider (Recommended add-ons) */}
        {cart.length > 0 && (
          <section className="mt-24 border-t border-gray-200 pt-16">
            <div className="text-center mb-14">
               <span className="text-brand-magenta font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Complete the Ritual</span>
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
                  Sacred <span className="text-brand-magenta italic relative">
                    Pairings
                    <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getCartRecommendations().map((relProduct) => (
                <Link 
                  key={relProduct.id} 
                  to={`/product/${relProduct.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-[0_20px_40px_rgba(138,27,94,0.06)] hover:border-brand-magenta/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4 mb-4">
                      <img 
                        src={typeof (relProduct.image) === 'object' ? (relProduct.image)?.src : (relProduct.image)} 
                        alt={relProduct.name} 
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Dynamic Badge */}
                      <span className="absolute top-4 left-4 bg-brand-magenta text-white text-[9px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase shadow-sm">
                        {relProduct.name.toLowerCase().includes('oil') || relProduct.name.toLowerCase().includes('kumkumadi') ? 'Best Seller' : 'Organic'}
                      </span>
                    </div>

                    {/* Meta */}
                    <span className="text-[9px] font-bold tracking-widest text-brand-magenta uppercase block mb-1">
                      {relProduct.name.toLowerCase().includes('hair') || relProduct.name.toLowerCase().includes('shampoo') || relProduct.name.toLowerCase().includes('conditioner') ? 'Hair Care' : 'Face Care'}
                    </span>
                    <h3 className="text-[15px] font-serif font-bold text-brand-dark group-hover:text-brand-magenta transition-colors line-clamp-2 leading-snug mb-2">
                      {relProduct.name}
                    </h3>
                  </div>

                  <div>
                    {/* Price and Action */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <div>
                        <span className="text-xs text-gray-400 block line-through">
                          ₹{Math.round((parseInt(relProduct.price.replace(/[^\d]/g, ''), 10) || 0) * 1.2)}
                        </span>
                        <span className="text-base font-semibold text-brand-dark">
                          {relProduct.price}
                        </span>
                      </div>
                      
                      <span className="bg-brand-magenta/5 group-hover:bg-brand-magenta text-brand-magenta group-hover:text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all">
                        View Ritual
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Move from Bag Confirmation Modal */}
      {activeRemoveItem && (
        <div className="fixed inset-0 bg-black/50 z-[150] flex items-center justify-center p-4">
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0" 
            onClick={() => setActiveRemoveItem(null)}
          />
          
          {/* Modal Container */}
          <div className="bg-white rounded-md max-w-sm sm:max-w-md w-[90%] sm:w-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden font-sans animate-scale-up">
            
            {/* Header Content */}
            <div className="p-5 flex gap-4 pr-10 relative">
              {/* Product Thumbnail */}
              <div className="w-14 h-20 bg-gray-50 rounded border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                <img src={typeof (activeRemoveItem.image) === 'object' ? (activeRemoveItem.image)?.src : (activeRemoveItem.image)} alt={activeRemoveItem.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>
              
              {/* Text */}
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-[18px] sm:text-[19px] font-extrabold text-[#282c3f] leading-none mb-1.5">Move from Bag</h4>
                <p className="text-[13px] text-gray-500 leading-normal">
                  Are you sure you want to move this item from bag?
                </p>
              </div>

              {/* Close Icon */}
              <button 
                onClick={() => setActiveRemoveItem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gray-200"></div>

            {/* Action Buttons */}
            <div className="flex items-center">
              <button 
                onClick={() => {
                  removeFromCart(activeRemoveItem.id);
                  setActiveRemoveItem(null);
                }}
                className="w-1/2 text-center py-4 text-[13px] font-bold text-gray-500 hover:text-gray-800 tracking-wider transition-colors border-r border-gray-200"
              >
                REMOVE
              </button>
              <button 
                onClick={() => {
                  const inWishlist = wishlist.some(item => item.id === activeRemoveItem.id);
                  if (!inWishlist) {
                    toggleWishlist(activeRemoveItem);
                  }
                  removeFromCart(activeRemoveItem.id);
                  setActiveRemoveItem(null);
                }}
                className="w-1/2 text-center py-4 text-[13px] font-bold text-brand-magenta hover:text-brand-dark tracking-wider transition-colors"
              >
                MOVE TO WISHLIST
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Size / Qty Select Modal Popup */}
      {activeSelector && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center font-sans animate-fade-in">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setActiveSelector(null)}
            className="absolute inset-0 bg-[#1E2229]/60 backdrop-blur-sm transition-opacity duration-300"
          ></div>
          
          {/* Modal Card */}
          <div className="relative w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] border border-[#8A1B5E]/10 p-6 md:p-8 shadow-2xl transition-all duration-300 transform translate-y-0 scale-100 max-h-[85vh] overflow-y-auto z-10 animate-slide-up-modal">
            {/* Elegant Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h4 className="text-xs font-sans font-bold text-[#8A1B5E] tracking-widest uppercase mb-1">
                  Select {activeSelector.type === 'size' ? 'Product Size' : 'Quantity'}
                </h4>
                <h3 className="text-lg font-serif font-bold text-brand-dark line-clamp-1 pr-6">
                  {activeSelector.item.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveSelector(null)}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-dark transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Selector Options Grid */}
            {activeSelector.type === 'size' ? (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {(() => {
                  const originalProduct = [...BESTSELLERS, ...FEATURED_PRODUCTS].find(p => p.id === activeSelector.item.id) || activeSelector.item;
                  const unit = (originalProduct.netQuantity || '100 ml').toLowerCase().includes('g') ? 'g' : 'ml';
                  const baseQty = parseInt(originalProduct.netQuantity) || 100;
                  
                  const variant0 = `${baseQty} ${unit}`;
                  const variant1 = `${Math.round(baseQty * 1.5)} ${unit}`;
                  const variant2 = `${baseQty * 2} ${unit}`;
                  
                  return [variant0, variant1, variant2].map((size) => {
                    const isCurrent = (activeSelector.item.selectedSize || variant0).toLowerCase().replace(/\s/g, '') === size.toLowerCase().replace(/\s/g, '');
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          updateSize(activeSelector.item.id, size);
                          setActiveSelector(null);
                        }}
                        className={`py-3.5 rounded-2xl text-xs font-sans font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#8A1B5E] text-white border-[#8A1B5E] shadow-md shadow-[#8A1B5E]/20'
                            : 'bg-white text-brand-dark border-gray-200 hover:border-[#8A1B5E]/30 hover:bg-gray-50/50'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => {
                  const isCurrent = activeSelector.item.quantity === qty;
                  return (
                    <button
                      key={qty}
                      onClick={() => {
                        updateQuantity(activeSelector.item.id, qty);
                        setActiveSelector(null);
                      }}
                      className={`py-3 rounded-2xl text-xs font-sans font-bold border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#8A1B5E] text-white border-[#8A1B5E] shadow-md shadow-[#8A1B5E]/20'
                          : 'bg-white text-brand-dark border-gray-200 hover:border-[#8A1B5E]/30 hover:bg-gray-50/50'
                      }`}
                    >
                      {qty}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
