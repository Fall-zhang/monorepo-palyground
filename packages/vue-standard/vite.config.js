import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
// const parseProxy = (list) => {
//   const obj = {}
//   list.forEach((v) => {
//     obj[v[0]] = {
//       target: v[1],
//       changeOrigin: true,
//       rewrite: (path) => path.replace(new RegExp(`^${v[0]}`), ''),
//       ...(/^https:\/\//.test(v[1]) ? { secure: false } : {})
//     }
//   })
//   return obj
// }
// const root = process.cwd()
// const env = loadEnv('./env', root)
// console.log(env)
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {}
    // port: env.VITE_PORT
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
