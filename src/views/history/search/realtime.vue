<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>实时数据查询</span>
      </div>
      <div class="searchDiv">
        <el-input
          v-model="name"
          placeholder="请输入机器人名称"
          style="width: 200px"
        />
        <el-input
          v-model="line"
          placeholder="请输入线路名称"
          style="width: 200px"
        />
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="robotData"
        >搜索</el-button>
        <el-button
          type="primary"
          class="btnStyle1"
          @click="excelDow"
        >导出Excel文件</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="lineName" label="线路名称" />
        <el-table-column prop="robotName" label="机器人名称" />
        <el-table-column prop="towerNumber" label="塔号" />
        <el-table-column prop="robotPosition" label="距离" />
        <el-table-column prop="environmentTemperature" label="环境温度" />
        <el-table-column prop="humidity" label="湿度值" />
        <el-table-column prop="createTime" label="创建时间" />
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
import { robotData, excelDow } from '@/api/history'

export default {
  data() {
    return {
      total: 0,
      name: '',
      line: '',
      totalPage: 1,
      tableData: [],
      allList: [],
      schArr: [],
      value1: '',
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '环境温度', value: 0 },
        { label: '环境湿度', value: 1 },
        { label: '测试点数据', value: 2 },
        { label: '机器人电量', value: 3 },
        { label: '抓图图片', value: 4 }
      ],
      rowIndex: 0,
      rules: {
        time: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.robotData()
  },
  methods: {
    excelDow() {
      excelDow().then((res) => {
        // if (res.status === 200) {
        const blob = res
        const fileReader = new FileReader() // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件的内容
        fileReader.readAsDataURL(blob) // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
        fileReader.onload = (event) => {
          // 处理load事件。该事件在读取操作完成时触发
          // 新建个下载的a标签，完成后移除。
          const a = document.createElement('a')
          const _fileName = '实时数据.xls'
          a.download = _fileName
          a.href = event.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
        // }
      })
    },
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    robotData() {
      robotData({
        robotName: this.name,
        startTime: this.value1,
        lineName: this.line
      })
        .then((res) => {
          this.allList = res.data.items
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
        })
        .catch((error) => {
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
.anoCard .el-input .el-table .el-date-picker .el-button {
  padding: 8px;
  font-size: 12px;
  margin-left: 10px;
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
    content: "";
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
.searchDiv [class^="el-icon"] {
  color: #fff;
}
</style>
