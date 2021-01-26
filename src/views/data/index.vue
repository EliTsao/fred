<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>趋势曲线</span>
      </div>
      <div :class="className" :style="{height:height,width:width}" />
      <div>
        <el-button @click="test">test</el-button>
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
      default: '760px'
    },
    height: {
      type: String,
      default: '303px'
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
      lineInAmount: [],
      ineOutAmount: [],
      lineDate: [],
      queryParams: {
        lineInAmount: undefined,
        lineOutAmount: undefined,
        lineDate: undefined
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
        this.MapList = response.rows
        console.log('折线图数据：' + this.MapList)
        const MapList = this.MapList
        if (MapList) {
          const obj = eval(MapList) // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。返回值是通过计算 string 而得到的值
          console.log(obj)
          for (let i = 0; i < obj.length; i++) {
            this.lineInAmount.push(MapList[i].lineInAmount)
          }
          // console.log(this.lineInAmount);
          for (let i = 0; i < obj.length; i++) {
            this.lineOutAmount.push(MapList[i].lineOutAmount)
          }
          for (let i = 0; i < obj.length; i++) {
            this.lineDate.push(MapList[i].lineDate)
          }
        }
        this.chart.setOption({
          xAxis: {
            data: this.lineDate
          },
          series: [{
            name: '入库金额',
            data: this.lineInAmount
          },
          {
            name: '出库金额',
            data: this.lineOutAmount
          }]
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.list({
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
          data: this.value,
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['入库金额', '出库金额'],
          textStyle: {
            color: 'white'
          }
        },
        series: [{
          name: '入库金额', itemStyle: {
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
          data: this.lineInAmount,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '出库金额',
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
          data: this.lineOutAmount,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
