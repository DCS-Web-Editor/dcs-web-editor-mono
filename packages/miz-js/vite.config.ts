import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    assetsDir: 'assets',
    minify: true,
    minifySyntax: true,
    outDir: 'dist',
    cssCodeSplit: false,
},
  server: {},
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
