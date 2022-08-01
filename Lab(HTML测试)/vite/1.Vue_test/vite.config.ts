import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import AutoImport from 'unplugin-auto-import/vite'


export default defineConfig({
  plugins: [vue(),progress(),
  AutoImport({
    imports:['vue','vue-router','pinia'] //自动导入vue与vue-router相关函数 跟你直接引入vue.js的开发体验差不多
  }),

  ],

  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '#':path.resolve(__dirname,'./src/components/HTML')
    }
  },
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
  target: "modules",
  outDir: "dist",
  assetsDir: "assets",
  assetsInlineLimit: 4096,
  cssCodeSplit: true,
  sourcemap: false,
  rollupOptions: {
  },


    reportCompressedSize: false
  }
})
