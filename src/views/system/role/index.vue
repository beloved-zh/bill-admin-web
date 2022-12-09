<script setup lang="ts">
import type { PageInfo, Pagination, Table } from 'tdesign-vue-next'
import type { RoleSearch } from '@/api/system/role/types'
import { getList } from '@/api/system/role'
import DataForm from '@/components/DataForm/index.vue'
import type { TableOption } from '@/views/system/role/types'
import { useTableHeight } from '@/hooks/pageList'

defineOptions({
  name: 'ROLE'
})

const pageRef = ref<HTMLDivElement>()
const dataFormRef = ref<InstanceType<typeof DataForm>>()
const tableRef = ref<InstanceType<typeof Table>>()
const paginationRef = ref<InstanceType<typeof Pagination>>()

const searchData = reactive<RoleSearch>({
  roleName: '',
  state: '',
  remark: ''
})

const tableHeight = useTableHeight(pageRef, dataFormRef, tableRef.value.paginationRef)

const tableOption = reactive<TableOption>({
  columns: [
    {
      title: '角色名称',
      colKey: 'roleName'
    },
    {
      title: '显示顺序',
      align: 'center',
      colKey: 'roleSort'
    },
    {
      title: '状态',
      align: 'center',
      colKey: 'state'
    },
    {
      title: '备注',
      colKey: 'remark'
    },
    {
      title: '创建时间',
      colKey: 'createTime',
      align: 'center',
      ellipsis: true
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      cell: 'operation'
    }
  ],
  data: [],
  pagination: {
    current: 0,
    pageSize: 20,
    total: 0,
    showJumper: true
  }
})

const queryCallback = (pageInfo?: PageInfo) => {
  if (pageInfo) {
    searchData.pageNum = pageInfo.current
    searchData.pageSize = pageInfo.pageSize
  } else {
    searchData.pageNum = tableOption.pagination.current
    searchData.pageSize = tableOption.pagination.pageSize
  }

  tableOption.data.length = 0
  getList(searchData).then(data => {
    const { pageNum, pageSize, total, list } = data
    tableOption.pagination.current = pageNum
    tableOption.pagination.pageSize = pageSize
    tableOption.pagination.total = total
    tableOption.data.push(...list)
  })
}

onMounted(() => {
  queryCallback()
  paginationRef.value = tableRef.value.paginationRef
  console.log(toRefs(tableRef.value))
  console.log(tableRef.value.paginationRef)
})
</script>

<template>
  <div ref="pageRef" class="page-main">
    <data-form ref="dataFormRef" :data="searchData" @query-callback="queryCallback">
      <t-col :span="3">
        <t-form-item label="角色名称" name="roleName">
          <t-input v-model="searchData.roleName" placeholder="请输入角色名称" />
        </t-form-item>
      </t-col>
      <template #moreOperate />
    </data-form>
    <t-table
      ref="tableRef"
      row-key="roleId"
      :max-height="tableHeight"
      :columns="tableOption.columns"
      :data="tableOption.data"
      :pagination="tableOption.pagination"
      @page-change="queryCallback"
    />
  </div>
</template>

<style scoped lang="less">
</style>
