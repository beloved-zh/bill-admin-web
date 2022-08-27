import { defineStore } from 'pinia'
import type { UserState } from '../types/user'
import type { LoginFormData, UserInfo } from '@api/auth/types'
import { localStorage, sessionStorage } from '@/utils/storage'
import { login, getUserInfo } from '@/api/auth'
import useAppStore from '../modules/app'

const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        token: localStorage.get(useAppStore().tokenHeader) || '',
        userName: '',
        nickName: '',
        sex: '',
        avatar: '',
        roles: []
    }),
    getters: {},
    actions: {
        login (loginData: LoginFormData) {
            const app = useAppStore()
            return new Promise<string>((resolve, reject) => {
                login(loginData).then(res => {
                    const { header, tokenPrefix, token } = res
                    const finalToken = tokenPrefix + token
                    app.setTokenHeader(header)
                    if (app.autoLogin) {
                        localStorage.set(header, finalToken)
                    } else {
                        sessionStorage.set(header, finalToken)
                    }
                    this.token = finalToken;

                    resolve(finalToken)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        getUserInfo() {
            return new Promise<UserInfo>((resolve, reject) => {
                getUserInfo()
                    .then(data => {
                        const { userName, nickName, sex, avatar, roles } = data
                        this.userName = userName
                        this.nickName = nickName
                        this.sex = sex
                        this.avatar = avatar
                        this.roles = roles
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        resetToken() {
            localStorage.remove(useAppStore().tokenHeader)
            sessionStorage.remove(useAppStore().tokenHeader)
            this.$reset()
        }
    }
})

export default useUserStore