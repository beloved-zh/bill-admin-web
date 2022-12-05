<template>
  <div class="page-main" ref="pageRef">
    <data-form ref="dataFormRef" :data="formData" @queryCallback="queryCallback">
      <t-col :span="3">
        <t-form-item label="菜单名称" name="menuName">
        <t-input v-model="formData.menuName"></t-input>
      </t-form-item>
      </t-col>
      <template #hidePanel>
        <t-col :span="3">
          <t-form-item label="状态" name="state">
            <t-input v-model="formData.state"></t-input>
          </t-form-item>
        </t-col>
      </template>
      <template #moreOperate>
        <t-button theme="primary" @click="handleAdd()">添加</t-button>
      </template>
    </data-form>
    <t-enhanced-table
        row-key="menuId"
        :max-height="tableHeight"
        :columns="tableColumns"
        :tree="{childrenKey: 'children'}"
        :data="tableData">
      <template #operation="{ row }">
        <t-space>
          <t-link theme="primary" hover="color" @click="handleAdd(row)"> 添加 </t-link>
          <t-link theme="primary" hover="color" @click="handleEdit(row)"> 编辑 </t-link>
          <t-popconfirm theme="danger" placement="left" content="删除后无法恢复，确认删除吗？" @confirm="handleRemove(row)">
            <t-link theme="danger" hover="color"> 删除 </t-link>
          </t-popconfirm>
        </t-space>
      </template>
    </t-enhanced-table>

    <dialog-form
        ref="dialogFormRef"
        v-model:show="panlForm.open"
        :title="panlForm.title"
        :data="panlForm.form"
        :rules="panlForm.rules"
        @submit="submitForm">
      <t-row :gutter="[16, 24]" class="w-10">
        <t-col :span="12">
          <t-form-item label="父菜单" name="parentMenu">
            <t-input :value="panlForm.parentMenu?.menuTitle || '主菜单'" :disabled="true"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="菜单类型" name="menuType">
            <t-radio-group v-model="panlForm.form.menuType" >
              <t-radio label="目录" :value="MenuTypeEnum.DIR" :disabled="dirRadioDisabled" />
              <t-radio label="菜单" :value="MenuTypeEnum.MENU" :disabled="menuRadioDisabled" />
              <t-radio label="按钮" :value="MenuTypeEnum.BUTTON" :disabled="butRadioDisabled" />
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="名称" name="menuName">
            <t-input v-model="panlForm.form.menuName" placeholder="对应组件name，缓存使用" />
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="标题" name="menuTitle">
            <t-input v-model="panlForm.form.menuTitle" placeholder="用于菜单展示、tag等" />
          </t-form-item>
        </t-col>
        <t-col :span="12" v-if="panlForm.form.menuType !== MenuTypeEnum.BUTTON" >
          <t-form-item label="菜单图标" name="icon">
            <icon-select v-model="panlForm.form.icon" />
          </t-form-item>
        </t-col>
        <t-col :span="12" v-if="panlForm.form.menuType !== MenuTypeEnum.BUTTON" >
          <t-form-item label="路由地址" name="path">
            <t-input v-model="panlForm.form.path" :placeholder="`路由地址不需要 / 开头${panlForm.form.menuType === MenuTypeEnum.MENU ? '，http 开头默认为外链' : ''}`" />
          </t-form-item>
        </t-col>
        <t-col :span="12" v-if="panlForm.form.menuType === MenuTypeEnum.MENU" >
          <t-form-item label="组件路径" name="component">
            <t-select
                v-model="panlForm.form.component"
                placeholder="点击选择组件路径，http 开头默认为iframe"
                :options="viewsList"
                :filterable="true"
                :creatable="true"
                @create="createExternalLink"
            />
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="显示顺序" name="orderNum">
            <t-input-number v-model="panlForm.form.orderNum" :min="1" :allow-input-over-limit="false"/>
          </t-form-item>
        </t-col>
        <t-col :span="6" v-if="panlForm.form.menuType === MenuTypeEnum.MENU" >
          <t-form-item label="是否缓存" name="hasCache">
            <t-radio-group v-model="panlForm.form.hasCache" >
              <t-radio label="是" :value="BooleanEnum.TRUE" />
              <t-radio label="否" :value="BooleanEnum.FALSE" />
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="6" v-if="panlForm.form.menuType === MenuTypeEnum.MENU" >
          <t-form-item label="是否固定" name="fixed">
            <t-radio-group v-model="panlForm.form.fixed" >
              <t-radio label="是" :value="BooleanEnum.TRUE" />
              <t-radio label="否" :value="BooleanEnum.FALSE" />
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="是否隐藏" name="hidden">
            <t-radio-group v-model="panlForm.form.hidden" >
              <t-radio label="是" :value="BooleanEnum.TRUE" />
              <t-radio label="否" :value="BooleanEnum.FALSE" />
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="菜单状态" name="state">
            <t-radio-group v-model="panlForm.form.state" >
              <t-radio label="正常" :value="StateEnum.NORMAL" />
              <t-radio label="停用" :value="BooleanEnum.STOP" />
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="备注" name="remark">
            <t-textarea v-model="panlForm.form.remark" placeholder="请输入内容" />
          </t-form-item>
        </t-col>
      </t-row>
    </dialog-form>
  </div>
</template>

<script setup lang="ts">
  import type { PrimaryTableCol, Form } from 'tdesign-vue-next'
  import type { MenuRequest, MenuTree } from '@api/system/menu/types'
  import type DataForm from '@components/DataForm/index.vue'
  import type DialogForm from '@components/DialogForm/index.vue'
  import type { PanlForm } from '@views/system/menu/types'
  import type { Option } from '@api/common/types'
  import MyIcon from '@components/MyIcon/index.vue'
  import {addMenu, editMenu, getMenuTree, removeMenu} from '@api/system/menu'
  import { useTableHeight} from '@/hooks/pageList'
  import { BooleanEnum, MenuTypeEnum, StateEnum } from '@enums/systemEnums'
  import {isExternalLink} from '@/utils'

  defineOptions({
    name: 'MENU'
  })

  const pageRef = ref<HTMLDivElement>()
  const dataFormRef = ref<InstanceType<typeof DataForm>>()
  const dialogFormRef = ref<InstanceType<typeof DialogForm>>()

  const tableHeight = useTableHeight(pageRef, dataFormRef)

  let formData = reactive<MenuRequest>({
    menuName: '',
    state: ''
  })

  const tableColumns = reactive<PrimaryTableCol<MenuTree>[]>([
    {
      title: '标题',
      colKey: 'menuTitle',
      ellipsis: true
    },
    {
      title: '图标',
      colKey: 'icon',
      align: 'center',
      cell: (h, { row }) => h(MyIcon, {name: row.icon})
    },
    {
      title: '路由地址',
      colKey: 'path',
      ellipsis: true
    },
    {
      title: '组件路径',
      colKey: 'component',
      ellipsis: true
    },
    {
      title: '类型',
      colKey: 'menuType',
      align: 'center'
    },
    {
      title: '状态',
      colKey: 'state',
      align: 'center'
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
  ])
  
  let tableData = reactive<MenuTree[]>([])

  const queryCallback = () => {
    tableData.length = 0
    getMenuTree(formData).then(data => {
      tableData.push(...data)
    })
  }

  const panlForm = reactive<PanlForm>({
    open: false,
    title: '',
    parentMenu: null,
    form: {
      parentId: 0,
      menuType: MenuTypeEnum.DIR,
      menuTitle: '',
      menuName: '',
      icon: '',
      orderNum: 1,
      path: '',
      component: '',
      fixed: BooleanEnum.FALSE,
      hidden: BooleanEnum.FALSE,
      hasCache: BooleanEnum.FALSE,
      state: StateEnum.NORMAL,
      remark: ''
    },
    rules: {
      menuTitle: [
        { required: true, message: '请输入标题', trigger: 'blur' }
      ],
      menuName: [
        { required: true, message: '请输入名称', trigger: 'blur' }
      ],
      path: [
        { required: true, message: '请输入路由地址', trigger: 'blur' }
      ],
      component: [
        { required: true, message: '请输入组件路径', trigger: 'change' }
      ]
    }
  })

  const dirRadioDisabled = computed<boolean>(() => panlForm.parentMenu && panlForm.parentMenu.menuType !== MenuTypeEnum.DIR || !!panlForm.form.menuId)

  const menuRadioDisabled = computed<boolean>(() => panlForm.parentMenu && panlForm.parentMenu.menuType === MenuTypeEnum.MENU || !!panlForm.form.menuId)

  const butRadioDisabled = computed<boolean>(() => !panlForm.parentMenu || panlForm.parentMenu.menuType !== MenuTypeEnum.MENU || !!panlForm.form.menuId)

  const handleAdd = (parentMenu?: MenuTree) => {
    panlForm.title = '添加菜单'

    delete panlForm.form.menuId
    if (parentMenu) {
      panlForm.parentMenu = parentMenu
      panlForm.form.parentId = parentMenu.menuId
      panlForm.form.orderNum = parentMenu.children.length + 1
    } else {
      panlForm.form.orderNum = tableData.length + 1
    }

    if (dirRadioDisabled.value) {
      panlForm.form.menuType = MenuTypeEnum.MENU
    }
    if (menuRadioDisabled.value) {
      panlForm.form.menuType = MenuTypeEnum.BUTTON
    }


    panlForm.open = true
  }

  const handleEdit = (parentMenu: MenuTree) => {
    panlForm.title = '编辑菜单'
    panlForm.parentMenu = parentMenu

    panlForm.form.menuId = parentMenu.menuId
    panlForm.form.parentId = parentMenu.parentId
    panlForm.form.menuType = parentMenu.menuType
    panlForm.form.menuTitle = parentMenu.menuTitle
    panlForm.form.menuName = parentMenu.menuName
    panlForm.form.icon = parentMenu.icon || ''
    panlForm.form.orderNum = parentMenu.orderNum
    panlForm.form.path = parentMenu.path
    panlForm.form.component = parentMenu.component
    panlForm.form.fixed = parentMenu.fixed
    panlForm.form.hidden = parentMenu.hidden
    panlForm.form.hasCache = parentMenu.hasCache
    panlForm.form.state = parentMenu.state
    panlForm.form.remark = parentMenu.remark

    panlForm.open = true
  }

  const submitForm = async () => {
    if (panlForm.form.menuId) {
      editMenu(panlForm.form).then(data => {
        dialogFormRef.value.closeDialog()
        queryCallback()
      })
    } else {
      addMenu(panlForm.form).then(data => {
        dialogFormRef.value.closeDialog()
        queryCallback()
      })
    }
  }

  const handleRemove = (menu: MenuTree) => {
    removeMenu(menu.menuId).then(() => {
      successMessage('删除成功')
      queryCallback()
    })
  }

  let viewsList = reactive<Option[]>([])
  const getViewsList = () => {
    const modules = import.meta.glob('/src/views/**/index.vue')
    for (const path in modules) {
      viewsList.push({
        label: path,
        value: path.split('/src/views/')[1].split('/index.vue')[0]
      })
    }
  }

  const createExternalLink = (val) => {
    if (!isExternalLink(val)) {
      errorMessage('请检查外部连接格式')
      return
    }
    viewsList.push({label: val, value: val})
  }

  onMounted(() => {
    queryCallback()
    getViewsList()
  })

</script>

<style scoped lang="less">
  .default-operate {

  }
</style>
