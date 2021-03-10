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
          @click="add = true"
        >添加机器人</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="robotName" label="机器人名称" />
        <el-table-column prop="serialNumber" label="机器人编号" />
        <el-table-column prop="power" label="电量" />
        <el-table-column prop="refreshRate" label="更新频率" />
        <el-table-column prop="networkState" label="网络状态" />
        <el-table-column prop="interruptTime" label="通信中断周期" />
        <el-table-column prop="management" label="管理" width="300px">
          <template #default="{ row }">
            <el-button size="small" @click.native="settingRobot(row)">机器人设置</el-button>
            <el-button @click="deleteRobot(row)">删除机器人</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="添加机器人"
        :visible.sync="add"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="add = false">取 消</el-button>
          <el-button type="primary" @click="add = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="机器人设置" :visible.sync="outerVisible">
        <ul><el-button type="primary" @click="update = true">更新固件</el-button></ul>
        <ul><el-button type="primary" @click="dialogFormVisible = true">通信时间设置</el-button></ul>
        <ul><el-button type="primary" @click="dialog = true">设置机器人停止时间</el-button></ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="固件更新"
        :visible.sync="update"
        width="30%"
        :before-close="handleClose"
      >
        <el-button @click="getApp">查询版本号</el-button>
        <el-button @click="setBootloader">跳转至Bootloader</el-button>
        <el-button @click="setApp">跳转至APP</el-button>
        <el-button @click="File = true">文件上传</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="update = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="文件上传"
        :visible.sync="File"
        width="30%"
        :before-close="handleClose"
      >
        <ul><el-input v-model="input" placeholder="请输入版本信息" /></ul>
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://www.aait-suse.cn/dlxj/upload/bin"
          :headers="myHeader"
          :data="myData"
          :limit="1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <ul><el-button slot="trigger" size="small" type="primary">选取文件</el-button></ul>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="File= false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="设置通信" :visible.sync="dialog" :before-close="handleClose">
        <el-form :model="interruptCycleform">
          <el-form-item label="设置时长" :label-width="formLabelWidth">
            <el-input v-model="form.cycle" autocomplete="off" />
          </el-form-item>
        </el-form>

        <el-dialog title="设置通信时间" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-form :model="uploadCycleform">
            <el-form-item label="设置时长" :label-width="formLabelWidth">
              <el-input v-model="form.cycle" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadCycle">确 定</el-button>
          </div>
        </el-dialog>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="interrupCycle">确 定</el-button>
        </div>
      </el-dialog>
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
import { findAll, getAppVersion, uploadCycle, interruptCycle, setBootloader, setAPP, robotdelete } from '@/api/robot'
import store from '@/store'
// import Edit from '@/views/management/robotManagementEdit'
export default {
  data() {
    return {
      input: [],
      fileList: [],
      add: false,
      outerVisible: false,
      innerVisible: false,
      dialog: false,
      update: false,
      File: false,
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
      serialNumber: null,
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      rowIndex: 0,

      dialogSerialNumber: null
    }
  },
  computed: {
    myHeader() {
      return {
        'Authorization': store.getters.token
      }
    },
    myData() {
      return {
        'version': this.input,
        'serialNumber': this.serialNumber
      }
    }
  },
  created() {
    this.findAll()
  },
  methods: {
    open1() {
      // const serialNumber = row.serialNumber
      // console.log(serialNumber)
      console.log('hh')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    robotadd() {
    },
    interrupCycle() {
      const cycle = this.form.cycle
      interruptCycle({
        serialNumber: this.dialogSerialNumber,
        cycle: cycle
      }).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success(res.msg)
      })
    },
    uploadCycle() {
      const cycle = this.uploadCycleform.cycle
      uploadCycle({
        serialNumber: this.dialogSerialNumber,
        cycle: cycle
      }).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success(res.msg)
      })
    },
    settingRobot(row) {
      this.dialogSerialNumber = row.serialNumber
      this.outerVisible = true
      console.log(row)
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
    setApp() {
      setAPP({
        serialNumber: this.dialogSerialNumber
      }).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success(res.msg)
      })
    },
    deleteRobot(row) {
      const serialNumber = row.serialNumber
      this.$confirm('此操作将永久删除该机器人，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
        .then(async() => {
          // 确定
          console.log({ serialNumber })
          robotdelete({
            serialNumber: serialNumber
          }).then(res => {
            console.log(res)
            if (res.code !== 200) return this.$message.error('删除机器人失败')
            // 修改成功的提示
            else this.$message.success('删除机器人成功')

            this.findAll() // 重新获取用户数据
          })
        })
        .catch(() => {
          return this.$message.info('已经取消删除')
          // 取消
        })
    },
    setBootloader() {
      setBootloader({
        serialNumber: this.dialogSerialNumber
      }).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success(res.msg)
      })
    },
    getPageData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    getApp() {
    // getAppVersion()
      getAppVersion({
        serialNumber: this.dialogSerialNumber
      }).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success(res.msg)
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

