// svg注册
import 'virtual:svg-icons-register'
// iconfont
import '@/assets/icons/iconfont/iconfont.js'
// tdesign库全局样式资源
import 'tdesign-vue-next/es/style/index.css'
// 自定义样式
import '@/assets/styles/index.less'

import { createApp } from 'vue'

import App from './App.vue'

import router from '@/router/index'
// pinia
import pinia from '@/pinia/pinia'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
