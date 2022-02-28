<template>
  <div>
    <div class="header-top">
<!--      <div>-->
<!--        仪表名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>-->
<!--      </div>-->
<!--      <div class="search">-->
<!--        <el-button type="primary" @click="search">搜索</el-button>-->
<!--      </div>-->
      <div>
        <span class="add-icon" @click="add">+</span>
      </div>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        :max-height="height"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          :index="indexMethod"
          width="60">
        </el-table-column>
        <el-table-column
          prop="instruName"
          label="仪表名称">
        </el-table-column>
        <el-table-column
          prop="instruId"
          width="180"
          label="仪表编号">
        </el-table-column>
        <el-table-column
          prop="observedName"
          label="测量功能">
        </el-table-column>
        <el-table-column
          width="240"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="check(scope.row)">
              查看
            </el-button>
            <el-button type="primary" @click="change(scope.row)">
              修改
            </el-button>
            <el-button type="primary" @click="del(scope.row.funcId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      layout="sizes, total, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-dialog
      :visible.sync="addDialog"
      width="35%"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">{{title}}</div>
      </div>
      <el-row>
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>仪表名称：</div>
            <div>
              <el-select v-model="infor.instruId" @change="getFunc">
                <el-option v-for="item in deviceData" :key="item.instruId" :label="item.instruName + '(' + item.instruId + ')'" :value="item.instruId"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>测量功能：</div>
            <div>
              <el-select v-model="infor.funcId">
                <el-option v-for="item in funcData" :key="item.funcId" :label="item.observedName" :value="item.funcId"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
<!--        <el-col :span="16" :offset="3">-->
<!--          <div class="list-item">-->
<!--            <div>测量参数：</div>-->
<!--            <div>-->
<!--              <el-select v-model="infor.params">-->
<!--                <el-option v-for="item in paramsData" :key="item.id" :label="item.paramter" :value="item.id"></el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>阈值设置：</div>
            <div style="color:#fff;font-size:12px;cursor:pointer;">
              <span @click="addValue"><span class="smart-add-icon">+</span>新增</span>
            </div>
          </div>
        </el-col>
        <el-col :span="20" :offset="3">
          <div class="list-item">
            <div></div>
            <div class="param-item threshold">
              <el-table
                :data="infor.threData"
                border
                :max-height="height"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="告警级别">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.alarmType">
                      <el-option value="0" label="一般告警"></el-option>
                      <el-option value="1" label="紧急告警"></el-option>
                      <el-option value="2" label="严重告警"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="告警区间">
                  <template slot-scope="scope">
                    <el-select v-model="alarmSection">
                      <el-option label="大于" value="大于"></el-option>
                      <el-option label="小于" value="小于"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="告警值">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  width="60"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="delValue(scope.row, scope.$index)">
                      <img src="../../assets/img/del-icon.svg" alt="">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="checkDialog"
      width="35%"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">查看阈值</div>
      </div>
      <el-row>
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>仪表名称：</div>
            <div class="text-style">{{infor.instruName}}</div>
          </div>
        </el-col>
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>测量功能：</div>
            <div class="text-style">{{infor.funcName}}</div>
          </div>
        </el-col>
        <el-col :span="16" :offset="3">
          <div class="list-item">
            <div>阈值设置：</div>
            <div class="param-item threshold">
              <el-table
                :data="infor.threData"
                border
                :max-height="height"
                style="width: 100%">
                <el-table-column
                  prop="alarmType"
                  label="告警级别">
                  <template slot-scope="scope">
                    <span style="color:#ffcb00;" v-if="scope.row.alarmType == '0'">一般告警</span>
                    <span style="color:#ff8512;" v-if="scope.row.alarmType == '1'">紧急告警</span>
                    <span style="color:#ff3f00;" v-if="scope.row.alarmType == '2'">严重告警</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="alarmSection"
                  label="告警区间">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="告警值">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="checkDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="delDialog"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">操作提示</div>
      </div>
      <div class="del-tip">
        <span class="del-icon">!</span>确认要删除这条信息吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../mylib.js'
export default {
  name: 'threshold-manage',
  data () {
    return {
      height: mylib.height,
      addDialog: false,
      checkDialog: false,
      delDialog: false,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      deviceData: '',
      infor: {
        instruId: '',
        funcId: '',
        // params: '',
        threData: [],
        instruName: '',
        // paramsName: '',
        funcName: ''
      },
      id: null,
      funcData: [],
      paramsData: [],
      alarmSection: '',
      edit: false,
      isSave: true,
      title: '新增阈值'
    }
  },
  methods: {
    add () {
      this.title = '新增阈值'
      this.addDialog = true
      this.infor.threData = []
      this.infor.instruId = ''
      this.infor.funcId = ''
      this.edit = false
      this.isSave = true
    },
    check (item) {
      this.checkDialog = true
      mylib.axios({
        url: '/thresholdValue/getThreshold',
        params: {
          funcId: item.funcId
        },
        done (res) {
          if (res.success) {
            this.infor.threData = res.data
            this.infor.instruName = item.instruName
            this.infor.funcName = item.observedName
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    change (item) {
      this.title = '修改阈值'
      this.addDialog = true
      this.edit = true
      this.isSave = true
      mylib.axios({
        url: '/thresholdValue/getThreshold',
        params: {
          funcId: item.funcId
        },
        done (res) {
          if (res.success) {
            this.infor.threData = res.data
            this.infor.instruId = item.instruId
            this.infor.funcId = item.funcId
            this.alarmSection = res.data[0].alarmSection
            this.getFunc()
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentChange () {
      this.initData()
    },
    handleSizeChange () {
      this.initData()
    },
    del (id) {
      this.delDialog = true
      this.id = id
    },
    handleDel () {
      mylib.axios({
        url: '/thresholdValue/delThresholdById',
        params: {
          funcId: this.id
        },
        done (res) {
          if (res.success) {
            this.$message.success('删除成功！')
            this.initData()
            this.delDialog = false
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    save () {
      if (!this.infor.instruId) {
        return this.$message('请选择仪表')
      }
      if (!this.infor.funcId) {
        return this.$message('请选择功能')
      }
      if (this.infor.threData.length === 0) {
        return this.$message('请设置阈值')
      }
      var str1 = ''
      var str2 = ''
      var str3 = ''
      if (this.infor.threData.findIndex(i => i.alarmType === '0') > 0) {
        str1 = +this.infor.threData[this.infor.threData.findIndex(i => i.alarmType === '0')].value
      }
      if (this.infor.threData.findIndex(i => i.alarmType === '1') > 0) {
        str2 = +this.infor.threData[this.infor.threData.findIndex(i => i.alarmType === '1')].value
      }
      if (this.infor.threData.findIndex(i => i.alarmType === '2') > 0) {
        str3 = +this.infor.threData[this.infor.threData.findIndex(i => i.alarmType === '2')].value
      }
      if (this.alarmSection === '大于') {
        if (str1 && str2 && str1 > str2) {
          return this.$message('告警逻辑错误')
        }
        if (str1 && str3 && str1 > str3) {
          return this.$message('告警逻辑错误')
        }
        if (str2 && str3 && str2 > str3) {
          return this.$message('告警逻辑错误')
        }
      }
      if (this.alarmSection === '小于') {
        if (str1 && str2 && str1 < str2) {
          return this.$message('告警逻辑错误')
        }
        if (str1 && str3 && str1 < str3) {
          return this.$message('告警逻辑错误')
        }
        if (str2 && str3 && str2 < str3) {
          return this.$message('告警逻辑错误')
        }
      }
      if (this.isSave) {
        this.isSave = false
        this.infor.threData.forEach((el) => {
          el.alarmSection = this.alarmSection
          el.instruId = this.infor.instruId
          el.funcId = this.infor.funcId
        })
        var name = this.funcData[this.funcData.findIndex(i => i.funcId === this.infor.funcId)].observedName
        if (this.edit) {
          mylib.axios({
            url: '/thresholdValue/updateThresholdById',
            type: 'post',
            params: {
              instruId: this.infor.instruId,
              funcId: this.infor.funcId,
              observedName: name,
              thresholdList: this.infor.threData
            },
            done (res) {
              if (res.success) {
                this.addDialog = false
                this.$message.success('修改成功！')
                this.initData()
              } else {
                this.isSave = true
                this.$message.error(res.message)
              }
            }
          }, this)
        } else {
          mylib.axios({
            url: '/thresholdValue/insertThreshold',
            type: 'post',
            params: {
              instruId: this.infor.instruId,
              funcId: this.infor.funcId,
              observedName: name,
              thresholdList: this.infor.threData
            },
            done (res) {
              if (res.success) {
                this.addDialog = false
                this.$message.success('添加成功！')
                this.initData()
              } else {
                this.isSave = true
                this.$message.error(res.message)
              }
            }
          }, this)
        }
      }
    },
    addValue () {
      this.infor.threData.push({
        alarmType: '',
        value: ''
      })
    },
    delValue (row, index) {
      if (row.thresholdId) {
        mylib.axios({
          url: '/thresholdValue/delByThresholdId',
          params: {
            thresholdId: row.thresholdId
          },
          done (res) {
            if (res.success) {
              this.infor.threData.splice(index, 1)
            } else {
              this.$message.error(res.message)
            }
          }
        }, this)
      } else {
        this.infor.threData.splice(index, 1)
      }
    },
    getFunc () {
      mylib.axios({
        url: '/pool/findPoolObserved',
        params: {
          instruId: this.infor.instruId
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
        url: '/thresholdValue/thresholdManagement',
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        },
        done (res) {
          if (res.success) {
            this.tableData = res.data.thresholdManagement
            this.total = res.data.count
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    }
  },
  created () {
    this.initData()
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
}
</script>

<style scoped>
  .del-icon{
    display:inline-block;
    width:21px;
    height:21px;
    text-align: center;
    line-height:21px;
    background: #d89614;
    color:#0a1423;
    border-radius: 50%;
    margin-right:10px;
  }
  .text-style{
    color:#fff;
    font-size:12px;
    height:30px;
    line-height:30px;
  }
</style>
