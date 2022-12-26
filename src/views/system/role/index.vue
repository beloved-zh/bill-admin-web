<script setup lang="ts">
import type { PageInfo, Table } from 'tdesign-vue-next'
import type { RoleData, RoleSearch } from '@/api/system/role/types'
import { authRoleMenus, editRole, getList, getRoleAuthMenus, removeRole, saveRole } from '@/api/system/role'
import DataForm from '@/components/DataForm/index.vue'
import Tree from '@/components/Tree/index.vue'
import type { AuthMenuPanlForm, OperatePanlForm, TableOption } from '@/views/system/role/types'
import { useTableHeight } from '@/hooks/pageList'
import { StateEnum } from '@/enums/systemEnums'
import { getMenuTree } from '@/api/system/menu'
import type { MenuTree } from '@/api/system/menu/types'

defineOptions({
  name: 'ROLE'
})

const pageRef = ref<HTMLDivElement | null>(null)
const dataFormRef = ref<InstanceType<typeof DataForm>>()
const tableRef = ref<InstanceType<typeof Table>>()
const treeRef = ref<InstanceType<typeof Tree>>()

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
      title: '角色标识',
      align: 'center',
      colKey: 'roleCode'
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
      cell: 'operation'
    }
  ],
  data: [],
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
    showJumper: true
  },
  height: useTableHeight(pageRef, dataFormRef, tableRef)
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

const operatePanlForm = reactive<OperatePanlForm>({
  open: false,
  title: '',
  data: {
    roleName: '',
    roleCode: '',
    state: StateEnum.NORMAL,
    remark: ''
  },
  rules: {
    roleName: [
      { required: true, message: '请输入角色名称', trigger: 'blur' }
    ],
    roleCode: [
      { required: true, message: '请输入角色标识', trigger: 'blur' }
    ]
  }
})

const handleAdd = () => {
  operatePanlForm.title = '添加角色'
  operatePanlForm.open = true
}

const handleEdit = (roleData: RoleData) => {
  operatePanlForm.title = '编辑角色'

  operatePanlForm.data.roleId = roleData.roleId
  operatePanlForm.data.roleName = roleData.roleName
  operatePanlForm.data.roleCode = roleData.roleCode
  operatePanlForm.data.state = roleData.state!
  operatePanlForm.data.remark = roleData.remark!

  operatePanlForm.open = true
}

const saveOrEditSubmit = async () => {
  if (operatePanlForm.data.roleId) {
    await editRole(operatePanlForm.data)
  } else {
    await saveRole(operatePanlForm.data)
  }
  operatePanlForm.open = false
  queryCallback()
}

const closeOperatePanlForm = () => {
  delete operatePanlForm.data.roleId
  operatePanlForm.title = ''
}

const handleRemove = async (roleData: RoleData) => {
  await removeRole(roleData.roleId)
  queryCallback()
}

const authMenuPanlForm = reactive<AuthMenuPanlForm>({
  open: false,
  data: {
    roleId: 0,
    roleName: '',
    roleCode: '',
    menus: []
  },
  tree: {
    data: [],
    searchText: '',
    expandAll: false,
    selectAll: false
  }
})

const handleAuthMenu = async (roleData: RoleData) => {
  authMenuPanlForm.data.roleId = roleData.roleId
  authMenuPanlForm.data.roleName = roleData.roleName
  authMenuPanlForm.data.roleCode = roleData.roleCode

  const data = await getRoleAuthMenus(roleData.roleId)
  authMenuPanlForm.data.menus = data

  authMenuPanlForm.open = true
}

const closeAuthMenuPanlForm = () => {
  authMenuPanlForm.data.roleId = 0
  authMenuPanlForm.data.menus = []

  authMenuPanlForm.tree.searchText = ''
  authMenuPanlForm.tree.expandAll = false
  authMenuPanlForm.tree.selectAll = false

  treeRef.value!.clearExpanded()
}

const submitAuthMenu = async () => {
  await authRoleMenus({
    roleId: authMenuPanlForm.data.roleId,
    menus: authMenuPanlForm.data.menus
  })

  authMenuPanlForm.open = false
}

// 获取正常菜单树
const queryRightMenuTree = async () => {
  const data: MenuTree[] = await getMenuTree({ state: StateEnum.NORMAL })
  authMenuPanlForm.tree.data = data
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
      :pagination="tableOption.pagination"
      @page-change="queryCallback"
    >
      <template #operation="{ row }">
        <t-space>
          <t-link theme="primary" hover="color" @click="handleAuthMenu(row)">
            授权菜单
          </t-link>
          <t-link theme="primary" hover="color" @click="handleEdit(row)">
            编辑
          </t-link>
          <t-popconfirm theme="danger" placement="left" content="删除后无法恢复，确认删除吗？" @confirm="handleRemove(row)">
            <t-link theme="danger" hover="color">
              删除
            </t-link>
          </t-popconfirm>
        </t-space>
      </template>
    </t-table>

    <dialog-form
      v-model:show="operatePanlForm.open"
      :title="operatePanlForm.title"
      :data="operatePanlForm.data"
      :rules="operatePanlForm.rules"
      @submit="saveOrEditSubmit"
      @close="closeOperatePanlForm"
    >
      <t-row :gutter="[16, 24]" class="w-10">
        <form-item-gi :span="6" label="角色名称" name="roleName">
          <t-input v-model="operatePanlForm.data.roleName" placeholder="请输入角色名称" />
        </form-item-gi>
        <form-item-gi :span="6" label="角色标识" name="roleCode">
          <t-input v-model="operatePanlForm.data.roleCode" placeholder="请输入角色标识，建议已`ROLE_`开头" />
        </form-item-gi>
        <form-item-gi :span="6" label="状态" name="state">
          <t-radio-group v-model="operatePanlForm.data.state">
            <t-radio label="正常" :value="StateEnum.NORMAL" />
            <t-radio label="停用" :value="StateEnum.STOP" />
          </t-radio-group>
        </form-item-gi>
        <t-col :span="12">
          <t-form-item label="备注" name="remark">
            <t-textarea v-model="operatePanlForm.data.remark" placeholder="请输入备注" />
          </t-form-item>
        </t-col>
      </t-row>
    </dialog-form>

    <dialog-form
      v-model:show="authMenuPanlForm.open"
      title="授权菜单"
      :data="authMenuPanlForm.data"
      @close="closeAuthMenuPanlForm"
      @submit="submitAuthMenu"
    >
      <t-row :gutter="[16, 24]" class="w-10">
        <form-item-gi :span="6" label="角色名称" name="roleName">
          <t-input :value="authMenuPanlForm.data.roleName" :disabled="true" />
        </form-item-gi>
        <form-item-gi :span="6" label="角色标识" name="roleCode">
          <t-input :value="authMenuPanlForm.data.roleCode" :disabled="true" />
        </form-item-gi>
        <form-item-gi :span="12" label="菜单列表">
          <t-card hover-shadow class="w-10">
            <t-space align="center">
              <t-input v-model="authMenuPanlForm.tree.searchText" placeholder="搜索菜单" clearable />
              <t-checkbox v-model="authMenuPanlForm.tree.selectAll">
                全选/全不选
              </t-checkbox>
              <t-checkbox v-model="authMenuPanlForm.tree.expandAll">
                展开/折叠
              </t-checkbox>
            </t-space>
            <div class="tree-wrap">
              <tree
                ref="treeRef"
                v-model:value="authMenuPanlForm.data.menus"
                :line="true"
                value-mode="all"
                :checkable="true"
                :keys="{ label: 'menuTitle', value: 'menuId', children: 'children' }"
                :data="authMenuPanlForm.tree.data"
                :search-text="authMenuPanlForm.tree.searchText"
                :expand-all="authMenuPanlForm.tree.expandAll"
                :select-all="authMenuPanlForm.tree.selectAll"
              />
            </div>
          </t-card>
        </form-item-gi>
      </t-row>
    </dialog-form>
  </div>
</template>

<style scoped lang="less">
  .tree-wrap {
    max-height: 250px;
    overflow-y: auto;
    margin-top: 16px;
  }
</style>
