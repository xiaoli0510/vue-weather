import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      cors: true, //绝对不能在生成环境使用cors,适合于开发环境，作用层级为开发服务器响应头控制，仅仅能修改响应头
      proxy: {
        //请求转发中间层，会使用vite开发服务器，可修改请求和响应的头部
        '/api': {
          target: 'https://nk6tup5h7u.re.qweatherapi.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
          // 强制覆盖请求头
          headers: {
            Accept: 'application/json',
            'X-API-Key': env.VITE_API_KEY, // 使用环境变量
            Authorization: '', // 清空前端设置的头部
          },
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              if (req.headers.authorization) {
                proxyReq.setHeader('Authorization', req.headers.authorization)
              }
            })
          },
        },
      },
    },
  }
})
