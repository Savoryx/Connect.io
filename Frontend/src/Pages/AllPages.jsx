import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMeeting from './CreateMeeting';

const Meetings = () => {

  const navigate = useNavigate();

  
  const scheduledMeetings = [
    { id: '001', title: 'Q3 Product Sync', time: '10:00 AM', date: 'Oct 24', duration: '45m', status: 'Upcoming' },
    { id: '002', title: 'Edge Protocol Review', time: '01:30 PM', date: 'Oct 24', duration: '60m', status: 'Live' },
    { id: '003', title: 'Global Node Deployment', time: '09:00 AM', date: 'Oct 25', duration: '30m', status: 'Pending' },
  ];

  return (
    <section className="relative bg-[#FDFCF8] text-slate-900 overflow-hidden font-sans border-t border-slate-200 min-h-screen">
      
      {/* 1. TECHNICAL GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: HEADER & STATS (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-blue-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 font-mono">
                Active // Schedule
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
              Upcoming <br />
              <span className="text-slate-400">Briefings.</span>
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed max-w-xs font-thin text-sm mb-12">
              Real-time synchronization across all global nodes. Select a session to view technical requirements or join the stream.
            </p>

            {/* STATUS COUNTERS */}
            <div className="py-10 border-t border-slate-200 flex gap-10">
                <div>
                    <p className="text-4xl font-black tracking-tighter">03</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1">Confirmed</p>
                </div>
                <div>
                    <p className="text-4xl font-black tracking-tighter text-blue-600">01</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1">Live Now</p>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MEETING LIST (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {scheduledMeetings.map((meeting) => (
              <div key={meeting.id} className="group bg-white border border-slate-200 p-6 md:p-8 rounded-sm hover:border-blue-600 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col items-center justify-center border-r border-slate-100 pr-6">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{meeting.date.split(' ')[0]}</span>
                    <span className="text-2xl font-black tracking-tighter">{meeting.date.split(' ')[1]}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`w-2 h-2 rounded-full ${meeting.status === 'Live' ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}></span>
                       <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Ref: #{meeting.id}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors uppercase">{meeting.title}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">{meeting.time} // {meeting.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <button className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-colors">
                     Join Session
                   </button>
                   <button className="p-3 border border-slate-200 hover:bg-slate-50 transition-colors">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                   </button>
                </div>
              </div>
            ))}

            {/* EMPTY STATE / FOOTER BOX */}
            <div className="bg-slate-900 text-white p-8 rounded-sm relative overflow-hidden group mt-8">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="font-black uppercase text-[10px] tracking-[0.4em] mb-2 text-blue-400 font-mono">
                            Protocol // Quick-Action
                        </h3>
                        <p className="text-lg font-bold">Initiate a new encrypted session instantly.</p>
                    </div>
                    <button onClick={() => navigate('/create-meeting')} className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 transition-all font-black uppercase text-[10px] tracking-widest">
                        + Create Meeting
                    </button>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
                    <div className="w-48 h-48 border-[20px] border-white rounded-full"></div>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="mt-24 pt-10 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-30">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">System Time: {new Date().toLocaleTimeString()}</span>
            <div className="flex gap-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Network: Optimal</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Lat: 51.5074 N</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Meetings;