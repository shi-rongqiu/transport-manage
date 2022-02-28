<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <div class="btn-li" @click="showList(item)" v-if="listId !== item.id">
          <span class="number">{{index + 1}}</span>
        </div>
        <div v-if="listId == item.id">
          <div class="list-li" v-if="!set">
            <span class="number">{{index + 1}}</span>{{item.instruName}} <el-button type="primary" @click="setting">配置</el-button>
          </div>
          <div class="detail-li" v-if="set">
            <div><span class="number">{{index + 1}}</span>{{item.instruName}}
              <el-button type="text" v-if="edit" @click="edit = false">取消</el-button>
              <el-button type="primary" @click="edit = true" v-if="!edit">修改</el-button>
            </div>
            <div>
              测量功能：<span v-if="!edit">{{item.observedName}}</span>
              <el-select class="input" v-else v-model="funcId">
                <el-option v-for="item in funcData" :key="item.funcId" :label="item.observedName" :value="item.funcId"></el-option>
              </el-select>
            </div>
<!--            <div>-->
<!--              测量参数：<span v-if="!edit">{{paramName}}</span>-->
<!--              <el-select class="input" v-else v-model="params">-->
<!--                <el-option v-for="item in paramData" :key="item.id" :label="item.paramter" :value="item.id"></el-option>-->
<!--              </el-select>-->
<!--            </div>-->
            <div class="li-confirm"><el-button type="primary" v-if="edit" @click="save">确定</el-button></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mylib from '../../mylib'

export default {
  name: 'home-aside',
  props: {
    data: Array
  },
  data () {
    return {
      edit: false,
      listId: '',
      funcData: [],
      funcId: '',
      funcName: '',
      set: false,
      paramData: [],
      params: '',
      paramName: ''
    }
  },
  methods: {
    showList (item) {
      this.listId = item.id
      this.funcId = item.funcId
      this.set = false
      this.edit = false
    },
    setting () {
      this.set = true
      mylib.axios({
        url: '/pool/findPoolObserved',
        params: {
          instruId: this.listId
        },
        done (res) {
          if (res.success) {
            this.funcData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    save () {
      var name = this.funcData[this.funcData.findIndex(i => i.funcId === this.funcId)].observedName
      mylib.axios({
        url: '/instrumentOrder/observedSend/' + this.listId + '/' + this.funcId + '/' + name,
        done (res) {
          if (res.success) {
            this.edit = false
            this.$emit('update')
          } else {
            this.$message.error(res.code)
          }
        }
      }, this)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  ul{
    list-style: none;
    color: #fff;
  }
  li{
    clear: both;
  }
  .btn-li,.list-li,.detail-li{
    clear: both;
    height:30px;
    border:1px solid #0AF0F3;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right:0;
    float:right;
    margin-bottom:10px;
    cursor: pointer;
  }
  .btn-li{
    width:44px;
    text-align:center;
  }
  li>div .number{
    display:inline-block;
    width:15px;
    height:15px;
    text-align:center;
    color:#031846;
    background:#ffff00;
    font-size:12px;
    border-radius: 50%;
    margin-top:7px;
  }
  .list-li{
    width:274px;
    padding:0 15px;
    font-size:12px;
  }
  .list-li span, .detail-li span{
    margin-right:5px;
  }
  .detail-li{
    width:274px;
    height:134px;
    padding:0 15px;
    font-size:12px;
  }
  .detail-li>div{
    margin-bottom:12px;
  }
  .detail-li>div:last-child{
    text-align:center;
  }
</style>
