import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    fs: {
      strict: true,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: false,
  },
});
