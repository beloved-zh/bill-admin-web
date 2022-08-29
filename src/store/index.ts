import useUserStore from './modules/user'
import useAppStore from './modules/app'
import usePermissionStore from './modules/permission'
import useTagsViewStore from './modules/tagsView'

const useStore = () => ({
    app: useAppStore(),
    user: useUserStore(),
    permission: usePermissionStore(),
    tagsView: useTagsViewStore(),
})

export default useStore