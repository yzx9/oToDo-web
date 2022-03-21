import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as upath from 'upath'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: upath.resolve(__dirname, 'src'),
      },
    ],
  },
})
