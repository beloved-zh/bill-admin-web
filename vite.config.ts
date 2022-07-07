import { UserConfig, ConfigEnv } from 'vite'
import path from 'path'

import { createVitePlugins } from './config/vite/plugins'
import proxy from './config/vite/proxy'

import { VITE_DROP_CONSOLE, VITE_DROP_DEBUGGER, VITE_PORT } from './config/constant'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log('==============', command, mode)
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@layout': path.resolve(__dirname, 'src/layout'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@views': path.resolve(__dirname, 'src/views')
      }
    },
    plugins: createVitePlugins(),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/assets/styles/variables.module.less')}";`,
          },
          javascriptEnabled: true
        }
      }
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: VITE_DROP_DEBUGGER
        },
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [],
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
      watch: {
        // https://rollupjs.org/guide/en/#watch-options
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy
    }
  }
}
