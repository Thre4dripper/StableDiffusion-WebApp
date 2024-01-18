import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/wiz': {
                target: 'https://api.wizmodel.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/wiz/, '/sdapi'),
            },
            '/local': {
                target: 'http://127.0.0.1:7860',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/local/, '/sdapi'),
            },
        },
    },
    plugins: [react()],
})
