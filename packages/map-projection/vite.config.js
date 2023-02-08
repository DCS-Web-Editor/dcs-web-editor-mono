import { defineConfig } from 'vite';
import path from 'path'
export default defineConfig({
    plugins: [],
    build: {
        lib: {
            entry: path.resolve(__dirname, './dist/index'),
            name: 'index',
        },
        minify: true,
        minifySyntax: true,
        outDir: 'dist',
        cssCodeSplit: false,
    },
});