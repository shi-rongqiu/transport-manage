<template>
  <div>
    <div><span class='back-icon' @click="back">返回</span></div>
    <div class='header-top'>
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
        <el-input class='input' placeholder='请输入' v-model="convalue"></el-input>
      </div>
      <div class='search'>
        <el-button type='primary' @click='search'>确定</el-button>
      </div>
    </div>
    <div class='spectrum-content'>
      <div class='spectrum-left'>
        <p class='left-title'><img src="../../assets/img/param-iocn.svg" alt="" class="icon">参数列表</p>
        <div class='left-params' v-if="list.length > 0">
          <p v-for="(item, index) in list" :key="index">{{item.paramter}}：{{item.paramValue}}</p>
        </div>
      </div>
      <div class='spectrum-right'>
        <div v-if="isValue">
          <p class='left-title'><img src="../../assets/img/result-icon.svg" alt="" class="icon">结果值</p>
          <div class='left-params'>
            <span>{{value}}</span>
          </div>
        </div>
        <chart id="chart" :options="myChart" class="chart" v-loading="loading"  element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="#071223"></chart>
<!--        <div class="spectrum">-->
<!--          <el-pagination-->
<!--            background-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page.sync="currentPage"-->
<!--            :page-size="pageSize"-->
<!--            layout="prev, pager, next"-->
<!--            :total="total">-->
<!--          </el-pagination>-->
<!--        </div>-->
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
  data () {
    return {
      time: '',
      currentPage: 1,
      total: 20,
      pageSize: 10,
      myChart: null,
      loading: false,
      observedName: '',
      id: '',
      data: [],
      dateList: [],
      isValue: false,
      value: null,
      list: [],
      mode: '0',
      limitUp: null,
      limitDown: null,
      convalue: null,
      funcId: ''
    }
  },
  methods: {
    back () {
      history.back()
    },
    modeChange () {
      this.limitUp = null
      this.limitDown = null
      this.convalue = null
    },
    search () {
      if (this.limitUp || this.value) {
        this.myChart = null
        this.handleChart()
      }
    },
    handleChart () {
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
          // }
          markLine: {
            silent: true,
            data: this.limitUp ? [{
              yAxis: +this.limitUp
            }, {
              yAxis: +this.limitDown
            }] : this.convalue ? [{
              yAxis: +this.convalue
            }] : []
          }
        }
      }
    },
    initChart () {
      if (!this.funcId) {
        mylib.axios({
          url: '/log/playbackSpectrum',
          params: {
            id: this.id
          },
          done (res) {
            if (res.success) {
              if (res.data.data) {
                this.value = res.data.data
                this.isValue = true
              }
              this.list = res.data.list
              res.data.arrayList.forEach((el, index) => {
                var arr1 = []
                arr1.push(el.split(':')[0])
                arr1.push(el.split(':')[1])
                this.data.push(arr1)
              })
              this.dateList = this.data.map(function (item) {
                return item[1]
              })
              this.handleChart()
              this.loading = false
            } else {
              this.$message.error(res.message)
            }
          }
        }, this)
      } else {
        mylib.axios({
          url: '/parameterList/atlas',
          params: {
            dataId: this.funcId
          },
          done (res) {
            if (res.success) {
              if (res.data.data) {
                this.value = res.data.data
                this.isValue = true
              }
              this.list = res.data.parameterList
              res.data.dataSpectrum.forEach((el, index) => {
                var arr1 = []
                arr1.push(el.split(':')[0])
                arr1.push(el.split(':')[1])
                this.data.push(arr1)
              })
              this.dateList = this.data.map(function (item) {
                return item[1]
              })
              this.handleChart()
              this.loading = false
            } else {
              this.$message.error(res.message)
            }
          }
        }, this)
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.funcId = this.$route.query.funcId
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
    margin-top:20px;
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
    margin-top:30px;
    color:#fff;
    font-size:12px;
  }
  .left-params>span{
    margin-right:40px;
  }
  .chart{
    width:100%;
    height:80%;
    margin-top:20px;
    min-width:500px;
    min-height:300px;
  }
  .icon{
    vertical-align: middle;
    margin-right:10px;
  }
</style>
