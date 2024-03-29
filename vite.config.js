import { defineConfig } from 'vite';
import { resolve } from 'path';
import inspect from 'vite-plugin-inspect';
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    base: '',
    root,
    publicDir: "../public",

    server: {
        port: 7777,
        host: true,
        // open: "index.html"
    },

    preview: {
        port: 9999,
        open: "index.html"
    },

    plugins: [
        inspect(),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
    ],

    // resolve: {
    //     alias: [
    //         { find: '@', replacement: '' },
    //     ],
    // },

    build: {
        outDir,
        emptyOutDir: true,
        minify: false,

        rollupOptions: {
            input: {
                main: resolve(root, 'index.html')
            },

            output: {
                // chunkFileNames: 'assets/js/[name]-[hash].js',
                // entryFileNames: 'assets/js/[name]-[hash].js',

                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',

                assetFileNames: ({ name }) => {
                    // if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                    //     return 'assets/img/[name]-[hash][extname]';
                    // }

                    // if (/\.css$/.test(name ?? '')) {
                    //     return 'assets/css/[name]-[hash][extname]';
                    // }

                    // if (/\.(ttf|woff|eot)$/.test(name ?? '')) {
                    //     return 'assets/fonts/[name]-[hash][extname]';
                    // }

                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'assets/img/[name]-[hash][extname]';
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/[name]-[hash][extname]';
                    }

                    if (/\.(ttf|woff|eot)$/.test(name ?? '')) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    }
});