import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

// A standalone client build of the same prototype for Vercel static hosting.
export default defineConfig({
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}},
  plugins: [react()],
  css: {postcss: {plugins: [tailwindcss()]}},
  build: {outDir: fileURLToPath(new URL('./dist', import.meta.url)), emptyOutDir: true},
});
