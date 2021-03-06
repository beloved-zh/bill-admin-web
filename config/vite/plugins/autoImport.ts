
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// https://github.com/antfu/unplugin-auto-import
export const AutoImportDeps = () => {
  return AutoImport({
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

    ],

    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()]
  })
}
