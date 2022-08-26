import router from '@router/index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import useStore from '@/store'

// 白名单路由
const whiteList = ['/login', '/auth-redirect'];

router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log(from)
    const { user } = useStore();
    if (user.token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next();
            NProgress.done();
        }
    } else {
        // 未登录可以访问白名单页面(登录页面)
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})