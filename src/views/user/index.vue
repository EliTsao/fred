<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>用户管理</span>
      </div>
      <div class="searchDiv">
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择查询项目"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="queryData"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-user"
          @click="handleEdit"
        >添加用户</el-button>
      </div>
      <el-table :data="list" border stripe>
        <el-table-column prop="serialNumber" label="工号" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="phone" label="电话号码" />
        <el-table-column show-overflow-tooltip label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        class="fyDiv"
        @size-change="handleSize"
        @current-change="handlePage"
      />
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>

import { getList, doDelete, find, updateUser } from '@/api/userManagement'
import Edit from '@/views/user/components/userManagementEdit'

export default {
  components: { Edit },
  data() {
    return {
      total: 0,
      totalPage: 1,
      tableData: [],
      list: null,
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: ''
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
            if (res.code !== 200) return this.$message.error('删除用户失败')
            // 修改成功的提示
            else this.$message.success('删除用户成功')

            this.fetchData() // 重新获取用户数据
          })
        })
        .catch(() => {
          return this.$message.info('已经取消删除')
          // 取消
        })
    },
    updateUser(data) {
      updateUser
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    queryData(value) {
      console.log(this.queryForm.username)
      const params = {
        id: parseInt(this.queryForm.username)
      }
      find(params).then(res => {
        console.log(res)
      })
      // this.queryForm.pageNo = 1
      this.fetchData(this.queryForm.username)
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
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
}
</style>
<style lang="scss">

