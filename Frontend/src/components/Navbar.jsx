import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import Register from '../Pages/Register';

function Navbar() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [showDropdown, setShowDropdown] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setShowDropdown(false);
        navigate("/login");
    };

    /**
     * Logic: 
     * 1. Text is white if the page is active, gray if not.
     * 2. Border-bottom is transparent by default (to prevent layout jumping).
     * 3. Border-bottom turns Blue (#2563eb) ONLY on hover.
     */
    const navLinkStyles = ({ isActive }) => 
        `transition-all pb-1 border-b-2 border-transparent hover:border-[#2563eb] hover:text-white ${
            isActive ? "text-white" : "text-gray-400"
        }`;

    return (
        <nav className="relative z-50 flex items-center justify-between bg-[#0a0a0a] text-white py-6 px-4 md:px-12 border-b border-gray-800 font-sans tracking-tight">
            
            {/* 1. LOGO SECTION */}
            <div 
                onClick={() => navigate("/")} 
                className="flex items-center gap-3 cursor-pointer group select-none"
            >
                <div className="relative">
                    <div className="w-8 h-8 bg-[#2563eb] skew-x-[-15deg] transition-all duration-300 group-hover:bg-white group-hover:rotate-6 shadow-[4px_4px_0px_rgba(37,99,235,0.2)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-1 bg-black/40 rounded-full"></div>
                    </div>
                </div>

                <div className="flex flex-col leading-[0.8]">
                    <span className="font-black italic text-2xl md:text-3xl tracking-tighter uppercase text-white">
                        CONNECT<span className="text-[#2563eb] group-hover:text-white transition-colors">.IO</span>
                    </span>
                    <span className="text-[7px] font-bold tracking-[0.4em] text-gray-500 uppercase mt-1 group-hover:text-gray-300 transition-colors">
                        FIXING MEETINGS
                    </span>
                </div>
            </div>

            {/* 2. NAVIGATION LINKS */}
            <ul className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
                <li>
                    <NavLink to="/" className={navLinkStyles}>HOME</NavLink>
                </li>
                <li>
                    <NavLink to="/all-pages" className={navLinkStyles}>ALL ROOMS</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={navLinkStyles}>ABOUT</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={navLinkStyles}>CONTACTS</NavLink>
                </li>
            </ul>

            {/* 3. AUTH & PROFILE ACTIONS */}
            <div className="flex items-center gap-6 relative">
                {token ? (
                    <div className="relative group/profile">
                        <img 
                            onClick={() => setShowDropdown(!showDropdown)} 
                            className="w-10 h-10 object-cover border-2 border-gray-700 cursor-pointer hover:border-[#2563eb] transition-all grayscale hover:grayscale-0" 
                            src={assets.react} 
                            alt="profile" 
                        />
                        
                        {showDropdown && (
                            <>
                                {/* Backdrop to close dropdown */}
                                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute top-14 right-0 z-20 bg-[#121212] border-2 border-gray-800 shadow-[8px_8px_0px_rgba(0,0,0,1)] py-2 w-48 animate-in fade-in zoom-in duration-150">
                                    <div className="px-4 py-2 text-[9px] text-gray-500 uppercase font-black border-b border-gray-800 mb-2 tracking-widest">
                                        Account Overview
                                    </div>
                                    <div 
                                        onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                                        className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 cursor-pointer transition"
                                    >
                                        My Profile
                                    </div>
                                    <div 
                                        onClick={logout} 
                                        className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white cursor-pointer transition"
                                    >
                                        Logout Session
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate("/login")} 
                        className="bg-[#2563eb] hover:bg-white hover:text-black text-white font-black text-[11px] uppercase tracking-[0.2em] px-8 py-3 transition-all transform active:scale-95 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;