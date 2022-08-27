import router from '@router/index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import useStore from '@/store'

// 白名单路由
const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    console.log(from)
    const { user, permission } = useStore();
    if (user.token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (user.userName) {
                next()
                NProgress.done()
            } else {
                try {
                    await user.getUserInfo()
                    permission.getRoutes()
                    next()
                    NProgress.done()
                } catch (err) {
                    // 移除 token 并跳转登录页
                    await user.resetToken()
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // 未登录可以访问白名单页面(登录页面)
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})