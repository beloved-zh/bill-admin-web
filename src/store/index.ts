import useUserStore from './modules/user'
import useAppStore from './modules/app'
import permissionStore from './modules/permission'

const useStore = () => ({
    app: useAppStore(),
    user: useUserStore(),
    permission: permissionStore()
});

export default useStore;