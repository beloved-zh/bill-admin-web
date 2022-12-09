<script setup lang="ts">
// import { ElRadioGroup } from 'element-plus/es'
import type { Option } from '@/api/common/types'
import { getOptionData } from '@/api/common'

const props = withDefaults(defineProps<Props>(), {
  label: 'label',
  value: 'value'
})

defineOptions({
  name: 'RadioDictData'
})

interface Props {
  type: string
  label?: 'label' | 'value'
  value?: 'label' | 'value'
}

const attrs = useAttrs()

const elRadioRef = ref()

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
  <ElRadioGroup v-bind="attrs" ref="elRadioRef">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item[value]"
    >
      {{ item[label] }}
    </el-radio>
  </ElRadioGroup>
</template>

<style scoped lang="less">

</style>
