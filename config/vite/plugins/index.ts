import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import DefineOptions from 'unplugin-vue-define-options/vite'
import eslint from 'vite-plugin-eslint'
import { AutoImportDeps } from './autoImport'
import { AutoRegistryComponents } from './component'
import { ConfigSvgIconsPlugin } from './svgIcons'

export function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue()
  ]

  // windCSS
  vitePlugins.push(windiCSS())

  // 自动按需引入依赖
  vitePlugins.push(AutoImportDeps())
  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents())

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin())

  // script 扩展
  vitePlugins.push(DefineOptions())

  vitePlugins.push(eslint())

  return vitePlugins
}
