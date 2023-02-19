import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

function _resolve(dir: string) {
  return resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: '/src/mock',  // 设置mock.ts 文件的存储文件夹 
      supportTs: true,
      // ignore: /^_/, // 正则匹配忽略的文件
      // localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      // prodEnabled: true, // 设置生产环境是否启用 mock 功能
      // watchFiles: true, // 设置是否监视mockPath对应的文件夹内文件中的更改
    })
  ],
  resolve: {
    alias: {
      '@': _resolve('src')
    }
    // extensions: ['.js','.ts','.json','.vue']
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
    port: 3000,
    // proxy: {
    //   '/mock': {
    //     target: 'http://localhost:3000/mock/test', // 对mock进行代理，为了区别非mock的代理
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/mock/, '')
    //   },
    //   '/gapi': {
    //     target: 'https://blog.junfeng530.xyz/',  //我的博客地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/gapi/, '')
    //   },
    // },
    open: true,  // 是否在浏览器打开
    https: false,
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
})
