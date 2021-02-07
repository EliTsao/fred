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
          <div>位置:{{ robotData.distance }}</div>
          <div>速度: {{ robotData.speed }}</div>
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
            <div>{{ robotData.name }}</div>
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
            <div>当前状态:</div>
            <div>{{ robotData.workState }}</div>
          </div>
          <div class="item">
            <div>网络状态：</div>
            <div />
          </div>
          <div class="item">
            <div>设备消息:</div>
            <div>{{ robotData.cameraPowerStatus }}</div>
          </div>
          <div class="item">
            <div>滑台位置</div>
            <div>{{ robotData.slidePosition }}</div>
          </div>
          <div class="item">
            <div>运动模式</div>
            <div>{{ robotData.walkPattern }}</div>
          </div>
          <div class="item">
            <div>通信等待时限</div>
            <div>{{ robotData.interruptTime }}</div>
          </div>
        </div>
        <div class="control">
          <div class="base">
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg" @click="control('zoomin')">
              <div>变倍</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg" @click="control('zoomout')">
            </div>
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg" @click="control('focusin')">
              <div>变焦</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg" @click="control('focusout')">
            </div>
            <span />
            <div class="d-pad">
              <img src="../../assets/svg/checkbox-blank-circle-line.svg" @click="control('stop')">
              <img src="../../assets/svg/arrow-up-s-line.svg" @click="control('up')">
              <img src="../../assets/svg/arrow-down-s-line.svg" @click="control('down')">
              <img src="../../assets/svg/arrow-left-s-line.svg" @click="control('left')">
              <img src="../../assets/svg/arrow-right-s-line.svg" @click="control('right')">
            </div>
          </div>
          <div class="tools">
            <div class="select">
              <el-select v-model="value" placeholder="请选择工作状态" style="width:150px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button @click="workPattern">确定</el-button>
            </div>
            <div class="grid-9">
              <el-button @mousedown.native="mouse" @mouseup="mouseup"><img src="../../assets/svg/arrow-left-fill.svg"></el-button>
              <el-button @click="walkstop"><img src="../../assets/svg/stop-fill.svg"></el-button>
              <el-button @mousedown.native="mousedown" @mouseup.native="mouseup"><img src="../../assets/svg/arrow-right-fill.svg"></el-button>
              <button @click="spee">加档</button>
              <button id="level">{{ robotData.speed }}</button>
              <button @click="spe">减档</button>
            </div>
            <div class="grid-4">
              <button @click="walkPattern1('1')">连续</button>
              <button @click="walkPattern0('0')">点动</button>
              <button @click="captureImage">抓图</button>
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
var mousedown = { timer: null, start: null, end: null, play: null }
import { captureImage, detectTemperature, loadCable, repairGroundWire, spee, spe, slidePosition, walkPattern, workPattern, walkDirection, clickPattern } from '@/api/mainpage'
import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data() {
    return {
      options: [{
        value: '0',
        label: '待命'
      }, {
        value: '1',
        label: '充电'
      }, {
        value: '2',
        label: '寻找充电桩'
      }],
      value: '',
      videoUrl1: 'http://39.104.53.187:10810/nvc/server/flv/hls/stream_2.flv',
      videoUrl2: 'http://39.104.53.187:10810/nvc/server/flv/hls/stream_1.flv',
      videoUrl3: 'http://39.104.53.187:10810/nvc/server/flv/hls/stream_3.flv',
      videoUrl4: 'http://39.104.53.187:10810/nvc/server/flv/hls/stream_4.flv',
      serialNumber: '',
      channels: '',
      player: '',
      timer: '',
      Robot: [
        {
          name: '机器人1',
          serialNumber: 1
        },
        {
          name: '机器人2',
          serialNumber: 2
        },
        {
          name: '机器人3',
          serialNumber: 3
        },
        {
          name: '机器人4',
          serialNumber: 4
        }
      ],
      Robot_Selected: '机器人',
      ctx: null,
      robotData: {},
      news: {}
    }
  },
  mounted() {
    this.channelNum = 2
    this.init
    this.webSocketConnect()
    this.serialNumber = 1
    this.ctx = document.getElementById('canvas').getContext('2d')
    var player1 = new WasmPlayer(this.videoUrl1, 'wasmPlayer1', this.callbackfun, {
      Height: true
    })
    var player2 = new WasmPlayer(this.videoUrl2, 'wasmPlayer2', this.callbackfun, {
      Height: true
    })
    var player3 = new WasmPlayer(this.videoUrl3, 'wasmPlayer3', this.callbackfun, {
      Height: true
    })
    var player4 = new WasmPlayer(this.videoUrl4, 'wasmPlayer4', this.callbackfun, {
      Height: true
    })
  },

  methods: {

    selectRobot: function(item) {
      // const name = params.target.dataset.name
      // this.Robot_Selected = name
      console.log(item)
      const params = {
        serialNumber: item.serialNumber
      }
      console.log(params)
      axios.get(params).then(res => {
        console.log(res)
      })
    },
    //   回调函数
    callbackfun(e) {
      console.log('callbackfun', e)
    },
    webSocketConnect() {
      // 连接上端口
      const socket = new SockJS('http://www.aait-suse.cn/dlxj/endpoint_is')
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
        this.stompClient.subscribe('/robotData/65535', (res) => {
          const data = JSON.parse(JSON.parse(JSON.stringify(res)).body).data
          this.robotData = data
          this.runContext(data.towerNumber, data.distance)
        })
        // 订阅系统消息
        this.stompClient.subscribe('/systemMessage', (res) => {
          // console.log(res)
          const data = JSON.parse(JSON.parse(JSON.stringify(res)).body).data
          this.news = data
        })
      })
    },

    // 长按
    mousedown() {
      if (this.robotData.walkPattern !== '点动') {
        this.walkon()
      } else {
        mousedown.start = new Date().getTime()
        mousedown.timer = setInterval(function() {
          mousedown.end = new Date().getTime()
          this.walkon()
          if (mousedown.end - mousedown.start > 1000) {
            clearInterval(mousedown.timer)
            this.walkon()
          }
        }, 800)
      }
    },
    mouseup() {
      if (this.robotData.walkPattern === '点动') {
        clearInterval(mousedown.timer)
        this.walkstop()
      }
    },
    mouse() {
      if (this.robotData.walkPattern !== '点动') {
        this.walkback()
      } else {
        this.walkback()
        mousedown.start = new Date().getTime()
        mousedown.timer = setInterval(function() {
          mousedown.end = new Date().getTime()
          if (mousedown.end - mousedown.start > 1000) {
            this.walkback()
          }
        }, 1000)
      }
    },
    // 前进
    walkon() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '1'
      })
    },
    // 后退
    walkback() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '2'
      })
    },
    // 停止
    walkstop() {
      walkDirection({
        serialNumber: this.serialNumber,
        direction: '0'
      })
    },
    // 加档
    spee(data) {
      spee({
        serialNumber: this.serialNumber,
        speed: (this.robotData.speed + 1)
      })
    },

    spe(data) {
      spe({
        serialNumber: this.serialNumber,
        speed: (this.robotData.speed - 1)
      })
    },

    // 点动行走模式
    walkPattern0(data) {
      clickPattern({
        serialNumber: this.serialNumber
      })
    },
    // 连续行走模式
    walkPattern1(data) {
      walkPattern({
        serialNumber: this.serialNumber,
        pattern: data
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
    workPattern: function name(params) {
      workPattern({
        pattern: this.value,
        serialNumber: this.serialNumber
      })
    },
    // 抓图
    captureImage: function(item) {
      captureImage({
        serialNumber: this.serialNumber
      })
    },
    // 测温
    detectTemperature: function(item) {
      detectTemperature({
        serialNumber: this.serialNumber
      })
    },
    // 装载
    loadCable() {
      loadCable({
        serialNumber: this.serialNumber
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
        if (res.meta.status !== 200) return this.$message.error('操作失败')
        else this.$message.success('操作成功')
      })
    },
    control(data) { // testControl里的data是接收云台控制组件的里按钮传递的参数。
      axios.get('http://39.104.53.187:10810/nvc/server/api/v1/ptzcontrol', { // 调取云台接口地址
        params: {
          channel: this.channelNum, // 调取对应的设备通道地址
          command: data // 调取云台接口的控制参数
        }
      })
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
