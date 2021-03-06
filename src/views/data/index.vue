<template>
  <div :class="className" :style="{height:height,width:width}">
    <el-card class="anoCard">
      <div slot="header">
        <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />
        <el-select v-model="value" placeholder="请选择机器人">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button type="primary" @click=" getLineList">确定</el-button>
        <div ref="chart" style="height: 80vh" />
      </div>
    </el-card>
  </div>
</template>

<script>

import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../components/Charts/mixins/resize'
import { listLine } from '@/api/data'
import moment from 'moment'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'calc(100vh - 50px)'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [{
        value: '一号机器人',
        label: '一号机器人'
      }, {
        value: '二号机器人',
        label: '二号机器人'
      }],
      value: '一号机器人',
      value1: [],
      chart: null,
      MapList: [],
      rows: [],
      LineList: [],
      time: [],
      humidity: [],
      endTime: [],
      startTime: [],
      pickdate: {
        startTime: '',
        endTime: ''
      },
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
    this.value1.push(moment().add(-6, 'hours').format('YYYY-MM-DD HH:mm:ss'))
    this.value1.push(moment().format('YYYY-MM-DD HH:mm:ss'))
    this.getLineList()
  },
  methods: {
    getLineList() {
      this.loading = true
      this.pickdate.startTime = this.value1[0]
      this.pickdate.endTime = this.value1[1]
      listLine({
        robotName: this.value,
        endTime: this.pickdate.endTime,
        startTime: this.pickdate.startTime

      }).then(response => {
        this.MapList = response.data
        const MapList = this.MapList
        if (MapList) {
          const obj = eval(MapList) // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。返回值是通过计算 string 而得到的值
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
      this.chart = echarts.init(this.$refs['chart'])
      this.chart.setOption({
        title: {
          // text: '机器人趋势图线',
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 30
          }
        },
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
          textStyle: {
            fontSize: 18
          },
          data: ['机器人电量', '湿度', '环境温度']
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
              color: '#45E4A5',
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
          name: '环境温度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
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
      window.addEventListener('resize', () => { this.chart.resize() })
    }
  }
}
</script>
<style lang="scss">
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
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}

</style>
