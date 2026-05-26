import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import logoImg from '../assets/logo.jpg';

const WhatsAppWidget = () => {
  const { isCartOpen, isWishlistOpen } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScrolledToTopProduct, setIsScrolledToTopProduct] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollAndRoute = () => {
      const isProduct = window.location.pathname.includes('/product/');
      // Hide the widget when scrolled near the top of the product details page to prevent blocking the purchase box
      if (isProduct && window.scrollY < 550) {
        setIsScrolledToTopProduct(true);
      } else {
        setIsScrolledToTopProduct(false);
      }
    };

    handleScrollAndRoute();

    window.addEventListener('scroll', handleScrollAndRoute);
    const interval = setInterval(handleScrollAndRoute, 250);

    return () => {
      window.removeEventListener('scroll', handleScrollAndRoute);
      clearInterval(interval);
    };
  }, []);

  const phoneNumber = "919962280608";
  const message = encodeURIComponent("Hello! I'm interested in Vive Beauty products. Can you help me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (isCartOpen || isWishlistOpen) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] font-sans transition-all duration-500 transform ${
      isScrolledToTopProduct 
        ? 'opacity-0 scale-75 pointer-events-none translate-y-10' 
        : 'opacity-100 scale-100 translate-y-0'
    }`}>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-full right-0 mb-4 w-48 bg-white p-4 rounded-2xl shadow-xl border border-brand-magenta/10 animate-fade-in-up">
          <p className="text-xs text-brand-dark font-medium leading-relaxed">
            Hi! 👋 Need help with your skincare routine?
          </p>
          <div className="absolute top-full right-6 w-3 h-3 bg-white border-r border-b border-brand-magenta/10 rotate-45 -translate-y-1.5"></div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md border border-brand-magenta/10 text-gray-400 hover:text-brand-magenta transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Chat Window */}
      <div 
        className={`absolute bottom-20 right-0 w-[320px] bg-white rounded-[32px] shadow-2xl border border-brand-magenta/10 overflow-hidden transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-magenta p-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-white">
              <img src={logoImg} alt="Vive Support" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-none mb-1">Vive Support</h3>
              <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">Typically replies in minutes</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-brand-cream/10">
          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-brand-magenta/5 mb-6">
            <p className="text-sm text-brand-dark/80 leading-relaxed">
              Hello! 👋 Welcome to Vive Beauty. <br/><br/>
              How can we assist you with your beauty ritual today?
            </p>
            <span className="text-[9px] text-gray-400 mt-2 block font-bold uppercase tracking-widest">Vive Concierge</span>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-500/20 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Start Conversation
          </a>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">End-to-End Encrypted</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 relative overflow-hidden group ${
          isOpen 
          ? 'bg-brand-dark rotate-90' 
          : 'bg-gradient-to-br from-[#25D366] to-[#128C7E] animate-whatsapp-glow'
        }`}
      >
        {/* Animated Background Shimmer */}
        {!isOpen && (
          <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
        )}
        
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
