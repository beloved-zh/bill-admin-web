<template>
  <data-form ref="dataFormRef" style="margin-bottom: 20px"
             :model="formData" :rules="formRules" :inline="true"
             @queryCallback="query" @exportCallback="handleExport">
    <el-form-item label="菜单名称" prop="menuName">
      <el-input
          v-model="formData.menuName"
          placeholder="请输入菜单名称"
          @keyup.enter.native="query()" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <select-dict-data type="state" v-model="formData.state"
                        placeholder="请选择状态"
                        clearable />
    </el-form-item>
    <template #hidePanel>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
            v-model="formData.menuName"
            placeholder="请输入菜单名称" />
      </el-form-item>
    </template>
    <template #operate>
      <el-button class="form-btn">新增</el-button>
    </template>
  </data-form>
  <el-table
      class="table-data"
      :data="tableData"
      row-key="path"
      :border="true"
  >
    <el-table-column prop="menuName" label="菜单名称" sortable />
    <el-table-column prop="menuName" label="图标">
      <template #default="{row}">
        <svg-icon :name="row.icon" size="20px" />
      </template>
    </el-table-column>
    <el-table-column prop="path" label="路由地址" sortable  />
    <el-table-column prop="component" label="组件路径" sortable  />
    <el-table-column prop="state" label="状态" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column prop="createTime" label="创建时间" sortable />
    <el-table-column label="操作" fixed="right" width="150">
      <template #default>
        <el-link type="primary">修改</el-link>
        <el-link type="primary">新增</el-link>
        <el-link type="primary">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import type { MenuForm, MenuTree } from '@api/system/menu/types'
  import type { FormRules } from 'element-plus'
  import { getMenuTree } from '@api/system/menu'
  import DataForm from '@components/DataForm/index.vue'
  import SelectDictData from '@components/SelectDictData/index.vue'

  defineOptions({
    name: 'MENU'
  })

  const dataFormRef = ref<InstanceType<typeof DataForm> | null>(null)

  let formData = reactive<MenuForm>({
    menuName: '',
    state: ''
  })

  const formRules = reactive<FormRules>({
    state: [
      { required: false, message: '请输入', trigger: 'blur' }
    ]
  })

  let tableData = reactive<MenuTree[]>([])

  const query = () => {
    tableData.length = 0
    getMenuTree(formData).then(data => {
      tableData.push(...data)
    })
  }

  const handleExport = () => {
    console.log('导出')
  }

  onMounted(() => {

  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

  .el-link+.el-link {
    margin-left: 12px;
  }
</style>
