<script setup lang="ts">
import type { Dialog, Form, FormRule } from 'tdesign-vue-next'

const props = withDefaults(defineProps<Props>(), {
  width: '60vw',
  height: '50vh',
  cancelBtn: '取消',
  confirmBtn: '确认',
  closeOnEscKeydown: true,
  closeOnOverlayClick: true,
  layout: 'vertical',
  labelWidth: '100px',
  labelAlign: 'right',
  scrollToFirstError: 'smooth',
  resetType: 'initial'
})

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'close'): void
  (e: 'submit'): void
}>()

defineOptions({
  name: 'DialogForm'
})

interface Props {
  show: boolean // 是否显示 dialog
  title?: string // dialog 标题
  width?: string // dialog 宽度
  height?: string // dialog 内容高度，不包含标题和底部，其实就是form高度
  cancelBtn?: string // dialog 底部取消按钮名称
  confirmBtn?: string // dialog 底部确认按钮名称
  closeOnEscKeydown?: boolean // 按下 ESC 关闭 dialog
  closeOnOverlayClick?: boolean // 点击蒙版关闭 dialog
  data: {} // form 数据
  rules?: { [x: string]: FormRule[] } // form rules
  layout?: 'inline' | 'vertical' // 表单布局：纵向布局 和 行内布局
  labelWidth?: string | number // label标签宽度
  labelAlign?: 'left' | 'top' | 'right' // 表单字段标签对齐方式：左对齐、右对齐、顶部对齐
  scrollToFirstError?: 'smooth' | 'auto' // 表单校验不通过时，是否自动滚动到第一个校验不通过的字段：平滑滚动、瞬间直达
  resetType?: 'empty' | 'initial' // 表单重置方式
}

const dialogRef = ref<InstanceType<typeof Dialog>>()
const formRef = ref<InstanceType<typeof Form>>()

const dialogVisible = ref(false)

watch(() => props.show, val => {
  dialogVisible.value = val
}, {
  deep: true,
  immediate: true
})

watch(() => dialogVisible, val => {
  emit('update:show', val.value)
}, {
  deep: true
})

const closeDialog = () => {
  dialogVisible.value = false
  formRef.value.clearValidate()
  formRef.value.reset()
  emit('close')
}

const submitForm = async () => {
  const validate = await formRef.value.validate()
  if (validate === true) {
    emit('submit')
  }
}

defineExpose({
  dialogRef,
  formRef,
  closeDialog,
  submitForm
})
</script>

<template>
  <t-dialog
    ref="dialogRef"
    v-model:visible="dialogVisible"
    :header="title"
    :width="width"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    :close-on-esc-keydown="closeOnEscKeydown"
    :close-on-overlay-click="closeOnOverlayClick"
    placement="center"
    @close="closeDialog"
    @confirm="submitForm"
  >
    <t-form
      ref="formRef"
      :data="data"
      :rules="rules"
      :layout="layout"
      :label-width="labelWidth"
      :label-align="labelAlign"
      :scroll-to-first-error="scrollToFirstError"
      :reset-type="resetType"
      :style="{ height }"
    >
      <slot />
    </t-form>
  </t-dialog>
</template>

<style scoped lang="less">

</style>

