<template>
  <div class="userManagement-container">
    <el-form :inline="true" :model="queryForm" @submit.native.prevent>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">
          查询
        </el-button>
      </el-form-item>
      <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
        添加
      </el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection" />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      />
      <el-table-column
        show-overflow-tooltip
        prop="userName"
        label="用户名"
      />
      <el-table-column
        show-overflow-tooltip
        prop="phone"
        label="电话号码"
      />

      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/userManagement'
import Edit from '@/views/user/components/userManagementEdit'

export default {
  name: 'UserManagement',
  components: { Edit },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        username: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleEdit(row) {
      if (row.id) {
        this.$refs['edit'].showEdit(row)
      } else {
        this.$refs['edit'].showEdit()
      }
    },
    handleDelete(row) {
      const userId = row.id
      // 弹出提示框 提示用户
      this.$confirm('此操作将永久删除用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
        .then(async() => {
          // 确定
          console.log({ userId })
          doDelete({
            userId: userId
          }).then(res => {
            console.log(res)
            this.getList() // 重新获取用户数据
          })
        })
        .catch(() => {
          // 取消
        })
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    queryData() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const { data, totalCount } = await getList(this.queryForm)
      this.list = data
      this.total = totalCount
      setTimeout(() => {
        this.listLoading = false
      }, 300)
    }
  }
}
</script>
