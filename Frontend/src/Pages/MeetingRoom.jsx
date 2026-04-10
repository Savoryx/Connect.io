import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'peerjs';

const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER || 'http://localhost:5000';

// ---------------------------------------------------------------------------
// VideoNode
// ---------------------------------------------------------------------------
const VideoNode = ({ stream, name, isLocal, isCamActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-slate-900 rounded-sm overflow-hidden border border-slate-800 shadow-xl group min-h-[300px]">
      {!isCamActive && isLocal && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px] uppercase tracking-[0.5em] z-10 bg-slate-900">
          Visual Feed Disabled
        </div>
      )}
      <div
        className={`absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 border-l-2 ${
          isLocal ? 'border-blue-600' : 'border-slate-400'
        } z-20`}
      >
        <span className="text-white text-[10px] font-black uppercase tracking-widest">
          {isLocal ? `Local Node (${name || 'You'})` : `Remote Node // ${name || 'Alpha'}`}
        </span>
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className={`w-full h-full object-cover transition-opacity ${
          !isCamActive && isLocal ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// MeetingRoom
// ---------------------------------------------------------------------------
const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Media state
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]); // [{ peerId, stream, name }]
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);

  // UI state
  const [myname, setMyname] = useState(() => `User_${Math.random().toString(36).slice(2, 6)}`);
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 'sys-0', sender: 'System', text: 'Encrypted session established. WebRTC Sync running.', isSystem: true },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Refs – keep stable references without triggering re-renders
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const callsRef = useRef({}); // peerId → Peer.MediaConnection

  // ---------------------------------------------------------------------------
  // 1. Acquire local media
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        setLocalStream(stream);
      } catch (err) {
        console.error('getUserMedia error:', err);
        // Still enter the room without media
      }
    })();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ---------------------------------------------------------------------------
  // 2. Toggle mic / cam on the live stream tracks
  // ---------------------------------------------------------------------------
  useEffect(() => {
    localStreamRef.current?.getAudioTracks().forEach((t) => {
      t.enabled = micActive;
    });
  }, [micActive]);

  useEffect(() => {
    localStreamRef.current?.getVideoTracks().forEach((t) => {
      t.enabled = camActive;
    });
  }, [camActive]);

  // ---------------------------------------------------------------------------
  // 3. Socket + PeerJS setup (runs once local stream is ready)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!roomId) return;

    // -- PeerJS --
    const peer = new Peer(undefined, {
      host: 'localhost',
      port: 5000,
      path: '/peerjs',
      secure: false,
    });
    peerRef.current = peer;

    peer.on('open', (myPeerId) => {
      // -- Socket.IO --
      const socket = io(SOCKET_SERVER);
      socketRef.current = socket;

      socket.emit('join-room', { roomId, peerId: myPeerId, name: myname });

      // A new user joined → call them
      socket.on('user-joined', ({ peerId, name: remoteName }) => {
        if (!localStreamRef.current) return;
        const call = peer.call(peerId, localStreamRef.current, {
          metadata: { name: myname },
        });
        callsRef.current[peerId] = call;
        call.on('stream', (remoteStream) => {
          setRemoteStreams((prev) => {
            if (prev.find((r) => r.peerId === peerId)) return prev;
            return [...prev, { peerId, stream: remoteStream, name: remoteName }];
          });
        });
        call.on('close', () => removeRemote(peerId));
        call.on('error', (err) => console.error('Call error:', err));
      });

      // Receive chat messages from others
      socket.on('chat-message', ({ sender, text }) => {
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender, text, isSystem: false },
        ]);
      });

      // A user disconnected
      socket.on('user-left', ({ peerId }) => {
        callsRef.current[peerId]?.close();
        delete callsRef.current[peerId];
        removeRemote(peerId);
      });
    });

    // Answer incoming calls
    peer.on('call', (call) => {
      call.answer(localStreamRef.current ?? undefined);
      const remoteName = call.metadata?.name || 'Unknown';
      call.on('stream', (remoteStream) => {
        setRemoteStreams((prev) => {
          if (prev.find((r) => r.peerId === call.peer)) return prev;
          return [...prev, { peerId: call.peer, stream: remoteStream, name: remoteName }];
        });
      });
      call.on('close', () => removeRemote(call.peer));
      callsRef.current[call.peer] = call;
    });

    peer.on('error', (err) => console.error('PeerJS error:', err));

    return () => {
      Object.values(callsRef.current).forEach((c) => c.close());
      callsRef.current = {};
      socketRef.current?.disconnect();
      peerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const removeRemote = useCallback((peerId) => {
    setRemoteStreams((prev) => prev.filter((r) => r.peerId !== peerId));
  }, []);

  // ---------------------------------------------------------------------------
  // Chat
  // ---------------------------------------------------------------------------
  const sendChatMessage = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    socketRef.current?.emit('chat-message', { roomId, sender: myname, text });
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: myname, text, isSystem: false, isSelf: true },
    ]);
    setChatInput('');
  }, [chatInput, myname, roomId]);

  const handleChatKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  // ---------------------------------------------------------------------------
  // Invite
  // ---------------------------------------------------------------------------
  const copyInvite = () => {
    navigator.clipboard.writeText(window.location.href).catch(console.error);
    setInviteModalOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const totalCols = Math.min(remoteStreams.length + 1, 3);

  return (
    <div className="relative bg-[#FDFCF8] text-slate-900 font-sans min-h-screen flex flex-col overflow-hidden">

      {/* ── Invite Modal ─────────────────────────────────────────────────── */}
      {inviteModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded p-6 w-full max-w-sm shadow-2xl">
            <h4 className="font-bold text-lg mb-2">Invite People</h4>
            <p className="text-sm text-slate-600 mb-1">Room ID:</p>
            <p className="text-sm font-mono bg-slate-50 border border-slate-200 rounded px-3 py-2 mb-4 break-all select-all">
              {roomId}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="px-4 py-2 border rounded text-sm hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={copyInvite}
                className="px-4 py-2 bg-blue-600 rounded text-white text-sm hover:bg-blue-700 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="relative z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          <h1 className="text-sm font-black uppercase tracking-[0.2em] font-mono">
            Live // Encrypted Node{' '}
            <span className="text-slate-400 ml-2">#{roomId?.substring(0, 6) || 'XXX'}</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Network: Stable
          </span>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="relative flex-1 flex flex-row overflow-hidden">

        {/* Grid background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        {/* Video grid */}
        <section
          className="relative z-10 flex-1 p-6 transition-all duration-500 grid gap-4 auto-rows-fr grid-cols-1 md:grid-cols-2"
          style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
        >
          {localStream && (
            <VideoNode
              stream={localStream}
              name={myname}
              isLocal
              isCamActive={camActive}
            />
          )}
          {remoteStreams.map((remote) => (
            <VideoNode
              key={remote.peerId}
              stream={remote.stream}
              name={remote.name}
              isLocal={false}
              isCamActive
            />
          ))}
        </section>

        {/* Sidebar */}
        {(chatOpen || participantsOpen) && (
          <aside className="relative z-20 w-80 bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-[0.3em]">
                {chatOpen ? 'Protocol // Chat' : 'Active // Nodes'}
              </h3>
              <button
                onClick={() => { setChatOpen(false); setParticipantsOpen(false); }}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {chatOpen ? (
                <div className="space-y-3">
                  {chatMessages.map((msg) =>
                    msg.isSystem ? (
                      <div key={msg.id} className="p-3 bg-slate-50 border-l-2 border-blue-600">
                        <p className="text-[10px] font-mono font-bold text-blue-600 uppercase mb-1">
                          System
                        </p>
                        <p className="text-xs text-slate-600">{msg.text}</p>
                      </div>
                    ) : (
                      <div
                        key={msg.id}
                        className={`p-3 rounded ${
                          msg.isSelf
                            ? 'bg-blue-50 border-l-2 border-blue-400'
                            : 'bg-slate-50 border-l-2 border-slate-300'
                        }`}
                      >
                        <p
                          className={`text-[10px] font-mono font-bold uppercase mb-1 ${
                            msg.isSelf ? 'text-blue-600' : 'text-slate-500'
                          }`}
                        >
                          {msg.sender}
                        </p>
                        <p className="text-xs text-slate-700 break-words">{msg.text}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold font-mono">{myname} (You)</span>
                    <span className="text-[9px] text-green-500 uppercase font-black tracking-widest">
                      Active
                    </span>
                  </div>
                  {remoteStreams.map((remote) => (
                    <div
                      key={remote.peerId}
                      className="flex justify-between items-center py-2 border-b border-slate-50"
                    >
                      <span className="text-xs font-bold font-mono">{remote.name}</span>
                      <span className="text-[9px] text-green-500 uppercase font-black tracking-widest">
                        Online
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat input */}
            {chatOpen && (
              <div className="p-4 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleChatKey}
                  placeholder="Send a message..."
                  className="flex-1 text-xs border border-slate-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-white font-mono"
                />
                <button
                  onClick={sendChatMessage}
                  className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors font-mono"
                >
                  →
                </button>
              </div>
            )}
          </aside>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-30 bg-white border-t border-slate-200 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Invite */}
        <div className="hidden lg:block">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 rounded text-xs inline-flex items-center gap-2"
          >
            👥 Invite Users
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMicActive((v) => !v)}
            className={`p-4 border rounded-sm transition-all ${
              micActive
                ? 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                : 'bg-red-50 border-red-200 text-red-500'
            }`}
            title="Toggle Microphone"
          >
            {micActive ? '🎤' : '🔇'}
          </button>

          <button
            onClick={() => setCamActive((v) => !v)}
            className={`p-4 border rounded-sm transition-all ${
              camActive
                ? 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                : 'bg-red-50 border-red-200 text-red-500'
            }`}
            title="Toggle Camera"
          >
            {camActive ? '📹' : '📵'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-colors rounded-sm"
          >
            Leave Terminal
          </button>
        </div>

        {/* Panel toggles */}
        <div className="flex gap-2">
          <button
            onClick={() => { setParticipantsOpen((v) => !v); setChatOpen(false); }}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
              participantsOpen
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            Users ({remoteStreams.length + 1})
          </button>
          <button
            onClick={() => { setChatOpen((v) => !v); setParticipantsOpen(false); }}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
              chatOpen
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            Chat
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MeetingRoom;