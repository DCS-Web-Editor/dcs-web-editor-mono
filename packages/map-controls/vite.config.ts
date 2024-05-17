import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '',
  build: {
    assetsDir: "",
    minify: true,
    minifySyntax: true,
    outDir: "dist",
    cssCodeSplit: false,
    rollupOptions: {
      input: "/src/index",
      output: {
        // chunkFileNames: "zzz-[name].js",
        // this got rid of the hash on style.css
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
      },
    },
  },
  server: {},
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
