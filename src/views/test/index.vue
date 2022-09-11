<template>
  <div class="page-container">
    <el-form inline :model="form" ref="formRef" >
      <el-form-item label="菜单名" prop="name">
        <el-input v-model="form.name" placeholder="菜单名" />
      </el-form-item>
      <el-form-item>
        <el-button class="form-svg-btn" @click="reset">
          <svg-icon name="reset" />重置
        </el-button>
        <el-button class="form-svg-btn" @click="getdata">
          <svg-icon name="reset" />获取数据
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script setup lang="ts">

import DataForm from '@components/DataForm/index.vue'
import {FormInstance} from "element-plus";
let form = reactive({
  name: ''
})
const formRef = ref<FormInstance>()

let hidePanel = ref(true)

const reset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

const getdata = () => {
  console.log(form)
}
</script>

<style scoped lang="less">
@import url('@assets/styles/base.less');

.operate {
  &:extend(.flex-row-center);
  justify-content: space-between;
  :deep(.el-form-item__content) {

  }
}
//.default-operate {
//  float: right;
//}
</style>
