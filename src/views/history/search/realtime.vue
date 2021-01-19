<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>实时数据查询</span>
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
        <el-button
          type="primary"
          class="btnStyle1"
          @click="excelDow"
        >导出Excel文件</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="l_id" label="线路编号" />
        <el-table-column prop="l_name" label="线路名称" />
        <el-table-column prop="r_id" label="机器人编号" />
        <el-table-column prop="r_time" label="机器人名称" />
        <el-table-column prop="segmented" label="所属分段" />
        <el-table-column prop="temperature" label="环境温度" />
        <el-table-column prop="humidity" label="湿度值" />
        <el-table-column prop="power" label="机器人电量" />
        <el-table-column prop="time" label="创建时间" />
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
import { getPageTab2 } from '@/api/table'
export default {
  filters: {
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
        { label: '环境温度', value: 0 },
        { label: '环境湿度', value: 1 },
        { label: '测试点数据', value: 2 },
        { label: '机器人电量', value: 3 },
        { label: '抓图图片', value: 4 }
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
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ]
      }
    }
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
    _getPageTab2() {
      getPageTab2()
        .then(res => {
          this.allList = res.data.tableList
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
    // 查找
    searchTab() {
      let arrList = []
      for (const item of this.allList) {
        if (
          this.sch_order.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList
          break
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          const obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    changeTab(form, type) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === 'update') {
            // 改变整个表格数据
            const start = (this.currentPage - 1) * this.pageSize
            this.allList[start + this.rowIndex] = Object.assign(
              {},
              this.formData
            )
            // 解决数组不能通过索引响应数据变化
            this.$set(
              this.tableData,
              this.rowIndex,
              Object.assign({}, this.formData)
            )
            this.$notify({
              title: '成功',
              message: '订单已修改成功',
              type: 'success'
            })
          } else {
            this.tableData.unshift(Object.assign({}, this.formData))
            this.allList.push(Object.assign({}, this.formData))
          }
          this.diaIsShow = false
        } else {
          return
        }
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
