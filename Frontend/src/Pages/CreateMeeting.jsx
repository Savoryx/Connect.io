import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [joinRoomId, setJoinRoomId] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    const roomId = uuidv4();
    navigate(`/meeting-room/${roomId}`);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = joinRoomId.trim();
    if (!trimmed) {
      setError('Please enter a Room ID.');
      return;
    }
    navigate(`/meeting-room/${trimmed}`);
  };

  return (
    <section className="relative min-h-screen bg-[#FDFCF8] text-slate-900 overflow-hidden font-sans flex items-center">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: BRANDING */}
          <div className="flex flex-col antialiased">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 font-mono">
                Session // Control
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-thin tracking-tighter uppercase mb-6 leading-[0.9]">
              Launch <br />
              <span className="font-black text-slate-900">Session.</span>
            </h2>
            <p className="text-slate-500 font-light tracking-wide max-w-sm leading-relaxed">
              Instantiate a new encrypted meeting node or connect to an existing session using a Room ID.
            </p>

            <div className="mt-12 hidden lg:block space-y-4">
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-[1px] w-8 bg-slate-900"></div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Encryption: WebRTC E2E</span>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-[1px] w-8 bg-slate-900"></div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Protocol: PeerJS / Socket.IO</span>
              </div>
            </div>
          </div>

          {/* RIGHT: ACTION CARDS */}
          <div className="flex flex-col gap-6">

            {/* CREATE NEW */}
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 border-[20px] border-white rounded-full"></div>
              </div>
              <h3 className="font-black uppercase text-[10px] tracking-[0.4em] mb-3 text-blue-400 font-mono">
                Protocol // New Node
              </h3>
              <p className="text-xl font-bold mb-6">Create an instant encrypted session.</p>
              <button
                onClick={handleCreate}
                className="px-8 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 transition-all font-black uppercase text-[10px] tracking-widest"
              >
                + Instantiate Room
              </button>
            </div>

            {/* JOIN EXISTING */}
            <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-sm relative">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-slate-300 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-slate-300 opacity-50"></div>

              <h3 className="font-black uppercase text-[10px] tracking-[0.4em] mb-3 text-slate-400 font-mono">
                Protocol // Join Node
              </h3>
              <p className="text-lg font-bold mb-6">Join an existing session with a Room ID.</p>

              <form onSubmit={handleJoin} className="flex flex-col gap-4">
                {error && (
                  <div className="p-3 bg-red-50 border-l-2 border-red-500">
                    <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{error}</p>
                  </div>
                )}
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors block mb-2">
                    Room ID
                  </label>
                  <input
                    type="text"
                    value={joinRoomId}
                    onChange={(e) => { setJoinRoomId(e.target.value); setError(''); }}
                    className="w-full bg-transparent border-b border-slate-200 py-3 font-light text-lg outline-none focus:border-blue-600 transition-all placeholder:text-slate-200 font-mono"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white font-black py-4 px-10 uppercase text-[11px] tracking-[0.3em] hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-2"
                >
                  Connect to Node
                  <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            </div>

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

export default CreateMeeting;