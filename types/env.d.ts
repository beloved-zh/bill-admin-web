/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:*' {
  const result: any
  export default result
}


interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: number
  readonly VITE_APP_BASE_API: string
  readonly VITE_API_TARGET_URL: string
  readonly VITE_DROP_CONSOLE: boolean
  readonly VITE_DROP_DEBUGGER: boolean
}