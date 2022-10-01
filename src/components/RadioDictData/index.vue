<template>
  <el-radio-group v-bind="attrs" ref="elRadioRef" >
    <el-radio
        v-for="item in options"
        :key="item.value"
        :label="item[value]" >
      {{item[label]}}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
  import type { ElRadioGroup } from 'element-plus/es'
  import type { Option } from '@api/common/types'
  import { getOptionData } from '@api/common'

  defineOptions({
    name: 'RadioDictData'
  })

  type Props = {
    type: string,
    label?: 'label' | 'value',
    value?: 'label' | 'value'
  }

  const props = withDefaults(defineProps<Props>(), {
    label: 'label',
    value: 'value'
  })

  const attrs = useAttrs()

  let elRadioRef = ref<InstanceType<typeof ElRadioGroup>>()

  let options = reactive<Option[]>([])

  onMounted(() => {
    if (props.type) {
      getOptionData(props.type).then(data => {
        options.push(...data)
      })
    }
  })
</script>

<style scoped lang="less">

</style>