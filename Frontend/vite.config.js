import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Explicitly set the project root so Vite resolves index.html correctly
  // when `vite build` is run from a directory other than the frontend folder.
  root: __dirname,

  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    // Proxy API calls to the backend during development so you don't need CORS
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/peerjs': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});