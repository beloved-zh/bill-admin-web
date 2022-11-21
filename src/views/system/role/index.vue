<template>
  <data-form ref="searchFormRef"
             :model="searchData" :inline="true"
             @queryCallback="query" >
    <el-form-item label="角色名称" prop="roleName">
      <el-input
          v-model="searchData.roleName"
          placeholder="请输入角色名称"
          @keyup.enter.native="query()" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <select-dict-data
          type="state"
          v-model="searchData.state"
          placeholder="请选择状态"
          clearable />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
          v-model="searchData.remark"
          placeholder="请输入备注信息"
          @keyup.enter.native="query()" />
    </el-form-item>
    <template #operate>
      <el-button class="form-btn">添加</el-button>
    </template>
  </data-form>

  <el-table
      :data="tableData"
      style="margin: 20px 0"
  >
    <el-table-column prop="roleName" label="角色名称" :show-overflow-tooltip="true" />
    <el-table-column prop="roleSort" label="显示顺序" align="center" />
    <el-table-column prop="state" label="状态" align="center" />
    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="createTime" label="创建时间" align="center" width="160" sortable />
    <el-table-column label="操作" fixed="right" align="center" width="150">
      <template #default="{ row }">
        <el-link type="primary">编辑</el-link>
        <el-popconfirm
            title="确定要删除该数据吗?"
            cancel-button-text="取消"
            confirm-button-text="确认"
        >
          <template #reference>
            <el-link type="primary">删除</el-link>
          </template>
        </el-popconfirm>
        <el-link type="primary">更多</el-link>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      v-if="totalCount > 0"
      background
      layout="->, total, sizes, prev, pager, next, jumper"
      v-model:current-page="searchData.pageNum"
      v-model:page-size="searchData.pageSize"
      :total="totalCount" />

</template>

<script setup lang="ts">
  import type { RoleSearch, RoleData } from '@api/system/role/types'
  import type { FormRules } from 'element-plus'
  import type { Option } from '@api/common/types'
  import type { FormInstance } from 'element-plus'
  import { StateEnum } from '@enums/systemEnums'
  import { getList } from '@api/system/role'
  import DataForm from '@components/DataForm/index.vue'
  import PageInfo from '@components/PageList/index.vue'

  defineOptions({
    name: 'ROLE'
  })

  const dataFormRef = ref<InstanceType<typeof DataForm> | null>(null)

  let searchData = reactive<RoleSearch>({
    roleName: '',
    state: '',
    remark: '',
    pageNum: 0,
    pageSize: 10
  })

  let totalCount = ref(0)

  let tableData = reactive<RoleData[]>([])

  watch(() => {
    return [searchData.pageNum, searchData.pageSize]
  }, () => {
    query()
  },{
    deep: true
  })

  const query = () => {
    tableData.length = 0
    getList(searchData).then(data => {
      const { pageNum, pageSize, total, list } = data
      searchData.pageNum = pageNum
      searchData.pageSize = pageSize
      totalCount.value = total
      tableData.push(...list)
    })
  }

  onMounted(() => {
    query()
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

  .el-link+.el-link {
    margin-left: 12px;
  }
</style>
