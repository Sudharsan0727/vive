import React from 'react';

const TRUST_ITEMS = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "100% Authentic",
    description: "Genuine products guaranteed"
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.51-8.313-7.892-8.567A8.981 8.981 0 0011.625 2.625h-5.25c-.621 0-1.125.504-1.125 1.125v10.5m17.25 4.5l-2.25-2.25" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Quick & reliable shipping"
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Quality Guaranteed",
    description: "Premium ingredients & safety"
  },
  {
    id: 4,
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Safe & encrypted checkout"
  }
];

const TrustBadges = () => {
  return (
    <section className="py-10 bg-brand-cream/5 border-t border-brand-magenta/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center group">
              {/* Boutique Icon Circle */}
              <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mb-4 md:mb-8 transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(212,43,98,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-magenta opacity-0 group-hover:opacity-10 transition-opacity"></div>
                {item.icon}
              </div>

              {/* Artisan Typography */}
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 tracking-wide italic">
                {item.title}
              </h3>
              <div className="w-8 h-[1px] bg-brand-magenta/20 mb-3 transition-all duration-500 group-hover:w-16"></div>
              <p className="text-gray-400 text-[11px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-[160px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
