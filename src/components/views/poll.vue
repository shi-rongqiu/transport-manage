<template>
  <div>
    <div class="poll-content">
      <el-row>
        <el-col>
          <div class="list-item">
            <div>轮询机制:</div>
            <div>
              <el-select v-model="pollType" class="pollinput">
                <el-option label="单点轮询" value="1"></el-option>
                <el-option label="多点轮询" value="2"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col v-if="pollType == 1">
          <div class="list-item">
            <div>仪表名称:</div>
            <div>
              <el-select class="pollinput" v-model="deviceId" @change="getFunc">
                <el-option v-for="item in deviceData" :key="item.instruId" :label="item.instruName + '(' + item.instruId + ')'" :value="item.instruId"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col v-if="pollType == 1">
          <div class="list-item">
            <div>轮询功能:</div>
            <div>
              <el-select class="pollinput" v-model="funcId">
                <el-option v-for="item in funcData" :key="item.funcId" :label="item.observedName" :value="item.funcId"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="list-item">
            <div>轮询间隔时间:</div>
            <div>
              <el-input class="pollinput polltime" v-model="interTime">
                <span slot="suffix">S</span>
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col v-if="pollType == 2">
          <div class="list-item">
            <div>轮询次数:</div>
            <div>
              <el-input class="pollinput polltime" v-model="times">
                <span slot="suffix">次</span>
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col v-if="pollType == 2">
          <div class="list-item">
            <div>轮询顺序设置:</div>
            <div style="color:#fff;font-size:12px;cursor: pointer;" >
              <span @click="add"><span class="smart-add-icon">+</span>新增</span>
            </div>
          </div>
        </el-col>
        <el-col v-if="pollType == 2">
          <div class="list-item">
            <div></div>
            <div class="param-item threshold poll">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  label="仪表名称">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.instruId" @change="getTableFunc(scope.row.instruId)">
                      <el-option v-for="item in deviceData" :key="item.instruId" :label="item.instruName + '(' + item.instruId + ')'" :value="item.instruId"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="监测顺序">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.poll_order"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="轮询功能">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.funcId">
                      <el-option v-for="item in tablefuncData" :key="item.funcId" :label="item.observedName" :value="item.funcId"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  width="60"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="del(scope)">
                      <img src="../../assets/img/del-icon.svg" alt="">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="foot-btn" v-if="pollType == 1">
      <el-button type="primary" @click="start('start')">开始</el-button>
      <el-button type="primary" @click="start('stop')">结束</el-button>
    </div>
    <div class="foot-btn" v-if="pollType == 2">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib';
export default {
  name: 'poll',
  data () {
    return {
      pollType: '',
      deviceData: [],
      tableData: [],
      deviceId: '',
      funcData: '',
      funcId: '',
      interTime: '',
      times: '',
      tablefuncData: []
    }
  },
  methods: {
    start (value) {
      if (!this.deviceId) {
        return this.$message('请选择仪表')
      }
      if (!this.funcId) {
        return this.$message('请选择功能')
      }
      if (!this.interTime && value === 'start') {
        return this.$message('请输入间隔时间')
      }
      mylib.axios({
        url: '/pool/beginStopSinglePolling',
        type: 'post',
        params: {
          instruId: this.deviceId,
          funcId: this.funcId,
          interval: this.interTime,
          btn: value
        },
        done (res) {
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success',
              customClass: 'messageStyle'
            })
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    save () {
      if (!this.interTime) {
        return this.$message('请输入间隔时间')
      }
      if (!this.times) {
        return this.$message('请输入轮询周期')
      }
      mylib.axios({
        url: '/pool/manyPoolInterval',
        type: 'post',
        params: {
          cycle: this.times,
          interval: this.interTime,
          pollTList: this.tableData
        },
        done (res) {
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success',
              customClass: 'messageStyle'
            })
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    getTableFunc (id) {
      mylib.axios({
        url: '/pool/findPoolObserved',
        params: {
          instruId: id
        },
        done (res) {
          if (res.success) {
            this.tablefuncData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    add () {
      this.tableData.push({
        instruId: '',
        funcId: '',
        poll_order: ''
      })
    },
    del (scope) {
      this.tableData.splice(scope.$index, 1)
    },
    getFunc () {
      mylib.axios({
        url: '/pool/findPoolObserved',
        params: {
          instruId: this.deviceId
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
    initData () {
      mylib.axios({
        url: '/instrumentInfo/findDeviceInfoAll',
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
  .poll-content{
    width:40%;
    margin-left:35%;
    margin-top:50px;
  }
  .list-item{
    margin-top:30px;
  }
  .pollinput{
    width:330px;
  }
  .foot-btn{
    margin-top:50px;
    text-align:center;
  }
</style>
