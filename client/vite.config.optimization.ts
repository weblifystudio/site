// Configuration d'optimisation pour Vite

import { defineConfig } from 'vite';

export const optimizationConfig = {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les bibliothèques lourdes en chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-toast'],
          'routing': ['wouter'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Compression optimale
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Retire les console.log en production
        drop_debugger: true,
      },
    },
    // Taille de chunk optimale
    chunkSizeWarningLimit: 1000,
  },
  
  // Optimisation des assets
  assetsInclude: ['**/*.webp', '**/*.avif'],
  
  // Optimisation du CSS
  css: {
    devSourcemap: false,
    modules: {
      localsConvention: 'camelCase',
    },
  },
  
  // Préprocessing
  define: {
    __DEV__: JSON.stringify(false), // Variables d'environnement
  },
  
  // Optimisation du serveur de dev
  server: {
    hmr: {
      overlay: false, // Retire l'overlay d'erreur en dev
    },
  },
};