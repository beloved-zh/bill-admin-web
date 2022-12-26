<script setup lang="ts">
import type { Tree, TreeNodeModel, TreeNodeValue } from 'tdesign-vue-next'
import type { TreeOptionData } from 'tdesign-vue-next/es/common'

defineOptions({
  name: 'Tree',
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = useSlots()

interface Props {
  data?: TreeOptionData[]
  value?: TreeNodeValue[]
  searchText?: string
  expandAll?: boolean
  selectAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  value: () => [],
  expandAll: false,
  selectAll: false
})

const emit = defineEmits<{
  (e: 'update:value', val: TreeNodeValue[]): void
}>()

const baseTreeRef = ref<InstanceType<typeof Tree>>()

const allTreeNode = computed<TreeNodeModel[]>(() => baseTreeRef.value.getItems())

const select = ref<TreeNodeValue[]>([])

const expanded = ref<TreeNodeValue[]>([])

const refreshExpandAll = () => {
  if (!baseTreeRef.value) {
    return
  }
  if (props.expandAll) {
    expanded.value = allTreeNode.value.map(item => item.value!)
  } else {
    expanded.value = []
  }
}

const refreshSelectAll = () => {
  if (!baseTreeRef.value) {
    return
  }
  if (props.selectAll) {
    select.value = allTreeNode.value.map(item => item.value!)
  } else {
    select.value = []
  }
}

const refreshValue = () => {
  if (!baseTreeRef.value) {
    return
  }
  select.value = props.value
}

const refreshData = () => {
  if (!baseTreeRef.value) {
    return
  }
  allTreeNode.value.forEach(item => {
    baseTreeRef.value.remove(item.value)
  })
  baseTreeRef.value.appendTo(props.data)

  // 节点重新添加后，实例改变，需要重新设置value等
  // 目前 appendTo 后不能立刻获取到 getItems 暂时这样写，后续等官方更新
  setTimeout(() => {
    refreshExpandAll()
    refreshSelectAll()
    refreshValue()
  }, 1)
}

watch(() => props.data, () => {
  refreshData()
}, {
  deep: true,
  immediate: true
})

watch(() => props.expandAll, () => {
  refreshExpandAll()
}, {
  immediate: true
})

watch(() => props.selectAll, () => {
  refreshSelectAll()
}, {
  immediate: true
})

watch(() => props.value, () => {
  refreshValue()
}, {
  deep: true,
  immediate: true
})

watch(() => select, () => {
  emit('update:value', select.value)
}, {
  immediate: true
})

const treeFilterFun = computed(() => {
  return (node: TreeNodeModel) => node.label?.includes(props.searchText!)
})

const clearExpanded = () => {
  expanded.value = []
}

defineExpose({ baseTreeRef, allTreeNode, clearExpanded })
</script>

<template>
  <t-tree
    ref="baseTreeRef"
    v-bind="attrs"
    v-model:value="select"
    v-model:expanded="expanded"
    :filter="treeFilterFun"
  >
    <template v-for="name in Object.keys(slots)" #[name] :key="name">
      <slot :name="name" />
    </template>
  </t-tree>
</template>

<style scoped lang="less">

</style>
