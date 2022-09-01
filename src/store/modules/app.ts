import { defineStore } from 'pinia'
import type { AppState } from '../types/app'
import {localStorage} from "@utils/storage"


const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        autoLogin: true,
        tokenHeader: localStorage.get('tokenHeader') || 'Authorization',
        sidebar: {
            open: true
        }
    }),
    getters: {},
    actions: {
        toggleSidebar () {
            this.sidebar.open = !this.sidebar.open
        },
        setTokenHeader (header) {
            localStorage.set('tokenHeader', header)
            this.tokenHeader = header
        }
    }
})

export default useAppStore