<template>
  <div>
    <div><span class='back-icon' @click="back">返回</span></div>
    <div class='header-top'>
      <div>
        测量功能：
        <el-select v-model="funcId" @change="handleChange">
          <el-option v-for="item in funcData" :key="item.funcId" :label="item.observedName" :value="item.funcId"></el-option>
        </el-select>
      </div>
      <div>
        测量模式：
        <el-select v-model="mode" @change="modeChange">
          <el-option value="0" label="门限模式"></el-option>
          <el-option value="1" label="参考模式"></el-option>
        </el-select>
      </div>
      <div v-if="mode == 0">
        限值：
        <el-input class='input' placeholder='请输入' v-model="limitUp"></el-input>
        <span>~</span>
        <el-input class='input' placeholder='请输入' v-model="limitDown"></el-input>
      </div>
      <div v-if="mode == 1">
        参考值：
        <el-input class='input' placeholder='请输入' v-model="value"></el-input>
      </div>
      <div class='search'>
        <el-button type='primary' @click='search'>确定</el-button>
      </div>
    </div>
    <div class='spectrum-content'>
      <div class='spectrum-left'>
        <p class='left-title'><img src="../../assets/img/param-iocn.svg" alt="" class="icon">参数列表</p>
        <div class='left-params'>
          <p v-for="(item, index) in arr" :key="index">{{item.paramter}}：{{item.paramValue}}</p>
        </div>
      </div>
      <div class='spectrum-right'>
        <div v-if="isValue">
          <p class='left-title'><img src="../../assets/img/result-icon.svg" alt="" class="icon">结果值</p>
          <div class='left-params'>
            <span>{{valueData.observedName}}<span v-if="valueData.format">：</span>{{valueData.format}}</span>
          </div>
        </div>
        <chart id="chart" :options="myChart" class="chart" v-loading="loading"  element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="#071223"></chart>
        <div class="spectrum" v-if="keyId">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/line'
import mylib from '../../mylib'
export default {
  name: 'spectrum',
  // props: ['id'],
  data () {
    return {
      id: '',
      arr: [],
      isValue: false,
      funcData: [],
      funcId: '',
      loading: true,
      mode: '0',
      limitUp: null,
      limitDown: null,
      value: null,
      data: [],
      dateList: [],
      myChart: null,
      valueData: {
        observedName: '',
        format: ''
      },
      total: 4,
      pageSize: 1,
      currentPage: 1,
      keyId: ''
    }
  },
  methods: {
    handleCurrentChange () {},
    back () {
      this.$router.push('/operate')
    },
    handleChange () {
      this.loading = true
      this.data = []
      this.dateList = []
      this.handleFunc()
    },
    handleFunc () {
      var name = this.funcData[this.funcData.findIndex(i => i.funcId === this.funcId)].observedName
      mylib.axios({
        url: '/instrumentOrder/observedSend/' + this.id + '/' + this.funcId + '/' + name,
        done (res) {
          if (res.success) {
            this.loading = false
            if (res.data.format) {
              this.isValue = true
              this.valueData.observedName = res.data.observedName
              this.valueData.format = res.data.format
            }
            this.arr = res.data.parameterList
            res.data.dataSpectrum.forEach((el, index) => {
              var arr1 = []
              arr1.push(el.split(':')[0])
              arr1.push(el.split(':')[1])
              this.data.push(arr1)
            })
            this.dateList = this.data.map(function (item) {
              return item[1]
            })
            this.handlechart()
          } else {
            this.$message.error(res.code)
          }
        }
      }, this)
    },
    modeChange () {
      this.limitUp = null
      this.limitDown = null
      this.value = null
    },
    search () {
      if (this.limitUp || this.value) {
        this.myChart = null
        this.handlechart()
      }
    },
    handlechart () {
      this.myChart = {
        title: {
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.data.map(function (item) {
            return item[0]
          })
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.6)'
            }
          },
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          left: 'left',
          iconStyle: {
            borderColor: '#fff'
          }
        },
        dataZoom: [{
          startValue: '0'
        }, {
          type: 'inside'
        }, {
          textStyle: {
            color: '#fff'
          }
        }],
        visualMap: this.limitUp ? {
          top: 10,
          right: 10,
          pieces: [{
            gt: +this.limitUp,
            lte: +this.limitDown,
            color: '#096'
          }],
          outOfRange: {
            color: '#ffcb00'
          },
          textStyle: {
            color: '#fff'
          }
        } : {},
        textStyle: {
          color: '#fff'
        },
        series: {
          type: 'line',
          data: this.dateList,
          lineStyle: !this.limitUp ? {
            color: '#ffcb00'
          } : {},
          // markPoint: {
          //   label: {
          //     show: true
          //   },
          //   // symbol: 'triangle',
          //   symbolSize: 15,
          //   symbolRotate: 180,
          //   data: [{
          //     name: '某个坐标',
          //     coord: [100, -10]
          //   }]
          // },
          markLine: {
            silent: true,
            data: this.limitUp ? [{
              yAxis: +this.limitUp
            }, {
              yAxis: +this.limitDown
            }] : this.value ? [{
              yAxis: +this.value
            }] : []
          }
        }
      }
    },
    initChart () {
      mylib.axios({
        url: '/instrumentKey/getSpectralAnalysis',
        params: {
          instruId: this.id,
          num: this.currentPage
        },
        done (res) {
          if (res.success) {
            res.data.forEach((el, index) => {
              var arr1 = []
              arr1.push(el.split(':')[0])
              arr1.push(el.split(':')[1])
              this.data.push(arr1)
            })
            this.dateList = this.data.map(function (item) {
              return item[1]
            })
            this.handlechart()
            this.loading = false
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    initData () {
      mylib.axios({
        url: '/pool/findPoolObserved',
        params: {
          instruId: this.id
        },
        done (res) {
          if (res.success) {
            this.funcData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.arr = this.$route.params.arr
    this.keyId = this.$route.query.keyId
    this.initData()
    this.initChart()
  }
}
</script>

<style scoped>
  .spectrum-content {
    width: 83vw;
    height: 70vh;
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    display: flex;
  }
  .spectrum-left{
    width:150px;
    border-right:0.5px solid rgba(255, 255, 255, 0.6);
    padding:10px 10px;
  }
  .spectrum-right{
    width:100%;
    padding:10px 20px;
    box-sizing: border-box;
  }
  .left-title{
    font-size: 14px;
    font-weight: bold;
    color:#0AF0F3;
  }
  .left-params{
    margin-top:20px;
    color:#fff;
    font-size:12px;
  }
  .left-params>span{
    margin-right:40px;
  }
  .chart{
    width:100%;
    height:65%;
    margin-top:20px;
    min-width:500px;
    min-height:300px;
  }
  .icon{
    vertical-align: middle;
    margin-right:10px;
  }
</style>
