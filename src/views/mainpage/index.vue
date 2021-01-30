<template>
  <div class="body">
    <div class="container">
      <div class="list">
        <div class="title">机器人列表</div>
        <button><img src="../../assets/svg/arrow-up-s-fill.svg"></button>
        <ul>
          <li v-for="(rbt,key) in Robot" :data-name="key" @click="selectRobot">
            <img src="../../assets/img/rbt.png">
            <div>{{ key }}</div>
          </li>
        </ul>
        <button><img src="../../assets/svg/arrow-down-s-fill.svg"></button>
      </div>
      <div class="line">
        <div class="info">
          <div>位置: 300米</div>
          <div>速度: 3米/秒</div>
          <div>温度: 26°C</div>
          <div>湿度: 40%</div>
          <div class="block" />
          <div>彬乾I线</div>
        </div>
        <img src="../../assets/img/铁塔.jpg">
      </div>
      <div class="camera">
        <div class="item">
          <div class="title">主摄像头</div>
          <div id="wasmPlayer" />
        </div>
        <div class="item">
          <div class="title">热成像图</div>
          <canvas />
        </div>
        <div class="item">
          <div class="title">前轮摄像头</div>
          <canvas />
        </div>
        <div class="item">
          <div class="title">后轮摄像头</div>
          <canvas />
        </div>
      </div>
      <div class="status">
        <div class="info">
          <div class="title">机器人状态</div>
          <div class="item">
            <div>名称:</div>
            <div>机器人1号</div>
          </div>
          <div class="item">
            <div>行走方向:</div>
            <div>前进/后退</div>
          </div>
          <div class="item">
            <div>剩余电量:</div>
            <div>50%</div>
          </div>
          <div class="item">
            <div>当前状态:</div>
            <div>在线/离线</div>
          </div>
          <div class="item">
            <div>设备消息:</div>
            <div />
          </div>
        </div>
        <div class="control">
          <div class="base">
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg">
              <div>变倍</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg">
            </div>
            <div class="btn-pr">
              <img src="../../assets/svg/add-circle-fill.svg" @click="control('zoomin')">
              <div>变焦</div>
              <img src="../../assets/svg/indeterminate-circle-fill.svg" @click="control('zoomout')">
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
            <div class="grid-9">
              <button><img src="../../assets/svg/arrow-left-fill.svg" @click="walkDirection('1')"></button>
              <button><img src="../../assets/svg/stop-fill.svg" @click="walkDirection('0')"></button>
              <button><img src="../../assets/svg/arrow-right-fill.svg" @click="walkDirection('2')"></button>
              <button @click="level_up()">加档</button>
              <button id="level">10</button>
              <button @click="level_down()">减档</button>
              <button @click="walkPattern">连续</button>
              <button @click="captureImage">抓图</button>
              <button @click="detectTemperature">测温</button>
            </div>
            <div class="grid-4">
              <button @click="loadCable">装载</button>
              <button @click="slidPosition">升滑台</button>
              <button @click="repairGroundWire">修补</button>
              <button @click="slidPosition">降滑台</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statusBar">
      <div class="msg">系统消息:机器人A登陆成功!</div>
      <div class="time">2020-01-20 10:10:10</div>
    </div>
  </div>
</template>

<script>
import { walkDirection, walkPattern, captureImage, detectTemperature, loadCable, slidPosition, repairGroundWire } from '@/api/mainpage'
import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data() {
    return {
      serialname: '',
      channels: '',
      player: '',
      Robot: {
        '机器人A': { serialNumber: 1 },
        '机器人B': { serialNumber: 2 },
        '机器人C': { serialNumber: 5 },
        '机器人D': { serialNumber: 7 }
      },
      Robot_Selected: '机器人A'
    }
  },
  mounted() {
    // 实例化播放器
    this.player = new WasmPlayer('http://192.168.31.102:10800/flv/hls/stream_2.flv', 'wasmPlayer', this.callbackfun, {
      Height: true
    })
    this.channelNum = 2
    this.serialname = 2
    this.init
    this.webSocketConnect()
  },
  methods: {
    selectRobot: function(params) {
      const name = params.target.dataset.name
      this.Robot_Selected = name
    },

    level_up() {
      let lv = this.Robot[this.Robot_Selected].serialNumber
      lv++
      this.Robot[this.Robot_Selected].serialNumber = lv
    },
    level_down() {
      let lv = this.Robot[this.Robot_Selected].serialNumber
      lv--
      if (lv < 0) lv = 0
      this.Robot[this.Robot_Selected].serialNumber = lv
    },
    callbackfun(e) {
      console.log('callbackfun', e)
    },
    webSocketConnect() {
      // 连接上端口
      const socket = new SockJS('http://172.21.227.60:10010/endpoint_is')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, (frame) => {
        console.log(frame)
        // 订阅温度报警消息
        this.stompClient.subscribe('/alarm', res => {
          console.log(res)
        })
        // 订阅机器人实时消息
        this.stompClient.subscribe('/robotData', (res) => {
          console.log(res)
        })
        // 订阅系统消息
        this.stompClient.subscribe('/systemMessage', (res) => {
          console.log(res)
        })
      })
    },
    walkDirection() {
      walkDirection({
        serialname: this.serialname,
        walkDirection(data) {
        }
      })
    },
    walkPattern() {
      walkPattern({
        serialname: this.serialname
      })
    },
    captureImage() {
      captureImage({
        serialname: this.serialname
      })
    },
    detectTemperature() {
      detectTemperature({
        serialname: this.serialname
      })
    },
    loadCable() {
      loadCable({
        serialname: this.serialname
      })
    },
    slidPosition() {
      slidPosition({
        serialname: this.serialname
      })
    },
    repairGroundWire() {
      repairGroundWire({
        serialname: this.serialname
      })
    },
    control(data) { // testControl里的data是接收云台控制组件的里按钮传递的参数。
      axios.get('http://192.168.31.10:10800/api/v1/ptzcontrol', { // 调取云台接口地址
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

<style scoped>
body {
    display         : flex;
    flex-direction  : column;
    color           : #FF9800;
    background-color: #004D40;
    margin : 0;
    padding: 0;
    height : 100%;
}
.player-box {
    height: 400px;
    width: 400px;
    border: 1px solid #eee;
  }
/* 网格布局 */
.container {
    flex                 : 1;
    display              : grid;
    gap                  : 5px;
    grid-template-columns: 120px auto 280px;
    grid-template-rows   : 220px auto;
    overflow-x           : hidden;
    overflow-y           : auto;
}

.container>.list {
    display         : flex;
    flex-direction  : column;
    grid-row        : 1 / 3;
    padding         : 5px;
    text-align      : center;
    background-color: black;
    overflow        : hidden;
}

.container>.line {
    position        : relative;
    grid-column     : 2 / 4;
    background-color: white;
    overflow        : hidden;
}

.container>.camera {
    background-color: black;
}

.statusBar {
    display: flex;
    padding: 5px;
}

.statusBar>.msg {
    flex: 1;
}

/* 机器人列表 */
.list ul {
    flex      : 1;
    list-style: none;
    margin    : 5px 0;
    padding   : 0;
    overflow-y: auto;
}

.list ul li {
    color           : #555;
    margin-bottom   : 5px;
    background-color: white;
}

.list ul li:active {
    opacity: 0.9;
}

.list ul li>* {
    pointer-events: none;
}

.list ul div {
    padding   : 5px;
    border-top: 2px solid #795548;
}

.list ul img {
    width     : 100%;
    height    : 150px;
    object-fit: cover;
}

.list button {
    border          : none;
    height          : 30px;
    background-color: rgba(255, 255, 255, 0.8);
}

.list button img {
    height: 100%;
}

/* 塔列表 */
.line>.info {
    position: absolute;
    left    : 0;
    right   : 0;
    top     : 0;
    display : flex;
}

.line>.info>div {
    padding  : 10px;
    color    : #E74C3C;
    min-width: 120px;
    border   : 1px solid black;
}

.line>.info>div:last-child {
    color           : black;
    text-align      : center;
    background-color: #4DD0E1;
}

.line>.info>.block {
    flex  : 1;
    border: none;
}

.line>img {
    width     : 100%;
    height    : 100%;
    object-fit: cover;
}

/* 摄像头列表 */
.camera {
    display              : grid;
    grid-template-columns: repeat(2, auto);
    gap                  : 5px;
    text-align           : center;
}

.camera>.item {
    display       : flex;
    flex-direction: column;
}

.camera>.item>div {
    padding: 5px 0;
}

.camera canvas {
    flex            : 1;
    background-color: gray;
}

/* 状态信息 */
.status {
    display       : flex;
    flex-direction: column;
}

.status>.info,
.status>.control {
    padding         : 0 20px 10px;
    background-color: black;
}

.status>.info {
    margin-bottom: 5px;
}

.status>.info>.title {
    text-align: center;
    font-size : 16px;
    padding   : 5px 0;
}

.status>.info>.item {
    display              : grid;
    grid-template-columns: 80px auto;
    text-align           : left;
    font-size            : 14px;
    margin               : 5px 0;
}

.status>.control {
    flex          : 1;
    display       : flex;
    flex-direction: column;
}

.status>.control>.base {
    display              : grid;
    grid-template-columns: 50px 50px auto 100px;
}

.btn-pr {
    display       : flex;
    flex-direction: column;
    align-items   : center;
    font-size     : 14px;
    padding       : 10px 0;
}

.btn-pr>div {
    writing-mode: vertical-lr;
    margin      : 5px 0;
}

.btn-pr>img {
    width        : 28px;
    height       : 28px;
    border-radius: 50%;
}

.btn-pr>img:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.d-pad {
    position       : relative;
    display        : flex;
    align-items    : center;
    justify-content: center;
    width          : 100px;
    height         : 100px;
}

.d-pad>img {
    width        : 30px;
    height       : 30px;
    border-radius: 5px;
}

.d-pad>img:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.d-pad>img:first-child {
    background-color: #E74C3C;
    border-radius   : 50%;
    width           : 20px;
    height          : 20px;
}

.d-pad>img:first-child:hover {
    background-color: #FF9800;
}

/* 上箭头 */
.d-pad>img:nth-child(2) {
    position : absolute;
    top      : 5px;
    left     : 50%;
    transform: translateX(-50%);
}

/* 下箭头 */
.d-pad>img:nth-child(3) {
    position : absolute;
    bottom   : 5px;
    left     : 50%;
    transform: translateX(-50%);
}

/* 左箭头 */
.d-pad>img:nth-child(4) {
    position : absolute;
    top      : 50%;
    left     : 5px;
    transform: translateY(-50%);
}

/* 右箭头 */
.d-pad>img:nth-child(5) {
    position : absolute;
    top      : 50%;
    right    : 5px;
    transform: translateY(-50%);
}

.tools {
    flex           : 1;
    display        : flex;
    flex-direction : column;
    justify-content: center;
}

.tools button {
    height          : 40px;
    border          : none;
    background-color: white;
    border-radius   : 4px;
}

.tools button:hover {
    background-color: rgba(255, 255, 255, 0.8);
}

/* 九宫格 */
.grid-9,
.grid-4 {
    display: grid;
    gap    : 5px;
}

.grid-9 {
    grid-template-columns: repeat(3, auto);
    grid-template-rows   : repeat(3, auto);
}

.grid-4 {
    margin-top           : 5px;
    grid-template-columns: repeat(4, auto);
}

/* 屏幕适配 */

@media screen and (max-width: 1100px) {
    .container {
        grid-template-columns: auto 280px;
        grid-template-rows   : 140px 180px auto;
    }

    .container>.list {
        flex-direction: row;
        grid-column   : 1 / 3;
        grid-row      : auto;
    }

    .list .title {
        padding     : 0 10px;
        margin-right: 5px;
        writing-mode: vertical-lr;
    }

    .list>button {
        display: none;
    }

    .list ul {
        display       : flex;
        flex-direction: row;
    }

    .list ul li {
        margin-right : 5px;
        margin-bottom: 0;
    }

    .list ul img {
        height    : 80px;
        object-fit: cover;
    }

    .container>.line {
        grid-column: 1 / 2;
    }

    .line>.info>div {
        padding  : 5px;
        font-size: 14px;
        min-width: 80px;
    }

    .container>.status {
        grid-column: 2 / 3;
        grid-row   : 2 / 4;
    }

    .status>.info {
        height    : 180px;
        box-sizing: border-box;
    }
}

@media screen and (max-width: 900px) {
    .container {
        display       : block;
        flex-direction: column;
    }

    .container>.line {
        height: 140px;
    }

    .container>.status {
        flex-direction  : row;
        background-color: black;
    }

    .status>.info {
        margin-bottom: 0;
    }

    .status>div {
        flex: 1;
    }
}

@media screen and (max-width: 650px) {
    .container>.line {
        height: 90px;
    }

    .line>.info>div {
        padding  : 0 5px;
        font-size: 12px;
        min-width: auto;
    }

    .container>.camera {
        display: block;
    }

    .container>.status {
        flex-direction: column;
    }

}
