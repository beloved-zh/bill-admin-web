import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

/*
 * 自动导入hooks
 * https://github.com/antfu/unplugin-auto-import
 */
export const AutoImportDeps = () => AutoImport({
  // 生成文件地址
  dts: 'types/auto-imports.d.ts',
  // 注册
  imports: [
    'vue',
    'vue-router',
    'pinia',
    {
      '@vueuse/core': [
        // named imports
        'useMouse', // import { useMouse } from '@vueuse/core',
        // alias
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
        'useDark',
        'useToggle'
      ]
    }
  ],
  // Auto import for all module exports under directories
  dirs: [
    'src/hooks'
  ],
  resolvers: [
    VueUseComponentsResolver(),
    TDesignResolver({
      importStyle: true,
      library: 'vue-next',
      resolveIcons: true
    })
  ]
})
