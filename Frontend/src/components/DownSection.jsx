import React from 'react';

const DownSection = () => {
  return (
    <div className="relative bg-[#f3f1eb] text-slate-900 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-700 border-t border-slate-200">
      
      {/* 1. LIGHT ARCHITECTURAL GRID */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none overflow-hidden">
        {/* Subtle Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Vertical Primary Axis */}
        <div className="absolute left-[5%] md:left-[10%] h-full w-[1px] bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
        
        {/* Floating Blueprint Markers */}
        <div className="absolute top-[10%] right-[15%] w-24 h-24 border border-blue-200 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* --- Main Section Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-20 md:py-32">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center mb-16 md:mb-28 text-center">
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 font-mono">
              Network Analysis 2026
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-slate-900">
            India Spoke. <br className="hidden md:block" />
            <span className="text-blue-600">We Built the Fix.</span>
          </h2>
          <p className="mt-6 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-slate-500 max-w-2xl">
            Solving the critical failures of traditional video conferencing through direct user feedback.
          </p>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Latency */}
          <div className="group bg-white border border-slate-200 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">01 // LAG</span>
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 uppercase tracking-tight">Zero-Buffer Protocol</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              "70% of problems stem from sync issues." We replaced standard WebRTC with a proprietary low-jitter engine for sub-50ms global latency.
            </p>
          </div>

          {/* Card 2: Clutter */}
          <div className="group bg-white border border-slate-200 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">02 // UX</span>
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 uppercase tracking-tight">Invisible Interface</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Dating, travel, and parking apps are cluttered. Your video calls shouldn't be. Our UI stays hidden until you actually need it.
            </p>
          </div>

          {/* Card 3: Audio */}
          <div className="group bg-white border border-slate-200 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">03 // AUDIO</span>
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 uppercase tracking-tight">Neural Noise Gate</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              9,500+ users cited "background noise" as the top fatigue factor. Our AI filters out everything except your team's voices.
            </p>
          </div>

          {/* LARGE INTERACTIVE CTA */}
          <div className="md:col-span-2 lg:col-span-3 mt-12 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-slate-900 rounded-2xl p-8 md:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Decorative Background for CTA */}
              <div className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"></div>
              </div>

              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                  Better Meetings <br /> Start with <span className="text-blue-500">Better Tech.</span>
                </h3>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Join the waitlist for the Enterprise Alpha.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-lg transition-all shadow-lg shadow-blue-600/20 active:scale-95 uppercase text-xs tracking-widest">
                  Secure Your Access
                </button>
                <button className="bg-transparent border border-slate-700 hover:border-slate-500 text-white font-bold py-5 px-12 rounded-lg transition-all uppercase text-xs tracking-widest">
                  View Specs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER LOGO (Subtle) */}
        <div className="mt-24 flex justify-center opacity-30">
           <div className="flex items-center gap-3 grayscale">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-900 skew-x-[-20deg]"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="font-mono text-slate-900 text-[10px] tracking-[0.2em] font-bold uppercase">
              FIXING MEETINGS.IO
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DownSection;