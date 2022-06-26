import reactRefresh from '@vitejs/plugin-react-refresh'
import { terser } from 'rollup-plugin-terser'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// console.log(process.env)
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactFamily: [
            'react-router-dom',
            'styled-components',
            // 'react-icons',
            // 'react-dropzone',
          ],
          rtk: ['react-redux', '@reduxjs/toolkit'],
          others: ['lodash', 'web-vitals', 'date-fns'],
          // firebase: [
          //   'firebase/app',
          //   'firebase/auth',
          //   'firebase/analytics',
          //   'firebase/firestore/lite',
          // ],
        },
      },
    },
  },
  // すべてのファイルにJSXヘルパーを挿入
  // esbuild: {
  //   jsxInject: `import React from 'react'`,
  // },
  plugins: [
    reactRefresh(),
    terser({ compress: { drop_console: true } }),
    VitePWA({
      // srcDir: 'src',
      // filename: 'sw.ts',
      devOptions: {
        enabled: process.env.NODE_ENV !== 'production',
      },

      workbox: {
        // globDirectory: './build/',
        sourcemap: process.env.NODE_ENV !== 'production', // npm run dev で、ソースマップがない警告がchrome dev toolで出るため追加
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/sql\.js\/.*/i,
            // urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sql-wasm-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sql-wasm-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  root: 'client',
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@', replacement: '/src' }],
  },
  // base: `/${basePath}/`,
})
