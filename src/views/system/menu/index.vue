<template>

  <data-form :model="formData" :rules="formRules" @queryCallback="query" @exportCallback="handleExport">
    <el-form-item label="菜单名称" prop="menuName">
      <el-input
          v-model="formData.menuName"
          placeholder="请输入菜单名称"
          @keyup.enter.native="query" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-input v-model="formData.state" placeholder="请选择状态" />
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
      :data="tableData"
      row-key="path"
      style="margin-top: 20px"
      border
  >
    <el-table-column prop="menuName" label="菜单名称" sortable />
    <el-table-column prop="menuName" label="图标">
      <template #default="{row, column, $index}">
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
    <el-table-column label="操作" fixed="right" width="250">
      <template #default="{row, column, $index}">
        <el-button type="primary">修改</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts" name="MENU">
  import type { MenuForm, MenuTree } from '@api/system/menu/types'
  import type { FormInstance, FormRules } from 'element-plus'
  import { getMenuTree } from '@api/system/menu'
  import DataForm from '@components/DataForm/index.vue'

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

  const query = (form:FormInstance) => {
    tableData.length = 0
    getMenuTree(formData).then(data => {
      tableData.push(...data)
    })
  }

  const handleExport = () => {
    console.log('导出')
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

</style>
