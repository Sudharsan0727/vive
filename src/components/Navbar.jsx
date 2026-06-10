import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../constants/BrandAssets';
import { useStore } from '../context/StoreContext';
import logoImg from '../assets/logo.jpg';
import facecareImg from '../assets/VIVE Product/kumkumadi/single.jpg';
import footcareImg from '../assets/VIVE Product/Nalugumavu/single.jpg';
import lipcareImg from '../assets/VIVE Product/kumkumadi/oil.jpg';
import haircareImg from '../assets/VIVE Product/Hair oil/2.jpeg';
import soapImg from '../assets/VIVE Product/Nalugumavu/single.jpg';
import bodycareImg from '../assets/VIVE Product/Hair shampoo/1.jpeg';

const Navbar = () => {
  const { cartCount, setIsCartOpen, wishlistCount, setIsWishlistOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openSidebarSubmenu, setOpenSidebarSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCategoryOpen]);

  return (
    <div className="w-full z-50">
      {/* Top Utility Bar */}
      <div className="bg-brand-magenta text-white text-[10px] md:text-xs font-medium py-1.5 px-4 md:px-8 flex justify-between items-center relative z-50">
        <div className="hidden md:flex gap-6">
          <a href="/#" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Find a Store
          </a>
          <a href="/#" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Track Order
          </a>
        </div>
        <div className="text-center flex-1 tracking-wider uppercase font-bold text-brand-gold animate-pulse">
          Use Code VIVE20 for 20% Off Your First Order!
        </div>
        <div className="hidden md:flex gap-6">
          <a href="/#" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            Help
          </a>
          <a href="/#" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.998 8.998 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            INR ₹
          </a>
        </div>
      </div>

      <div className={`w-full bg-white transition-all duration-300 z-40 ${isScrolled ? 'fixed top-0 shadow-md' : 'border-b border-gray-100 relative'}`}>
        
        {/* Main Search & Logo Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 md:gap-12">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer">
            <img src={logoImg} alt="Vive Beauty" className="h-12 md:h-16 w-auto object-contain rounded-full shadow-sm border border-brand-gold/30" />
          </Link>

          {/* Heavy E-commerce Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full border-2 border-brand-magenta rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-brand-magenta/30 transition-shadow bg-white">
              <input 
                type="text" 
                placeholder="Search for Serums, Hair Oils, Soaps..." 
                className="w-full py-2.5 px-4 text-sm focus:outline-none text-brand-dark"
              />
              <button className="bg-brand-magenta text-white px-6 font-bold text-sm hover:bg-brand-dark transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* E-commerce Actions (Account, Wishlist, Cart) */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link to="/account" className="hidden sm:flex flex-col items-center gap-1 text-brand-dark hover:text-brand-magenta transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] font-bold">Account</span>
            </Link>
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="hidden sm:flex flex-col items-center gap-1 text-brand-dark hover:text-brand-magenta transition-colors relative cursor-pointer"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-sans font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlistCount}</span>
              </div>
              <span className="text-[10px] font-bold">Wishlist</span>
            </button>
            <button 
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center gap-1 text-brand-dark hover:text-brand-magenta transition-all duration-300 relative cursor-pointer"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-sans font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{cartCount}</span>
              </div>
              <span className="text-[10px] font-bold hidden sm:block">Bag</span>
            </button>
            <button 
              onClick={() => setIsCategoryOpen(true)}
              className="md:hidden text-brand-dark hover:text-brand-magenta transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dense Category Navigation Bar */}
        <div className="hidden md:block bg-[#f8f9fa] border-y border-gray-200 shadow-sm relative">
          <div className="max-w-7xl mx-auto px-8 flex items-center h-11 relative">
            
            {/* All Categories Dropdown Trigger */}
            <button 
              onClick={() => setIsCategoryOpen(true)}
              className="flex items-center gap-2 bg-brand-magenta text-white h-full px-6 text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Categories
            </button>

            {/* Main Links */}
            <div className="flex items-center justify-between gap-1 xl:gap-3 px-1 lg:px-4 flex-1 h-full">
              {['Face Care', 'Lip Care', 'Eye Care', 'Hair Care', 'Body Care', 'Foot Care', 'Hand made soap'].map((item) => (
                <div key={item} className="group relative h-full flex items-center shrink-0">
                  <a
                    href={`/#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-[10px] lg:text-[11px] xl:text-[13px] font-semibold text-brand-dark hover:text-white hover:bg-brand-magenta transition-all px-1.5 lg:px-2 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap"
                  >
                    {item}
                    {['Face Care', 'Lip Care', 'Eye Care', 'Hair Care', 'Body Care', 'Foot Care', 'Hand made soap'].includes(item) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : null}
                  </a>
                  
                  {/* Mega Menu for Face Care */}
                  {item === 'Face Care' && (
                    <div className="absolute top-[100%] left-0 w-[850px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Serums & Oils</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#glow-serum" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Glow Serum</a></li>
                          <li><a href="/#kumkumadi-oil" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Kumkumadi Oil</a></li>
                          <li><a href="/#open-pore" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Open Pore Minimiser</a></li>
                          <li><a href="/#skin-brightening-serum" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Skin Brightening Serum</a></li>
                          <li><a href="/#clear-skin" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Clear Skin Serum</a></li>
                        </ul>
                        
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mt-6 mb-4 border-b border-gray-100 pb-2">Hydrosol</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#vetiver" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Vetiver Hydrosol</a></li>
                          <li><a href="/#rose" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Rose Hydrosol</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Cleansers & Scrubs</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#glow-wash" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Glow Face Wash</a></li>
                          <li><a href="/#redwine-wash" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Redwine Face Wash</a></li>
                          <li><a href="/#oil-free" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Oil Free Face Wash</a></li>
                          <li><a href="/#lotus-rose" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Lotus-Rose Face Wash</a></li>
                          <li><a href="/#glow-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Glow Face Scrub</a></li>
                          <li><a href="/#papaya-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Papaya Face Scrub</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 3 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Creams & Gels</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#golden-glow" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Golden Glow Cream</a></li>
                          <li><a href="/#moisturising" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Moisturising Cream</a></li>
                          <li><a href="/#pigmentation" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Pigmentation Cream</a></li>
                          <li><a href="/#lotus-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Lotus Gel</a></li>
                          <li><a href="/#aloe-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Aloe Vera Gel</a></li>
                          <li><a href="/#saffron-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Saffron / Redwine Gel</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 4 - Highlighted */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-brand-magenta/20 pb-2">Packs & Powders</h3>
                        <ul className="space-y-2.5 flex-1">
                          <li><a href="/#abc-pack" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">ABC Face Pack</a></li>
                          <li><a href="/#brightening-pack" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Skin Brightening Pack</a></li>
                          <li><a href="/#detox-pack" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Face Detox Pack</a></li>
                          <li><a href="/#beetroot" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Pure Beetroot Powder</a></li>
                        </ul>
                        <a href="/#best-sellers" className="mt-8 rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={facecareImg} alt="Face Care Special" className="w-full h-36 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Shop Best Sellers</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Hair Care */}
                  {item === 'Hair Care' && (
                    <div className="absolute top-[100%] left-[-300px] w-[850px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Shampoo & Cleansers</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#3in1-shampoo" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">3 In 1 Shampoo</a></li>
                          <li><a href="/#goat-milk" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Goat Milk Shampoo</a></li>
                          <li><a href="/#herbal-wash" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Herbal Hair Wash Powder</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Conditioners & Gels</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#coconut-cond" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Coconut Milk Conditioner</a></li>
                          <li><a href="/#aloe-cond" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Aloe Hibiscus Conditioner</a></li>
                          <li><a href="/#flax-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Flax Seed Hair Gel</a></li>
                          <li><a href="/#onion-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Small Onion Gel</a></li>
                        </ul>
                      </div>

                      {/* Column 3 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Oils & Accessories</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#herbal-oil" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Herbal Hair Oil</a></li>
                          <li><a href="/#onion-oil" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Small Onion Oil</a></li>
                          <li><a href="/#rosemary-oil" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Rosemary Oil</a></li>
                          <li><a href="/#neem-comb" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Neem Wooden Comb</a></li>
                        </ul>
                      </div>

                      {/* Column 4 - Highlighted */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-brand-magenta/20 pb-2">Packs & Dyes</h3>
                        <ul className="space-y-2.5 flex-1">
                          <li><a href="/#strengthening-pack" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Hair Strengthening Pack</a></li>
                          <li><a href="/#protein-pack" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Hair Protein Pack</a></li>
                          <li><a href="/#black-dye" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Black Hair Dye</a></li>
                        </ul>
                        <a href="/#hair-care" className="mt-8 rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={haircareImg} alt="Hair Care Special" className="w-full h-36 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Shop Hair Care</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Foot Care */}
                  {item === 'Foot Care' && (
                    <div className="absolute top-[100%] left-[-550px] w-[850px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1: Foot Care */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Foot Care</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#floral-soak" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Floral Foot Soak</a></li>
                          <li><a href="/#coffee-soak" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Coffee Foot Soak</a></li>
                          <li><a href="/#foot-butter" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block mt-4">Floral Foot Butter</a></li>
                          <li><a href="/#foot-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Floral Foot Scrub</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2: Powders & Cleansers */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Cleansing Powders</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#bath-powder" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Nalangu Maavu / Bath Powder</a></li>
                          <li><a href="/#hair-wash" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Herbal Hair Wash Powder</a></li>
                        </ul>
                      </div>

                      {/* Column 3: Others */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Others</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#butterfly-pea" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Dried Butterfly Pea Flower</a></li>
                        </ul>
                      </div>

                      {/* Column 4: Eco-Friendly & Promo */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-brand-magenta/20 pb-2">Eco-Friendly</h3>
                        <ul className="space-y-2.5 flex-1">
                          <li><a href="/#wooden-comb" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Neem Wooden Comb</a></li>
                          <li><a href="/#bamboo-brush" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Bamboo Tooth Brush</a></li>
                        </ul>
                        <a href="/#foot-care-collection" className="mt-8 rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={footcareImg} alt="Foot Care Special" className="w-full h-36 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Revitalize Your Feet</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Lip Care */}
                  {item === 'Lip Care' && (
                    <div className="absolute top-[100%] left-[-150px] w-[800px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1: Lip Balms */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Lip Balms</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#beetroot-balm" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Beetroot Lipbalm</a></li>
                          <li><a href="/#tinted-balm" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Beetroot Tinted Lipbalm</a></li>
                          <li><a href="/#rose-balm" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Rose Lipbalm</a></li>
                          <li><a href="/#spf-balm" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Lipbalm with SPF 15</a></li>
                          <li><a href="/#butter-balm" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Plain Butter Lipbalm</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2: Scrubs & Serums */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Lip Scrubs</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#beetroot-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Beetroot Lipscrub (Poppy)</a></li>
                          <li><a href="/#coffee-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Coffee Lipscrub (Poppy)</a></li>
                          <li><a href="/#rose-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Rose Lipscrub (Poppy)</a></li>
                        </ul>
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mt-6 mb-4 border-b border-gray-100 pb-2">Lip Serum</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#lip-serum" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Lip Lightening Serum</a></li>
                        </ul>
                      </div>

                      {/* Column 3: Promo */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col justify-center">
                        <a href="/#lip-collection" className="rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={lipcareImg} alt="Lip Care Special" className="w-full h-48 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Perfect Lip Care</span>
                          </div>
                        </a>
                        <p className="mt-4 text-[11px] text-brand-dark/60 text-center font-medium">Natural hydration for soft, healthy lips.</p>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Eye Care */}
                  {item === 'Eye Care' && (
                    <div className="absolute top-[100%] left-[-200px] w-[800px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1: Eye Serums & Gels */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Eye Gels & Serums</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#eye-gel" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Under Eye Gel</a></li>
                          <li><a href="/#eye-serum" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Under Eye Serum</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2: Growth Serums */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Growth Serums</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#growth-serum" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Eyebrow/Eyelash Growth Serum</a></li>
                        </ul>
                      </div>

                      {/* Column 3: Promo */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col justify-center">
                        <a href="/#eye-collection" className="rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={facecareImg} alt="Eye Care Special" className="w-full h-48 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Revitalize Your Eyes</span>
                          </div>
                        </a>
                        <p className="mt-4 text-[11px] text-brand-dark/60 text-center font-medium">Brighten and restore your natural glow.</p>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Body Care */}
                  {item === 'Body Care' && (
                    <div className="absolute top-[100%] left-[-400px] w-[700px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1: Body Lotions */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Body Lotions</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#henna-detan" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Henna Magical Detan Lotion</a></li>
                          <li><a href="/#henna-detan-spf" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Henna Detan Lotion with SPF30</a></li>
                          <li><a href="/#abc-lotion" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">ABC Lotion</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2: Scrubs & More */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Body Scrub</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#charcoal-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Charcoal Detox Scrub</a></li>
                          <li><a href="/#coffee-scrub" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Coffee Scrub</a></li>
                        </ul>
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mt-6 mb-4 border-b border-gray-100 pb-2">Special Care</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#hair-removal" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Hair Removal Powder</a></li>
                        </ul>
                      </div>

                      {/* Column 3: Promo */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col justify-center">
                        <a href="/#body-collection" className="rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={bodycareImg} alt="Body Care Special" className="w-full h-48 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Glowing Body Care</span>
                          </div>
                        </a>
                        <p className="mt-4 text-[11px] text-brand-dark/60 text-center font-medium">Softness and glow for your entire body.</p>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu for Hand made soap */}
                  {item === 'Hand made soap' && (
                    <div className="absolute top-[100%] right-0 w-[800px] bg-white shadow-[0_20px_50px_rgba(138,27,94,0.15)] rounded-b-xl border-t-2 border-brand-magenta opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex gap-8 translate-y-2 group-hover:translate-y-0 cursor-default">
                      
                      {/* Column 1: Soaps Part 1 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 border-b border-gray-100 pb-2">Cold Process Soap</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#herbal-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Herbal Soap</a></li>
                          <li><a href="/#goat-milk-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Goat Milk Soap</a></li>
                          <li><a href="/#lotus-milk-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Lotus Milk Soap</a></li>
                          <li><a href="/#redwine-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Redwine Soap</a></li>
                        </ul>
                      </div>
                      
                      {/* Column 2: Soaps Part 2 */}
                      <div className="flex-1">
                        <h3 className="text-brand-magenta font-serif font-bold text-lg mb-4 opacity-0 border-b border-gray-100 pb-2">More Soaps</h3>
                        <ul className="space-y-2.5">
                          <li><a href="/#beetroot-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Beetroot Soap</a></li>
                          <li><a href="/#butterfly-pea-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Butterfly Pea Soap</a></li>
                          <li><a href="/#beet-coal-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Beet-Coal Soap</a></li>
                          <li><a href="/#charcoal-soap" className="text-[13px] font-medium text-gray-600 hover:text-brand-magenta transition-colors block">Charcoal Soap</a></li>
                        </ul>
                      </div>

                      {/* Column 3: Promo */}
                      <div className="flex-1 bg-brand-cream/30 -my-8 -mr-8 p-8 rounded-br-xl flex flex-col justify-center">
                        <a href="/#soap-collection" className="rounded-lg overflow-hidden relative group/img cursor-pointer shadow-md block">
                          <img src={soapImg} alt="Soap Collection" className="w-full h-40 object-cover transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-sm tracking-wide">Handmade Soaps</span>
                          </div>
                        </a>
                        <p className="mt-4 text-[11px] text-brand-dark/60 text-center font-medium">90-140 grams of pure organic goodness.</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Promo Link */}
            <a href="/#offers" className="flex items-center gap-1 text-[13px] font-bold text-red-600 hover:text-red-700 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Offers
            </a>
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent layout jump */}
      {isScrolled && <div className="h-[148px] hidden md:block"></div>}
      {isScrolled && <div className="h-[73px] md:hidden"></div>}

      {/* Slide-out Category Sidebar */}
      {/* Overlay Backdrop */}
      {isCategoryOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/40 z-[60] backdrop-blur-sm transition-opacity cursor-close"
          onClick={() => setIsCategoryOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] sm:w-[360px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isCategoryOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-serif font-bold text-brand-dark">Shop Categories</h2>
            <button 
              onClick={() => setIsCategoryOpen(false)}
              className="p-2 text-brand-dark hover:text-brand-magenta hover:bg-brand-magenta/5 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>          {/* Links with Dropdowns */}
          <div className="flex-1 overflow-y-auto py-2">
            {[
              { 
                name: 'Face Care', 
                items: ['Serums & Oils', 'Cleansers & Scrubs', 'Creams & Gels', 'Packs & Powders'] 
              },
              { 
                name: 'Lip Care', 
                items: ['Lip Balms', 'Lip Scrubs', 'Lip Serums'] 
              },
              { 
                name: 'Eye Care', 
                items: ['Under Eye Gel', 'Under Eye Serum', 'Growth Serum'] 
              },
              { 
                name: 'Hair Care', 
                items: ['Shampoo & Cleansers', 'Conditioners & Gels', 'Oils & Accessories', 'Packs & Dyes'] 
              },
              { 
                name: 'Body Care', 
                items: ['Body Lotions', 'Body Scrubs', 'Special Care'] 
              },
              { 
                name: 'Foot Care', 
                items: ['Foot Soaks', 'Foot Butters', 'Eco-Friendly'] 
              },
              { 
                name: 'Hand made soap', 
                items: ['Cold Process Soaps', 'Workshops', 'Gift Combos'] 
              }
            ].map((category) => (
              <div key={category.name} className="border-b border-gray-50 last:border-0">
                <button
                  onClick={() => setOpenSidebarSubmenu(openSidebarSubmenu === category.name ? null : category.name)}
                  className="flex items-center justify-between w-full px-6 py-4 text-[15px] font-semibold text-brand-dark/80 hover:text-brand-magenta hover:bg-brand-magenta/5 transition-colors group"
                >
                  {category.name}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-300 ${openSidebarSubmenu === category.name ? 'rotate-180 text-brand-magenta' : 'text-gray-400'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Items */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50 ${openSidebarSubmenu === category.name ? 'max-h-[400px] py-2' : 'max-h-0'}`}>
                  {category.items.map((subItem) => (
                    <a
                      key={subItem}
                      href={`/#${subItem.toLowerCase().replace(/ /g, '-')}`}
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setOpenSidebarSubmenu(null);
                      }}
                      className="block px-10 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-magenta hover:pl-12 transition-all"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 bg-brand-cream/30 border-t border-brand-cream">
            <a 
              href="/#offers" 
              onClick={() => setIsCategoryOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-brand-dark text-brand-gold text-sm font-bold uppercase tracking-widest rounded-md hover:bg-brand-magenta hover:text-white transition-colors"
            >
              View Special Offers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
