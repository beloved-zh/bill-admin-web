<template>
  <el-form ref="formRef" v-bind="attrs">
    <slot :handleQuery="handleQuery"></slot>
    <div v-show="showPanel">
      <slot name="hidePanel" :handleQuery="handleQuery" />
    </div>
    <div class="operate-panel">
      <div class="operate">
        <slot name="operate" :handleQuery="handleQuery" />
      </div>
      <div class="default-operate">
        <el-button type="primary" class="form-svg-btn" @click="handleQuery">
          <svg-icon name="search" />搜索
        </el-button>
        <el-button class="form-svg-btn" @click="handleReset">
          <svg-icon name="reset" />重置
        </el-button>
        <el-button class="form-svg-btn" @click="showImport = true">
          <svg-icon name="import" />导入
        </el-button>
        <el-button class="form-svg-btn" @click="handleExport">
          <svg-icon name="export" />导出
        </el-button>
        <el-button class="form-btn" @click="handleMore" v-if="showPanelBtn">
          <svg-icon :name="showPanel ? 'up' : 'down'" />
        </el-button>
      </div>
    </div>
  </el-form>
  <el-dialog
      v-model="showImport"
      title="模板导入"
  >
    <el-upload
        :limit="1"
        :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="showImport = false">确认上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { FormInstance } from 'element-plus'

  defineOptions({
    name: 'DataForm',
    inheritAttrs: false
  })

  const attrs = useAttrs()

  const formRef = ref<FormInstance>()

  const showPanelBtn = computed<boolean>(() => !!useSlots().hidePanel)
  let showPanel = ref<boolean>(false)

  let showImport = ref<boolean>(false)

  const emit = defineEmits<{
    (e: 'queryCallback', form: FormInstance): void,
    (e: 'exportCallback', form: FormInstance): void,
    (e: 'clickMoreCallback', showPanel: boolean): void,
  }>()

  const handleReset = () => {
    formRef.value!.resetFields()
  }
  
  const handleMore = () => {
    showPanel.value = !showPanel.value
    emit('clickMoreCallback', showPanel.value)
  }
  
  const handleQuery = () => {
    formRef.value!.validate((valid) => {
      if (!valid) {
        return
      }
      emit('queryCallback', formRef.value!)
    })
  }
  
  const handleExport = () => {
    emit('exportCallback', formRef.value!)
  }

  defineExpose({
    formRef
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

  .operate-panel {
    &:extend(.flex-row-center);
    justify-content: space-between;
    :deep(.el-form-item__content) {

    }
  }
</style>
