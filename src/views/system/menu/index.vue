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
      <el-button class="form-btn" @click="handleAdd()">新增</el-button>
    </template>
  </data-form>
  <el-table
      class="table-data"
      :data="tableData"
      row-key="menuId"
  >
    <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" />
    <el-table-column prop="menuName" label="图标" align="center">
      <template #default="{ row }">
        <template v-if="row.icon">
          <svg-icon :name="row.icon" size="20px" />
        </template>
      </template>
    </el-table-column>
    <el-table-column prop="path" label="路由地址" :show-overflow-tooltip="true" width="150" />
    <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true" width="150" />
    <el-table-column prop="state" label="状态" align="center" />
    <el-table-column prop="createTime" label="创建时间" align="center" width="160" sortable />
    <el-table-column label="操作" fixed="right" align="center" width="150">
      <template #default="{ row }">
        <el-link type="primary">修改</el-link>
        <el-link type="primary" @click="handleAdd(row)">新增</el-link>
        <el-link type="primary">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
      v-model="panlForm.open"
      :title="panlForm.title"
      :close-on-click-modal="false"
  >
    <el-form :label-width="100" :model="panlForm.form">
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="panlForm.form.menuType">
          <el-radio label="D">目录</el-radio>
          <el-radio label="M">菜单</el-radio>
          <el-radio label="B">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标">
<!--        <el-input v-model="panlForm.form.icon" />-->
        <icon-select v-model="panlForm.form.icon" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="菜单名称">
            <el-input v-model="panlForm.form.menuName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示顺序">
            <el-input-number
                v-model="panlForm.form.orderNum"
                :min="1"
                :step-strictly="true"
                controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="路由地址">
            <el-input v-model="panlForm.form.path" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="panlForm.form.menuType === 'M' && !panlForm.form.isExternalLink && !panlForm.form.iframe">
          <el-form-item label="组件路径">
            <el-input v-model="panlForm.form.component" >
              <template #prefix>/src/views/</template>
              <template #suffix>/index.vue</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === 'M'">
          <el-form-item label="是否缓存">
            <el-radio-group v-model="panlForm.form.hasCache">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === 'M'">
          <el-form-item label="是否固定">
            <el-radio-group v-model="panlForm.form.fixed">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === 'M'">
          <el-form-item label="是否外链">
            <el-radio-group v-model="panlForm.form.isExternalLink">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="panlForm.form.menuType === 'M'">
          <el-form-item label="iframe">
            <el-radio-group v-model="panlForm.form.iframe">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="panlForm.form.menuType === 'M' && panlForm.form.iframe">
          <el-form-item label="iframe path">
            <el-input v-model="panlForm.form.iframePath" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否隐藏">
            <el-radio-group v-model="panlForm.form.hidden">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态">
            <el-radio-group v-model="panlForm.form.state" >
              <el-radio label="正常" />
              <el-radio label="停用" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { MenuForm, MenuTree } from '@api/system/menu/types'
  import type { FormRules } from 'element-plus'
  import type { PanlForm } from './types/index'
  import { getMenuTree } from '@api/system/menu'
  import DataForm from '@components/DataForm/index.vue'
  import SelectDictData from '@components/SelectDictData/index.vue'
  import IconSelect from '@components/IconSelect/index.vue'

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

  const panlForm = reactive<PanlForm>({
    open: false,
    title: '',
    parentMenu: null,
    form: {
      parentId: 0,
      menuType: 'D',
      menuName: '',
      icon: '',
      orderNum: 0,
      path: '',
      component: '',
      iframe: false,
      iframePath: '',
      isExternalLink: false,
      fixed: false,
      hidden: false,
      hasCache: false,
      state: '正常'
    }
  })

  const handleAdd = (parentMenu?: MenuTree) => {
    if (parentMenu) {
      panlForm.form.parentId = parentMenu.menuId
      panlForm.form.orderNum = parentMenu.children.length + 1
    }
    panlForm.title = '添加菜单'
    panlForm.open = true
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
