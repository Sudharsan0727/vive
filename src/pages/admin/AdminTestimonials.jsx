import React, { useState } from 'react';

// Using actual imports to display thumbnails from the assets
import review1 from '../../assets/Testimonial/review1.jpg';
import review2 from '../../assets/Testimonial/review2.jpg';
import review3 from '../../assets/Testimonial/review3.jfif';
import review4 from '../../assets/Testimonial/review4.jfif';
import review5 from '../../assets/Testimonial/review5.jfif';
import review6 from '../../assets/Testimonial/review6.jfif';
import review7 from '../../assets/Testimonial/review7.jfif';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([
    { id: 1, image: review1, status: "Active" },
    { id: 2, image: review2, status: "Active" },
    { id: 3, image: review3, status: "Active" },
    { id: 4, image: review4, status: "Active" },
    { id: 5, image: review5, status: "Active" },
    { id: 6, image: review6, status: "Active" },
    { id: 7, image: review7, status: "Active" }
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Customer Testimonials</h1>
          <p className="text-sm text-slate-600 mt-1">Manage the customer review images displayed in the Polaroid stack on the homepage.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-magenta text-white rounded-xl text-sm font-medium hover:bg-brand-magenta/90 transition-all shadow-[0_4px_14px_rgba(216,27,96,0.3)] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Upload New Testimonial
        </button>
      </div>

      {/* Testimonials Management Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/60 bg-white/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Current Testimonials</h2>
          <span className="bg-white/60 text-brand-magenta text-xs font-bold px-3 py-1 rounded-full border border-brand-magenta/20">
            {testimonials.length} Images
          </span>
        </div>
        
        <div className="p-6 bg-slate-50/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="group relative bg-white p-3 pb-10 rounded-sm border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container - Matching Polaroid Style */}
                <div className="w-full aspect-[4/5] bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                  <img 
                    src={testimonial.image} 
                    alt={`Review ${idx + 1}`} 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Polaroid Style Caption */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-[10px] font-bold text-brand-magenta tracking-[0.2em] uppercase">Glow Experience #{idx + 1}</span>
                </div>
                
                {/* Status Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shadow-sm border ${
                    testimonial.status === 'Active' 
                      ? 'bg-green-500 text-white border-green-600' 
                      : 'bg-slate-500 text-white border-slate-600'
                  }`}>
                    {testimonial.status}
                  </span>
                </div>

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                   <button className="w-8 h-8 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-colors shadow-lg" title="Edit">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                     </svg>
                   </button>
                   <button className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg" title="Delete">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;
