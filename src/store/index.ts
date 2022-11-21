import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useMenuStore from './modules/menu'
import useTagsViewStore from './modules/tagsView'

const useStore = () => ({
    useApp: useAppStore(),
    useUser: useUserStore(),
    useMenu: useMenuStore(),
    useTagsView: useTagsViewStore(),
})

export default useStore