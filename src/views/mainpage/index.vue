<template>
  <div class="mainpage-container">
    <div class="robot">
      <span>机器人列表</span>
    </div>

    <div class="second">
      <div class="tieta">
        <span>铁塔</span>
      </div>

      <div class="three">

        <div class="player-box">
          <span>主摄像头</span>
          <div id="wasmPlayer" />
        </div>
      </div>
    </div>

    <div class="first">

      <div class="zhuangtai">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>机器人状态</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
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
          <el-button>连续</el-button>
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
      // path: 'http://172.21.227.60:10010/',
      // socket: ''
    }
  },
  mounted() {
    this.init
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  methods: {
    webSocketConnect() {
      // 连接上端口
      const socket = new SockJS('https://192.168.31.16:10010/endpoint_is')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/alarm', res => {
          console.log(res)
        })
        this.stompClient.subscribe('/robotData', (res) => {
          console.log(res)
        })
        this.stompClient.subscribe('/systemMessage', (res) => {
          console.log(res)
        })
      })
    },
    walkDirection(data) {
      axios.get('http://192.168.31.16:10010/command/walkDirection/', {
        headers: {
          'token': window.localStorage['token']
        },
        params: {
          direction: data,
          serialNumber: '1'
        }
      }
      )
    },
    loadCable(params) {
      axios.get('http://192.168.31.16:10010/command/loadCable/1', {
      })
    },
    speed(params) {
      axios.get('http://192.168.31.16:10010/command/loadCable/1', {
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
  height: 800px;

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
    height: 400px;
    width: 600px;
    margin: auto;
    margin-top: 2%;
    border: 1px solid #eee;
  }
</style>
