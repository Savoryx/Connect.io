import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import { v4 as uuidv4 } from 'uuid';
import connectDB from './DataBase/mongoSetUp.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── REST Routes ─────────────────────────────────────────────────────────────
app.use('/api/user', userRouter);

app.get('/', (_req, res) => res.send('Server is running.'));

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Data received successfully', data: req.body });
});

// ── HTTP server ─────────────────────────────────────────────────────────────
const server = http.createServer(app);

// ── PeerJS ──────────────────────────────────────────────────────────────────
const peerServer = ExpressPeerServer(server, {
  path: '/myapp',
  generateClientId: () => uuidv4(),
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('PeerJS client connected :', client.getId());
});
peerServer.on('disconnect', (client) => {
  console.log('PeerJS client disconnected:', client.getId());
});

// ── Socket.IO ───────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// roomId → Map<socketId, { peerId, name }>
const rooms = {};

io.on('connection', (socket) => {
  console.log('Socket connected   :', socket.id);

  socket.on('join-room', ({ roomId, peerId, name }) => {
    if (!roomId || !peerId) return;

    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = new Map();

    // ✅ Send the NEW user the list of everyone already in the room
    // so the new user can call each existing participant themselves.
    const existingMembers = [];
    rooms[roomId].forEach((user) => {
      existingMembers.push({ peerId: user.peerId, name: user.name });
    });
    socket.emit('room-members', existingMembers);

    // Now add the new user to the room
    rooms[roomId].set(socket.id, { peerId, name });

    // Notify everyone else that a new user joined
    socket.to(roomId).emit('user-joined', { peerId, name });

    console.log(`[${roomId}] "${name}" joined (peer: ${peerId}), existing: ${existingMembers.length}`);
  });

  socket.on('chat-message', ({ roomId, sender, text }) => {
    if (!roomId) return;
    socket.to(roomId).emit('chat-message', { sender, text });
  });

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      const room = rooms[roomId];
      if (!room) continue;

      const user = room.get(socket.id);
      if (user) {
        socket.to(roomId).emit('user-left', { peerId: user.peerId });
        room.delete(socket.id);
        if (room.size === 0) delete rooms[roomId];
        console.log(`[${roomId}] "${user.name}" left`);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// ── Start ───────────────────────────────────────────────────────────────────
const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });