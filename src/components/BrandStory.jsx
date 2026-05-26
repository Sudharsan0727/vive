import React from 'react';
import oilImg from '../assets/VIVE Product/kumkumadi/oil.jpg';
import hairOil2 from '../assets/VIVE Product/Hair oil/2.jpeg';
import nalugumavuImg from '../assets/VIVE Product/Nalugumavu/single.jpg';
import flowerIcon from '../assets/flowericon.svg';

const BrandStory = () => {
  return (
    <section className="py-16 bg-brand-dark text-white overflow-hidden relative" id="about">
      {/* Decorative texture or glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-magenta rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img src={oilImg} alt="Natural ingredients" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square bg-brand-gold/5 backdrop-blur-md p-6 flex flex-col justify-end border border-white/5 relative group/card">
                {/* Full-Cover Decorative Flower Icon */}
                <img 
                  src={flowerIcon} 
                  alt="Botanical background"
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.05] group-hover/card:scale-125 transition-transform duration-[3000ms] select-none pointer-events-none filter sepia saturate-50 brightness-110 rotate-12"
                />
                
                <p className="text-4xl font-serif font-bold text-brand-gold relative z-10">100%</p>
                <p className="text-sm font-medium text-white/70 relative z-10">Organic & Ethically Sourced</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl">
                <img src={hairOil2} alt="Skincare routine" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img src={nalugumavuImg} alt="Herbal oils" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center border-8 border-brand-dark shadow-2xl">
            <div className="text-center">
              <p className="text-brand-magenta font-bold text-2xl font-serif leading-none">Vive</p>
              <p className="text-[10px] text-brand-dark/50 font-bold uppercase tracking-widest">Est. 2021</p>
            </div>
          </div>
        </div>

        <div>
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-4 block">The Vive Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight relative inline-block">
            Rooted in Nature, <br />
            <span className="text-brand-gold italic relative">
              Proven by Results.
              <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <div className="space-y-6 text-white/70 text-lg leading-relaxed mb-10">
            <p>
              At Vive Beauty Care, we believe that true beauty is a reflection of health and harmony. 
              Our journey began with a simple mission: to create high-performance skincare that doesn't 
              compromise on purity.
            </p>
            <p>
              Every bottle we craft is a blend of ancient botanical wisdom and modern scientific rigor. 
              We don't just sell products; we offer a transformation that you can see and feel.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-serif font-bold text-white mb-2 tracking-wide">Result Oriented</p>
              <p className="text-sm text-white/50">Formulas designed for visible skin transformation.</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-white mb-2 tracking-wide">Handcrafted</p>
              <p className="text-sm text-white/50">Small batches made with love and precision.</p>
            </div>
          </div>

          <button className="mt-6 flex items-center gap-4 text-brand-gold font-bold group">
            Learn More About Our Journey
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
