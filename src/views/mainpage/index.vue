<template>
  <div class="body">
    <div class="container">
      <div class="list">
        <div class="title">机器人列表</div>
        <button><img src="../../assets/svg/arrow-up-s-fill.svg"></button>
        <ul>
          <li v-for="(item,key) in Robot" :key="key" @click="selectRobot(item)">
            <img src="../../assets/img/rbt.png">
            <div>{{ item.name }}</div>
          </li>
        </ul>
        <button><img src="../../assets/svg/arrow-down-s-fill.svg"></button>
      </div>
      <div class="line">
        <div class="info">
          <div>位置:{{ robotData.distance }}M</div>
          <div>速度: {{ robotData.speed }}挡</div>
          <div>温度: {{ robotData.temperature }}</div>
          <div>湿度: {{ robotData.humidity }}</div>
          <div class="block" />
          <div>彬乾I线</div>
        </div>
        <canvas id="canvas" width="1340" height="220" style="position: absolute; z-index: 100;" />
        <img src="../../assets/img/tieta.jpg">
      </div>
      <div class="camera">
        <div class="item">
          <div class="title">主摄像头</div>
          <div id="wasmPlayer1" />
        </div>
        <div class="item">
          <div class="title">热成像图</div>
          <div id="wasmPlayer2" />
        </div>
        <div class="item">
          <div class="title">前轮摄像头</div>
          <div id="wasmPlayer3" />
        </div>
        <div class="item">
          <div class="title">后轮摄像头</div>
          <div id="wasmPlayer4" />
        </div>
      </div>
      <div class="status">
        <div class="info">
          <div class="title">{{ Robot_Selected }}状态</div>
          <div class="item">
            <div>名称:</div>
            <div>{{ robotName }}</div>
          </div>
          <div class="item">
            <div>行走方向:</div>
            <div>{{ robotData.walkDirection }}</div>
          </div>
          <div class="item">
            <div>剩余电量:</div>
            <div>{{ robotData.robotPower }}</div>
          </div>
          <div class="item">
            <div>工作状态:</div>
            <div>{{ robotData.workState }}</div>
          </div>
          <div class="item">
            <div>网络状态：</div>
            <div>{{ networkState }}</div>
          </div>
          <div class="item">
            <div>设备消息:</div>
            <div v-if="robotData.loadstatus !== '待命'">
              {{ robotData.loadstatus }}
            </div>
            <div v-else>
              {{ robotData.repairStatus }}
            </div>
          </div>
          <div class="item">
            <div>滑台位置:</div>
            <div>{{ robotData.slidePosition }}</div>
          </div>
          <div class="item">
            <div>运动模式<nbsp />:</div>
            <div>{{ robotData.walkPattern }}</div>
          </div>
        </div>
        <div class="control">
          <div class="base">
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg" @click="control('zoomout')">
              <div>变倍</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg" @click="control('zoomin')">
            </div>
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg" @click="control('focusin')">
              <div>变焦</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg" @click="control('focusout')">
            </div>
            <span />
            <div class="d-pad">
              <img src="../../assets/svg/checkbox-blank-circle-line.svg" @click="control('stop')">
              <img src="../../assets/svg/arrow-up-s-line.svg" @click="control('down')">
              <img src="../../assets/svg/arrow-down-s-line.svg" @click="control('up')">
              <img src="../../assets/svg/arrow-left-s-line.svg" @click="control('right')">
              <img src="../../assets/svg/arrow-right-s-line.svg" @click="control('left')">
            </div>
          </div>
          <div class="tools">
            <div class="grid-9">
              <el-button @click="walkback"><img src="../../assets/svg/arrow-left-fill.svg"></el-button>
              <el-button @click="walkstop"><img src="../../assets/svg/stop-fill.svg"></el-button>
              <el-button @click="walkon"><img src="../../assets/svg/arrow-right-fill.svg"></el-button>
              <button @click="spee">加档</button>
              <button id="level">{{ robotData.speed }}</button>
              <button @click="spe">减档</button>
            </div>
            <div class="grid-4">
              <button @click="walkPattern1('1')">连续</button>
              <button @click="walkPattern0('0')">点动</button>
              <el-button @click="dialogVisible = true">抓图</el-button>

              <el-dialog
                title="选择抓取图片频道"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <el-form :model="form">
                  <el-form-item label="选择频道" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button @click="captureImage">确 定</el-button>
                </span>
              </el-dialog>
              <button @click="detectTemperature">测温</button>
              <button @click="loadCable">装载</button>
              <button @click="slidPosition">升滑台</button>
              <button @click="repairGroundWire">修补</button>
              <button @click="slidPositio">降滑台</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statusBar">
      <div class="msg">系统消息:{{ news.object }}{{ news.action }}</div>
      <div class="time">{{ news.createTime }}</div>
    </div>
  </div>
</template>

<script>
import { captureImage, detectTemperature, loadCable, repairGroundWire, spee, slidePosition, walkPattern, workPattern, walkDirection, clickPattern } from '@/api/mainpage'
import { findrobot } from '@/api/robot'
import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data() {
    return {
      server: null,
      videoUrl1: null,
      videoUrl2: null,
      videoUrl3: null,
      videoUrl4: null,
      id: null,
      robotName: '',
      networkState: '',
      serialNumber: null,
      channels: '',
      channelNum: null,
      Robot: [
        {
          name: '机器人1',
          serialNumber: 1,
          channelNum: 2,
          server: 'server',
          id: 3
        },
        {
          name: '机器人2',
          serialNumber: 2,
          channelNum: 2,
          server: 'server2',
          id: 4
        }
      ],
      options: [{
        value: '2',
        label: '主摄像头'
      }, {
        value: '1',
        label: '热成像图'
      }, {
        value: '3',
        label: '前轮摄像头'
      }, {
        value: '4',
        label: '后轮摄像头'
      }],
      value: '',
      Robot_Selected: '机器人',
      ctx: null,
      dialogVisible: false,
      robotData: {},
      news: {},
      error: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.init
    this.speed = 1
    // this.webSocketConnect()
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.player2 = new WasmPlayer(this.videoUrl2, 'wasmPlayer2', this.callbackfun, {
      Height: true
    })
    this.player1 = new WasmPlayer(this.videoUrl1, 'wasmPlayer1', this.callbackfun, {
      Height: true
    })
    this.player3 = new WasmPlayer(this.videoUrl3, 'wasmPlayer3', this.callbackfun, {
      Height: true
    })
    this.player4 = new WasmPlayer(this.videoUrl4, 'wasmPlayer4', this.callbackfun, {
      Height: true
    })
  },

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    selectRobot: function(item) {
      this.serialNumber = item.serialNumber
      this.id = item.id
      this.channelNum = item.channelNum
      this.server = item.server
      this.videoUrl1 = 'http://39.104.53.187:10810/nvc/' + this.server + '/flv/hls/stream_2.flv'
      this.videoUrl2 = 'http://39.104.53.187:10810/nvc/' + this.server + '/flv/hls/stream_1.flv'
      this.videoUrl3 = 'http://39.104.53.187:10810/nvc/' + this.server + '/flv/hls/stream_3.flv'
      this.videoUrl4 = 'http://39.104.53.187:10810/nvc/' + this.server + '/flv/hls/stream_4.flv'
      this.play()
      this.findrobot()
      this.webSocketConnect()
    },
    play() {
      this.player1.play(this.videoUrl1)
      this.player2.play(this.videoUrl2)
      this.player3.play(this.videoUrl3)
      this.player4.play(this.videoUrl4)
    },
    //   回调函数
    callbackfun(e) {
      console.log('callbackfun', e)
    },

    webSocketConnect() {
      // 连接上端口
      const socket = new SockJS('http://www.aait-suse.cn/dlxj/endpoint_is')
      if (this.stompClient) {
        this.stompClient.disconnect()
      }

      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, (frame) => {
        console.log(frame)
        // 订阅温度报警消息
        this.stompClient.subscribe('/alarm', res => {
          const data = JSON.parse(JSON.parse(JSON.stringify(res)).body).data
          this.error = data
          console.log(res)
        })
        // 订阅机器人实时消息
        this.stompClient.subscribe('/robotData/' + this.serialNumber, (res) => {
          const data = JSON.parse(JSON.parse(JSON.stringify(res)).body).data
          this.robotData = data
          this.runContext(data.towerNumber, data.distance)
        })
        // 订阅系统消息
        this.stompClient.subscribe('/systemMessage', (res) => {
          const data = JSON.parse(JSON.parse(JSON.stringify(res)).body).data
          this.news = data
        })
      })
    },
    findrobot() {
      setInterval(() => {
        findrobot({
          id: this.id
        }).then(res => {
          if (res.data.networkState === '离线') {
            this.robotData.walkDirection = null
            this.robotData.robotPower = null
            this.robotData.workState = null
            this.robotData.walkPattern = null
          }
          console.log(res)
          this.robotName = res.data.robotName
          this.networkState = res.data.networkState
        })
      }, 1000)
    },
    // 前进
    walkon() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '1'
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('当前运动模式为前进')
      })
    },
    // 后退
    walkback() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '2'
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('当前运动模式为后退')
      })
    },
    // 停止
    walkstop() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '0'
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('运动已停止')
      })
    },
    // 加档
    spee(data) {
      if (this.robotData.speed === 10) {
        alert('当前速度已达到最大')
      } else {
        spee({
          serialNumber: this.serialNumber,
          speed: (this.robotData.speed + 1)
        }).then(res => {
          console.log(res)
          if (res.code === 400) this.$message.error('操作失败')
          // 弹出提示框
          if (res.code !== 200) return this.$message.error(res.msg)
          else this.$message.success('操作成功')
        })
      }
    },

    // 减档
    spe(data) {
      if (this.robotData.speed === 0) {
        alert('当前速度已达到最小')
      } else {
        spee({
          serialNumber: this.serialNumber,
          speed: (this.robotData.speed - 1)
        }).then(res => {
          console.log(res)
          // 弹出提示框
          if (res.code !== 200) return this.$message.error(res.msg)
          else this.$message.success('操作成功')
        })
      }
    },

    // 点动行走模式
    walkPattern0(data) {
      console.log(this.serialNumber)
      clickPattern({
        serialNumber: this.serialNumber
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('当前行走模式已修改为点动')
      })
    },
    // 连续行走模式
    walkPattern1(data) {
      walkPattern({
        serialNumber: this.serialNumber,
        pattern: data
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('当前行走模式已修改为连续')
      })
    },

    // canvas
    runContext(number, distance) {
      const h = 68
      let w = 800 // 180 370 560 800 990
      switch (number) {
        case 0:
          w = 180 + Number(distance) * 0.38
          break
        case 1:
          w = 370 + Number(distance) * 0.38
          break
        case 2:
          w = 560 + Number(distance) * 0.38
          break
        case 3:
          w = 800 + Number(distance) * 0.38
          break
        default:
          break
      }

      this.ctx.clearRect(0, 0, 1340, 220)
      this.ctx.beginPath()
      this.ctx.moveTo(w, h)
      this.ctx.lineTo(w + 10, h + 10)
      this.ctx.lineTo(w + 20, h)
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = 'red'
      this.ctx.stroke()
    },
    // 修改工作模式
    // workPattern: function name(params) {
    //   workPattern({
    //     pattern: this.value,
    //     serialNumber: this.serialNumber
    //   }).then(res => {
    //     console.log(res)
    //     // 弹出提示框
    //     if (res.code !== 200) return this.$message.error(res.msg)
    //     else this.$message.success('当前工作模式已切换成功')
    //   })
    // },
    // 抓图
    captureImage: function(item) {
      captureImage({
        serialNumber: this.serialNumber,
        cameraNumber: this.value
      }).then(res => {
        console.log('hh' + this.value)
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('抓图操作成功')
      })
    },
    detectTemperature: function(item) {
      detectTemperature({
        serialNumber: this.serialNumber
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('测温操作成功')
      })
    },
    // 装载
    loadCable() {
      loadCable({
        serialNumber: this.serialNumber
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('开始装载')
      })
    },
    // 升滑台
    slidPosition() {
      if (this.robotData.slidePosition === 100) {
        alert('当前以达到最大值')
      } else {
        slidePosition({
          serialNumber: this.serialNumber,
          position: (this.robotData.slidePosition + 5)
        }).then(res => {
          console.log(res)
          console.log(status)
          //  弹出提示框
          if (res.code !== 200) return this.$message.error(res.msg)
          else this.$message.success('操作成功')
        })
      }
    },

    // 降滑台
    slidPositio() {
      if (this.robotData.slidePosition === 0) {
        alert('当前滑台位置已达到最小')
      } else {
        slidePosition({
          serialNumber: this.serialNumber,
          position: (this.robotData.slidePosition - 5)
        }).then(res => {
          console.log(res)
          console.log(status)
          //  弹出提示框
          if (res.code !== 200) return this.$message.error(res.msg)
          else this.$message.success('操作成功')
        })
      }
    },

    // 修补
    repairGroundWire() {
      repairGroundWire({
        serialNumber: this.serialNumber
      }).then(res => {
        console.log(res)
        // 弹出提示框
        if (res.code !== 200) return this.$message.error(res.msg)
        else this.$message.success('操作成功')
      })
    },

    // 停止
    stop(data) {
      axios.get('http://39.104.53.187:10810/nvc/' + this.server + '/api/v1/ptzcontrol', { // 调取云台接口地址
        params: {
          channel: this.channelNum, // 调取对应的设备通道地址
          command: 'stop' // 调取云台接口的控制参数
        }
      })
    },

    control(data) { // testControl里的data是接收云台控制组件的里按钮传递的参数。
      axios.get('http://39.104.53.187:10810/nvc/' + this.server + '/api/v1/ptzcontrol', { // 调取云台接口地址
        params: {
          channel: this.channelNum, // 调取对应的设备通道地址
          command: data, // 调取云台接口的控制参数
          speed: this.speed
        }
      })
      this.timer = setTimeout(this.stop, 500)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src='../../assets/css/style.css'>
</style>
