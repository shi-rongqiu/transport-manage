<template>
  <div>
    <div class="header-top">
      <div>
        仪表名称：<el-input class="input" placeholder="请输入" v-model="name"></el-input>
      </div>
      <div>
        仪表编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
      </div>
      <div>
        所属系统：
        <el-select class="input" v-model="system" clearable>
          <el-option label="海事卫星系统" value="海事卫星系统"></el-option>
          <el-option label="VSAT卫星系统" value="VSAT卫星系统"></el-option>
        </el-select>
      </div>
      <div>
        监测设备状态：
        <el-select class="input" v-model="status" clearable>
          <el-option label="在线" value="1"></el-option>
          <el-option label="离线" value="0"></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
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
          prop="instruType"
          label="仪表型号">
        </el-table-column>
        <el-table-column
          prop="instruId"
          label="仪表编号">
        </el-table-column>
        <el-table-column
          prop="system"
          width="180"
          label="所属系统">
        </el-table-column>
        <el-table-column
          prop="supplier"
          width="120"
          label="厂家">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          width="150"
          label="监测设备">
        </el-table-column>
        <el-table-column
          prop="ip"
          width="150"
          label="IP地址">
        </el-table-column>
        <el-table-column
          prop="status"
          width="120"
          label="状态">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="changeDevice(scope.row.instruId)">
              修改
            </el-button>
            <el-button type="primary" @click="del(scope.row.instruId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="addDialog"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">{{title}}</div>
      </div>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>仪表型号:</div>
            <div><el-input v-model="instruType" class="dialog-item"></el-input></div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>仪表名称:</div>
            <div><el-input v-model="instruName" class="dialog-item"></el-input></div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>仪表厂家:</div>
            <div>
              <el-select v-model="supplier" class="dialog-item">
                <el-option label="思仪" value="思仪"></el-option>
                <el-option label="罗德与施瓦茨" value="罗德与施瓦茨"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>所属系统:</div>
            <div>
              <el-select v-model="instruSystem" @change="handleDevice" class="dialog-item">
                <el-option label="海事卫星系统" value="海事卫星系统"></el-option>
                <el-option label="VSAT卫星系统" value="VSAT卫星系统"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>监测设备:</div>
            <div>
              <el-select v-model="deviceName" class="dialog-item">
                <el-option v-for="item in showDevice" :key="item.deviceId" :label="item.deviceName" :value="item.deviceId"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>IP地址:</div>
            <div><el-input v-model="ip" class="dialog-item"></el-input></div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
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
        <el-button type="primary" @click="delDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../mylib.js'
export default {
  name: 'device-manage',
  data () {
    return {
      height: mylib.height,
      addDialog: false,
      delDialog: false,
      currentPage: 1,
      total: 20,
      pageSize: 10,
      tableData: [],
      name: '',
      code: '',
      system: '',
      status: '',
      instruType: '',
      instruName: '',
      supplier: '',
      instruSystem: '',
      deviceName: '',
      ip: '',
      deviceData: [],
      id: '',
      addid: '',
      showDevice: [],
      isSave: true,
      title: '新增仪表'
    }
  },
  methods: {
    add () {
      this.instruName = ''
      this.instruType = ''
      this.supplier = ''
      this.instruSystem = ''
      this.deviceName = ''
      this.ip = ''
      this.addDialog = true
      this.addid = ''
      this.isSave = true
      this.title = '新增仪表'
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    search () {
      this.initData()
    },
    del (id) {
      this.delDialog = true
      this.id = id
    },
    handleDevice () {
      this.showDevice = []
      this.deviceName = ''
      if (this.instruSystem === '海事卫星系统') {
        this.deviceData.forEach((el) => {
          if (el.deviceId <= 5) {
            this.showDevice.push(el)
          }
        })
      } else {
        this.deviceData.forEach((el) => {
          if (el.deviceId > 5) {
            this.showDevice.push(el)
          }
        })
      }
    },
    delDevice () {
      mylib.axios({
        url: '/instrumentInfo/delInstrumentById',
        params: {
          id: this.id
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
    changeDevice (id) {
      this.title = '修改仪表'
      this.addid = id
      this.addDialog = true
      this.isSave = true
      mylib.axios({
        url: '/instrumentInfo/findInstrumentInfoById',
        params: {
          id: id
        },
        done (res) {
          if (res.success) {
            this.instruName = res.data.instruName
            this.instruType = res.data.instruType
            this.supplier = res.data.supplier
            this.instruSystem = res.data.system
            this.deviceName = res.data.deviceId
            this.ip = res.data.ip
            this.showDevice = []
            if (this.instruSystem === '海事卫星系统') {
              this.deviceData.forEach((el) => {
                if (el.deviceId <= 5) {
                  this.showDevice.push(el)
                }
              })
            } else {
              this.deviceData.forEach((el) => {
                if (el.deviceId > 5) {
                  this.showDevice.push(el)
                }
              })
            }
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    save () {
      if (!this.instruName) {
        return this.$message('请输入仪表名称')
      }
      if (!this.instruType) {
        return this.$message('请输入仪表型号')
      }
      if (!this.supplier) {
        return this.$message('请选择厂家')
      }
      if (!this.instruSystem) {
        return this.$message('请选择所属系统')
      }
      if (!this.deviceName) {
        return this.$message('请选择监测设备')
      }
      if (!this.ip) {
        return this.$message('请输入IP')
      }
      if (this.isSave) {
        this.isSave = false
        if (this.addid) {
          mylib.axios({
            url: '/instrumentInfo/updateInstrumentInfo',
            type: 'post',
            params: {
              instruId: this.addid,
              instruName: this.instruName,
              instruType: this.instruType,
              supplier: this.supplier,
              system: this.instruSystem,
              deviceId: this.deviceName,
              ip: this.ip
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
            url: '/instrumentInfo/insertInstrumentInfo',
            type: 'post',
            params: {
              instruName: this.instruName,
              instruType: this.instruType,
              supplier: this.supplier,
              instruSystem: this.instruSystem,
              deviceId: this.deviceName,
              ip: this.ip
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
    initData () {
      mylib.axios({
        url: '/instrumentInfo/findDeviceInfoAll',
        params: {
          instruName: this.name,
          instruId: this.code,
          system: this.system,
          status: this.status
        },
        done (res) {
          if (res.success) {
            this.tableData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    }
  },
  created: function () {
    this.initData()
    mylib.axios({
      url: '/device/findDeviceInfo',
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
  .dialog-item{
    width: 100%;
  }
</style>
