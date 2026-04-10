import React from 'react';

const Contact = () => {
  return (
    <section className="relative bg-[#FDFCF8] text-slate-900 overflow-hidden font-sans border-t border-slate-200">
      
      {/* 1. MINIMALIST GRID OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-44">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT: TEXT & INFO */}
          <div className="flex flex-col antialiased">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-8 font-mono">
              Direct // Line
            </span>
            <h2 className="text-6xl md:text-8xl font-thin tracking-tighter uppercase mb-10 leading-[0.9]">
              Request <br /> 
              <span className="font-black text-slate-900">Priority.</span>
            </h2>
            <p className="text-slate-500 font-light tracking-wide max-w-md leading-relaxed mb-12">
              Our engineering team handles all onboarding personally. Leave your details below, and we'll reach out to discuss your infrastructure needs.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Office // Labs</p>
                <p className="text-sm font-light tracking-wider">IGIT Sarang, Talcher, IN</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Mail // Protocol</p>
                <p className="text-sm font-light tracking-wider underline underline-offset-4">sachin@connect.io</p>
              </div>
            </div>
          </div>

          {/* RIGHT: MINIMALIST FORM */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-sm">
            <form className="space-y-10">
              
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  01 / Full Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200"
                  placeholder="Enter Name"
                />
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  02 / Organization
                </label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200"
                  placeholder="name@company.com"
                />
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  03 / Message (Optional)
                </label>
                <textarea 
                  rows="2"
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200 resize-none"
                  placeholder="Tell us about your stack"
                />
              </div>

              <button className="w-full bg-slate-900 text-white font-black py-5 px-10 uppercase text-[11px] tracking-[0.3em] hover:bg-blue-600 transition-all active:scale-[0.98] mt-4">
                Initialize Protocol
              </button>

            </form>
          </div>

        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-32 pt-10 border-t border-slate-200 flex justify-between opacity-20">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Connect.io // Form 2.1</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Awaiting Input...</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;