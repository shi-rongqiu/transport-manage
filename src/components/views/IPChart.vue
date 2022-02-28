<template>
  <div class="home-content">
    <div class="chart-content">
      <!--      <div class="chart" id="main"></div>-->
      <chart id="chart" :options="myChart" @click="clickFun" class="chart"></chart>
    </div>
    <div class="right-device">
      <home-aside :data="tableData" @update="getSet"></home-aside>
    </div>
  </div>
</template>

<script>
import HomeAside from '../children/homeAside'
import 'echarts/lib/chart/tree'
import mylib from "../../mylib";
// import echarts from 'echarts'
export default {
  name: 'IP-chart',
  components: {HomeAside},
  data () {
    return {
      myChart: null, // 树图
      tableData: [],
      net: require('../../assets/img/net.png'),
      normal: require('../../assets/img/spec-icon.svg'),
      innormal: require('../../assets/img/spec-icon-nor.svg')
    }
  },
  methods: {
    getSet () {
      this.initData()
    },
    initData () {
      mylib.axios({
        url: '/observed/entireNetworkTopology',
        done (res) {
          if (res.success) {
            this.tableData = res.data
            this.initChart()
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    initChart () {
      var children = []
      this.tableData.forEach((el, index) => {
        if (el.status === null) {
          children.push({
            arr: el,
            label: {
              formatter: [
                '{a|' + (index + 1) + '} ' + el.ip + ' {b|}'
              ].join('\n'),
              rich: {
                a: {
                  color: '#333',
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  align: 'center',
                  backgroundColor: '#ffff00'
                },
                b: {
                  backgroundColor: {
                    image: this.normal
                  },
                  width: 21,
                  height: 19
                }
              },
              rotate: 0
            }
          })
        } else {
          children.push({
            arr: el,
            label: {
              formatter: [
                '{a|' + (index + 1) + '} ' + el.ip + ' {b|}'
              ].join('\n'),
              rich: {
                a: {
                  color: el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000',
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  align: 'center',
                  backgroundColor: '#fff',
                  fontWeight: 'bold'
                },
                b: {
                  backgroundColor: {
                    image: this.innormal
                  },
                  width: 21,
                  height: 19
                }
              },
              rotate: 0
            },
            itemStyle: {
              color: el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000',
              borderColor: el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
            }
          })
        }
      })
      var data = {
        symbolSize: 1,
        symbol: 'circle',
        label: {
          position: 'inside',
          rotate: 0,
          formatter: [
            '{a|}'
          ].join('\n'),
          rich: {
            a: {
              width: 55,
              height: 59,
              backgroundColor: {
                image: this.net
              }
            }
          }
        },
        'children': children
      }
      var data1 = []
      data1.push(data)
      this.myChart = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (params) {
            var res = `设备名称： ${params.data.arr.instruName}</br>所属系统：${params.data.arr.system}</br>
                       所属设备： ${params.data.arr.deviceName}</br>${params.data.arr.observedName ? params.data.arr.observedName : ''}:${params.data.arr.data ? params.data.arr.data : ''}</br>`
            return res
          },
          borderColor: '#0af0f3',
          backgroundColor: '#071223',
          borderWidth: 1
        },
        series: [
          {
            type: 'tree',
            name: 'tree',
            top: '8%',
            left: '8%',
            bottom: '8%',
            right: '8%',
            roam: 'scale',
            layout: 'radial',
            symbol: 'rect',
            symbolSize: [160, 35],
            lineStyle: {
              width: 2,
              color: '#0af0f3',
              curveness: 0,
              type: 'dashed'
            },
            itemStyle: {
              color: '#071223',
              borderColor: '#0af0f3',
              borderWidth: 1
            },

            label: {
              show: true,
              color: '#fff',
              position: 'inside'
            },
            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750,
            data: data1
          }
        ]
      }
    },
    clickFun (params) {
      this.$router.push({path: '/playback', query: {funcId: params.data.arr.dataId}})
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
  .home-content{
    position:relative;
    /*height:100%;*/
  }
  .chart-content{
    width:calc(100% - 350px);
    padding-left:5%;
    padding-top:50px;
  }
  .right-device{
    width:300px;
    position:absolute;
    top:50px;
    right:0;
  }
  .chart{
    width:90%;
    height:80vh;
    min-width:500px;
    min-height:300px;
  }
</style>
