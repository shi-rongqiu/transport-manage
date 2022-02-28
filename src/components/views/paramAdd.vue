<template>
  <div>
    <div><span class="back-icon" @click="back">返回</span></div>
    <div class="header-top">
      <div>
        仪表名称：
        <el-select v-model="instruId" @change="handleSelect">
          <el-option v-for="item in deviceData" :key="item.instruId" :label="item.instruName + '(' + item.instruId + ')'" :value="item.instruId"></el-option>
        </el-select>
      </div>
      <div>
        功能名称：<el-input class="input" placeholder="请输入" v-model="funcName"></el-input>
      </div>
    </div>
    <div v-if="instruId" class="param-content">
      <div class="param-item">
        <div class="btns-item">
          <div v-for="item in firstData" :key="item.keyId" :class="{active: item.keyId == firstId}" @click="getSecond(item)">{{item.keyName}}</div>
        </div>
      </div>
      <div>
        <svg width="18px" height="20px" viewBox="0 0 18 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>形状结合</title>
          <g id="正式稿" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">
            <g id="08远程控制-已选仪表1" transform="translate(-919.000000, -397.000000)" fill="#0AF0F3" fill-rule="nonzero">
              <g id="编组-6" transform="translate(120.000000, 213.000000)">
                <path d="M806.725762,184.222018 C807.018496,183.929037 807.493405,183.929037 807.786386,184.222018 L807.786386,184.222018 L816.646951,193.082724 C816.959335,193.395108 816.959335,193.901802 816.646951,194.214151 C813.6935,197.16792 810.739837,200.121371 807.786386,203.074857 C807.493405,203.367838 807.018496,203.367838 806.725762,203.074857 C806.432745,202.782122 806.432745,202.307249 806.725762,202.014232 C809.514113,199.225599 812.302746,196.436965 815.091309,193.648296 C812.302711,190.85991 809.514113,188.071276 806.725762,185.282643 C806.432745,184.989661 806.432745,184.515035 806.725762,184.222018 Z M799.229139,184.222018 C799.522156,183.929037 799.99703,183.929037 800.290046,184.222018 L800.290046,184.222018 L809.150611,193.082724 C809.462995,193.395108 809.462995,193.90152 809.150611,194.214151 L809.150611,194.214151 L800.290046,203.074857 C799.99703,203.367838 799.522156,203.367838 799.229139,203.074857 C798.936405,202.78184 798.936405,202.306967 799.229139,202.014232 C802.017738,199.225599 804.806371,196.436965 807.594934,193.648296 L807.594934,193.648296 L799.229139,185.282643 C798.936405,184.989661 798.936405,184.514753 799.229139,184.222018 Z" id="形状结合"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="param-item">
        <div class="btns-item">
          <div v-for="item in secondData" :key="item.keyId" :class="{active: item.keyId == secondId}" @click="handleClick(item)">{{item.keyName}}</div>
        </div>
      </div>
      <div>
        <svg width="18px" height="20px" viewBox="0 0 18 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>形状结合</title>
          <g id="正式稿" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">
            <g id="08远程控制-已选仪表1" transform="translate(-919.000000, -397.000000)" fill="#0AF0F3" fill-rule="nonzero">
              <g id="编组-6" transform="translate(120.000000, 213.000000)">
                <path d="M806.725762,184.222018 C807.018496,183.929037 807.493405,183.929037 807.786386,184.222018 L807.786386,184.222018 L816.646951,193.082724 C816.959335,193.395108 816.959335,193.901802 816.646951,194.214151 C813.6935,197.16792 810.739837,200.121371 807.786386,203.074857 C807.493405,203.367838 807.018496,203.367838 806.725762,203.074857 C806.432745,202.782122 806.432745,202.307249 806.725762,202.014232 C809.514113,199.225599 812.302746,196.436965 815.091309,193.648296 C812.302711,190.85991 809.514113,188.071276 806.725762,185.282643 C806.432745,184.989661 806.432745,184.515035 806.725762,184.222018 Z M799.229139,184.222018 C799.522156,183.929037 799.99703,183.929037 800.290046,184.222018 L800.290046,184.222018 L809.150611,193.082724 C809.462995,193.395108 809.462995,193.90152 809.150611,194.214151 L809.150611,194.214151 L800.290046,203.074857 C799.99703,203.367838 799.522156,203.367838 799.229139,203.074857 C798.936405,202.78184 798.936405,202.306967 799.229139,202.014232 C802.017738,199.225599 804.806371,196.436965 807.594934,193.648296 L807.594934,193.648296 L799.229139,185.282643 C798.936405,184.989661 798.936405,184.514753 799.229139,184.222018 Z" id="形状结合"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div>
        <div class="param-item param-item-top">
          <div style="color:#fff;font-size:12px;">在此输入数值<el-input class="input" v-model="value" style="margin-left:15px;"></el-input></div>
          <div style="text-align: center;margin-top:20px;"><el-button type="primary" @click="addTable">添加</el-button></div>
        </div>
        <div class="item-center">
          <svg width="18px" height="20px" class="center-icon" viewBox="0 0 18 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>形状结合</title>
            <g id="正式稿" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">
              <g id="08远程控制-已选仪表1" transform="translate(-919.000000, -397.000000)" fill="#0AF0F3" fill-rule="nonzero">
                <g id="编组-6" transform="translate(120.000000, 213.000000)">
                  <path d="M806.725762,184.222018 C807.018496,183.929037 807.493405,183.929037 807.786386,184.222018 L807.786386,184.222018 L816.646951,193.082724 C816.959335,193.395108 816.959335,193.901802 816.646951,194.214151 C813.6935,197.16792 810.739837,200.121371 807.786386,203.074857 C807.493405,203.367838 807.018496,203.367838 806.725762,203.074857 C806.432745,202.782122 806.432745,202.307249 806.725762,202.014232 C809.514113,199.225599 812.302746,196.436965 815.091309,193.648296 C812.302711,190.85991 809.514113,188.071276 806.725762,185.282643 C806.432745,184.989661 806.432745,184.515035 806.725762,184.222018 Z M799.229139,184.222018 C799.522156,183.929037 799.99703,183.929037 800.290046,184.222018 L800.290046,184.222018 L809.150611,193.082724 C809.462995,193.395108 809.462995,193.90152 809.150611,194.214151 L809.150611,194.214151 L800.290046,203.074857 C799.99703,203.367838 799.522156,203.367838 799.229139,203.074857 C798.936405,202.78184 798.936405,202.306967 799.229139,202.014232 C802.017738,199.225599 804.806371,196.436965 807.594934,193.648296 L807.594934,193.648296 L799.229139,185.282643 C798.936405,184.989661 798.936405,184.514753 799.229139,184.222018 Z" id="形状结合"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="param-item param-item-bottom">
          <el-table
            :data="thirdData"
            border
            max-height="185px"
            style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              prop="paramter"
              label="参数">
            </el-table-column>
            <el-table-column
              prop="paramValue"
              width="75"
              label="值">
            </el-table-column>
            <el-table-column
              width="75"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delParam(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="foot-save" v-if="thirdData.length > 0">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="../../assets/img/wait-icon.svg" alt="">
      <div>请选择仪表</div>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'paramAdd',
  data () {
    return {
      deviceData: [],
      instruId: '',
      funcName: '',
      firstData: [],
      firstId: '',
      secondData: [],
      secondId: '',
      secondName: '',
      thirdData: [],
      third: false,
      value: '',
      isSave: true
    }
  },
  methods: {
    back () {
      history.back()
    },
    handleSelect () {
      mylib.axios({
        url: '/instrumentKey/getInstrumentKey',
        params: {
          instruId: this.instruId
        },
        done (res) {
          if (res.success) {
            this.firstData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    getSecond (item) {
      this.firstId = item.keyId
      mylib.axios({
        url: '/instrumentKey/getKeyByParentId',
        params: {
          parentId: item.keyId
        },
        done (res) {
          if (res.success) {
            this.secondData = res.data
            this.secondName = item.keyName
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    handleClick (item) {
      this.secondId = item.keyId
      this.secondName = item.keyName
    },
    addTable () {
      this.third = true
      this.thirdData.push({
        paramter: this.secondName,
        paramValue: this.value,
        instruId: this.instruId,
        keyId: this.secondId || this.firstId
      })
      this.value = ''
    },
    delParam (index) {
      this.thirdData.splice(index, 1)
    },
    save () {
      if (!this.funcName) {
        return this.$message('请输入功能名称')
      }
      if (this.isSave) {
        this.isSave = false
        mylib.axios({
          url: '/parameterList/saveObserved',
          type: 'post',
          params: {
            observedName: this.funcName,
            instruId: this.instruId,
            paramterList: this.thirdData
          },
          done (res) {
            if (res.success) {
              this.isSave = false
              this.$message.success('保存成功！')
              this.$router.push('/parameter')
            } else {
              this.isSave = true
              this.$message.error(res.message)
            }
          }
        }, this)
      }
    },
    initData () {
      mylib.axios({
        url: '/instrumentKey/findInstrumentName',
        done (res) {
          if (res.success) {
            this.deviceData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped>
  .input{width:200px;}
  .param-content{display:flex;padding-bottom:50px;}
  .param-content>div:nth-child(even){height:480px;line-height:480px;margin:0 17px;}
  .param-item{width:385px;height:480px;border:0.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;padding:55px 33px 20px;box-sizing:border-box;}
  .btns-item{display:flex;flex-wrap: wrap;justify-content: space-between;}
  .btns-item>div{padding: 0 15px;height:32px;color:#fff;font-size:12px;
    text-align:center;line-height:32px;border:1px solid rgba(255, 255, 255, 0.2);border-radius: 2px;
    margin-bottom:25px;cursor: pointer;margin-right:30px;}
  /*.btns-item>div:not(:nth-child(3n)){margin-right:40px;}*/
  .active{color:#071223;background:linear-gradient(to right, #0AF0F3, #089DDB);border:0;}
  .param-item-top{height:145px;padding-top:40px;box-sizing:border-box;text-align:center;}
  .param-item-bottom{height:283px;padding:30px 25px;}
  .item-center{margin-top:15px;margin-bottom:15px;color:#fff;text-align:center;}
  .foot-save{text-align:center;margin-top:26px;}
  .center-icon{
    transform: rotate(90deg);
  }
  .empty{
    color:#0AF0F3;
    font-size:24px;
    text-align:center;
    margin-top:18%;
  }
  .icon{
    width:11px;
    height:10px;
    vertical-align: middle;
  }
</style>
