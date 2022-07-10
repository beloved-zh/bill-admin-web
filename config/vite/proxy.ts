import { ProxyOptions } from 'vite'
type ProxyTargetList = Record<string, ProxyOptions>

export const InitProxy = (env):ProxyTargetList => {
  return {
    [env.VITE_APP_BASE_API]: {
      target: env.VITE_API_TARGET_URL,
      changeOrigin: true,
      secure: false, // 如果是https接口，需要配置这个参数
      // ws: true, //websocket支持
      rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
    }
  }
}