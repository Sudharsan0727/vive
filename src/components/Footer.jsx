import React from 'react';
import { BRAND_INFO } from '../constants/BrandAssets';
import logoImg from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-brand-cream/30 pt-16 md:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img src={logoImg} alt="Vive Beauty" className="h-24 w-auto object-contain rounded-full shadow-sm" />
            </div>
            <p className="text-brand-dark/60 leading-relaxed mb-8">
              Empowering your beauty journey with result-based organic solutions. 
              Join the glow revolution today.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                { name: 'facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { name: 'twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
                { name: 'youtube', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-magenta hover:bg-brand-magenta hover:text-white shadow-sm transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-brand-dark mb-8">Quick Links</h4>
            <ul className="space-y-4 text-brand-dark/60 text-sm font-medium">
              <li><a href="#home" className="hover:text-brand-magenta transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-brand-magenta transition-colors">Shop All</a></li>
              <li><a href="#categories" className="hover:text-brand-magenta transition-colors">Categories</a></li>
              <li><a href="#workshops" className="hover:text-brand-magenta transition-colors">Workshops</a></li>
              <li><a href="#about" className="hover:text-brand-magenta transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-brand-dark mb-8">Customer Care</h4>
            <ul className="space-y-4 text-brand-dark/60 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-magenta transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-brand-magenta transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-brand-magenta transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-magenta transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-magenta transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-serif font-bold text-lg text-brand-dark mb-8">Join the Glow List</h4>
            <p className="text-sm text-brand-dark/60 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white border border-brand-magenta/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-brand-magenta transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-brand-magenta text-white p-2.5 rounded-full hover:bg-brand-dark transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-brand-magenta/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-brand-dark/40 font-medium">
            © 2026 {BRAND_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Secured by</span>
            <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-brand-magenta/10 flex items-center gap-1.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V12C3 15.5 5.5 18.5 9 19.5L12 21L15 19.5C18.5 18.5 21 15.5 21 12V7L12 2Z" fill="#3395FF"/>
                <path d="M12 11L14 9M12 11L10 9M12 11V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-black tracking-tighter text-[#1e2749]">Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
