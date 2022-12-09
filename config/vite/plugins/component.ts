import Components from 'unplugin-vue-components/vite'
import { TDesignResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

/*
 * 自动注册组件
 * https://github.com/antfu/unplugin-vue-components
 */
export const AutoRegistryComponents = () => Components({

  /*
   * relative paths to the directory to search for components.
   * 要搜索组件的目录的相对路径
   */
  dirs: ['src/components'],

  /*
   * valid file extensions for components.
   * 组件的有效文件扩展名。
   */
  extensions: ['vue'],

  /*
   * search for subdirectories
   * 搜索子目录
   */
  deep: true,

  /*
   * 生成 `components.d.ts` 全局声明，
   * 也接受自定义文件名的路径
   */
  dts: 'types/components.d.ts',

  /*
   * Allow subdirectories as namespace prefix for components.
   * 允许子目录作为组件的命名空间前缀。
   */
  directoryAsNamespace: false,

  /*
   * Subdirectory paths for ignoring namespace prefixes
   * works when `directoryAsNamespace: true`
   * 忽略命名空间前缀的子目录路径
   * 当`directoryAsNamespace: true` 时有效
   */
  globalNamespaces: [],

  /*
   * auto import for directives
   * default: `true` for Vue 3, `false` for Vue 2
   * Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
   * To install Babel, run: `npm install -D @babel/parser`
   * 自动导入指令
   * 默认值：Vue 3 的`true`，Vue 2 的`false`
   * 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
   */
  directives: true,

  // Transform path before resolving
  importPathTransform: v => v,

  // Allow for components to override other components with the same name
  allowOverrides: false,

  // filters for transforming targets
  include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

  // 自定义组件的解析器
  resolvers: [
    VueUseComponentsResolver(),
    TDesignResolver({
      importStyle: true,
      library: 'vue-next',
      resolveIcons: true
    })
  ]
})
