// svg注册
import 'virtual:svg-icons-register'
// element-plus样式
import 'element-plus/theme-chalk/index.css'
// element-plus夜间模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// animated 动画库
import 'animate.css'
// iconfont
import '@assets/icons/iconfont/iconfont.js'
// 自定义样式
import '@assets/styles/index.less'

import router from '@router/index'
// pinia
import pinia from '@pinia/pinia'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
