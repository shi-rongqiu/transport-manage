<template>
  <div class="operate">
    <div class="header-top">
      <div>
        仪表名称：
        <el-select v-model="instruId" @change="handleSelect">
          <el-option v-for="item in deviceData" :key="item.instruId" :label="item.instruName + '(' + item.instruId + ')'" :value="item.instruId"></el-option>
        </el-select>
      </div>
      <div v-if="instruId">
        <el-button type="primary" @click="send_simple_command('清除仪器状态', 'CLS')">清除仪器状态</el-button>
        <el-button type="primary" @click="send_simple_command('查询仪器标识', 'IDN')">查询仪器标识</el-button>
        <el-button type="primary" @click="send_simple_command('等待', 'WAI')">等待</el-button>
        <el-button type="primary" @click="send_simple_command('复位', 'RST')">复位</el-button>
        <span class="jump-icon" @click="check">
          <span>
            <svg width="21px" class="icon" height="19px" viewBox="0 0 21 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>形状结合</title>
              <g id="正式稿" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="02参数配置" transform="translate(-337.000000, -277.000000)" fill="#02163c" fill-rule="nonzero">
                      <g id="编组-6" transform="translate(135.000000, 134.097994)">
                          <path d="M202.59322,142.902006 C202.921469,142.902006 203.186441,143.163402 203.186441,143.487221 L203.186441,143.487221 L203.186441,159.951287 C203.186441,160.380445 203.542373,160.731575 203.977401,160.731575 L203.977401,160.731575 L222.40678,160.731575 C222.735028,160.731575 223,160.992971 223,161.31679 C223,161.64061 222.735028,161.902006 222.40678,161.902006 L222.40678,161.902006 L203.581921,161.902006 C202.70791,161.902006 202,161.203649 202,160.341431 L202,160.341431 L202,143.487221 C202,143.163402 202.264972,142.902006 202.59322,142.902006 Z M218.629944,145.039994 C218.879096,145.032191 219.10452,145.180445 219.199435,145.406729 L221.651412,151.414942 C221.774011,151.715353 221.627684,152.054778 221.323164,152.175722 C221.018644,152.296667 220.674576,152.152314 220.551977,151.851903 L218.705085,147.330137 L216.249153,154.633628 C216.181921,154.836503 216.003955,154.988659 215.790395,155.023772 C215.576836,155.062786 215.355367,154.976955 215.220904,154.809193 L212.982486,152.004059 L211.155367,153.775312 C211.032768,153.892355 210.866667,153.954778 210.692655,153.943074 C210.522599,153.931369 210.364407,153.845538 210.261582,153.708987 L208.59661,151.512478 L206.314689,158.000568 C206.231638,158.238556 206.00226,158.390712 205.757062,158.390712 C205.693785,158.390712 205.626554,158.379008 205.563277,158.359501 C205.254802,158.254162 205.088701,157.918638 205.19548,157.614326 L207.845198,150.084552 C207.916384,149.881677 208.098305,149.729521 208.315819,149.69831 C208.533333,149.667098 208.750847,149.75293 208.881356,149.924593 L210.807345,152.46833 L212.614689,150.712683 C212.733333,150.59564 212.899435,150.537119 213.069492,150.544922 C213.239548,150.556626 213.393785,150.634655 213.49661,150.767304 L215.466102,153.229111 L218.084181,145.441842 C218.163277,145.207755 218.380791,145.047796 218.629944,145.039994 Z" id="形状结合"></path>
                      </g>
                  </g>
              </g>
            </svg>
          </span>
          查看图谱
        </span>
      </div>
    </div>
    <div v-if="instruId" class="param-content">
      <div class="param-item">
        <div class="btns-item">
          <div v-for="item in firstData" :key="item.keyId" @click="getSecond(item)" :class="{active: item.keyId == firstId}">{{item.keyName}}</div>
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
      <div class="param-item">
        <div style="color:#fff;font-size:12px;">在此输入数值<el-input class="input" v-model="value" style="margin-left:15px;"></el-input></div>
        <div style="text-align: center;margin-top:50px;"><el-button type="primary" @click="send">直接下发</el-button></div>
        <div class="infor-foot">
          <p v-for="(item, index) in inforArr" :key="index">{{index + 1}}、{{item.paramter}}{{item.paramValue}}，下发成功</p>
        </div>
        <div class='spectrum-right' v-if='isValue'>
          <p class='left-title'><img src="../../assets/img/result-icon.svg" alt="">结果值</p>
          <p class='left-params'>{{result}}</p>
        </div>
        <div class='spectrum-right' v-if="isMsg">
          <p class='left-params' v-for="(item, index) in message" :key="index">{{item}}</p>
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
  name: 'operatePanel',
  data () {
    return {
      name: '',
      deviceData: [],
      instruId: '',
      firstData: [],
      firstId: '',
      secondData: [],
      secondId: '',
      secondName: '',
      value: '',
      inforArr: [],
      command: '',
      isValue: false,
      result: '',
      message: [],
      isMsg: false,
      numberId: ''
    }
  },
  methods: {
    handleSelect () {
      this.value = ''
      this.isValue = false
      this.inforArr = []
      this.isMsg = false
      mylib.axios({
        url: '/instrumentKey/getInstrumentKey',
        params: {
          instruId: this.instruId
        },
        done (res) {
          if (res.success) {
            this.firstData = res.data
            this.secondData = []
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    getSecond (item) {
      this.firstId = item.keyId
      if (item.keyId === '363' || item.keyId === '339') {
        this.numberId = item.keyId
      } else {
        this.numberId = ''
      }
      mylib.axios({
        url: '/instrumentKey/getKeyByParentId',
        params: {
          parentId: item.keyId
        },
        done (res) {
          if (res.success) {
            this.secondId = ''
            this.command = item.command
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
      this.command = item.command
      this.secondName = item.keyName
    },
    send () {
      mylib.axios({
        url: '/instrumentOrder/directSend/' + this.instruId + '/' + this.secondName + '/' + this.command + '/' + this.value,
        done (res) {
          if (res.success) {
            this.inforArr.push({
              paramter: this.secondName,
              paramValue: this.value
            })
            if (res.data !== null && res.data !== '0') {
              this.result = res.data
              this.isValue = true
              this.isMsg = false
            }
            this.value = ''
          } else {
            this.value = ''
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    send_simple_command (name, command) {
      mylib.axios({
        url: '/instrumentOrder/directSend/' + this.instruId + '/' + name + '/' + command + '/',
        done (res) {
          if (res.success) {
            if (command === 'RST') {
              this.inforArr = []
              this.firstId = ''
              this.secondId = ''
              this.isValue = false
              this.isMsg = false
              this.value = ''
            }
            if (res.data !== null && res.data !== '0') {
              this.message = res.data.split(',')
              this.isMsg = true
              this.isValue = false
            }
            this.inforArr.push({
              paramter: name
            })
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    check () {
      this.$router.push({name: 'spectrum', path: '/spectrum', query: {id: this.instruId, keyId: this.numberId}, params: {arr: this.inforArr}})
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
  .header-top{
    display:flex;
    justify-content: space-between;
  }
  .input{width:160px;}
  .jump-icon{
    display:inline-block;
    cursor: pointer;
    width:95px;
    height:30px;
    line-height:30px;
    border:1px solid #0AF0F3;
    border-radius: 2px;
    color:#0AF0F3;
    margin-left:10px;
  }
  .jump-icon>span{
    display:inline-block;
    width:30px;
    height:30px;
    text-align:center;
    background:linear-gradient(to right, #089DDB, #0AF0F3);
    margin-right:5px;
  }
  .param-content{display:flex;}
  .param-content>div:nth-child(even){height:70vh;line-height:70vh;min-height:370px;margin:0 17px;}
  .param-item{width:25vw;height:70vh;min-width:200px;
    min-height:370px;border:0.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;padding:55px 33px 20px;box-sizing:border-box;position:relative;}
  .btns-item{display:flex;flex-wrap: wrap;justify-content: space-between;}
  .btns-item>div{padding:0 15px;height:32px;color:#fff;font-size:12px;
    text-align:center;line-height:32px;border:1px solid rgba(255, 255, 255, 0.2);border-radius: 2px;
    margin-bottom:25px;margin-right:30px;cursor: pointer;}
  /*.btns-item>div:not(:nth-child(3n)){margin-right:40px;}*/
  .active{color:#071223;background:linear-gradient(to right, #0AF0F3, #089DDB);border:0;}
  .infor-foot::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .infor-foot {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-y: auto;
    width:calc(60% - 30px);
    max-height:200px;
    position:absolute;left:33px;bottom:25px;font-size:12px;color:#ffcb00;
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
  .spectrum-right{
    width:calc(40% - 30px);
    box-sizing: border-box;
    position:absolute;right:33px;bottom:25px;
  }
  .left-title{
    font-size: 14px;
    font-weight: bold;
    color:#0AF0F3;
  }
  .left-params{
    margin-top:10px;
    color:#fff;
    font-size:12px;
  }
</style>
