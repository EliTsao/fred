<template>
  <div :class="className" :style="{height:height,width:width}">
    <el-card class="anoCard">
      <div slot="header">
        <span>实时数据查询</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../components/Charts/mixins/resize'
import { listLine } from '@/api/data'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1200px'
    },
    height: {
      type: String,
      default: '800px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      MapList: [],
      rows: [],
      LineList: [],
      time: [],
      humidity: [],
      environmentTemperature: [],
      power: [],
      queryParams: {
        power: undefined,
        environmentTemperature: undefined,
        humidity: undefined,
        time: undefined
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.getLineList()
  },
  methods: {
    getLineList() {
      this.loading = true
      listLine(this.queryParams).then(response => {
        this.MapList = response.data
        console.log('折线图数据：' + this.MapList)
        const MapList = this.MapList
        if (MapList) {
          const obj = eval(MapList) // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。返回值是通过计算 string 而得到的值
          console.log(obj.length)
          for (let i = 0; i < obj.length; i++) {
            this.environmentTemperature.push(MapList[i].environmentTemperature)
          }
          for (let i = 0; i < obj.length; i++) {
            this.power.push(MapList[i].power)
          }
          for (let i = 0; i < obj.length; i++) {
            this.humidity.push(MapList[i].humidity)
          }
          for (let i = 0; i < obj.length; i++) {
            this.time.push(MapList[i].time)
          }
        }
        this.chart.setOption({
          xAxis: {
            data: this.time
          },
          series: [{
            name: '机器人电量',
            data: this.power
          },
          {
            name: '湿度',
            data: this.humidity
          },
          {
            name: '环境温度',
            data: this.environmentTemperature
          }]
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: this.time,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['机器人电量', '湿度', '温度']
        },
        series: [{
          name: '机器人电量', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: this.power,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '湿度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#45E4A5',
                width: 2
              }
            }
          },
          data: this.humidity,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '温度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#blue',
              lineStyle: {
                color: 'red',
                width: 2
              }
            }
          },
          data: this.environmentTemperature,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 500px;
}
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
</style>
