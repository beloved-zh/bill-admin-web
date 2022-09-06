import { defineStore } from 'pinia'
import type { UserState } from '../types/user'
import type { LoginFormData, UserInfo } from '@api/auth/types'
import { localStorage, sessionStorage } from '@/utils/storage'
import { login, getUserInfo } from '@/api/auth'
import useAppStore from '../modules/app'

const DEFAULT_AVATAR:string = 'https://joeschmoe.io/api/v1/random'

const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        token: localStorage.get(useAppStore().tokenHeader) || '',
        userInfo: {
            userName: '',
            nickName: '',
            sex: '',
            avatar: '',
            roles: []
        }
    }),
    getters: {
        hasInfo: (state):boolean => {
            if (state.userInfo.userName) {
                return true
            }
            return false
        },
        roles: (state):string[] => {
            return state.userInfo.roles
        },
        avatar: (state):string => {
            return state.userInfo.avatar || DEFAULT_AVATAR
        }
    },
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
                        this.userInfo = data
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
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