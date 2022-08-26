import { defineStore } from 'pinia'
import type { AppState } from '../types/app'
import {localStorage} from "@utils/storage"


const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        autoLogin: true,
        tokenHeader: localStorage.get('tokenHeader') || 'Authorization',
    }),
    getters: {},
    actions: {
        setTokenHeader (header) {
            localStorage.set('tokenHeader', header)
            this.tokenHeader = header
        }
    }
})

export default useAppStore