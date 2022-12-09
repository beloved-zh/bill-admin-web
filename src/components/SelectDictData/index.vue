<script setup lang="ts">
// import { ElSelect } from 'element-plus/es'
import type { Option } from '@/api/common/types'
import { getOptionData } from '@/api/common'

const props = withDefaults(defineProps<Props>(), {
  label: 'label',
  value: 'value'
})

defineOptions({
  name: 'SelectDictData'
})

interface Props {
  type: string
  label?: 'label' | 'value'
  value?: 'label' | 'value'
}

const attrs = useAttrs()

const elSelectRef = ref()

const options = reactive<Option[]>([])

onMounted(() => {
  if (props.type) {
    getOptionData(props.type).then(data => {
      options.push(...data)
    })
  }
})
</script>

<template>
  <ElSelect v-bind="attrs" ref="elSelectRef">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item[label]"
      :value="item[value]"
    />
  </ElSelect>
</template>

<style scoped lang="less">

</style>
