"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { 
    cart, 
    cartTotal, 
    cartCount, 
    appliedPromo, 
    promoDiscount, 
    clearCart,
    shippingCost,
    setShippingCost
  } = useStore();

  const navigate = useRouter();
  const paymentCardRef = useRef(null);

  // Active step flow: 1 = Shipping address details, 2 = Payment methods
  const [activeStep, setActiveStep] = useState(1);

  // Form State - pre-populated from User Profile if present
  const [formData, setFormData] = useState(() => {
    const savedCart = (typeof window !== "undefined" ? localStorage.getItem('vive_user_profile') : null);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pinCode: ''
    };
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay', 'cod'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local validation checks
  const [validationErrors, setValidationErrors] = useState({});

  // Loyalty Redemption States - exchange rate: 10 points = 1rs
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const savedCart = (typeof window !== "undefined" ? localStorage.getItem('vive_loyalty_points') : null);
    return saved ? parseInt(saved) : 1850;
  });
  const [redeemPoints, setRedeemPoints] = useState(false);
  const loyaltyRedemptionValue = redeemPoints ? Math.min(Math.floor(loyaltyPoints * 0.1), cartTotal - promoDiscount) : 0;

  const loyaltyPointsEarned = redeemPoints ? 0 : Math.round((cartTotal - promoDiscount) * 0.1);

  // Step 1 Validation Helper
  const validateStep1 = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email address format';
    
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (formData.phone.length < 8) errors.phone = 'Invalid phone format';

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.address) errors.address = 'Address line is required';
    if (!formData.apartment) errors.apartment = 'Apartment, unit, or suite is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    
    if (!formData.pinCode) errors.pinCode = 'Pin code is required';
    else if (!/^\d{5,6}$/.test(formData.pinCode)) errors.pinCode = 'Must be a 5 or 6 digit number';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error dynamically when user corrects it
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const scrollToPaymentCard = () => {
    if (!paymentCardRef.current) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    const navEl = document.querySelector('.w-full.z-50');
    const navHeight = navEl ? navEl.getBoundingClientRect().height : 150;
    const targetTop = paymentCardRef.current.getBoundingClientRect().top + window.scrollY - navHeight - 24;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      if (typeof window !== "undefined") { localStorage.setItem('vive_user_profile', JSON.stringify(formData)); }
      setActiveStep(2);
      // Smoothly scroll to the secure payment card below the fixed navbar
      setTimeout(scrollToPaymentCard, 120);
    } else {
      // Find the first error element and scroll to it
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.text-red-600, .border-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Safety lock: must validate shipping address details first
    if (!validateStep1()) {
      setActiveStep(1);
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.text-red-600, .border-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    // Safety lock: if in step 1, only advance step, do NOT place order
    if (activeStep === 1) {
      setActiveStep(2);
      setTimeout(scrollToPaymentCard, 120);
      return;
    }

    // Real order confirmation only executes when they are active on Step 2 (Secure Payment)
    setIsSubmitting(true);

    const totalPayable = cartTotal - promoDiscount + shippingCost - loyaltyRedemptionValue;

    // Load Razorpay dynamic script
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to secure connection with Razorpay. Please check your internet connection.");
      setIsSubmitting(false);
      return;
    }

    // Configure official Razorpay Checkout options with the customer's credentials!
    const options = {
      key: "rzp_test_SqqIGwsH5lqfzW", // Your Live Test Key ID
      amount: Math.round(totalPayable * 100), // Amount in paise (e.g. ₹500 = 50000 paise)
      currency: "INR",
      name: "VIVE Beauty",
      description: "Prepaid Sacred Botanical Remedies Purchase",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop", // Brand visual
      handler: function (response) {
        // Successful checkout! Process order confirmation
        let finalPoints = loyaltyPoints;
        if (redeemPoints) {
          const pointsSpent = loyaltyRedemptionValue * 10;
          finalPoints = Math.max(0, loyaltyPoints - pointsSpent);
        } else {
          finalPoints = loyaltyPoints + loyaltyPointsEarned;
        }
        if (typeof window !== "undefined") { localStorage.setItem('vive_loyalty_points', finalPoints.toString()); }

        const generatedOrderNum = `VIVE-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        
        // Cache order details in sessionStorage to pass securely to /order-success page
        sessionStorage.setItem('vive_last_order', JSON.stringify({
          orderNumber: generatedOrderNum,
          email: formData.email,
          phone: formData.phone,
          loyaltyPointsEarned: loyaltyPointsEarned,
          totalPayable: totalPayable,
          address: `${formData.address}, ${formData.apartment}, ${formData.city}, ${formData.state} - ${formData.pinCode}`,
          name: `${formData.firstName} ${formData.lastName}`,
          paymentMethod: 'Razorpay Test Mode'
        }));

        setIsSubmitting(false);
        clearCart(); // Clear bag
        navigate('/order-success');
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false); // Enable button if customer cancels modal
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: `${formData.address}, ${formData.apartment}, ${formData.city}, ${formData.state} - ${formData.pinCode}`
      },
      theme: {
        color: "#8A1B5E" // Match VIVE's premium Magenta aesthetic
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-magenta shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-brand-dark">No Items to Checkout</h2>
            <p className="text-sm text-gray-500">Your sacred beauty bag is currently empty. Explore our botanical formulations to begin your checkout.</p>
          </div>
          <Link  href="/" className="px-8 py-3.5 bg-brand-magenta text-white text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-brand-dark transition-all">
            Explore Formulations
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-[1450px] mx-auto px-4 sm:px-10 lg:px-16 py-12 md:py-16 w-full relative">
        
        {/* Header Breadcrumbs */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">
            <Link  href="/cart" className="hover:text-brand-magenta transition-colors">Bag</Link>
            <span>/</span>
            <span className="text-brand-dark">Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark leading-tight">
            Ritual <span className="text-brand-magenta italic">Checkout</span>
          </h1>
        </div>

        {/* Elegant Timeline Indicator */}
        <div className="flex items-center gap-3 md:gap-5 mb-10 text-xs md:text-sm font-semibold max-w-xl">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveStep(1)}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-sans font-bold text-[11px] transition-colors ${
              activeStep >= 1 ? 'bg-brand-magenta text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              1
            </span>
            <span className={activeStep >= 1 ? 'text-brand-dark font-bold' : 'text-gray-400'}>Shipping Address</span>
          </div>
          
          <div className="w-12 md:w-16 h-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-2.5" onClick={() => { if (validateStep1()) setActiveStep(2); }}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-sans font-bold text-[11px] transition-colors ${
              activeStep >= 2 ? 'bg-brand-magenta text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              2
            </span>
            <span className={activeStep >= 2 ? 'text-brand-dark font-bold' : 'text-gray-400'}>Secure Payment</span>
          </div>
        </div>

        {/* Grid split */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Sequential Accordion Cards */}
          <div className="w-full lg:w-[63%] space-y-6">
            
            {/* STEP 1 CARD: SHIPPING ADDRESS */}
            <div className={`bg-white rounded-3xl border transition-all duration-300 ${
              activeStep === 1 
                ? 'border-brand-magenta/30 shadow-[0_15px_40px_rgba(138,27,94,0.02)]' 
                : 'border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)]'
            }`}>
              
              {/* Accordion Header */}
              <div className="flex items-center justify-between p-6 md:p-8 pb-5 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-colors ${
                    activeStep === 1 ? 'bg-brand-magenta text-white' : 'bg-green-100 text-green-700'
                  }`}>
                    {activeStep === 1 ? '1' : '✓'}
                  </span>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-brand-dark">Shipping Address</h3>
                    {activeStep === 2 && (
                      <p className="text-[11px] text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">Details Captured</p>
                    )}
                  </div>
                </div>
                
                {/* Step 1 Edit Link - User Friendly */}
                {activeStep === 2 && (
                  <button 
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-bold text-brand-magenta hover:text-brand-dark transition-colors uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                  >
                    Change Details
                  </button>
                )}
              </div>

              {/* Accordion Body */}
              <div className="p-6 md:p-8 pt-6">
                {activeStep === 1 ? (
                  <form onSubmit={handleProceedToPayment} className="space-y-5 animate-fade-in">
                    
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">First Name *</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. John" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.firstName ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.firstName && <span className="text-[10px] font-bold text-red-500">{validationErrors.firstName}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Last Name *</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Doe" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.lastName ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.lastName && <span className="text-[10px] font-bold text-red-500">{validationErrors.lastName}</span>}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Email Address *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.email && <span className="text-[10px] font-bold text-red-500">{validationErrors.email}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Mobile Number *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit number" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.phone ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.phone && <span className="text-[10px] font-bold text-red-500">{validationErrors.phone}</span>}
                      </div>
                    </div>

                    {/* Address Line */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Address line *</label>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House no, street, locality" 
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                          validationErrors.address ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                      {validationErrors.address && <span className="text-[10px] font-bold text-red-500">{validationErrors.address}</span>}
                    </div>

                    {/* Apartment, unit, suite * Required */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Apartment, unit, suite *</label>
                      <input 
                        type="text" 
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="e.g. Unit 4B, 3rd Floor" 
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                          validationErrors.apartment ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                      {validationErrors.apartment && <span className="text-[10px] font-bold text-red-500">{validationErrors.apartment}</span>}
                    </div>

                    {/* City, State, Pincode */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">City *</label>
                        <input 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Mumbai" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.city ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.city && <span className="text-[10px] font-bold text-red-500">{validationErrors.city}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">State *</label>
                        <input 
                          type="text" 
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="e.g. Maharashtra" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.state ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.state && <span className="text-[10px] font-bold text-red-500">{validationErrors.state}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Pin Code *</label>
                        <input 
                          type="text" 
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          placeholder="6-digit pin code" 
                          className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta transition-all ${
                            validationErrors.pinCode ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {validationErrors.pinCode && <span className="text-[10px] font-bold text-red-500">{validationErrors.pinCode}</span>}
                      </div>
                    </div>

                    {/* Step 1 Submit Button */}
                    <div className="pt-4 border-t border-gray-50 flex justify-end">
                      <button 
                        type="submit"
                        className="py-3 px-8 bg-brand-magenta hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
                      >
                        Proceed to Payment
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>

                  </form>
                ) : (
                  // Step 1 Collapsed Summary View (Highly logical)
                  <div className="text-left font-sans text-brand-dark animate-fade-in flex flex-col gap-2">
                    <p className="text-sm font-bold flex items-center gap-2">
                      👤 {formData.firstName} {formData.lastName} 
                      <span className="w-1 h-3 bg-gray-300"></span>
                      <span className="text-xs text-gray-500 font-medium">{formData.phone}</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-md">
                      📍 {formData.address}, {formData.apartment ? formData.apartment + ', ' : ''}{formData.city}, {formData.state} - <span className="font-bold text-brand-dark">{formData.pinCode}</span>
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      ✉️ Confirmation sent to: <span className="font-semibold text-brand-dark">{formData.email}</span>
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* STEP 2 CARD: SECURE PAYMENT METHODS */}
            <div ref={paymentCardRef} className={`bg-white rounded-3xl border transition-all duration-300 ${
              activeStep === 2 
                ? 'border-brand-magenta/30 shadow-[0_15px_40px_rgba(138,27,94,0.02)]' 
                : 'border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] opacity-75'
            }`}>
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 pb-5 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-colors ${
                    activeStep === 2 ? 'bg-brand-magenta text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-brand-dark">Secure Payment</h3>
                    {activeStep === 1 && (
                      <p className="text-[11px] text-gray-400 mt-0.5">Locks until Address is completed</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 pt-6">
                {activeStep === 2 ? (
                  <div className="space-y-6 animate-fade-in">
                    
                    {/* Razorpay Exclusive Prepaid Payment Details */}
                    <div className="bg-[#FAF6F0]/65 border border-brand-gold/15 rounded-2xl p-5 space-y-4 animate-fade-in font-sans">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-gold/10">
                        <div className="flex items-center gap-3.5">
                          <div className="bg-[#528FF0] text-white font-semibold px-2.5 py-1 rounded text-xs font-sans flex items-center gap-1 shadow-sm">
                            <span>💳</span>
                            <span>razorpay</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Prepaid Orders Only</span>
                        </div>
                        <span className="text-[10px] text-green-600 font-bold uppercase bg-green-50 px-2 py-0.5 rounded border border-green-200/30">100% Secured</span>
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-600 font-medium">
                        <p className="flex items-center gap-2">
                          <span className="text-brand-magenta">✓</span>
                          <span>Supports Credit / Debit Cards (Visa, Mastercard, RuPay, Maestro)</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-brand-magenta">✓</span>
                          <span>Instant UPI Transfer (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-brand-magenta">✓</span>
                          <span>Supports Net Banking (SBI, HDFC, ICICI, Axis, Netbanking)</span>
                        </p>
                      </div>
                      
                      <div className="bg-[#8a1b5e]/5 border border-brand-magenta/10 rounded-xl p-3.5 text-[10px] text-brand-magenta leading-normal font-sans">
                        ⚡ Clicking <strong>"Confirm & Place Order"</strong> will securely initialize your Razorpay transaction of <strong>₹{(cartTotal - promoDiscount + shippingCost).toLocaleString()}</strong>.
                      </div>
                    </div>

                    {/* In-Card Logical Final CTA - User Friendly */}
                    <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                      <button 
                        onClick={() => setActiveStep(1)}
                        className="text-xs font-bold text-gray-400 hover:text-brand-dark transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                      >
                        ← Back to Address
                      </button>

                      <button 
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting}
                        className={`py-3.5 px-8 bg-brand-magenta hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer ${
                          isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}
                        {!isSubmitting && (
                          <svg className="w-3.5 h-3.5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>

                  </div>
                ) : (
                  // Locked Payment View
                  <div className="text-left font-sans text-gray-400 text-xs py-4 flex items-center gap-2">
                    <span>🔒</span>
                    <span>Please enter your shipping address in Step 1 to unlock secure payment methods.</span>
                  </div>
                )}
              </div>

            </div>

          </div>
          
          {/* Right Column: Checkout Order Summary Receipt */}
          <div className="w-full lg:w-[37%] space-y-6 lg:sticky lg:top-36">
            
            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
              
              <h3 className="text-xl font-serif font-bold text-brand-dark pb-4 border-b border-gray-100">Order Summary</h3>

              {/* Items loop */}
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
                {cart.map((item) => {
                  const unitPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                  const itemTotal = unitPrice * item.quantity;
                  const itemSize = item.selectedSize || item.netQuantity || '100 ml';

                  return (
                    <div key={item.id} className="flex gap-3 p-2 border border-gray-200 rounded-xl bg-gray-50/20 hover:border-brand-magenta/30 hover:bg-gray-50/40 transition-all duration-300 font-sans items-center">
                      {/* Product Thumbnail */}
                      <div className="w-12 h-15 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center p-0.5 shadow-sm">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-[13px] font-bold text-brand-dark leading-snug line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase mt-1">
                          <span>Size: {itemSize}</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <span className="text-[12px] font-bold text-brand-magenta mt-1">₹{itemTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
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

              {/* Dynamic Loyalty Badge */}
              <div className="bg-brand-cream/40 border border-brand-gold/30 rounded-xl p-2.5 px-3 flex items-center gap-2 shadow-sm">
                <span className="text-sm text-brand-gold leading-none">✨</span>
                <p className="text-[11px] text-gray-600 font-medium">
                  {redeemPoints ? (
                    <span>Using points on this purchase!</span>
                  ) : (
                    <span>Earn <span className="font-bold text-brand-magenta">{loyaltyPointsEarned} Loyalty Points</span> on this purchase!</span>
                  )}
                </p>
              </div>

              {/* Interactive Loyalty Redemption Box */}
              {loyaltyPoints > 0 && (
                <div className="bg-[#FAF6F0] border border-brand-gold/25 rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-sm">✨</span>
                      <div>
                        <h4 className="text-[11px] font-bold text-brand-dark uppercase tracking-wider">Redeem Rewards</h4>
                        <p className="text-[10px] text-gray-400 font-medium">Balance: <span className="font-bold text-brand-magenta">{loyaltyPoints.toLocaleString()} Points</span></p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={redeemPoints}
                        onChange={(e) => setRedeemPoints(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-magenta"></div>
                    </label>
                  </div>
                  {redeemPoints ? (
                    <div className="text-[10px] bg-green-50 border border-green-200/50 text-green-700 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 animate-fade-in text-left">
                      <span>🎉</span> Applied! Saved ₹{loyaltyRedemptionValue.toLocaleString()} on this order.
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 leading-normal text-left">
                      Redeem your accumulated formulation points to save **₹{Math.floor(loyaltyPoints * 0.1).toLocaleString()}** directly!
                    </p>
                  )}
                </div>
              )}

              {/* Subtotal Receipt */}
              <div className="space-y-3.5 text-[13px] border-t border-gray-100 pt-5">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Subtotal ({cartCount} items)</span>
                  <span className="text-brand-dark font-display font-semibold">₹{cartTotal.toLocaleString()}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Promo Discount ({appliedPromo})</span>
                    <span>-₹{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                {redeemPoints && (
                  <div className="flex justify-between text-brand-magenta font-semibold">
                    <span>Loyalty Redemption ({loyaltyRedemptionValue * 10} Points)</span>
                    <span>-₹{loyaltyRedemptionValue.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Shipping ({shippingCost === 40 ? 'ST Courier' : 'Professional'})</span>
                  <span className="text-brand-dark font-semibold">₹{shippingCost}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Tax Details</span>
                  <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Included</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-brand-dark font-bold text-base">Grand Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-display font-bold text-brand-magenta">₹{(cartTotal - promoDiscount + shippingCost - loyaltyRedemptionValue).toLocaleString()}</span>
                    <p className="text-[9px] text-gray-400 mt-0.5">Inclusive of GST and local taxes</p>
                  </div>
                </div>
              </div>

              {/* Sticky Place Order CTA - Validates dynamically */}
              <button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className={`w-full py-4 bg-[#8A1B5E] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#8A1B5E]/15 flex items-center justify-center gap-3 cursor-pointer ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>{activeStep === 1 ? 'Proceed to Payment' : 'Confirm & Place Order'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </main>

      <Footer />



    </div>
  );
};

export default Checkout;
