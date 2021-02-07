<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>录像回放</span>
      </div>
      <div class="searchDiv">
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择录像"
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
          value-format="yyyyMMdd"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchTab()"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addTab"
        >开始录像</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="stop"
        >停止录像</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="startAt" label="录像时间" />
        <el-table-column prop="duration" label="录像总时长" />
        <el-table-column prop="phone" label="联系电话" />
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
    <el-dialog title="录像设定" :visible.sync="diaIsShow" class="diaForm">
      <el-form
        ref="diaForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="设置录像时长(s)" prop="duration">
          <el-input
            v-model="formData.recordtime"
            type="text"
            placeholder="请输入录像时长"
          />
        </el-form-item>
        <el-form-item label="保存时长（天）" prop="savedays">
          <el-input
            v-model="formData.alltime"
            type="text"
            placeholder="请输入录像保存时长"
          />
        </el-form-item>
        <el-form-item label="选择录像通道" prop="status">
          <el-select v-model="formData.line" placeholde="请选择通道">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="start"
          >确认</el-button>
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '待审核'
      } else if (val === 2) {
        return '配送中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'info'
      } else if (val === 2) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  data() {
    return {
      player: '',
      url: [],
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
        { label: '主摄像头', value: 1 },
        { label: '热成像图', value: 2 },
        { label: '前轮摄像头', value: 0 },
        { label: '后轮摄像头', value: 3 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        time: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择录像通道', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this._getPageTab2()
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
    getPageData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    // 开始录像
    // 开始录像
    start(data) {
      axios.get('http://39.104.53.187:10810/nvc/server/api/v1/startrecord', {
        params: {
          channel: this.formData.line,
          duration: this.formData.recordtime,
          savedays: this.formData.alltime
        }
      }).then(response => {
        // 请求成功
        const res = response.data
        console.log(res)
      }).catch(error => {
        // 请求失败，
        console.log(error)
      })
    },
    // 停止录像
    stop() {

    },
    // 查找
    searchTab() {
      axios.get('http://39.104.53.187:10810/nvc/server/api/v1/record/querydaily', {
        params: {
          id: this.sch_status,
          period: this.sch_date
        }
      }).then(res => {
        this.allList = res.data.list
        this.schArr = this.allList
        this.getPageData()
        this.total = res.data.total
      })
        .catch(error => {
          this.$message.error(error.message)
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
