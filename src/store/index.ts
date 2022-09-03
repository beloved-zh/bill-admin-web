import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useMenuStore from './modules/menu'
import useTagsViewStore from './modules/tagsView'

const useStore = () => ({
    app: useAppStore(),
    user: useUserStore(),
    menu: useMenuStore(),
    tagsView: useTagsViewStore(),
})

export default useStore