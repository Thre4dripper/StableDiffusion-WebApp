import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/local': {
                target: 'http://127.0.0.1:7860',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/local/, ''),
            },
            '/api/v1': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
            },
            '/github': {
                target: 'https://github.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/github/, ''),
            },
        },
    },
    plugins: [react()],
})
