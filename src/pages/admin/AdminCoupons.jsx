import React, { useState, useEffect } from 'react';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage', // 'percentage' or 'flat'
    discountValue: '',
    minOrder: '',
    maxDiscount: '', // only applicable for percentage, optional
    isActive: true
  });

  // Load coupons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vive_admin_coupons');
    if (saved) {
      setCoupons(JSON.parse(saved));
    } else {
      // Default coupon from existing logic
      const defaultCoupon = {
        id: Date.now(),
        code: 'VIVE15',
        type: 'percentage',
        discountValue: 15,
        minOrder: 299,
        maxDiscount: 300,
        isActive: true
      };
      setCoupons([defaultCoupon]);
      localStorage.setItem('vive_admin_coupons', JSON.stringify([defaultCoupon]));
    }
  }, []);

  // Save coupons whenever they change
  useEffect(() => {
    if (coupons.length > 0) {
      localStorage.setItem('vive_admin_coupons', JSON.stringify(coupons));
    }
  }, [coupons]);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountValue || !newCoupon.minOrder) {
      alert("Please fill in Code, Discount Value, and Minimum Order amount.");
      return;
    }
    
    // Check if code already exists
    if (coupons.some(c => c.code.toUpperCase() === newCoupon.code.toUpperCase())) {
      alert("This coupon code already exists!");
      return;
    }

    const couponToAdd = {
      ...newCoupon,
      id: Date.now(),
      code: newCoupon.code.toUpperCase().trim(),
      discountValue: Number(newCoupon.discountValue),
      minOrder: Number(newCoupon.minOrder),
      maxDiscount: newCoupon.type === 'percentage' && newCoupon.maxDiscount ? Number(newCoupon.maxDiscount) : null,
    };

    setCoupons([...coupons, couponToAdd]);
    setIsAdding(false);
    setNewCoupon({ code: '', type: 'percentage', discountValue: '', minOrder: '', maxDiscount: '', isActive: true });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      const updated = coupons.filter(c => c.id !== id);
      setCoupons(updated);
      if (updated.length === 0) {
         localStorage.setItem('vive_admin_coupons', JSON.stringify([]));
      }
    }
  };

  const toggleStatus = (id) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Manage Coupons</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage discount codes for your storefront.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-magenta text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          {isAdding ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add New Coupon
            </>
          )}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-magenta"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 font-serif">Create New Coupon</h2>
          <form onSubmit={handleAddCoupon} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Coupon Code</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                  </span>
                  <input 
                    type="text" 
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta outline-none uppercase font-bold tracking-wider shadow-sm transition-all"
                    placeholder="e.g. VIVE20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Discount Type</label>
                <select 
                  value={newCoupon.type}
                  onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta outline-none shadow-sm transition-all font-medium text-slate-700"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Discount Value {newCoupon.type === 'percentage' ? '(%)' : '(₹)'}
                </label>
                <input 
                  type="number" 
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({...newCoupon, discountValue: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta outline-none shadow-sm transition-all font-bold"
                  placeholder={newCoupon.type === 'percentage' ? 'e.g. 15' : 'e.g. 150'}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Min Order Amount (₹)</label>
                <input 
                  type="number" 
                  value={newCoupon.minOrder}
                  onChange={(e) => setNewCoupon({...newCoupon, minOrder: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta outline-none shadow-sm transition-all font-bold"
                  placeholder="e.g. 299"
                />
              </div>

              {newCoupon.type === 'percentage' && (
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Max Discount Cap (₹) - Optional</label>
                  <input 
                    type="number" 
                    value={newCoupon.maxDiscount}
                    onChange={(e) => setNewCoupon({...newCoupon, maxDiscount: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta outline-none shadow-sm transition-all font-bold"
                    placeholder="e.g. 300"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                className="bg-brand-magenta text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Save Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons List */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                <th className="p-4 pl-6">Code</th>
                <th className="p-4">Discount Details</th>
                <th className="p-4">Min. Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-white/80 transition-colors">
                  <td className="p-4 pl-6">
                    <button 
                      onClick={() => handleCopy(coupon.code)}
                      className="group relative inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-dark px-3 py-1.5 rounded-lg font-bold text-sm border border-brand-gold/30 tracking-wide hover:bg-brand-gold/20 transition-colors cursor-pointer"
                      title="Click to copy"
                    >
                      {copiedCode === coupon.code ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-gold group-hover:text-brand-magenta transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      )}
                      {coupon.code}
                      
                      {copiedCode === coupon.code && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-800 font-bold">
                      {coupon.type === 'percentage' ? `${coupon.discountValue}% Off` : `₹${coupon.discountValue} Off`}
                    </div>
                    {coupon.type === 'percentage' && coupon.maxDiscount && (
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">Upto ₹{coupon.maxDiscount}</div>
                    )}
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-bold">₹{coupon.minOrder}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStatus(coupon.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner ${coupon.isActive ? 'bg-green-500' : 'bg-slate-300'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${coupon.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className={`text-xs font-bold ${coupon.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                        {coupon.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(coupon.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm bg-white border border-slate-100 hover:border-red-100"
                      title="Delete Coupon"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              
              {coupons.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500 text-sm bg-white">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                      </div>
                      <p>No coupons found. Create your first discount code!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
