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

        <div class="zhibo">
          <span>直播</span>
        </div>

        <div class="first">

          <div class="zhuangtai">
            <span>机器人状态</span>
          </div>

          <div class="zhiling">
            <el-row>
              <el-button @click="walkDirection(1)">前进</el-button>
            </el-row>
            <el-row>
              <el-button @click="walkDirection(0)">停止</el-button>
            </el-row>
            <el-row>
              <el-button @click="walkDirection(2)">后退</el-button>
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
              <el-button>抓图</el-button>
            </el-row>
            <el-row>
              <el-button>测温</el-button>
            </el-row>
            <el-row>
              <el-button @click="loadCable">装载</el-button>
            </el-row>
            <el-row>
              <el-button>升滑台</el-button>
            </el-row>
            <el-row>
              <el-button>修补</el-button>
            </el-row>
            <el-row>
              <el-button>降滑台</el-button>
            </el-row>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
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
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    walkDirection(data) {
      axios.put('http://localhost:8080/command/walkDirection/', {
        data: {
          direction: data,
          serialNumber: '2'
        }
      }
      )
    },
    loadCable(data) {
      axios.put('http://localhost:8080/command/loadCable/', {
        data: {
          serialNumber: '1'
        }
      })
    },
    speed(data) {
      axios.put('http://localhost:8080/command/loadCable/', {
        data: {
          serialNumber: '3'
        }
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
      background-color: darkslategray;
    }
    .zhiling{
      background-color: ghostwhite;
    }
  }
}
</style>
