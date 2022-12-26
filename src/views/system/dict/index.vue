<script setup lang="ts">
import type { PageInfo, Pagination, Table } from 'tdesign-vue-next'
import type { RoleSearch } from '@/api/system/role/types'
import { getList } from '@/api/system/role'
import DataForm from '@/components/DataForm/index.vue'
import type { PanlForm, TableOption } from '@/views/system/role/types'
import { useTableHeightPagination } from '@/hooks/pageList'
import { getMenuTree } from '@/api/system/menu'
import { StateEnum } from '@/enums/systemEnums'
import type { MenuTree } from '@/api/system/menu/types'

defineOptions({
  name: 'ROLE'
})

const pageRef = ref<HTMLDivElement | null>(null)
const dataFormRef = ref<InstanceType<typeof DataForm>>()
const tableRef = ref<InstanceType<typeof Table>>()
const paginationRef = ref<InstanceType<typeof Pagination>>()

const searchData = reactive<RoleSearch>({
  roleName: '',
  state: '',
  remark: ''
})

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
  },
  height: useTableHeightPagination(pageRef, dataFormRef, paginationRef)
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

const panlForm = reactive<PanlForm>({
  open: false,
  title: '',
  data: {
    menuArray: []
  }
})

const handleAdd = () => {
  panlForm.open = true
  panlForm.title = '添加角色'
}

// 获取正常菜单树
const menuTree = reactive<MenuTree[]>([])
const queryRightMenuTree = () => {
  menuTree.length = 0
  getMenuTree({ state: StateEnum.NORMAL }).then(data => {
    menuTree.push(...data)
  })
}

onMounted(() => {
  queryCallback()
  queryRightMenuTree()
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
      <template #more-operate>
        <t-button theme="primary" @click="handleAdd()">
          添加
        </t-button>
      </template>
    </data-form>
    <t-table
      ref="tableRef"
      row-key="roleId"
      :height="tableOption.height"
      :columns="tableOption.columns"
      :data="tableOption.data"
    />
    <t-pagination
      ref="paginationRef"
      v-model="tableOption.pagination.current"
      v-model:pageSize="tableOption.pagination.pageSize"
      class="page-pagination"
      :total="tableOption.pagination.total"
      @change="queryCallback"
    />

    <dialog-form
      ref="dialogFormRef"
      v-model:show="panlForm.open"
      :title="panlForm.title"
      :data="panlForm.data"
    >
      <t-row :gutter="[16, 24]" class="w-10">
        <t-col :span="6">
          <t-tree
            v-model="panlForm.data.menuArray"
            :data="menuTree"
            :keys="{ label: 'menuTitle', value: 'menuId', children: 'children' }"
            :checkable="true"
          />
        </t-col>
        <t-col :span="6">
          dsada
        </t-col>
      </t-row>
    </dialog-form>
  </div>
</template>

<style scoped lang="less">
</style>
