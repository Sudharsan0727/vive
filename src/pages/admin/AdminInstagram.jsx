import React, { useState } from 'react';

const AdminInstagram = () => {
  const [reels, setReels] = useState([
    { id: 1, videoUrl: "/videos/1.mp4", title: "Artisan Craft", likes: "1.2k", status: "Active" },
    { id: 2, videoUrl: "/videos/2.mp4", title: "Nature's Essence", likes: "2.3k", status: "Active" },
    { id: 3, videoUrl: "/videos/3.mp4", title: "Pure Rituals", likes: "2.4k", status: "Active" },
    { id: 4, videoUrl: "/videos/4.mp4", title: "Glow Secrets", likes: "1.5k", status: "Active" },
    { id: 5, videoUrl: "/videos/5.mp4", title: "Sacred Care", likes: "3.1k", status: "Active" },
    { id: 6, videoUrl: "/videos/6.mp4", title: "Botanical Blend", likes: "1.8k", status: "Active" },
    { id: 7, videoUrl: "/videos/7.mp4", title: "Self Care Sunday", likes: "2.9k", status: "Active" },
    { id: 8, videoUrl: "/videos/8.mp4", title: "Organic Glow", likes: "4.2k", status: "Active" }
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-magenta font-serif">Instagram Reels</h1>
          <p className="text-sm text-slate-600 mt-1">Manage the video reels displayed in the Instagram section on the homepage.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-magenta text-white rounded-xl text-sm font-medium hover:bg-brand-magenta/90 transition-all shadow-[0_4px_14px_rgba(216,27,96,0.3)] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Upload New Reel
        </button>
      </div>

      {/* Reel Management Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/60 bg-white/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Current Reels</h2>
          <span className="bg-white/60 text-brand-magenta text-xs font-bold px-3 py-1 rounded-full border border-brand-magenta/20">
            {reels.length} Videos
          </span>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reels.map((reel) => (
              <div key={reel.id} className="group relative bg-white/50 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col">
                {/* Reel Preview */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900">
                  <video 
                    src={reel.videoUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    preload="metadata"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full backdrop-blur-md border ${
                      reel.status === 'Active' 
                        ? 'bg-green-500/80 text-white border-green-400/30' 
                        : 'bg-slate-500/80 text-white border-slate-400/30'
                    }`}>
                      {reel.status}
                    </span>
                  </div>
                </div>

                {/* Reel Info */}
                <div className="p-3 flex-1 flex flex-col justify-between bg-white/30 border-t border-white/60">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 truncate">{reel.title}</h3>
                    <div className="flex items-center gap-1 mt-1 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-[10px] font-bold">{reel.likes}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-white/40">
                    <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-magenta hover:bg-white/60 rounded-lg transition-colors border border-transparent hover:border-white/80 text-center">
                      Edit
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 hover:text-red-500 hover:bg-white/60 rounded-lg transition-colors border border-transparent hover:border-white/80 text-center">
                      Delete
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

export default AdminInstagram;
