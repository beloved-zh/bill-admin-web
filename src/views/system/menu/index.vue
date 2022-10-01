<template>

  <data-form ref="dataFormRef" style="margin-bottom: 20px"
             :model="formData" :rules="formRules" :inline="true"
             @queryCallback="query">
    <el-form-item label="菜单名称" prop="menuName">
      <el-input
          v-model="formData.menuName"
          placeholder="请输入菜单名称"
          @keyup.enter.native="query()" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <select-dict-data
          type="state"
          v-model="formData.state"
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
      <el-button class="form-btn" @click="handleAdd()">添加</el-button>
    </template>
  </data-form>

  <el-table
      class="table-data"
      :data="tableData"
      row-key="menuId"
  >
    <el-table-column prop="menuTitle" label="标题" :show-overflow-tooltip="true" />
    <el-table-column prop="menuName" label="图标" align="center">
      <template #default="{ row }">
        <template v-if="row.icon">
          <svg-icon :name="row.icon" size="20px" />
        </template>
      </template>
    </el-table-column>
    <el-table-column prop="path" label="路由地址" :show-overflow-tooltip="true" width="150" />
    <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true" width="150" />
    <el-table-column prop="menuType" label="类型" align="center" />
    <el-table-column prop="state" label="状态" align="center" />
    <el-table-column prop="createTime" label="创建时间" align="center" width="160" sortable />
    <el-table-column label="操作" fixed="right" align="center" width="150">
      <template #default="{ row }">
        <el-link type="primary" @click="handleAdd(row)">添加</el-link>
        <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
        <el-popconfirm
            title="确定要删除该数据吗?"
            cancel-button-text="取消"
            confirm-button-text="确认"
            @confirm="handleRemove(row)">
          <template #reference>
            <el-link type="primary">删除</el-link>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
      v-model="panlForm.open"
      :title="panlForm.title"
      :close-on-click-modal="false"
      @close="resetPanlForm"
  >
    <el-form :label-width="100" ref="panlFormRef" :model="panlForm.form" :rules="panlForm.formRules">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="父菜单" prop="parentMenu">
            <el-input :model-value="panlForm.parentMenu?.menuTitle || '主菜单'" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="panlForm.form.menuType">
              <el-radio :label="MenuTypeEnum.DIR" :disabled="dirRadioDisabled" />
              <el-radio :label="MenuTypeEnum.MENU" :disabled="menuRadioDisabled" />
              <el-radio :label="MenuTypeEnum.BUTTON" :disabled="butRadioDisabled"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="menuTitle">
            <el-input
                placeholder="用于菜单展示、tag等"
                v-model="panlForm.form.menuTitle" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="menuName">
            <el-input
                placeholder="对应组件name，缓存使用"
                v-model="panlForm.form.menuName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单图标" prop="icon">
            <icon-select v-model="panlForm.form.icon" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="路由地址" prop="path">
            <el-input
                placeholder="路由地址不需要 / 开头，http：开头默认为外链"
                :clearable="true"
                v-model="panlForm.form.path" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="panlForm.form.menuType === MenuTypeEnum.MENU">
          <el-form-item label="组件路径" prop="component">
            <el-select
                class="w-10"
                placeholder="点击选择组件路径，http：开头默认为iframe"
                :clearable="true"
                :filterable="true"
                :allow-create="true"
                :default-first-option="true"
                v-model="panlForm.form.component" >
              <el-option
                  v-for="item in viewsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示顺序" prop="orderNum">
            <el-input-number
                v-model="panlForm.form.orderNum"
                :min="1"
                :step-strictly="true"
                controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === MenuTypeEnum.MENU">
          <el-form-item label="是否缓存" prop="hasCache">
            <el-radio-group v-model="panlForm.form.hasCache">
              <el-radio :label="BooleanEnum.TRUE">是</el-radio>
              <el-radio :label="BooleanEnum.FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === MenuTypeEnum.MENU">
          <el-form-item label="是否固定" prop="fixed">
            <el-radio-group v-model="panlForm.form.fixed">
              <el-radio :label="BooleanEnum.TRUE">是</el-radio>
              <el-radio :label="BooleanEnum.FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否隐藏" prop="hidden">
            <el-radio-group v-model="panlForm.form.hidden">
              <el-radio :label="BooleanEnum.TRUE">是</el-radio>
              <el-radio :label="BooleanEnum.FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态" prop="state">
            <el-radio-group v-model="panlForm.form.state" >
              <el-radio :label="StateEnum.NORMAL">正常</el-radio>
              <el-radio :label="StateEnum.STOP">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
                v-model="panlForm.form.remark"
                :rows="2"
                type="textarea"
                placeholder="请输入备注"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="resetPanlForm">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { MenuRequest, MenuTree } from '@api/system/menu/types'
  import type { FormRules } from 'element-plus'
  import type { PanlForm } from './types/index'
  import type { Option } from '@api/common/types'
  import type { FormInstance } from 'element-plus'
  import { isExternalLink } from '@/utils'
  import { MenuTypeEnum, BooleanEnum, StateEnum } from '@enums/systemEnums'
  import { getMenuTree, addMenu, editMenu, removeMenu } from '@api/system/menu'
  import DataForm from '@components/DataForm/index.vue'
  import SelectDictData from '@components/SelectDictData/index.vue'
  import RadioDictData from '@components/RadioDictData/index.vue'
  import IconSelect from '@components/IconSelect/index.vue'

  defineOptions({
    name: 'MENU'
  })

  const dataFormRef = ref<InstanceType<typeof DataForm> | null>(null)

  let formData = reactive<MenuRequest>({
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

  const validatorExternalLink = (message: string) => (rule: any, value: any, callback: any) => {
    if (isExternalLink(panlForm.form.path)) {
      callback()
    } else {
      if (value) {
        callback()
      } else {
        callback(message)
      }
    }
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
    formRules: {
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
        { validator: validatorExternalLink('请输入路径'), trigger: 'blur' }
      ]
    }
  })

  const dirRadioDisabled = computed(() => {
    if (panlForm.parentMenu && panlForm.parentMenu.menuType !== MenuTypeEnum.DIR || panlForm.form.menuId) {
      return true
    }
    return false
  })

  const menuRadioDisabled = computed(() => {
    if (panlForm.parentMenu && panlForm.parentMenu.menuType === MenuTypeEnum.MENU || panlForm.form.menuId) {
      return true
    }
    return false
  })

  const butRadioDisabled = computed(() => {
    if (!panlForm.parentMenu || panlForm.parentMenu.menuType !== MenuTypeEnum.MENU || panlForm.form.menuId) {
      return true
    }
    return false
  })

  const panlFormRef = ref<FormInstance>()

  const handleAdd = (parentMenu?: MenuTree) => {
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

    panlForm.title = '添加菜单'
    panlForm.open = true
  }

  const handleEdit = (parentMenu: MenuTree) => {
    panlForm.parentMenu = parentMenu
    panlForm.title = '编辑菜单'

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
  
  const handleRemove = (menu: MenuTree) => {
    removeMenu(menu.menuId).then(() => {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      query()
    })
  }
  const resetPanlForm = () => {
    panlFormRef.value!.resetFields()

    panlForm.open = false

    panlForm.title = ''
    panlForm.parentMenu = null
    panlForm.form.parentId = 0
    delete panlForm.form.menuId
    panlForm.form.menuType = MenuTypeEnum.DIR
    panlForm.form.menuTitle = ''
    panlForm.form.menuName = ''
    panlForm.form.icon = ''
    panlForm.form.orderNum = 1
    panlForm.form.path = ''
    panlForm.form.component = ''
    panlForm.form.fixed = BooleanEnum.FALSE
    panlForm.form.hidden = BooleanEnum.FALSE
    panlForm.form.hasCache = BooleanEnum.FALSE
    panlForm.form.state = StateEnum.NORMAL
    panlForm.form.remark = ''
  }
  
  const submit = () => {
    panlFormRef.value!.validate((valid) => {
      if (!valid) {
        return
      }
      if (panlForm.form.menuId) {
        editMenu(panlForm.form).then(data => {
          resetPanlForm()
          query()
        })
      } else {
        addMenu(panlForm.form).then(data => {
          resetPanlForm()
          query()
        })
      }
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

  onMounted(() => {
    getViewsList()
    query()
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

  .el-link+.el-link {
    margin-left: 12px;
  }
</style>
