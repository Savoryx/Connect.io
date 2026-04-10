import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, { name, email, password });
      const token = response.data.token;
      localStorage.setItem("Token", token);
      navigate('/create-meeting');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#FDFCF8] text-slate-900 overflow-hidden font-sans flex items-center">
      
      {/* BACKGROUND GRID ARCHITECTURE */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: BRANDING & SYSTEM INFO */}
          <div className="flex flex-col antialiased">
            <div className="flex items-center gap-3 mb-8">
                <span className="h-2 w-2 bg-blue-600 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 font-mono">
                System // Initialization
                </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-thin tracking-tighter uppercase mb-6 leading-[0.9]">
              Begin <br /> 
              <span className="font-black text-slate-900">Register.</span>
            </h2>
            <p className="text-slate-500 font-light tracking-wide max-w-sm leading-relaxed">
              Initialize your operator profile to gain access to the Connect.io distributed network and cloud infrastructure.
            </p>
            
            <div className="mt-12 hidden lg:block">
              <div className="space-y-4">
                <div className="flex items-center gap-4 opacity-40">
                  <div className="h-[1px] w-8 bg-slate-900"></div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Node: US-EAST-01</span>
                </div>
                <div className="flex items-center gap-4 opacity-40">
                  <div className="h-[1px] w-8 bg-slate-900"></div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Auth Level: Tier 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SIGN UP FORM */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm relative">
            {/* Design Accents */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-slate-300 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-slate-300 opacity-50"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

              {/* ERROR MESSAGE */}
              {error && (
                <div className="p-3 bg-red-50 border-l-2 border-red-500">
                  <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{error}</p>
                </div>
              )}
              
              {/* INPUT 01: NAME */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    01 // System Alias
                  </label>
                  <span className="text-[9px] font-mono text-slate-300">REQ_FIELD</span>
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200"
                  placeholder="Full legal or handle name"
                />
              </div>

              {/* INPUT 02: EMAIL */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    02 // Network Address
                  </label>
                  <span className="text-[9px] font-mono text-slate-300">SMTP_VALIDATE</span>
                </div>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200"
                  placeholder="operator@network.io"
                />
              </div>

              {/* INPUT 03: PASSWORD */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    03 // Access Key
                  </label>
                  <span className="text-[9px] font-mono text-slate-300">SH_256_ENCRYPT</span>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200"
                  placeholder="••••••••••••"
                />
                <p className="text-[9px] text-slate-400 mt-3 font-mono uppercase tracking-tighter italic">Min 6 chars / uppercase + lowercase + number + symbol required</p>
              </div>

              {/* SUBMIT ACTION */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white font-black py-5 px-10 uppercase text-[11px] tracking-[0.3em] hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Registering...' : 'Confirm Registration'}
                  {!loading && (
                    <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* REDIRECT */}
              <div className="text-center pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Already Registered? <a href="/signup" className="text-blue-600 hover:text-slate-900 underline-offset-8 decoration-1 underline ml-2 transition-colors">Sign In</a>
                </p>
              </div>
            </form>
          </div>

        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-wrap gap-8 justify-between opacity-30">
          <div className="flex gap-10">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Protocol: HTTPS/TLS 1.3</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Region: Global-Alpha</span>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest tracking-[0.4em]">© 2026 CONNECT_IO_SYSTEMS</span>
        </div>

      </div>
    </section>
  );
};

export default Register;