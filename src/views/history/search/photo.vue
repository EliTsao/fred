<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>图片查询</span>
      </div>
      <div class="searchDiv">
        <el-input v-model="name" placeholder="请输入机器人名称" style="width:200px" />
        <el-input v-model="user" placeholder="请输入操作人信息" style="width:200px" />
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
          @click="searchTab()"
        >搜索</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <!-- <el-table-column label="所属线路">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl">
          </template>
        </el-table-column> -->
        <el-table-column prop="lineName" label="所属线路" />
        <el-table-column prop="robotName" label="机器人名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="userName" label="操作人员" />
        <el-table-column show-overflow-tooltip label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="open">查看</el-button>
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
  </div>
</template>

<script>
import { imageData } from '@/api/history'

export default {
  data() {
    return {
      total: 0,
      totalPage: 1,
      tableData: [],
      allList: [],
      imageList: [],
      schArr: [],
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
    this.imageData()
  },
  methods: {
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    open() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    imageData() {
      imageData()
        .then(res => {
          this.allList = res.data.items
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
          // this.imageList =
          // console.log(photo)
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
    excelDow() {

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
