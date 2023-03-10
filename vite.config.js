import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        requireModuleExtension: true
      }
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vueJsx({})
  ],
})
