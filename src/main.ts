// svg注册
import 'virtual:svg-icons-register'

// 自定义样式
import '@assets/styles/base.less'
// iconfont
import '@assets/icons/iconfont/iconfont.js'

import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
