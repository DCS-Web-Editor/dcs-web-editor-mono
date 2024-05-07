import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [viteSingleFile()],

  base: "",
  build: {
    assetsDir: "assets",
    minify: true,
    minifySyntax: true,
    outDir: "dist",
    cssCodeSplit: false,
  },
  server: {},
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
