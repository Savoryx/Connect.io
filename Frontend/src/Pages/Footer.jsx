import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FDFCF8] text-slate-900 pt-24 pb-12 overflow-hidden font-sans border-t border-slate-200 antialiased">
      
      {/* BACKGROUND GRID (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* TOP SECTION: BRAND & STATUS */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 skew-x-[-15deg] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="font-black text-lg tracking-[0.3em] uppercase">Connect.io</span>
            </div>
            <p className="text-sm font-light text-slate-500 leading-relaxed tracking-wide">
              The professional standard for low-latency video infrastructure. Built for the next generation of remote-first engineering teams.
            </p>
          </div>

          {/* SYSTEM STATUS INDICATOR */}
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-sm flex items-center gap-6 shadow-sm">
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Network</span>
                <span className="text-xs font-bold uppercase tracking-tighter">Operational // 100%</span>
             </div>
             <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1.5 h-6 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-500 animate-pulse"></div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Protocol</h4>
            <ul className="space-y-4 text-sm font-light tracking-wider">
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Core Engine</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Neural Gate</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Edge Nodes</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light tracking-wider">
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Manifesto</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Careers</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-light tracking-wider">
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Privacy</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">Security</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">SLA</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Social</h4>
            <ul className="space-y-4 text-sm font-light tracking-wider">
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">X / Twitter</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">GitHub</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">LinkedIn</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400">
            © {currentYear} Connect.io Infrastructure
          </p>
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400">
            IGIT Sarang // Talcher // IN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;