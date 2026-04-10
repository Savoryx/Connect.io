import React from 'react';

const About = () => {
  return (
    <section className="relative bg-[#FDFCF8] text-slate-900 overflow-hidden font-sans border-t border-slate-200">
      
      {/* 1. TECHNICAL GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-44">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-start">
          
          {/* LEFT COLUMN: THE MANIFESTO */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-10 h-[2px] bg-blue-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 font-mono">
                Mission // Statement
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12">
              Beyond the <br />
              <span className="text-slate-400">Standard Call.</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed max-w-lg font-thin text-sm md:text-base">
              <p>
                Video conferencing hasn't fundamentally changed in a decade. We still deal with the same "Can you hear me?" loops and pixelated screens. 
              </p>
              <p>
                <strong className="text-slate-900">Connect.io</strong> was born out of a simple frustration: Why is it easier to stream 4K movies than to have a stable professional conversation?
              </p>
              <p>
                We've rebuilt the protocol from the ground up to prioritize human presence over software bloat, focusing on extreme stability in low-bandwidth environments.
              </p>
            </div>

            {/* LIVE DATA COUNTERS */}
            <div className="mt-12 py-10 border-y border-slate-200 flex flex-wrap gap-10 md:gap-16">
                <div>
                    <p className="text-4xl font-black tracking-tighter">1.2ms</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1">Avg. Jitter</p>
                </div>
                <div>
                    <p className="text-4xl font-black tracking-tighter">99.9%</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1">Signal Integrity</p>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TECHNICAL GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Feature 1: Edge Computing */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm group hover:border-blue-600 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                </div>
                <h3 className="font-black uppercase text-xs tracking-widest mb-3">Edge-Native</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    We host our own nodes globally to ensure your data never travels further than it needs to.
                </p>
            </div>

            {/* Feature 2: Privacy */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm group hover:border-blue-600 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="font-black uppercase text-xs tracking-widest mb-3">Sovereign Data</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Peer-to-peer architecture ensures that we never store—and can never access—your conversations.
                </p>
            </div>

            {/* Large Accent Box */}
            <div className="sm:col-span-2 bg-slate-900 text-white p-10 rounded-sm relative overflow-hidden group">
                {/* Visual Background Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <div className="w-32 h-32 border-[10px] border-white rounded-full translate-x-10 -translate-y-10"></div>
                </div>
                
                <h3 className="font-black uppercase text-[10px] tracking-[0.4em] mb-8 text-blue-400 font-mono">
                    System Architecture // Core
                </h3>
                <p className="text-2xl md:text-3xl font-bold leading-tight mb-10 max-w-md">
                    "If a call drops, it's a failure of engineering. We're here to solve for 100% human-grade fidelity."
                </p>
                <div className="flex items-center gap-4 border-t border-slate-800 pt-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center font-black text-white italic">C</div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Connect.io Labs</p>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Research & Development // 2026</p>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="mt-32 pt-16 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-30">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Build ID: 0xFF-2026</span>
            <div className="flex gap-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Privacy</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Protocol</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;