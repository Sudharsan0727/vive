"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';

const Account = () => {
  const navigate = useRouter();
  const { wishlist, cart, toggleWishlist } = useStore();
  const [activeTab, setActiveTab] = useState('orders'); // orders, address, loyalty
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dynamic Loyalty Points synced with localStorage
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const savedCart = (typeof window !== "undefined" ? localStorage.getItem('vive_loyalty_points') : null);
    return saved ? parseInt(saved) : 1850;
  });
  const pointsPercent = Math.min(100, Math.round((loyaltyPoints / 2000) * 100));
  const pointsNeeded = Math.max(0, 2000 - loyaltyPoints);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load and manage preferred address from localStorage
  const [profileData, setProfileData] = useState(() => {
    const savedCart = (typeof window !== "undefined" ? localStorage.getItem('vive_user_profile') : null);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      firstName: 'Sudharsan',
      lastName: 'V',
      email: 'sudharsan@example.com',
      phone: '9876543210',
      address: '42, Botanical Sanctuary',
      apartment: 'Suite 4B, 3rd Floor',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pinCode: '641001'
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") { localStorage.setItem('vive_user_profile', JSON.stringify(profileData)); }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Mock Orders Data
  const mockOrders = [
    {
      id: 'VIVE-ORD-893021',
      date: 'May 18, 2026',
      status: 'Shipped',
      courier: 'ST Courier (40rs)',
      trackingNumber: 'ST-TRACK-628103',
      total: 2450,
      paymentMethod: 'Razorpay',
      items: [
        { name: 'Kumkumadi Glow Serum', quantity: 1, price: '₹1,450' },
        { name: 'Vetiver Hydrosol', quantity: 2, price: '₹500' }
      ]
    },
    {
      id: 'VIVE-ORD-109283',
      date: 'May 02, 2026',
      status: 'Delivered',
      courier: 'Professional Courier (60rs)',
      trackingNumber: 'PROF-TRACK-99104',
      total: 3950,
      paymentMethod: 'Razorpay',
      items: [
        { name: 'Nalugumavu Soap formulation', quantity: 3, price: '₹450' },
        { name: 'Open Pore Minimiser Serum', quantity: 1, price: '₹2,600' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative">
      <Navbar />

      {/* Account Header Banner */}
      <div className="bg-[#FAF6F0] border-b border-brand-gold/15 py-12 md:py-16">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Avatar and Welcome Message */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-brand-magenta text-white flex items-center justify-center text-3xl font-serif font-bold shadow-md ring-4 ring-brand-magenta/10">
              {profileData.firstName ? profileData.firstName[0].toUpperCase() : 'S'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
                  Welcome, <span className="text-brand-magenta italic">{profileData.firstName}</span>
                </h1>
                <span className="bg-brand-magenta/10 text-brand-magenta text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-sm">
                  ✨ Golden Glow Tier
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Formulating sacred botanical rhythms since May 2026</p>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{profileData.email}</p>
            </div>
          </div>

          {/* Loyalty Rewards Widget */}
          <div className="bg-white border border-brand-gold/15 rounded-3xl p-5 md:p-6 shadow-sm max-w-sm w-full flex items-center gap-4.5 transition-transform duration-300 hover:scale-102">
            <div className="w-14 h-14 rounded-full bg-brand-cream flex flex-col items-center justify-center text-brand-magenta shrink-0 shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-tight leading-none text-gray-400">Total</span>
              <span className="text-lg font-sans font-extrabold tracking-tight text-brand-dark">{loyaltyPoints.toLocaleString()}</span>
            </div>
            <div className="flex-1 space-y-1.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                <span>Loyalty Points</span>
                <span className="text-brand-magenta">✨ {pointsPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-magenta h-full rounded-full transition-all duration-1000" style={{ width: `${pointsPercent}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-tight">
                {pointsNeeded > 0 ? (
                  <span>Formulate <strong>{pointsNeeded} more points</strong> to unlock a complimentary glow formulation reward!</span>
                ) : (
                  <span>🎉 You have unlocked all active tier milestone formulations! Claim your glow reward below.</span>
                )}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Account Center */}
      <main className="flex-1 max-w-[1450px] mx-auto px-4 sm:px-10 lg:px-16 py-12 md:py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Column: Side Navigation Cards */}
          <div className="w-full lg:w-[28%] space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Account Center</h3>
              
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-brand-magenta text-white shadow-md'
                    : 'text-brand-dark hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>📋</span> Order History
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>{mockOrders.length}</span>
              </button>

              <button 
                onClick={() => setActiveTab('address')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === 'address'
                    ? 'bg-brand-magenta text-white shadow-md'
                    : 'text-brand-dark hover:bg-gray-50'
                }`}
              >
                <span>🏠</span> Saved Address
              </button>

              <button 
                onClick={() => setActiveTab('loyalty')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === 'loyalty'
                    ? 'bg-brand-magenta text-white shadow-md'
                    : 'text-brand-dark hover:bg-gray-50'
                }`}
              >
                <span>✨</span> Loyalty Rituals
              </button>

              <div className="border-t border-gray-100 my-2.5 pt-2.5"></div>

              <Link  href="/"
                className="w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-magenta transition-all cursor-pointer"
              >
                <span>🛒</span> Return to Shop
              </Link>
            </div>

            {/* Quick Formulation Wishlist Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] space-y-4 text-left">
              <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest flex items-center gap-1.5">
                <span>❤️</span> Sacred Wishlist ({wishlist.length})
              </h3>
              {wishlist.length === 0 ? (
                <p className="text-xs text-gray-400 font-medium">No botanical remedies saved yet. Tap heart during exploration.</p>
              ) : (
                <div className="space-y-3.5 pt-1">
                  {wishlist.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt={item.name} className="w-8 h-10 object-cover rounded-md border border-gray-100" />
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-bold text-brand-dark truncate max-w-[120px]">{item.name}</p>
                          <p className="text-[10px] text-brand-magenta font-semibold">{item.price}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="text-xs text-gray-300 hover:text-red-500 cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {wishlist.length > 3 && (
                    <Link  href="/wishlist" className="text-[10px] font-bold uppercase tracking-wider text-brand-magenta hover:underline block pt-1">
                      View all saved remedies →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tab View Panels */}
          <div className="w-full lg:w-[72%] bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            
            {/* Save Success Toast Indicator */}
            {saveSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-3 rounded-2xl flex items-center gap-2 animate-fade-in font-medium">
                <span>✨</span> Preferred delivery details saved successfully! Your fields will auto-populate checkout next time.
              </div>
            )}

            {/* TAB CONTENT: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="border-b border-gray-50 pb-4">
                  <h2 className="text-xl font-serif font-bold text-brand-dark">Order History</h2>
                  <p className="text-xs text-gray-400 mt-1">Review tracking, payment logs, and botanical dispatch timelines.</p>
                </div>

                <div className="space-y-5">
                  {mockOrders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-3xl p-5 md:p-6 space-y-4 hover:border-brand-magenta/15 hover:shadow-[0_8px_30px_rgba(138,27,94,0.02)] transition-all">
                      
                      {/* Header Line */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3.5 border-b border-gray-50">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.date}</span>
                          <h4 className="text-sm font-sans font-bold tracking-wider text-brand-dark">{order.id}</h4>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-50 text-green-700 border border-green-200/35' 
                              : 'bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/10'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Products Summary inside Order */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Formulations Purchased</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100/50">
                              <div className="w-7 h-9 bg-brand-cream rounded-md flex items-center justify-center text-[10px]">🌿</div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-bold text-brand-dark truncate max-w-[200px]">{item.name}</p>
                                <p className="text-[10px] text-gray-400">Qty: {item.quantity} • {item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer tracking line */}
                      <div className="bg-[#FAF6F0]/65 border border-brand-gold/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-medium">
                        <div className="space-y-1">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tracking Information</p>
                          <p className="text-brand-dark flex items-center gap-1.5">
                            <span>🚚</span>
                            <span>{order.courier}</span>
                            <span className="text-gray-300">|</span>
                            <strong className="text-brand-magenta font-mono">{order.trackingNumber}</strong>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Paid via {order.paymentMethod}</p>
                          <p className="font-sans font-bold text-brand-dark text-sm">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SAVED ADDRESS */}
            {activeTab === 'address' && (
              <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in text-left">
                <div className="border-b border-gray-50 pb-4">
                  <h2 className="text-xl font-serif font-bold text-brand-dark">Preferred Address</h2>
                  <p className="text-xs text-gray-400 mt-1">Manage delivery details to skip form entry during ritual checkouts.</p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Street Address *</label>
                    <input 
                      type="text" 
                      name="address"
                      required
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Apartment, unit, suite *</label>
                    <input 
                      type="text" 
                      name="apartment"
                      required
                      value={profileData.apartment}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">City *</label>
                      <input 
                        type="text" 
                        name="city"
                        required
                        value={profileData.city}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">State *</label>
                      <input 
                        type="text" 
                        name="state"
                        required
                        value={profileData.state}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Pin Code *</label>
                      <input 
                        type="text" 
                        name="pinCode"
                        required
                        value={profileData.pinCode}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 text-right">
                  <button 
                    type="submit"
                    className="py-3.5 px-10 bg-brand-magenta hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    Save preferred details
                  </button>
                </div>
              </form>
            )}

            {/* TAB CONTENT: LOYALTY RITUALS */}
            {activeTab === 'loyalty' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="border-b border-gray-50 pb-4">
                  <h2 className="text-xl font-serif font-bold text-brand-dark">Loyalty Perks & Rituals</h2>
                  <p className="text-xs text-gray-400 mt-1">Unlock botanical formulas and coupon codes with formulation points.</p>
                </div>

                {/* Loyalty Card Perks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  <div className="border border-brand-gold/15 rounded-3xl p-5 bg-[#FAF6F0]/65 space-y-2">
                    <span className="text-sm">✨</span>
                    <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">10% Points Back</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Earn formulation points worth 10% of every order value. Points add automatically on successful checkouts.
                    </p>
                  </div>

                  <div className="border border-brand-gold/15 rounded-3xl p-5 bg-[#FAF6F0]/65 space-y-2">
                    <span className="text-sm">🎁</span>
                    <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Glow Serum Milestone</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Earn 2,000 points to receive a voucher for a complimentary travel-sized **Kumkumadi Glow formulation**.
                    </p>
                  </div>

                  <div className="border border-brand-gold/15 rounded-3xl p-5 bg-[#FAF6F0]/65 space-y-2">
                    <span className="text-sm">🌿</span>
                    <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Birthday Formulation</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Receive an exclusive botanical gift voucher box and triple points multiplier during your birth month.
                    </p>
                  </div>

                  <div className="border border-brand-gold/15 rounded-3xl p-5 bg-[#FAF6F0]/65 space-y-2">
                    <span className="text-sm">⚡</span>
                    <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Priority formulated dispatch</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Members on the Golden Glow tier enjoy first-priority courier packing and custom packaging ribbons.
                    </p>
                  </div>

                </div>

                {/* Loyalty Milestones */}
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Active Formulation Rewards</h4>
                  <div className="space-y-2 text-xs font-semibold text-gray-600">
                    <div className="flex justify-between items-center bg-white border border-gray-100/50 p-3 rounded-xl shadow-xs">
                      <span className="text-gray-400">🎁 1,000 Points Voucher</span>
                      <button className="text-[9px] bg-brand-magenta text-white uppercase tracking-wider font-bold px-3 py-1.5 rounded hover:bg-brand-dark transition-colors cursor-pointer">
                        Redeem code
                      </button>
                    </div>
                    <div className={`flex justify-between items-center bg-white border border-gray-100/50 p-3 rounded-xl shadow-xs transition-opacity ${pointsNeeded > 0 ? 'opacity-65' : ''}`}>
                      <span className="text-gray-400">✨ 2,000 Points Glow formulation</span>
                      <span className="text-[9px] text-brand-magenta bg-brand-magenta/5 border border-brand-magenta/10 uppercase tracking-wider font-bold px-2 py-1 rounded">
                        {pointsNeeded > 0 ? `${pointsNeeded} Pts Left` : 'Unlocked!'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
