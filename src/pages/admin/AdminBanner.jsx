import React, { useState } from 'react';

const AdminBanner = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      name: 'Homepage Banner 1',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Homepage Banner 2',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Special Offer Banner',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Homepage Banners</h1>
          <p className="text-sm text-slate-600 mt-1">Manage the image banners displayed on your storefront homepage slider.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-magenta text-white rounded-xl text-sm font-medium hover:bg-brand-magenta/90 transition-all shadow-[0_4px_14px_rgba(216,27,96,0.3)] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Upload New Banner
        </button>
      </div>

      {/* Banner Management Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/60 bg-white/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Current Banners</h2>
          <span className="bg-white/60 text-brand-magenta text-xs font-bold px-3 py-1 rounded-full border border-brand-magenta/20">
            {banners.length} Banners
          </span>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="group relative bg-white/50 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm overflow-hidden hover:shadow-md transition-all">
                {/* Banner Image Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img src={banner.image} alt={banner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-md border ${
                      banner.status === 'Active' 
                        ? 'bg-green-500/80 text-white border-green-400/30' 
                        : 'bg-slate-500/80 text-white border-slate-400/30'
                    }`}>
                      {banner.status}
                    </span>
                  </div>
                </div>

                {/* Banner Controls */}
                <div className="p-4 flex justify-between items-center bg-white/30 border-t border-white/60">
                  <div className="text-sm font-bold text-slate-700">
                    {banner.name} <span className="text-xs text-slate-400 font-normal ml-2">(ID: #{banner.id})</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:text-brand-magenta hover:bg-white/60 rounded-lg transition-colors border border-transparent hover:border-white/80" title="Edit Image">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-slate-600 hover:text-red-500 hover:bg-white/60 rounded-lg transition-colors border border-transparent hover:border-white/80" title="Delete Banner">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
