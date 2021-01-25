<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>机器人管理</span>
      </div>
      <div class="searchDiv">
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择状态"
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
          @click="searchTab()"
        >搜索</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="robotName" label="机器人编号" />
        <el-table-column prop="serialNmae" label="机器人序列号" />
        <el-table-column prop="adress" label="所在位置" />
        <el-table-column prop="walkDirection" label="行走方向" />
        <el-table-column prop="power" label="剩余电量" />
        <el-table-column prop="network" label="在线情况" />
        <el-table-column prop="speed" label="速度" />
        <el-table-column prop="walkPattern" label="行走状态" />
        <el-table-column prop="lineName" label="所在线路" />
        <el-table-column prop="status" label="状态" width="90">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">{{
              scope.row.status | statusText
            }}</el-tag>
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
  </div>
</template>

<script>
import { findAll } from '@/api/robot'
export default {
  data() {
    return {
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
        { label: '待审核', value: 1 },
        { label: '配送中', value: 2 },
        { label: '已完成', value: 0 },
        { label: '已取消', value: 3 }
      ],
      rowIndex: 0
    }
  },
  created() {
    this.findAll()
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
    findAll() {
      findAll()
        .then(res => {
          this.allList = res.data
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
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>

