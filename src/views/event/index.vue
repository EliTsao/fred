<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>事件记录</span>
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
        <el-date-picker
          v-model="sch_date"
          class="width1"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchTab()"
        >搜索</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <!-- <el-table-column prop="id" label="序号" /> -->
        <el-table-column prop="type" label="事件类型" />
        <el-table-column prop="object" label="操作对象" />
        <el-table-column prop="action" label="具体操作" />
        <el-table-column prop="oldValue" label="修改前状态" />
        <el-table-column prop="newValue" label="修改后状态" />
        <el-table-column prop="userName" label="操作人员" />
        <el-table-column prop="createTime" label="操作时间" />
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
  </div>
</template>

<script>
import { event } from '@/api/event'
export default {
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '系统事件'
      } else if (val === 1) {
        return '用户操作'
      } else if (val === 2) {
        return '系统参数'
      } else if (val === 3) {
        return '用户管理'
      } else if (val === 4) {
        return '设备管理'
      } else {
        return '机器人参数'
      }
    }
  },
  data() {
    return {
      action: [],
      endTime: [],
      startTime: [],
      type: [],
      userName: [],
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '系统事件', value: 0 },
        { label: '用户操作', value: 1 },
        { label: '系统参数', value: 2 },
        { label: '用户管理', value: 3 },
        { label: '设备管理', value: 4 },
        { label: '机器人参数', value: 5 }
      ],
      rowIndex: 0
    }
  },
  created() {
    this.event()
  },
  methods: {
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    event() {
      event()
        .then(res => {
          this.allList = res.data.items
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    getPageData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    // 查询
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

