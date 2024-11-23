import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import liveReload from "vite-plugin-live-reload";
import { globSync } from 'glob';
import path from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: '/Hex2024React-CSS/task-week3/',
  plugins: [
    liveReload(['./layout/*.ejs']),
    ViteEjsPlugin(),
    movePagesOutPlugin()
  ],
  server: {
    open: 'pages/',
    host: true
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        globSync('pages/*.html').map(file => [
          path.relative(
            'pages',
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        "assetFileNames": "assets/[name][extname]",
        "chunkFileNames": "assets/[name].js"
      }
    },
    outDir: 'dist/task-week3'
  }
});

function movePagesOutPlugin() {
  return {
    name: 'move-pages-out',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    }
  };
}
