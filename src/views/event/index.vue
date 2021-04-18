<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>事件记录</span>
      </div>
      <div class="searchDiv">
        <el-select
          v-model="schtype"
          clearable
          class="width1"
          placeholder="请选择查询项目"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />
        <el-input v-model="input" placeholder="请输入操作人员" />
        <el-button
          style="margin-left: 30px"
          type="primary"
          icon="el-icon-search"
          @click="event"
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
import moment from 'moment'
import { event } from '@/api/event'
export default {
  data() {
    return {
      value1: [],
      pickdate: {
        startTime: '',
        endTime: ''
      },
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
      schtype: null,
      sch_date: null,
      currentPage: 1,
      input: null,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '系统事件', value: '系统事件' },
        { label: '用户操作', value: '用户操作' },
        { label: '机器人参数修改', value: '机器人参数修改' }
      ],
      rowIndex: 0
    }
  },
  created() {
    this.value1.push(moment().add(-6, 'hours').format('YYYY-MM-DD HH:mm:ss'))
    this.value1.push(moment().format('YYYY-MM-DD HH:mm:ss'))
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
      this.pickdate.startTime = this.value1[0]
      this.pickdate.endTime = this.value1[1]
      event({
        startTime: this.pickdate.startTime,
        endTime: this.pickdate.endTime,
        type: this.schtype,
        userName: this.input
      })
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
    }
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
    padding-left: 11px;
    padding-right: 20px;
  }
  .el-select{
    width: 15%;
  }
  .el-date-picker{
    width: 20%;
    padding-left: 5%;
  }
  .el-input {
    padding-left: 1%;
    width: 20%;
  }
  .el-button{
    padding-left: 1%;
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

