<template>
  <div class="mainpage-container">
    <div class="robot">
      <span @click="tan">机器人1</span>
    </div>

    <div class="second">
      <div class="tieta">
        <span>铁塔</span>
      </div>

      <div class="three">
        <div class="player">

          <div class="player-box">
            <span>主摄像头</span>
            <div id="wasmPlayer" />
          </div>

          <div class="player-box">
            <span>热成像图</span>
            <div id="wasmPlayer" />

          </div><div class="player-box">
            <span>前轮摄像头</span>
            <div id="wasmPlayer" />
          </div>

          <div class="player-box">
            <span>后轮摄像头</span>
            <div id="wasmPlayer" />
          </div>

        </div>
      </div>
    </div>

    <div class="first">

      <div class="zhuangtai">
</div>
      <div class="zhiling">
        <el-row>
          <el-button @click="walkDirection(1)" @mousedown="change(1)">前进</el-button>
        </el-row>
        <el-row>
          <el-button @click="walkDirection(0)" @mousedown="change(0)">停止</el-button>
        </el-row>
        <el-row>
          <el-button @click="walkDirection(2)" @mousedown="change(2)">后退</el-button>
        </el-row>
        <el-row>
          <el-button @click="speed">加档</el-button>
        </el-row>
        <el-row>
          <el-button @click="speed">10</el-button>
        </el-row>
        <el-row>
          <el-button @click="speed">减档</el-button>
        </el-row>
        <el-row>
          <el-button @click="lianxu">连续</el-button>
        </el-row>
        <el-row>
          <el-button @click="captureImage">抓图</el-button>
        </el-row>
        <el-row>
          <el-button @click="detectTemperature">测温</el-button>
        </el-row>
        <el-row>
          <el-button @click="loadCable">装载</el-button>
        </el-row>
        <el-row>
          <el-button @click="postion">升滑台</el-button>
        </el-row>
        <el-row>
          <el-button @click="fix">修补</el-button>
        </el-row>
        <el-row>
          <el-button @click="postion">降滑台</el-button>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Mainpage',
  data() {
    return {
      dierection: '',
      serialNumber: ''
    }
  },
  mounted() {
    this.init
    this.webSocketConnect()
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  methods: {
    webSocketConnect() {
      // 连接上端口
      const socket = new SockJS('http://192.168.31.16:10010/endpoint_is')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, (frame) => {
        console.log(frame)
        // 订阅温度报警消息
        this.stompClient.subscribe('/alarm', res => {
          console.log(res)
        })
        // 订阅机器人实时消息
        this.stompClient.subscribe('/robotData/1', (res) => {
          console.log(res)
        })
        // 订阅系统消息
        this.stompClient.subscribe('/systemMessage', (res) => {
          console.log(res)
        })
        // 消息提示
        this.socket.onmessage = function(msg) {
          const data = JSON.parse(msg.data)
          this.$notify({
            title: '系统消息',
            message: ''
          })
        }
      })
    },
    walkDirection(data) {
      axios.get('http://192.168.31.16:10010/command/walkDirection/1/1', {
        // params: {
        //   direction: data,
        //   serialNumber: '1'
        // }
      }
      )
    },
    loadCable(params) {
      axios.get('http://192.168.31.16:10010/command/loadCable/1/3', {
      })
    },
    speed(params) {
      axios.get('http://192.168.31.16:10010/command/speed/1/3', {
      })
    },
    change(params) {
      axios.get('http://192.168.31.16:10010/command/workParten/1/1', {
      })
    },
    postion(params) {
      axios.get('http://192.168.31.16:10010/command/slidePostion/1', {
      })
    },
    captureImage(params) {
      axios.get('http://192.168.31.16:10010/command/captureImage/1', {
      })
    },
    lianxu(params) {
      axios.get('http://192.168.31.16:10010/command/walkPattern/1/0', {

      })
    },
    detectTemperature(params) {
      axios.get('http://192.168.31.16:10010/command/detectTemperature/1', {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mainpage-container{
  display: flex;
  padding: 1em;
  flex-direction: row;

  .robot{
    padding: 1em;
    background-color:black;
    flex: 10%;
    height: 1200px;
  }

  .second{
    padding: 1em;
    flex: 90%;
    height: 1200px;
    flex-direction: column;

    .tieta{
      padding: 1em;
      background-color: #20a0ff;
      flex:100% ;
      height: 280px;
    }
  }
}
.three{
  padding: 1em;
  flex-direction: row;
  height: 1800px;

  .zhibo{
    padding:1em;
    background-color: orange;
    flex: 60%;
  }
  .first{
    padding: 1em;
    flex-direction: column;
    flex: 40%;
    .zhuangtai{
    }
    .zhiling{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      background-color: ghostwhite;
    }
  }
}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .player-box {
    height: 200px;
    width: 440px;
    margin: auto;
    margin-top: 2%;
    border: 1px solid #eee;
  }
  .player{
    display: flex;
    flex-direction: row;
    padding: 1em;
    height: 440px;
    width: 900px;
    flex-wrap: wrap;
  }
</style>
