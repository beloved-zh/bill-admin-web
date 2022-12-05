<template>
  <t-select
      ref="selectRef"
      class="icon-select"
      v-model="iconName"
      :placeholder="placeholder"
      :popup-props="{
        overlayInnerStyle: {
          'width': `${popupWidth}px`,
          'max-height': popupMaxHeight
        }
      }" >
    <t-option v-for="item in iconList" :key="item.icon_id" :label="item.font_class" :value="item.font_class" style="display: inline-block;">
      <my-icon :name="item.font_class" :size="iconSize" />
    </t-option>
    <template #prefixIcon>
      <my-icon :name="iconName" />
    </template>
  </t-select>
</template>

<script setup lang="ts">
  import type { Select } from 'tdesign-vue-next'
  import type { IconFont } from '@api/common/types'
  import { getIconFontJson } from '@api/common'
  import { useResizeObserver } from '@vueuse/core'

  defineOptions({
    name: 'IconSelect'
  })

  type Props = {
    modelValue: string,
    placeholder?: string,
    popupMaxHeight?: string,
    iconSize?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '点击选择图标',
    popupMaxHeight: '200px',
    iconSize: 'large'
  })

  const emit = defineEmits(['update:modelValue'])

  const popupWidth = ref(0)
  const selectRef = ref<InstanceType<typeof Select>>()
  useResizeObserver(selectRef, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    popupWidth.value = width
  })

  let iconName = ref('')

  watch(() => props.modelValue, () => {
    iconName.value = props.modelValue
  }, {
    deep: true,
    immediate: true
  })

  watch(iconName, () => {
    emit('update:modelValue', iconName)
  }, {
    deep: true
  })

  let iconFont = ref<IconFont>({
    id: '',
    name: '',
    font_family: '',
    css_prefix_text: '',
    description: '',
    glyphs: []
  })

  const iconList = computed(() => {
    return iconFont.value.glyphs.map(item => {
      item.font_class = `${iconFont.value.css_prefix_text}${item.font_class}`
      return item
    })
  })

  onMounted(() => {
    getIconFontJson().then(data => {
      iconFont.value = data
    })
  })

</script>

<style scoped lang="less">

</style>