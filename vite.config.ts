import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/YSH_adminHub/",
  plugins: [
    vue(),
    viteMockServe({
      mockPath: '/mock',  // 设置mock.ts 文件的存储文件夹  
      supportTs: true,
      // ignore: /^_/, // 正则匹配忽略的文件
      // localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      // prodEnabled: true, // 设置生产环境是否启用 mock 功能
      // watchFiles: true, // 设置是否监视mockPath对应的文件夹内文件中的更改
    }),
    // ElementPlus组件按需自动引入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/style/main.less";'  // 配置全局less变量
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    proxy: {
      '/devApi': {
        target: 'http://192.168.0.107:8003/adminApi', // 对mock进行代理，为了区别非mock的代理  --后台接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devApi/, '') // axios 实例的 baseURL属性，与上面的mock对应
      },
      '/prodApi': {
        target: 'http://192.168.0.107:8003/adminApi', // 对mock进行代理，为了区别非mock的代理  --后台接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prodApi/, '') // axios 实例的 baseURL属性，与上面的mock对应
      },
    },
    open: true, // 是否在浏览器打开
    https: false,
  }
})
