<template>
  <div class="home-content">
    <div class="chart-content">
      <chart id="chart" :options="myChart" @click="clickFun" class="chart"></chart>
      <div v-if="top" class="tip-content" :style="{'top': top + 'px', 'left': left + 'px'}">
        <div class="box">
          <div class="con"></div>
        </div>
        <div class="tip">
          <span v-if="funcName">{{funcName}}:{{value}}</span>
          <img src="../../assets/img/spec-icon.svg" alt="" class="icon" @click="jump">
        </div>
      </div>
    </div>
    <div class="right-device">
      <home-aside :data="tableData" @update="getSet"></home-aside>
    </div>
  </div>
</template>

<script>
import HomeAside from '../children/homeAside'
import mylib from "../../mylib";
export default {
  name: 'home',
  components: {HomeAside},
  data () {
    return {
      myChart: null, // 树图
      star: require('../../assets/img/star-one.png'),
      star2: require('../../assets/img/star-two.png'),
      ship: require('../../assets/img/ship.png'),
      car: require('../../assets/img/car.png'),
      star3: require('../../assets/img/star-three.png'),
      RF: require('../../assets/img/RF.png'),
      top: null,
      left: null,
      tableData: [],
      funcName: '',
      value: '',
      id: ''
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
      this.myChart = {
        title: {
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (params) {
            var res = `${params.data.observedName}：${params.data.value}`
            return res
          },
          borderColor: '#0af0f3',
          backgroundColor: '#071223',
          borderWidth: 1
        },
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbol: 'rect',
            symbolSize: [70, 100],
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            // symbolOffset: [-30, 0],
            itemStyle: {
              borderColor: '#071223',
              color: '#071223'
            },
            data: [{
              name: '1',
              x: 300,
              y: 50,
              label: {
                formatter: [
                  '{a|}',
                  '{b|第三代海事卫星}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 100,
                    height: 100,
                    backgroundColor: {
                      image: this.star
                    }
                  },
                  b: {
                    width: 100,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '2',
              x: 150,
              y: 150,
              deviceId: 1,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].status,
              label: {
                formatter: [
                  '{a|}',
                  '海事、救捞船舶{b|1}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 85,
                    height: 52,
                    backgroundColor: {
                      image: this.ship
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 1)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  }
                }
              }
            }, {
              name: '3',
              x: 450,
              y: 150,
              deviceId: 2,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].status,
              label: {
                formatter: [
                  '{a|}{b|2}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 75,
                    height: 84,
                    backgroundColor: {
                      image: this.star3
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 2)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  }
                }
              }
            }, {
              name: '4',
              x: 650,
              y: 150,
              deviceId: 3,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].status,
              label: {
                formatter: [
                  '{b|3}{a|}',
                  '{c|RF}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 3)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '5',
              x: 850,
              y: 150,
              deviceId: 4,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].status,
              label: {
                formatter: [
                  '{b|4}{a|}',
                  '{c|MODEM}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 4)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '6',
              x: 1050,
              y: 150,
              deviceId: 5,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].status,
              label: {
                formatter: [
                  '{b|5}{a|}',
                  '{c|VIPERSAT}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 5)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '7',
              x: 300,
              y: 350,
              label: {
                formatter: [
                  '{a|}',
                  '{b|VSAT卫星}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 100,
                    height: 100,
                    backgroundColor: {
                      image: this.star2
                    }
                  },
                  b: {
                    width: 100,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '8',
              x: 150,
              y: 450,
              deviceId: 6,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].status,
              label: {
                formatter: [
                  '{a|}',
                  '应急通信指挥车{b|6}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 72,
                    height: 61,
                    backgroundColor: {
                      image: this.car
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 6)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  }
                }
              }
            }, {
              name: '9',
              x: 450,
              y: 450,
              deviceId: 7,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].status,
              label: {
                formatter: [
                  '{a|}{b|7}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 75,
                    height: 84,
                    backgroundColor: {
                      image: this.star3
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 7)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  }
                }
              }
            }, {
              name: '10',
              x: 650,
              y: 450,
              deviceId: 8,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].status,
              label: {
                formatter: [
                  '{b|8}{a|}',
                  '{c|RF}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 8)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '11',
              x: 850,
              y: 450,
              deviceId: 9,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].status,
              label: {
                formatter: [
                  '{b|9}{a|}',
                  '{c|MODEM}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 9)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '12',
              x: 1050,
              y: 350,
              deviceId: 10,
              observedName: this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].observedName,
              value: this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].data,
              status: this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].status,
              label: {
                formatter: [
                  '{b|10}{a|}',
                  '{c|VIPERSAT}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    color: '#031846',
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    align: 'center',
                    backgroundColor: this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].status === null ? '#ffff00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].status === '0' ? '#ffcb00' : this.tableData[this.tableData.findIndex(i => i.deviceId === 10)].status === '1' ? '#ff8512' : '#ff0000',
                    textBorderWidth: 1
                  },
                  c: {
                    width: 60,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }, {
              name: '13',
              x: 1050,
              y: 550,
              label: {
                formatter: [
                  '{a|}',
                  '{b|51F}'
                ].join('\n'),
                rich: {
                  a: {
                    width: 45,
                    height: 42,
                    backgroundColor: {
                      image: this.RF
                    }
                  },
                  b: {
                    width: 45,
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            }],
            links: [{
              source: '1',
              target: '2',
              lineStyle: {
                type: 'dashed'
              }
            }, {
              source: '1',
              target: '3',
              lineStyle: {
                type: 'dashed'
              }
            }, {
              source: '3',
              target: '4'
            }, {
              source: '4',
              target: '5'
            }, {
              source: '5',
              target: '6'
            }, {
              source: '7',
              target: '8',
              lineStyle: {
                type: 'dashed'
              }
            }, {
              source: '7',
              target: '9',
              lineStyle: {
                type: 'dashed'
              }
            }, {
              source: '9',
              target: '10'
            }, {
              source: '10',
              target: '11'
            }, {
              source: '11',
              target: '12'
            }, {
              source: '11',
              target: '13'
            }],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
              color: '#0af0f3'
            }
          }
        ]
      }
    },
    clickFun (params) {
      // if (params.data.name > 1 && params.data.name < 7) {
      //   this.left = params.data.x + 100
      //   this.top = params.data.y + 150
      // }
      // if (params.data.name > 7 && params.data.name < 13) {
      //   this.left = params.data.x + 100
      //   this.top = params.data.y + 150
      // }
      var index = this.tableData.findIndex(i => i.deviceId === params.data.deviceId)
      this.funcId = this.tableData[index].dataId
      // this.value = this.tableData[index].data
      this.id = this.tableData[index].id
      this.$router.push({path: '/playback', query: {funcId: this.funcId}})
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
  }
  .chart-content{
    width:calc(100% - 350px);
    padding-left:5%;
    padding-top:50px;
    position:relative;
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
  .icon{
    margin-left: 10px;
    cursor: pointer;
    vertical-align: middle;
    margin-right:10px;
  }
  .tip-content{
    position:absolute;
  }
  .tip{height:40px;line-height:40px;box-sizing: border-box;
    font-size:12px;border-radius: 4px;padding-left:10px;
    border:1px solid #ffcb00;color:#fff;position:relative;}
  .box{width: 0;height: 0;
    border-style: solid;
    border-width: 10px;
    border-color: transparent transparent #ffcb00 transparent;
    position: relative;
    margin-left: 10px;z-index: 10;}
  .box .con{ width: 0;height: 0;border-style: solid;
    border-width: 9px;border-color: transparent transparent #071223 transparent;
    position: absolute;
    left: -9px;top:-7px;
  }
</style>
