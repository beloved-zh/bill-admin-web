import type { LoadingInstance } from 'tdesign-vue-next/es/loading/type'
import { LoadingPlugin } from 'tdesign-vue-next'

let useLoading: LoadingInstance

const openLoading = () => {
  useLoading = LoadingPlugin({
    fullscreen: true,
    delay: 500
  })
}

const closeLoading = () => {
  useLoading.hide()
}

export {
  openLoading,
  closeLoading
}
