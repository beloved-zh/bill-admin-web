import { defineStore } from 'pinia'
import type { UserState } from '../types/user'
import useAppStore from '../modules/app'
import type { LoginFormData, UserInfo } from '@/api/auth/types'
import { localStorage } from '@/utils/storage'
import { getUserInfo, login } from '@/api/auth'

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
    hasInfo: (state): boolean => {
      if (state.token && state.userInfo.userName) {
        return true
      }
      return false
    },
    roles: (state): string[] => {
      return state.userInfo.roles
    }
  },
  actions: {
    login(loginData: LoginFormData) {
      const app = useAppStore()
      return new Promise<string>((resolve, reject) => {
        login(loginData).then(res => {
          const { header, tokenPrefix, token } = res
          const finalToken = tokenPrefix + token
          app.setTokenHeader(header)
          localStorage.set(header, finalToken)
          this.token = finalToken

          resolve(finalToken)
        }).catch(error => {
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
      this.$reset()
    }
  }
})

export default useUserStore
