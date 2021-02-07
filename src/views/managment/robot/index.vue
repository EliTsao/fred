/* eslint-disable handle-callback-err */
<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>机器人管理</span>
      </div>
      <div class="searchDiv">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="robotadd"
        >添加机器人</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="robotName" label="机器人名称" />
        <el-table-column prop="serialNumber" label="机器人编号" />
        <el-table-column prop="power" label="电量" />
        <el-table-column prop="refreshRate" label="更新频率" />
        <el-table-column prop="networkState" label="网络状态" />
        <el-table-column prop="interruptTime" label="通信中断周期" />
        <el-table-column prop="management" label="管理" width="400px">
          <template #default="{ row }">
            <el-button @click="upload(row)">编辑</el-button>
            <el-button @click="getApp(row)">更新固件</el-button>

            <el-button @click="dialogFormVisible = true">删除</el-button>
            <el-dialog title="设置通信时间" :visible.sync="dialogFormVisible">
              <el-form :model="uploadCycleform">
                <el-form-item label="设置时长" :label-width="formLabelWidth">
                  <el-input v-model="form.cycle" autocomplete="off" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadCycle(row)">确 定</el-button>
              </div>
            </el-dialog>

            <el-button @click="dialogFormVisible = true">设置机器人停止时间</el-button>
            <el-dialog title="设置通信时间" :visible.sync="dialogFormVisible">
              <el-form :model="interruptCycleform">
                <el-form-item label="设置时长" :label-width="formLabelWidth">
                  <el-input v-model="form.cycle" autocomplete="off" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="interrupCycle(row)">确 定</el-button>
              </div>
            </el-dialog>
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
import { findAll, upload, getAppVersion, uploadCycle, interruptCycle } from '@/api/robot'
// import Edit from '@/views/management/robotManagementEdit'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        cycle: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      uploadCycleform: {
        name: '',
        cycle: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      interruptCycleform: {
        cycle: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
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
    robotadd(){

    },
    interrupCycle(row) {
      const serialNumber = row.serialNumber
      const cycle = this.form.cycle
      interruptCycle({
        serialNumber: serialNumber,
        cycle: cycle
      })
    },
    uploadCycle(row) {
      const serialNumber = row.serialNumber
      const cycle = this.uploadCycleform.cycle
      uploadCycle({
        serialNumber: serialNumber,
        cycle: cycle
      })
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
    robotadd() {

    },
    getPageData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    upload(row) {
      const serialNumber = row.serialNumber
      upload({
        serialNumber: serialNumber
      })
    },
    getApp(row) {
    // getAppVersion()
      const serialNumber = row.serialNumber
      getAppVersion({
        serialNumber: serialNumber
      })
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

