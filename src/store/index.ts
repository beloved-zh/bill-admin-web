import useUserStore from './modules/user'
import useAppStore from './modules/app'

const useStore = () => ({
    app: useAppStore(),
    user: useUserStore()
});

export default useStore;