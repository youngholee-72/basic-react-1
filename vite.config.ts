import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ES 모듈 환경에서 __dirname을 사용하기 위한 설정
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite에서 @ alias를 인식하도록 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})