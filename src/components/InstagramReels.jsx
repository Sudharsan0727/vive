import React, { useRef, useState } from 'react';

const REELS = [
  { id: 1, videoUrl: "/videos/1.mp4", title: "Artisan Craft", likes: "1.2k" },
  { id: 2, videoUrl: "/videos/2.mp4", title: "Nature's Essence", likes: "2.3k" },
  { id: 3, videoUrl: "/videos/3.mp4", title: "Pure Rituals", likes: "2.4k" },
  { id: 4, videoUrl: "/videos/4.mp4", title: "Glow Secrets", likes: "1.5k" },
  { id: 5, videoUrl: "/videos/5.mp4", title: "Sacred Care", likes: "3.1k" },
  { id: 6, videoUrl: "/videos/6.mp4", title: "Botanical Blend", likes: "1.8k" },
  { id: 7, videoUrl: "/videos/7.mp4", title: "Self Care Sunday", likes: "2.9k" },
  { id: 8, videoUrl: "/videos/8.mp4", title: "Organic Glow", likes: "4.2k" }
];

const InstagramReels = () => {
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden group/section" id="insta-reels">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative">
        
        {/* Header synchronized with brand style */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-8 px-2 md:px-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-brand-magenta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">@vive_beautycare</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight relative inline-block">
              Vive in <span className="text-brand-magenta italic relative">
                Motion
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-5 text-brand-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/vive_beautycare/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-brand-magenta/20 text-brand-magenta font-bold text-xs uppercase tracking-widest hover:bg-brand-magenta hover:text-white transition-all shadow-sm whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Follow our Journey
            </a>
          </div>
        </div>

        {/* Side Navigation Arrows - Floating Design */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-brand-magenta hover:bg-brand-magenta hover:text-white transition-all opacity-0 group-hover/section:opacity-100 border border-brand-magenta/10 -translate-x-4 group-hover/section:translate-x-4 hidden md:flex"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-brand-magenta hover:bg-brand-magenta hover:text-white transition-all opacity-0 group-hover/section:opacity-100 border border-brand-magenta/10 translate-x-4 group-hover/section:-translate-x-4 hidden md:flex"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Video Reel Strip using Direct MP4s */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto pb-12 hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth"
        >
          <div className="flex gap-6 snap-x">
            {REELS.map((reel) => (
              <div 
                key={reel.id} 
                onClick={() => setSelectedVideo(reel)}
                className="shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-brand-cream/10 shadow-2xl relative group snap-start border border-brand-cream/50 cursor-pointer"
              >
                {/* Direct Video Element - NO Instagram Branding */}
                <video 
                  src={reel.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{reel.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-xs font-bold">{reel.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Massive Spacer to ensure last video is never hidden */}
            <div className="shrink-0 w-40 md:w-80" aria-hidden="true" />
          </div>
        </div>

      </div>

      {/* Video Popup Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm transition-all duration-500 animate-in fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div 
            className="relative w-full max-w-sm aspect-[9/16] bg-brand-dark rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src={selectedVideo.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
              className="w-full h-full object-cover"
            />
            
            {/* Modal Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h3 className="text-xl font-serif font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-brand-cream/60 text-xs uppercase tracking-widest font-bold">@vive_beautycare</p>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default InstagramReels;
