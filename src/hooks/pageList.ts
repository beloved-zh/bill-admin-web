import { Ref, ref } from 'vue'
import DataForm from '@components/DataForm/index.vue'
import { useResizeObserver } from '@vueuse/core'

const useTableHeight = (pageRef: Ref<HTMLElement | undefined>, dataFormRef: Ref<InstanceType<typeof DataForm> | undefined>):Ref<number> => {
    let pageHeight = ref<number>(0)
    let dataFormHeight = ref<number>(0)
    let tableHeight = ref<number>(0)

    useResizeObserver(pageRef, (entries) => {
        const entry = entries[0]
        const { height } = entry.contentRect
        pageHeight.value = height
    })

    useResizeObserver(dataFormRef, (entries) => {
        const entry = entries[0]
        const { height } = entry.contentRect
        dataFormHeight.value = height
    })

    watch([pageHeight, dataFormHeight], () => {
        tableHeight.value = pageHeight.value - dataFormHeight.value
    })

    return tableHeight
}

export {
    useTableHeight
}