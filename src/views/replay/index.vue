<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>录像回放</span>
      </div>
      <div class="searchDiv">
        <el-select v-model="level" placeholder="请选择机器人" @change="selectChange()">
          <el-option v-for="item in select" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholder="请选择录像"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="data"
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
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="name" label="通道名称" />
        <el-table-column prop="startAt" label="录制时间" />

        <el-table-column label="播放">
          <template #default="{row}">
            <i class="el-icon-video-play" @click="replay(row)" />
          </template>
        </el-table-column>

        <el-table-column label="录像下载">
          <template #default="{row}">
            <i class="el-icon-download" @click="download(row)" />
          </template>
        </el-table-column>

        <el-table-column label="删除录像">
          <template #default="{ row }">
            <i class="el-icon-delete" @click="deleteReplay(row)" />
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
        @current-change="handlePage"
      />
    </el-card>

    <el-dialog
      title="录像回放"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div id="player" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
    <div id="Player" />
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      player: '',
      id: null,
      url: [],
      data: moment().format('YYYYMMDD'),
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      dialogVisible: false,
      sch_status: 1,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      level: 'server',
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      videoUrl: null,
      select: [
        { label: '一号机器人', value: 'server' },
        { label: '二号机器人', value: 'server2' }
      ],
      options: [
        { label: '主摄像头', value: 1 },
        { label: '热成像图', value: 2 },
        { label: '前轮摄像头', value: 4 },
        { label: '后轮摄像头', value: 3 }
      ],
      rowIndex: 0,
      rules: {
        time: [
          {
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.searchTab()
  },

  methods: {
    // 删除录像
    deleteReplay(row) {
      const idName = row.name
      switch (idName) {
        case 'Channel1':
          this.id = 1
          break
        case 'Channel2':
          this.id = 2
          break
        case 'Channel3':
          this.id = 3
          break
        case 'Channel4':
          this.id = 4
          break
      }
      const period = row.startAt
      this.$confirm('此操作将永久删除该录像，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
        .then(async() => {
          // 确定
          axios.get('http://39.104.53.187:10810/nvc/server/api/v1/record/remove', {
            params: {
              id: this.id,
              period: period
            }
          }).then(res => {
            if (res.status !== 200) return this.$message.error('删除录像失败')
            // 修改成功的提示
            else this.$message.success('删除录像成功')

            this.searchTab() // 重新获取用户数据
          })
        })
        .catch(() => {
          return this.$message.info('已经取消删除')
          // 取消
        })
    },
    // 播放
    play() {
      console.log(this.videoUrl)
      this.player.play(this.videoUrl, 1)
    },

    //   回调函数
    callbackfun(e) {
      console.log('callbackfun', e)
    },

    addTab() {
      this.formData = {}
      this.diaIsShow = true
      this.formData.order = (Math.random() * 10e18).toString()
      this.formData.id = this.allList.length + 1
      this.editType = 'add'
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    // 下载录像
    download(row) {
      const data1 = row.startAt
      axios.get('http://39.104.53.187:10810/nvc/' + this.level + '/api/v1/record/download/' + this.sch_status + '/' + data1)
    },
    // 录像回放
    replay(row) {
      this.url = row.hls
      this.dialogVisible = true
      this.videoUrl = 'http://39.104.53.187:10810' + this.url
      this.$nextTick(() => {
        this.player = new WasmPlayer(null, 'player', this.callbackfun)
        this.play()
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
    start(data) {
      this.diaIsShow = false
      axios.get('http://39.104.53.187:10810/nvc/' + this.level + '/api/v1/startrecord', {
        params: {
          channel: this.formData.line,
          duration: this.formData.recordtime,
          savedays: this.formData.alltime
        }
      }).then(response => {
        const res = response.data.EasyDarwin.Header
        if (res.ErrorNum !== '200') return this.$message.error('录像失败')
        // 修改成功的提示
        else this.$message.success('录像成功')
        this.searchTab() // 重新获取用户数据
        // 请求成功
      }).catch(error => {
        // 请求失败，
        console.log(error)
      })
    },
    // 获取录像
    searchTab() {
      axios.get('http://39.104.53.187:10810/nvc/' + this.level + '/api/v1/record/querydaily', {
        params: {
          id: this.sch_status,
          period: this.data
        }
      }).then(res => {
        console.log(res)
        this.allList = res.data.list
        this.schArr = this.allList
        this.getPageData()
        this.total = res.data.total
      })
        .catch(error => {
          console.log(error.message)
          if (error.message === 'Request failed with status code 400') return this.$message.error('当前设备不在线')
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
.player-box {
    height: 400px;
    width: 600px;
    margin: auto;
    margin-top: 2%;
    border: 1px solid #eee;
  }
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
