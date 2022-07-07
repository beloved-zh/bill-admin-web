import {
  API_BASE_URL,
  API_TARGET_URL
} from '../constant';
import { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

const init: ProxyTargetList = {
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    secure: false, // 如果是https接口，需要配置这个参数
    // ws: true, //websocket支持
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  }
};

export default init;
