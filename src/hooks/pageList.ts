import type { Ref } from 'vue'
import type DataForm from '@components/DataForm/index.vue'
import type { Pagination, Table } from 'tdesign-vue-next'
import { useElementSize } from '@vueuse/core'

const useTableHeight = (pageRef: Ref<HTMLElement | null>, dataFormRef: Ref<InstanceType<typeof DataForm>>, tableRef: Ref<InstanceType<typeof Table>>): Ref<number> => {
  const paginationRef = ref()

  const pageHeight = useElementSize(pageRef).height
  const dataFormHeight = useElementSize(dataFormRef).height
  const paginationHeight = useElementSize(paginationRef).height

  onMounted(() => {
    paginationRef.value = tableRef.value.baseTableRef.paginationRef
  })

  const tableHeight = computed(() => {
    return pageHeight.value - dataFormHeight.value - paginationHeight.value
  })

  return tableHeight
}

const useTableHeightPagination = (pageRef: Ref<HTMLElement | null>, dataFormRef: Ref<InstanceType<typeof DataForm>>, paginationRef: Ref<InstanceType<typeof Pagination>> | undefined = undefined): Ref<number> => {
  // 内容高度，不带边距边框
  const { height: pageHeight } = useElementSize(pageRef)
  const { height: dataFormHeight } = useElementSize(dataFormRef)
  const { height: paginationHeight } = useElementSize(paginationRef)

  // 监听 form、pagination 高度变化，重新获取高度（包含边距）
  watch([dataFormHeight, paginationHeight], () => {
    dataFormHeight.value = dataFormRef.value.$el.offsetHeight
    paginationHeight.value = paginationRef?.value.$el.offsetHeight | 0
  })

  const tableHeight = computed(() => {
    return pageHeight.value - dataFormHeight.value - paginationHeight.value
  })

  return tableHeight
}

export {
  useTableHeight,
  useTableHeightPagination
}
