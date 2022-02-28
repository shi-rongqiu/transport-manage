<template>
  <div class="analyze">
    <div class="param-content">
      <div class="param-item">
        <div>
          <div class="header-btn">
            <div @click="changeChart1(1)" :class="{'active': first == 1}">今日</div>
            <div @click="changeChart1(2)" :class="{'active': first == 2}">本月</div>
            <div @click="changeChart1(3)" :class="{'active': first == 3}">本年</div>
          </div>
          <div class="chart" id="pieCircle"></div>
        </div>
      </div>
      <div class="param-item">
        <div>
          <div class="header-btn">
            <div @click="changeChart2(1)" :class="{'active': senond == 1}">今日</div>
            <div @click="changeChart2(2)" :class="{'active': senond == 2}">本月</div>
            <div @click="changeChart2(3)" :class="{'active': senond == 3}">本年</div>
          </div>
          <div class="chart" id="pie"></div>
        </div>
      </div>
      <div class="param-item">
        <div>
          <div class="header-btn">
            <div @click="changeChart3(1)" :class="{'active': third == 1}">今日</div>
            <div @click="changeChart3(2)" :class="{'active': third == 2}">本月</div>
            <div @click="changeChart3(3)" :class="{'active': third == 3}">本年</div>
          </div>
          <div class="chart" id="bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import mylib from "../../mylib";
export default {
  name: 'analyze',
  data () {
    return {
      xData: [],
      xData1: [],
      xData2: [],
      first: 1,
      senond: 1,
      third: 1
    }
  },
  methods: {
    initData () {
      this.initChart1()
      this.initChart2()
      this.initChart3()
    },
    changeChart1 (key) {
      this.first = key
      this.initChart1()
    },
    changeChart2 (key) {
      this.senond = key
      this.initChart2()
    },
    changeChart3 (key) {
      this.third = key
      this.initChart3()
    },
    initChart1 () {
      this.xData = []
      mylib.axios({
        url: '/exception/exceptionAnalysis',
        params: {
          btn: this.first
        },
        done (res) {
          if (res.success) {
            var data = []
            res.data.forEach((el) => {
              this.xData.push(el.instruName)
              data.push({
                name: el.instruName,
                value: el.alarmCount
              })
            })
            var myChart = echarts.init(document.getElementById('pieCircle'))
            var option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'horizontal',
                data: this.xData,
                textStyle: {
                  color: '#fff'
                }
              },
              color: ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e8684a'],
              series: [
                {
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      position: 'inner',
                      show: true,
                      formatter: '{c}'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: data
                }
              ]
            }
            myChart.setOption(option)
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    initChart2 () {
      this.xData1 = []
      mylib.axios({
        url: '/exception/exceptionAlarmDispose',
        params: {
          btn: this.senond
        },
        done (res) {
          if (res.success) {
            var data = []
            res.data.forEach((el) => {
              this.xData1.push(el.instruName)
              data.push({
                name: el.instruName,
                value: el.alarmDisposeCount
              })
            })
            var myChart1 = echarts.init(document.getElementById('pie'))
            var option1 = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'horizontal',
                data: this.xData1,
                textStyle: {
                  color: '#fff'
                }
              },
              color: ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e8684a'],
              series: [
                {
                  type: 'pie',
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      position: 'inner',
                      show: true,
                      formatter: '{c}'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: data
                }
              ]
            }
            myChart1.setOption(option1)
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    initChart3 () {
      this.xData2 = []
      mylib.axios({
        url: '/exception/exceptionAlarmReas',
        params: {
          btn: this.third
        },
        done (res) {
          if (res.success) {
            var arr = []
            var arr1 = []
            var arr2 = []
            var arr3 = []
            res.data.forEach((el) => {
              this.xData2.push(el.instruName)
              arr.push(el.deviceCause)
              arr1.push(el.interCause)
              arr2.push(el.instruCause)
              arr3.push(el.otherCause)
            })
            var myChart2 = echarts.init(document.getElementById('bar'))
            var option2 = {
              title: {
              },
              tooltip: {},
              legend: {
                data: ['设备故障', '网络故障', '仪表故障', '其他'],
                textStyle: {
                  color: '#fff'
                }
              },
              xAxis: {
                data: this.xData2,
                axisLabel: {
                  interval: 0,
                  rotate: -30
                }
              },
              yAxis: {
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#fff'
                  }
                }
              },
              textStyle: {
                color: '#fff'
              },
              grid: {
                right: '20%',
                bottom: '35%'
              },
              color: ['#5b8ff9', '#5ad8a6', '#f6bd16', '#e8684a'],
              series: [{
                name: '设备故障',
                type: 'bar',
                data: arr
              }, {
                name: '网络故障',
                type: 'bar',
                data: arr1
              }, {
                name: '仪表故障',
                type: 'bar',
                data: arr2
              }, {
                name: '其他',
                type: 'bar',
                data: arr3
              }]
            }
            myChart2.setOption(option2)
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
  .analyze{
    padding-top:50px;
  }
  .jump-icon>span{
    display:inline-block;
    width:30px;
    height:30px;
    text-align:center;
    background:linear-gradient(to right, #089DDB, #0AF0F3);
    margin-right:10px;
  }
  .param-content{display:flex;}
  .param-item{width:26vw;height:70vh;border:0.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;padding:30px 10px 10px;box-sizing:border-box;position:relative;margin-right:20px;}
  .header-btn{width:100%;display:flex;justify-content: center;}
  .header-btn>div{width:65px;height:32px;color:#fff;font-size:12px;
    text-align:center;line-height:32px;border:1px solid rgba(255, 255, 255, 0.2);border-radius: 2px;
    margin-bottom:20px;margin-right:30px;cursor: pointer}
  .active{background:linear-gradient(to right, #0AF0F3, #089DDB);border:0;color:#021435 !important;}
  .chart{width:100%;height:calc(70vh - 90px);}
</style>
