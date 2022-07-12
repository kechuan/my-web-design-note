import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),progress(),
  AutoImport({
    imports:['vue','vue-router'] //自动导入vue与vue-router相关函数 跟你直接引入vue.js的开发体验差不多
  }),

  ],

  server:{
    host: "localhost",
    https: false,
    open: true,
    force: true,
    hmr: true,
    //port: "3000",
    //strictPort: false,
  },
  build:{
    reportCompressedSize: false
  }
})
