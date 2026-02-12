import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/videocallhub': {
                target: 'http://localhost:5274',
                ws: true,
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: '../wwwroot/dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['vue', 'vue-router'],
                    'signalr': ['@microsoft/signalr']
                }
            }
        }
    }
})
