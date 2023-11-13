import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/sdapi': 'http://ec2-52-68-218-19.ap-northeast-1.compute.amazonaws.com:7860',
        },
    },
    plugins: [react()],
})
