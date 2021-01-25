<template>
  <div class="slideCharts">
    <div class="chartBox">
      <div class="btns">
        <el-button
          :class="{ active: shows === 1 }"
          size="small"
          @click="
            setChartData(10)
            shows = 1
          "
        >10天</el-button>
        <el-button
          :class="{ active: shows === 2 }"
          size="small"
          @click="
            setChartData(30)
            shows = 2
          "
        >30天</el-button>
        <el-button
          :class="{ active: shows === 3 }"
          size="small"
          @click="
            setChartData(60)
            shows = 3
          "
        >60天</el-button>
        <el-button
          :class="{ active: shows === 4 }"
          size="small"
          @click="
            setChartData(180)
            shows = 4
          "
        >180天</el-button>
        <el-button @click="test">测试</el-button>
      </div>
      <div ref="myCharts" class="chartBox_d" />
    </div>
  </div>
</template>

<script>
// 引入api
import charapi from '@/api/data'
var echarts = require('echarts')
export default {
  data() {
    // ...省略
  },
  watch: {
    // 数据变化时自动重画，在控制台修改message,会自动重画
    message: function() {
      this.draw()
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let that = this;
      // 通过Api请求后端接口，返回的结果会自动给resp变量
      // 因为不需要传参，所以getData()不用写参数
      charapi.getData().then(function(resp) {
        // 如果返回状态码是200
        // eslint-disable-next-line eqeqeq
        if (resp.data.code == 200) {
          // 就将数据更改
          that.option.series.data = resp.data.data;
        }
      })
      const myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option, true)
    }

  }
}
</script>
}

</script>
<style lang="scss" scoped>
.slideCharts {
  height: calc(100% - 72px);
}
.chartBox {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  height: 100%;
  position: relative;
  .chartBox_d {
    height: 100%;
    box-sizing: border-box;
    padding: 30px 20px 30px 20px;
  }
  .btns {
    position: absolute;
    right: 40px;
    top: 20px;
    z-index: 99;
    .el-button.active {
      color: #3a8ee6;
      background: #ddeeff;
    }
  }
}
</style>
