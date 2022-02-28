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
import echarts from 'echarts'
import mylib from "../../mylib";
export default {
  name: 'layerchart',
  components: {HomeAside},
  data () {
    return {
      myChart: null, // 树图
      tableData: [],
      imgUrl: require('../../assets/img/computer.png')
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
      var children1 = []
      this.tableData.forEach((el, index) => {
        if (el.deviceId <= 5) {
          children.push({
            name: el.deviceName,
            children: [
              { name: el.instruName,
                str: el.id,
                funcId: el.dataId,
                itemStyle: {
                  borderColor: el.status === null ? '#0af0f3' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                },
                label: {
                  formatter: [
                    '{a|' + (index + 1) + '}{b|' + el.instruName + (el.observedName ? '/' + el.observedName + ':' + el.data + '}' : '}')
                  ].join('\n'),
                  rich: {
                    a: {
                      color: '#333',
                      width: 15,
                      height: 15,
                      borderRadius: 15,
                      align: 'center',
                      backgroundColor: el.status === null ? '#ffff00' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                    },
                    b: {
                      color: el.status === null ? '#fff' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                    }
                  }
                }
              }
            ]
          })
        } else {
          children1.push({
            name: el.deviceName,
            children: [
              { name: el.instruName,
                str: el.id,
                funcId: el.dataId,
                itemStyle: {
                  borderColor: el.status === null ? '#0af0f3' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                },
                label: {
                  formatter: [
                    '{a|' + (index + 1) + '}{b|' + el.instruName + (el.observedName ? '/' + el.observedName + ':' + el.data + '}' : '}')
                  ].join('\n'),
                  rich: {
                    a: {
                      color: '#333',
                      width: 15,
                      height: 15,
                      borderRadius: 15,
                      align: 'center',
                      backgroundColor: el.status === null ? '#ffff00' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                    },
                    b: {
                      color: el.status === null ? '#fff' : el.status === '0' ? '#ffcb00' : el.status === '1' ? '#ff8512' : '#ff0000'
                    }
                  }
                }
              }
            ]
          })
        }
      })
      var data = {
        name: '系统',
        label: {
          formatter: [
            '{a|}系统'
          ].join('\n'),
          rich: {
            a: {
              width: 35,
              height: 36,
              backgroundColor: {
                image: this.imgUrl
              }
            }
          }
        },
        children: [
          {
            name: '海事卫星系统',
            children: children
          },
          {
            name: 'VSAT卫星系统',
            children: children1
          }
        ]
      }
      var data1 = []
      data1.push(data)
      this.myChart = {
        series: [
          {
            type: 'tree',
            name: 'tree',
            top: '10%',
            left: '2%',
            bottom: '5%',
            right: '35%',
            roam: 'scale',
            symbol: 'path://M202.59322,142.902006 C202.921469,142.902006 203.186441,143.163402 203.186441,143.487221 L203.186441,143.487221 L203.186441,159.951287 C203.186441,160.380445 203.542373,160.731575 203.977401,160.731575 L203.977401,160.731575 L222.40678,160.731575 C222.735028,160.731575 223,160.992971 223,161.31679 C223,161.64061 222.735028,161.902006 222.40678,161.902006 L222.40678,161.902006 L203.581921,161.902006 C202.70791,161.902006 202,161.203649 202,160.341431 L202,160.341431 L202,143.487221 C202,143.163402 202.264972,142.902006 202.59322,142.902006 Z M218.629944,145.039994 C218.879096,145.032191 219.10452,145.180445 219.199435,145.406729 L221.651412,151.414942 C221.774011,151.715353 221.627684,152.054778 221.323164,152.175722 C221.018644,152.296667 220.674576,152.152314 220.551977,151.851903 L218.705085,147.330137 L216.249153,154.633628 C216.181921,154.836503 216.003955,154.988659 215.790395,155.023772 C215.576836,155.062786 215.355367,154.976955 215.220904,154.809193 L212.982486,152.004059 L211.155367,153.775312 C211.032768,153.892355 210.866667,153.954778 210.692655,153.943074 C210.522599,153.931369 210.364407,153.845538 210.261582,153.708987 L208.59661,151.512478 L206.314689,158.000568 C206.231638,158.238556 206.00226,158.390712 205.757062,158.390712 C205.693785,158.390712 205.626554,158.379008 205.563277,158.359501 C205.254802,158.254162 205.088701,157.918638 205.19548,157.614326 L207.845198,150.084552 C207.916384,149.881677 208.098305,149.729521 208.315819,149.69831 C208.533333,149.667098 208.750847,149.75293 208.881356,149.924593 L210.807345,152.46833 L212.614689,150.712683 C212.733333,150.59564 212.899435,150.537119 213.069492,150.544922 C213.239548,150.556626 213.393785,150.634655 213.49661,150.767304 L215.466102,153.229111 L218.084181,145.441842 C218.163277,145.207755 218.380791,145.047796 218.629944,145.039994 Z',
            symbolSize: [21, 19],
            symbolOffset: [15, 0],

            edgeShape: 'polyline',
            edgeForkPosition: '0',

            lineStyle: {
              width: 2,
              color: '#0af0f3'
            },
            // itemStyle: {
            //   borderColor: '#0af0f3'
            // },

            label: {
              show: true,
              color: '#fff',
              backgroundColor: '#071223',
              position: 'inside',
              padding: 10
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
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
      this.$router.push({path: '/playback', query: {funcId: params.data.funcId}})
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
