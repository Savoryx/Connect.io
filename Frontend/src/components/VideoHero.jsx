import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoHero = () => {

  const navigate =useNavigate();

  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden font-sans selection:bg-blue-600">
      
      {/* 1. Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>




      {/* --- 2. REFINED ARCHITECTURAL GRID --- */}
<div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
  
  {/* The "Scanner" Line (Animated) */}
  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent top-0 animate-[scan_8s_linear_infinite]"></div>

  {/* MAIN AXIS LINES */}
  {/* Vertical Left Axis with Measuring Ticks */}
  <div className="absolute left-[10%] h-full w-[1px] bg-gradient-to-b from-transparent via-gray-700 to-transparent">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="absolute w-2 h-[1px] bg-gray-600 left-0" style={{ top: `${i * 10}%` }}></div>
    ))}
  </div>

  {/* Vertical Right Axis (Offset) */}
  <div className="absolute left-[88%] h-[70%] top-[15%] w-[1px] bg-gray-800"></div>

  {/* Horizontal Center-Top Line */}
  <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

  {/* Horizontal Bottom Line (Broken) */}
  <div className="absolute top-[80%] left-[5%] w-[40%] h-[1px] bg-gray-700/50"></div>
  <div className="absolute top-[80%] right-[5%] w-[30%] h-[1px] bg-gray-700"></div>

  {/* INTERSECTION MARKERS (The Detail Work) */}
  {/* Crosshair at (10%, 20%) */}
  <div className="absolute top-[20%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
    <div className="w-4 h-4 border border-blue-600/40 rounded-full animate-pulse"></div>
    <div className="absolute w-[1px] h-6 bg-blue-500/50"></div>
    <div className="absolute w-6 h-[1px] bg-blue-500/50"></div>
  </div>

  {/* Data Labels (Blueprint Style) */}
  <div className="absolute top-[22%] left-[11%] flex flex-col gap-1">
    <span className="text-[7px] font-mono text-blue-400 font-bold uppercase tracking-widest">Target_Sync_Active</span>
    <span className="text-[6px] font-mono text-gray-400 uppercase tracking-[0.2em]">LAT: 40.7128 / LON: 74.0060</span>
  </div>

  {/* Corner Brackets */}
  <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gray-700"></div>
  <div className="absolute bottom-32 right-8 w-12 h-12 border-b border-r border-gray-700 opacity-50"></div>

</div>




      {/* 2. Background "Floating Problems" - Stamp Aesthetic */}
      <div className="absolute inset-0 overflow-hidden opacity-20 select-none">
        <div className="absolute top-10 -left-10 rotate-[-12deg] border-2 border-dashed border-gray-500 p-8 max-w-[250px] uppercase font-black text-xl leading-tight">
          Why is lag still a thing in 2026?
        </div>
        <div className="absolute top-1/4 -right-12 rotate-[15deg] border-2 border-dashed border-gray-500 p-10 max-w-[300px] uppercase font-black text-2xl leading-tight">
          "Can you hear me now?"
        </div>
        <div className="absolute bottom-30 left-20 rotate-[-5deg] border-2 border-dashed border-gray-500 p-6 max-w-[280px] uppercase font-black text-lg">
          Complex UI is killing my productivity.
        </div>
         <div className="absolute bottom-20 right-20 rotate-[-18deg] border-2 border-dashed border-gray-500 p-6 max-w-[280px] uppercase font-black text-lg">
          Complexity is killing my ... oooH...
        </div>
      </div>

      {/* 3. Navigation */}
      {/* 
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 skew-x-[-20deg]"></div>
          <span className="font-black italic text-xl tracking-tighter uppercase">Connect.io</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Case Studies</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
          <a href="#" className="text-white border-b border-white pb-1">Our Mission</a>
        </div>
      </nav>
      */}

      {/* 4. Main Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-gray-400 mb-6">
          The World's Wishlist for Better Meetings
        </h2>
        
        <div className="relative group">
          {/* Main Title with 'Distorted' Text Effect */}
          <h1 className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase flex items-center">
            FI<span className="inline-block bg-white text-black px-2 mx-1 rotate-[-2deg] text-5xl md:text-8xl self-center">X</span>VIDEO
          </h1>
          <div className="absolute -bottom-4 right-0 bg-blue-600 text-[10px] font-bold px-3 py-1 uppercase tracking-widest rotate-2">
            by Connect
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <button onClick={() => navigate('/create-meeting')} className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-sm transition-all transform active:scale-95 text-sm uppercase tracking-wider">
            Start a Flawless Call
          </button>
          <button className="border border-gray-600 hover:border-white text-white font-bold py-4 px-10 rounded-sm transition-all text-sm uppercase tracking-wider">
            Nah, Show Me Repo
          </button>
        </div>
      </main>

      {/* 5. Bottom Stats Bar */}
      <div className="absolute bottom-0 w-full border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800 py-6">
          <div className="flex items-center justify-center gap-4 px-4 py-2">
            <span className="text-2xl font-black">1.2ms</span>
            <span className="text-[10px] uppercase text-gray-500 font-bold leading-none">Global<br/>Latency</span>
          </div>
          <div className="flex items-center justify-center gap-4 px-4 py-2">
            <span className="text-2xl font-black">500+</span>
            <span className="text-[10px] uppercase text-gray-500 font-bold leading-none">Enterprise<br/>Partners</span>
          </div>
          <div className="flex items-center justify-center gap-4 px-4 py-2">
            <span className="text-2xl font-black italic underline decoration-blue-600">AI-DRIVEN</span>
            <span className="text-[10px] uppercase text-gray-500 font-bold leading-none">Noise<br/>Cancellation</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VideoHero;