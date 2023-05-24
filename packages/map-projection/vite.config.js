import { viteSingleFile } from 'vite-plugin-singlefile';
import { defineConfig } from 'vite';
import path from 'path'
export default defineConfig({
    plugins: [viteSingleFile()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './dist/index'),
            name: 'index',
        },
        minify: true,
        minifySyntax: true,
        outDir: 'dist',
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});