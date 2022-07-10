import { defineStore } from 'pinia'
import { UserState } from '../types/user'

const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        token: ''
    })
})

export default useUserStore