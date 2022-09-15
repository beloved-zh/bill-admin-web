<template>
  <el-select v-bind="attrs" ref="elSelectRef" >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
  import type { ElSelect } from 'element-plus/es'
  import type { Option } from '@api/common/types'
  import { getOptionData } from '@api/common'

  defineOptions({
    name: 'SelectDictData'
  })
  type Props = {
    type: string
  }

  const props = withDefaults(defineProps<Props>(), {})

  const attrs = useAttrs()

  let elSelectRef = ref<InstanceType<typeof ElSelect>>()

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