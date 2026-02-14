import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/from/',
    server: {
        host: true, // 允許透過 IP 訪問
        port: 5173,
    }
})
