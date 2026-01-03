import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output to the extension's dist/webview directory
    outDir: resolve(__dirname, '../dist/webview'),
    emptyOutDir: true,
    // Single bundle - no code splitting for webview
    rollupOptions: {
      output: {
        // Ensure single bundle output
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    // Inline assets to reduce file count
    assetsInlineLimit: 10000,
    // Generate sourcemaps for debugging
    sourcemap: true,
  },
  // Base path for webview resources
  // This will be replaced at runtime by the extension
  base: './',
  // Optimize for webview environment
  esbuild: {
    // Keep class names for React DevTools
    keepNames: true,
  },
});
