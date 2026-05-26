import React from 'react';
import faceModel from '../assets/facemodel.png';
import logoImg from '../assets/logo.jpg';
import oilImg from '../assets/VIVE Product/kumkumadi/oil.jpg';
import hairOilImg from '../assets/VIVE Product/Hair oil/2.jpeg';
import flowerIcon from '../assets/flowericon.svg';

const WhyVive = () => {
  const points = [
    {
      id: "01",
      title: "Sacredly Sourced",
      description: "Hand-picked botanicals at peak potency from nature's heart.",
      icon: "🌿"
    },
    {
      id: "02",
      title: "Science of Ayurveda",
      description: "Traditional wisdom meets modern clinical performance.",
      icon: "✨"
    },
    {
      id: "03",
      title: "Slow-Batch Mastery",
      description: "Artisanal handcrafted processes for maximum essence.",
      icon: "🏺"
    },
    {
      id: "04",
      title: "Purity Promise",
      description: "Zero toxins. Zero parabens. 100% natural care.",
      icon: "💧"
    }
  ];

  return (
    <section className="py-24 bg-white" id="why-vive">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Unified Section Container */}
        <div className="relative bg-brand-cream/20 rounded-[60px] overflow-hidden border border-brand-cream/50 p-8 md:p-16 lg:p-20 shadow-2xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-magenta/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content Column (7/12) */}
            <div className="lg:col-span-7">
              <span className="text-brand-magenta font-sans font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block">The Vive Essence</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-12">
                Why Choose <br /> 
                <span className="text-brand-magenta italic relative">
                  Vive Beauty?
                  <svg className="absolute -bottom-2 left-0 w-[120%] h-6 text-brand-gold/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              {/* Points Grid - Compact & Bold */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {points.map((point) => (
                  <div key={point.id} className="group p-6 bg-white rounded-3xl border border-brand-cream hover:border-brand-magenta/20 hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-brand-gold font-sans italic text-3xl opacity-40 group-hover:opacity-100 transition-opacity">
                        {point.id}
                      </span>
                      <div className="w-8 h-[1px] bg-brand-magenta/20 group-hover:w-12 transition-all"></div>
                      <span className="text-lg">{point.icon}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-brand-dark mb-2 group-hover:text-brand-magenta transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-gray-500 font-sans text-xs leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Column (5/12) */}
            <div className="lg:col-span-5 relative group">
               {/* Main Hero Circle */}
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white p-12">
                  <img 
                    src={logoImg} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[3000ms]" 
                    alt="Vive Logo" 
                  />
                  <div className="absolute inset-0 bg-brand-magenta/5 group-hover:bg-transparent transition-colors duration-700"></div>
                  
               </div>

               {/* Overlapping Detail Images */}
               <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl hidden md:block animate-vertical-float">
                  <img src={oilImg} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="absolute -top-6 -right-6 w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl hidden md:block animate-vertical-float" style={{ animationDelay: '-3s' }}>
                  <img src={hairOilImg} className="w-full h-full object-cover" alt="" />
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyVive;
