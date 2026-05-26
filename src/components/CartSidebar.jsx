import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

// Helper to dynamically format coupon codes with letter part in Serif and number part in Sans-Serif
const formatCouponCode = (code) => {
  if (!code) return '';
  const letters = code.replace(/[0-9]/g, '');
  const numbers = code.replace(/[^0-9]/g, '');
  return (
    <>
      {letters}
      {numbers && <span className="font-sans font-bold">{numbers}</span>}
    </>
  );
};

const CartSidebar = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen,
    cartCount,
    appliedPromo,
    promoDiscount,
    promoError,
    applyPromoCode,
    removePromoCode
  } = useStore();

  const [activeQuantityItem, setActiveQuantityItem] = useState(null);
  const [showCustomQuantity, setShowCustomQuantity] = useState(false);
  const [customQuantityValue, setCustomQuantityValue] = useState("1");
  const [priceDetailsItem, setPriceDetailsItem] = useState(null);
  const [showCouponsPanel, setShowCouponsPanel] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  // Prevent background scrolling when cart is open, and reset sub-panels when closed
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowCouponsPanel(false); // Reset to main cart view when sidebar is closed
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/40 z-[100] backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Coupons & Offers slide-in panel */}
          <div 
            className={`absolute top-0 right-0 w-full h-full bg-white z-[120] flex flex-col transition-transform duration-300 ease-in-out ${
              showCouponsPanel ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white font-sans">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCouponsPanel(false)}
                  className="p-1 text-gray-500 hover:text-brand-magenta hover:bg-gray-50 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h3 className="text-[17px] font-bold text-brand-dark tracking-wide">Coupons & Offers</h3>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#F9F9F9] font-sans">
              {/* Coupon Search Box */}
              <div className="bg-white rounded-xl p-3 px-4 flex items-center justify-between border border-gray-200/50 shadow-sm">
                <input 
                  type="text" 
                  placeholder="Enter Coupon Code" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="bg-transparent outline-none w-full text-[13px] font-semibold text-brand-dark placeholder-gray-400"
                />
                <button 
                  disabled={!couponInput.trim()}
                  onClick={() => {
                    const result = applyPromoCode(couponInput);
                    if (result.success) {
                      alert(`Coupon "${couponInput.toUpperCase()}" successfully applied! ✨`);
                      setShowCouponsPanel(false);
                      setCouponInput("");
                    } else {
                      alert(result.error || "This coupon is invalid.");
                    }
                  }}
                  className={`font-extrabold text-[12px] uppercase tracking-wider ml-3 flex-shrink-0 transition-all ${
                    couponInput.trim() 
                      ? 'text-[#8A1B5E] hover:text-[#8A1B5E]/80 cursor-pointer active:scale-95' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Collect
                </button>
              </div>

              {/* Offers Header Title */}
              <div>
                <h4 className="text-[18px] font-black text-black leading-none mb-2">Collect any 1 of these</h4>
                <p className="text-[12px] font-bold text-gray-700">To get extra off or other offers on your bag!</p>
              </div>

              {/* Luxury Gold & Plum Editorial Coupon Card */}
              <div className="relative border border-[#8A1B5E]/10 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:border-[#8A1B5E]/20 transition-all duration-300">
                
                {/* Upper Content */}
                <div className="p-5 pb-4 flex gap-4">
                  {/* Brand Typography Badge */}
                  <div className="w-14 h-14 bg-[#FAF6F0] rounded-xl border border-brand-cream/50 flex-shrink-0 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[13px] font-serif font-black tracking-widest text-[#8A1B5E] leading-none mb-0.5">VIVE</span>
                    <span className="text-[8px] font-sans font-bold text-gray-400 uppercase tracking-widest scale-90">Est.2026</span>
                  </div>
                  
                  {/* Coupon Details */}
                  <div className="flex-1">
                    <h5 className="text-[16px] font-serif font-bold text-brand-dark leading-snug tracking-wide mb-1">
                      Extra <span className="font-sans font-bold text-[#8A1B5E]">15%</span> Off upto <span className="font-sans font-bold text-[#8A1B5E]">₹300</span>
                    </h5>
                    <p className="text-[12px] font-sans text-gray-500 leading-snug font-medium">
                      Valid on your 1st order above ₹299+
                    </p>
                    
                    {/* Brand Relevant Code Box */}
                    <div className="flex items-center justify-between mt-3.5 bg-[#8A1B5E]/5 border border-[#8A1B5E]/10 rounded-xl p-2.5 px-4">
                      <span className="text-[14px] font-serif font-black text-[#8A1B5E] tracking-widest">
                        {formatCouponCode("VIVE15")}
                      </span>
                      <button 
                        onClick={() => {
                          const result = applyPromoCode("VIVE15");
                          if (result.success) {
                            alert("Coupon VIVE15 successfully applied! ✨");
                            setShowCouponsPanel(false);
                          } else {
                            alert(result.error || "This coupon is invalid.");
                          }
                        }}
                        className="text-[12px] font-sans font-black text-[#8A1B5E] hover:text-[#8A1B5E]/80 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Mathematically-aligned Scalloped Ticket Divider Row */}
                <div className="relative flex items-center h-4 my-0.5">
                  {/* Left scallop notch */}
                  <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-[#F9F9F9] border-r border-[#8A1B5E]/10 z-10"></div>
                  
                  {/* Dashed line centered vertically */}
                  <div className="w-full border-t border-dashed border-[#8A1B5E]/20 mx-4"></div>
                  
                  {/* Right scallop notch */}
                  <div className="absolute right-[-8px] w-4 h-4 rounded-full bg-[#F9F9F9] border-l border-[#8A1B5E]/10 z-10"></div>
                </div>
                
                {/* Coupon Bottom Trigger */}
                <div className="bg-[#FAF6F0] px-5 py-3.5 flex items-center justify-between text-[12px] font-serif font-bold text-[#8A1B5E] cursor-pointer hover:bg-[#F5EDE2] transition-colors">
                  <span className="tracking-wide">Shop more to use this Coupon</span>
                  <svg className="w-3.5 h-3.5 text-[#8A1B5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Sign-In Banner */}
            <div className="border-t border-gray-100 p-5 bg-white flex items-center justify-between font-sans shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
              <div>
                <h5 className="text-[14px] font-extrabold text-[#282c3f] leading-none mb-1">
                  {isSignedIn ? 'Signed in' : 'Sign in'}
                </h5>
                <p className="text-[11px] text-gray-500">
                  {isSignedIn ? 'showing all coupons' : 'to view more Coupons'}
                </p>
              </div>
              <button 
                onClick={() => setIsSignedIn(true)}
                disabled={isSignedIn}
                className={`text-[11px] font-extrabold uppercase tracking-widest px-6 py-2.5 rounded-lg shadow-sm transition-all transform ${
                  isSignedIn 
                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none active:scale-100' 
                    : 'bg-[#FF2768] hover:bg-[#E61F5B] text-white active:scale-95'
                }`}
              >
                {isSignedIn ? 'Signed In' : 'Sign In'}
              </button>
            </div>
          </div>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-cream/10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif font-bold text-brand-dark">Your Bag</h2>
              <span className="bg-brand-magenta text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-brand-dark hover:text-brand-magenta hover:bg-brand-magenta/5 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List & Scrollable Prompts */}
          <div className="flex-1 overflow-y-auto bg-[#F9F9F9]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-white p-6">
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-dark">Your bag is empty</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">Looks like you haven't added anything yet.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3 bg-brand-magenta text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Top Prompts */}
                <div className="px-6 pt-2 pb-2 space-y-3">
                  {/* Login/Register Prompts */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h4 className="font-serif text-[12px] text-brand-dark font-bold tracking-wide">
                      {isSignedIn ? 'Welcome to Vive Beauty!' : 'Get Started & grab best offers!'}
                    </h4>
                    <button 
                      onClick={() => setIsSignedIn(true)}
                      disabled={isSignedIn}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest flex-shrink-0 ml-3 transition-all ${
                        isSignedIn 
                          ? 'text-gray-400 border border-gray-200 bg-gray-50 cursor-not-allowed'
                          : 'text-brand-magenta border border-brand-magenta hover:bg-brand-magenta hover:text-white hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isSignedIn ? 'SIGNED IN' : 'LOGIN / REGISTER'}
                    </button>
                  </div>

                  {/* Coupons */}
                  <div 
                    onClick={() => setShowCouponsPanel(true)}
                    className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-brand-magenta/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                      </div>
                      <div>
                        <h4 className="font-serif text-[13px] font-bold text-brand-dark mb-0.5 tracking-wide">Coupons</h4>
                        <p className="text-[10px] text-brand-magenta font-medium">Apply now and save extra!</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>

                {/* Items Section (White Background) */}
                <div className="px-6 py-4 space-y-4 bg-white shadow-sm pb-6 border-b border-gray-100">
                  {cart.map((item) => {
                    const numericPrice = parseInt(item.price.replace(/\D/g, '')) || 0;
                    const mrp = Math.round(numericPrice * 1.2);
                    const discountPercent = Math.round(((mrp - numericPrice) / mrp) * 100);

                    return (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-shadow">
                        
                        {/* Top Section */}
                        <div className="p-4 flex gap-4">
                          <div className="w-16 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center p-1 border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <h4 className="text-[14px] font-sans text-brand-dark leading-tight pr-2">{item.name}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors mt-0.5 flex-shrink-0"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="flex items-center text-[12px] text-brand-dark/70 mb-2 gap-2 font-medium">
                              <span>30ml</span>
                              <span className="w-[1px] h-3 bg-gray-300"></span>
                              <span>30ml</span>
                            </div>
                            
                            <div className="mt-auto pt-1">
                              <button 
                                onClick={() => setActiveQuantityItem(item)}
                                className="inline-flex items-center text-[13px] text-brand-dark font-medium cursor-pointer hover:text-brand-magenta transition-colors"
                              >
                                Quantity : {item.quantity}
                                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="border-t border-gray-100 bg-white p-3 px-4 flex justify-between items-center">
                          <button 
                            onClick={() => setPriceDetailsItem({ item, mrp, discountPercent })}
                            className="flex items-center text-[13px] font-medium text-brand-dark cursor-pointer group/price"
                          >
                            You Pay 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] ml-1.5 text-gray-400 group-hover/price:text-brand-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[14px] font-bold text-brand-dark">{item.price}</span>
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{mrp.toLocaleString()}
                            </span>
                            <span className="text-[11px] font-bold text-green-700">{discountPercent}% off</span>
                          </div>
                        </div>
                        
                      </div>
                    );
                  })}
                </div>


              </>
            )}
          </div>

          {/* Fixed Footer (Total & Checkout) */}
          {cart.length > 0 && (
            <div className="flex-shrink-0 bg-[#F9F9F9] border-t border-gray-200/80 px-6 py-4 flex flex-col gap-4 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
              
              {appliedPromo && (
                <div className="flex justify-between text-green-600 font-bold text-xs -mt-1 font-sans">
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-₹{promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-end mb-1">
                <span className="text-brand-dark font-bold text-lg font-sans">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand-magenta leading-none font-sans">₹{(cartTotal - promoDiscount).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5 font-medium">Inclusive of all taxes</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Link 
                    to="/cart"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="w-1/2 py-3.5 border border-brand-magenta text-brand-magenta text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-magenta/5 transition-all flex items-center justify-center bg-transparent text-center"
                  >
                    View Bag
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="w-1/2 py-3.5 bg-brand-magenta text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all shadow-md flex items-center justify-center gap-1.5 text-center cursor-pointer"
                  >
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quantity Bottom Drawer */}
      {activeQuantityItem && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-[120] transition-opacity"
            onClick={() => {
              setActiveQuantityItem(null);
              setShowCustomQuantity(false);
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:w-[400px] bg-white rounded-t-3xl z-[130] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 transform translate-y-0">
            <div className="p-4 pb-2 flex flex-col max-h-[60vh]">
              {/* Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
              
              <h3 className="text-lg font-bold text-brand-dark px-2 mb-2 border-b border-gray-100 pb-2.5">Select Quantity</h3>
              
              {!showCustomQuantity ? (
                <div className="overflow-y-auto px-2">
                  {[1, 2, 3, 4, 5, "5+"].map((num) => (
                    <button 
                      key={num}
                      onClick={() => {
                        if (num === "5+") {
                          setShowCustomQuantity(true);
                          setCustomQuantityValue(activeQuantityItem.quantity.toString());
                        } else {
                          updateQuantity(activeQuantityItem.id, num);
                          setActiveQuantityItem(null);
                        }
                      }}
                      className="w-full flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-[2px] ${activeQuantityItem.quantity === num ? 'border-brand-magenta' : 'border-gray-300'}`}>
                        {activeQuantityItem.quantity === num && (
                          <div className="w-2.5 h-2.5 bg-brand-magenta rounded-full"></div>
                        )}
                      </div>
                      <span className="text-[15px] text-brand-dark font-medium">{num}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-2 pt-2 pb-4">
                  <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-3 pt-2 mb-6">
                    <label className="text-[11px] text-gray-500 block mb-0.5">Enter Quantity(Max 10)</label>
                    <input 
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      pattern="[0-9]*"
                      value={customQuantityValue}
                      onKeyDown={(e) => {
                        // Prevent decimals, scientific notation, and signs
                        if (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === '+' || e.key === '-') {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        // Strip any non-digits (blocks pasted decimals)
                        const cleaned = val.replace(/[^0-9]/g, '');
                        // Clamp value to max 10
                        if (cleaned !== '' && parseInt(cleaned) > 10) {
                          setCustomQuantityValue('10');
                        } else {
                          setCustomQuantityValue(cleaned);
                        }
                      }}
                      className="w-full bg-transparent outline-none text-[16px] font-medium text-brand-dark"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowCustomQuantity(false)}
                      className="w-1/2 py-3 border border-gray-200 text-brand-magenta font-bold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        const val = parseInt(customQuantityValue);
                        if (!isNaN(val) && val > 0 && val <= 10) {
                          updateQuantity(activeQuantityItem.id, val);
                          setActiveQuantityItem(null);
                          setShowCustomQuantity(false);
                        }
                      }}
                      disabled={!customQuantityValue || parseInt(customQuantityValue) > 10 || parseInt(customQuantityValue) < 1}
                      className={`w-1/2 py-3 font-bold rounded-xl shadow-sm transition-all ${
                        !customQuantityValue || parseInt(customQuantityValue) > 10 || parseInt(customQuantityValue) < 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-brand-magenta text-white hover:bg-brand-dark'
                      }`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Product Price Details Drawer */}
      {priceDetailsItem && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-[120] transition-opacity"
            onClick={() => setPriceDetailsItem(null)}
          />
          <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:w-[400px] bg-white rounded-t-3xl z-[130] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 transform translate-y-0">
            <div className="p-5 pb-6 flex flex-col">
              {/* Close Button */}
              <button 
                onClick={() => setPriceDetailsItem(null)}
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors mb-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Product Price</h3>
              
              <div className="space-y-3 mb-4 font-sans">
                <div className="flex justify-between items-center text-[13px] text-brand-dark">
                  <span>MRP</span>
                  <span className="font-medium">₹{priceDetailsItem.mrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-brand-dark">
                  <span>Discount on MRP</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-brand-dark">
                  <span>{priceDetailsItem.item.name.split(' ')[0]} {priceDetailsItem.discountPercent}% off</span>
                  <span className="text-[#008f5d] font-bold">-₹{(priceDetailsItem.mrp - parseInt(priceDetailsItem.item.price.replace(/\D/g, ''))).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center font-sans">
                <span className="text-[15px] font-bold text-brand-dark">You'll pay</span>
                <span className="text-[16px] font-bold text-brand-dark">₹{parseInt(priceDetailsItem.item.price.replace(/\D/g, '')).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartSidebar;