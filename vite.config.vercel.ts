import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// Vercel-specific build configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-vercel', // Different output directory for Vercel
    emptyOutDir: true,
  },
  // Use src/main.tsx as the entry point for web deployment
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}); 