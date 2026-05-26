import React, { useState } from 'react';
import workshopImg from '../assets/workshop.png';
import detailImg from '../assets/VIVE Product/kumkumadi/oil.jpg';

const WorkshopBanner = () => {
  const [showVideo, setShowVideo] = useState(false);

  // Direct MP4 URL extracted from Instagram (Fresh link)
  const VIDEO_URL = "https://scontent-iad3-2.cdninstagram.com/o1/v/t16/f2/m69/AQPdR7JrjJTh_D6N9V-I4dovktRhlfSadGHVVPsMsVkKV6pkrx7K8MCUemR47__1NgiA-mf_fr5SQY8EsUmSZUHu.mp4?strext=1&_nc_cat=105&_nc_sid=5e9851&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_ohc=MqTHaV5cpJAQ7kNvwGay0nu&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTE4ODg4MTcxMzQxNzI3MiwiYXNzZXRfYWdlX2RheXMiOjExMywidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjQ0LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=5dbfc370db4f144d&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HRU1lWmlTbkdpLVIta1FFQVAxeFhSQVZobVI3YnNwVEFRQUYVAALIARIAFQIYRmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC84NTQwNDkwNzQxODc4NjlfODk3NjcxNzQ5Mzc5MjA2NTE4OS5tcDQVAgLIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm8LCqg4PSnAQVAigCQzMsF0BGSHKwIMScGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=gxxXo0GLVyS4xLbFH4SAnQ&_nc_zt=28&_nc_ss=7a22e&oh=00_Af7X5U47wJfWGK1u1wyQjtWw47tWRTLvPASQSWNEE1gHiQ&oe=6A0399BB";

  return (
    <section className="py-16 bg-brand-cream/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Editorial Image Side */}
          <div className="w-full lg:w-3/5 relative group">
            {/* Background Texture Element */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-magenta/5 rounded-full blur-3xl"></div>
            
            <div 
              className="relative rounded-[32px] overflow-hidden aspect-[16/10] shadow-[0_40px_80px_-15px_rgba(45,27,36,0.15)] border-8 border-white cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              <img 
                src={workshopImg} 
                alt="Soap Workshop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Blinking Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    {/* Blinking Outer Rings */}
                    <div className="absolute inset-0 rounded-full bg-brand-magenta/40 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-brand-magenta/20 animate-pulse scale-150"></div>
                    
                    {/* Main Button */}
                    <div className="relative w-14 h-14 bg-brand-magenta text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                       </svg>
                    </div>
                 </div>
              </div>

              {/* Vertical Label */}
              <div className="absolute top-0 right-0 h-full w-12 bg-brand-magenta flex items-center justify-center">
                 <span className="rotate-90 text-white font-bold text-[10px] tracking-[0.5em] whitespace-nowrap uppercase">Artisan Studio • ESTD 2024</span>
              </div>
            </div>

            {/* Floating Detail Image */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-8 border-white overflow-hidden shadow-2xl hidden md:block group/detail cursor-pointer">
               <img src={detailImg} className="w-full h-full object-cover group-hover/detail:scale-110 transition-transform duration-700" alt="Detail" />
            </div>
          </div>

          {/* Narrative Content Side */}
          <div className="w-full lg:w-2/5">
            <span className="text-brand-magenta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Digital Education</span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block mb-8">
               Online <span className="text-brand-magenta italic relative">
                 Masterclass
                 <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                   <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                 </svg>
               </span>
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-8 font-medium">
               Master the art of professional product creation from your home. A comprehensive step-by-step journey into formulating high-performance organic skincare.
            </p>

            {/* Curriculum Preview */}
            <div className="space-y-4 mb-10">
               <div className="flex items-start gap-4">
                  <span className="text-brand-gold font-serif italic text-2xl">01</span>
                  <div>
                     <h4 className="text-brand-dark font-bold text-sm uppercase tracking-wider mb-1">Formulation Science</h4>
                     <p className="text-gray-400 text-xs">Learn the precise ratios and botanical secrets for perfect results.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 border-t border-brand-magenta/10 pt-4">
                  <span className="text-brand-gold font-serif italic text-2xl">02</span>
                  <div>
                     <h4 className="text-brand-dark font-bold text-sm uppercase tracking-wider mb-1">Video Modules</h4>
                     <p className="text-gray-400 text-xs">Access high-definition step-by-step guides on product creation.</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <button 
                onClick={() => setShowVideo(true)}
                className="px-10 py-4 bg-brand-magenta text-white font-bold rounded-xl hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-brand-magenta/20 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap"
               >
                 Enroll Now
               </button>
               <div className="text-left">
                  <p className="text-brand-dark font-bold text-lg leading-none mb-1">₹4,999</p>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Full Course</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Popup */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm transition-all duration-500"
          onClick={() => setShowVideo(false)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-brand-gold transition-colors z-10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src={VIDEO_URL}
              autoPlay
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkshopBanner;
