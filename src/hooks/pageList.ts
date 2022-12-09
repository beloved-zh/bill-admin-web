import type { Ref } from 'vue'
import type DataForm from '@components/DataForm/index.vue'
import type { Pagination } from 'tdesign-vue-next'
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const useTableHeight = (pageRef: Ref<HTMLElement | undefined>, dataFormRef: Ref<InstanceType<typeof DataForm>>, paginationRef: Ref<InstanceType<typeof Pagination>> | undefined = undefined): Ref<number> => {
  const pageHeight = ref<number>(0)
  const dataFormHeight = ref<number>(0)
  const paginationHeight = ref<number>(0)
  const tableHeight = ref<number>(0)

  useResizeObserver(pageRef, entries => {
    const entry = entries[0]
    const { height } = entry.contentRect
    pageHeight.value = height
  })

  useResizeObserver(dataFormRef, entries => {
    const entry = entries[0]
    const { height } = entry.contentRect
    dataFormHeight.value = height
  })

  useResizeObserver(paginationRef, entries => {
    const entry = entries[0]
    const { height } = entry.contentRect
    paginationHeight.value = height
  })

  watch([pageHeight, dataFormHeight, paginationHeight], () => {
    tableHeight.value = pageHeight.value - dataFormHeight.value - paginationHeight.value
  })

  return tableHeight
}

export {
  useTableHeight
}
