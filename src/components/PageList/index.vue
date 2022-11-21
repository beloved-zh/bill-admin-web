<template>
  <div class="w-10 h-10 page-info" ref="page">
    <data-form class="search-form" ref="dataForm" :inline="true" @click-more-callback="resetTableHeight">
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
      <template #hidePanel>
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
      </template>
    </data-form>
    <el-table
        :data="tableData"
        :height="tableHeight"
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

    <pagination class="pagination" ref="pagination" :page-num="1" :page-size="10" :total-count="100" />
  </div>
</template>

<script setup lang="ts">
  import DataForm from '@components/DataForm/index.vue'
  import Pagination from '@components/Pagination/index.vue'
  import {RoleSearch} from "@api/system/role/types";

  defineOptions({
    name: 'PageList'
  })

  type Props = {
    searchData: InstanceType<any>
  }

  const props = withDefaults(defineProps<Props>(), {

  })
  let searchData = reactive<RoleSearch>({
    roleName: '',
    state: '',
    remark: '',
    pageNum: 0,
    pageSize: 10
  })
  const page = ref<HTMLDivElement>()
  const dataForm = ref<InstanceType<typeof DataForm> | null>(null)
  const pagination = ref<InstanceType<typeof Pagination> | null>(null)

  const tableData = ref([])

  let tableHeight = ref(500)

  const resetTableHeight = () => {
    nextTick(() => {
      const pageHeight = page.value!.offsetHeight
      const formHeight = dataForm.value.formRef.$el.offsetHeight
      const paginationHeight = pagination.value.$el.offsetHeight
      // 减去 table 边距
      tableHeight.value = pageHeight - formHeight - paginationHeight - 40
    })
  }

  onMounted(() => {
    resetTableHeight()
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

  .page-info1 {
    position: relative;
    .search-form {
      position: absolute;
      top: 0;
    }
    .pagination {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>
