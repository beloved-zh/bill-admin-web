<template>
  <el-popover :visible="visible" :width="inputWidth">
    <template #reference>
      <el-input ref="iconInputRef" v-model="iconName"
                :placeholder="placeholder" clearable
                @focus="visible = true"
                @blur="visible = false">
        <template #prefix>
          <svg-icon :name="iconName || 'search'" size="18px" />
        </template>
      </el-input>
    </template>
    <el-scrollbar height="300px">
      <div class="icon-list">
        <el-tooltip v-for="icon in iconFont.glyphs" :key="icon.icon_id" :content="icon.name" placement="top">
          <div class="icon-item" @click="handleSelected(icon)">
            <svg-icon :name="icon.font_class" size="40px" :class="iconName === icon.font_class ? 'selected-svg' : ''" />
          </div>
        </el-tooltip>
      </div>
    </el-scrollbar>
  </el-popover>
</template>

<script setup lang="ts">
  import type { IconFont, IconItem } from '@api/common/types'
  import type { ElInput } from 'element-plus/es'
  import { getIconFontJson } from '@api/common'

  defineOptions({
    name: 'IconSelect'
  })

  type Props = {
    modelValue: string,
    placeholder?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '点击选择图标'
  })

  const visible = ref(false)

  let iconName = ref(props.modelValue)

  const iconInputRef = ref<InstanceType<typeof ElInput>>()

  let inputWidth = computed(() => {
    if (!iconInputRef.value) {
      return 300
    }
    return iconInputRef.value.$el.clientWidth
  })

  let iconFont = ref<IconFont>({
    id: '',
    name: '',
    font_family: '',
    css_prefix_text: '',
    description: '',
    glyphs: []
  })
  
  const handleSelected = (icon:IconItem) => {
    iconName.value = icon.font_class
  }

  const emit = defineEmits(['update:modelValue'])

  watch(iconName, () => {
    emit('update:modelValue', iconName)
  }, {
    deep: true
  })


  onMounted(() => {
    getIconFontJson().then(data => {
      iconFont.value = data
    })
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');
  .icon-list {
    &:extend(.flex-row-center);
    justify-content: flex-start;
    flex-wrap: wrap;

    .icon-item {
      margin: 4px;
      text-align: center;
      border: 1px solid #dcdfe6;
      padding: 4px;
      .selected-svg {
        border: 2px solid #ff0000;
        border-radius: 4px;
      }
    }
  }
</style>