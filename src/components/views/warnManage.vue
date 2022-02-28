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
        告警级别：
        <el-select class="input" v-model="type" clearable>
          <el-option label="一般告警" value="0"></el-option>
          <el-option label="紧急告警" value="1"></el-option>
          <el-option label="严重告警" value="2"></el-option>
        </el-select>
      </div>
      <div>
        上报时间：
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="search">
        <el-button type="primary" @click="search">搜索</el-button>
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
          label="仪表编号">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="监测设备">
        </el-table-column>
        <el-table-column
          prop="alarmType"
          width="120"
          label="告警级别">
          <template slot-scope="scope">
            <span style="color:#ffcb00;" v-if="scope.row.alarmType == '0'">一般告警</span>
            <span style="color:#ff8512;" v-if="scope.row.alarmType == '1'">紧急告警</span>
            <span style="color:#ff3f00;" v-if="scope.row.alarmType == '2'">严重告警</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmObserved"
          label="告警功能">
        </el-table-column>
        <el-table-column
          prop="alarmValue"
          label="告警值">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="上报时间">
        </el-table-column>
        <el-table-column
          prop="alarmStatus"
          label="事件状态">
          <template slot-scope="scope">
            <span style="color:#ffcb00;" v-if="scope.row.alarmStatus == 0">已关闭</span>
            <span style="color:#ff8512;" v-if="scope.row.alarmStatus == 1">未处理</span>
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.alarmStatus == 1" @click="deal(scope.row.id)">
              处理
            </el-button>
            <el-button type="primary" @click="del(scope.row.id)">
              删除
            </el-button>
            <el-button type="primary" v-if="scope.row.alarmStatus == 0" @click="check(scope.row)">
              查看结果
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
      :visible.sync="dealDialog"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">告警处理</div>
      </div>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>告警原因:</div>
            <div v-if="!forbidden">
              <el-select v-model="alarmType">
                <el-option label="设备故障" :value="0"></el-option>
                <el-option label="网络故障" :value="1"></el-option>
                <el-option label="仪表故障" :value="2"></el-option>
                <el-option label="其他" :value="3"></el-option>
              </el-select>
            </div>
            <div v-else class="detail">
              <span v-if="alarmType == 0">设备故障</span>
              <span v-if="alarmType == 1">网络故障</span>
              <span v-if="alarmType == 2">仪表故障</span>
              <span v-if="alarmType == 3">其他</span>
            </div>
          </div>
        </el-col>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>详细描述:</div>
            <div v-if="!forbidden"><el-input type="textarea" :rows="6" v-model="detail"></el-input></div>
            <div v-else class="detail">{{detail}}</div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dealDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDeal" v-if="!forbidden">确 定</el-button>
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
  name: 'warn-manage',
  data () {
    return {
      height: mylib.height,
      dealDialog: false,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      delDialog: false,
      tableData: [],
      name: '',
      code: '',
      type: null,
      time: '',
      alarmArr: [],
      alarmType: null,
      detail: '',
      forbidden: false
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentChange () {
      this.initData()
    },
    handleSizeChange () {
      this.initData()
    },
    deal (id) {
      this.dealDialog = true
      this.id = id
      this.forbidden = false
      this.alarmType = null
      this.detail = ''
    },
    handleDeal () {
      mylib.axios({
        url: '/alarm/alarmDispose',
        type: 'post',
        params: {
          id: this.id,
          reas: this.alarmType,
          detail: this.detail
        },
        done (res) {
          if (res.success) {
            this.dealDialog = false
            this.$message.success('处理成功！')
            this.initData()
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    check (row) {
      this.alarmType = row.reas
      this.detail = row.detail
      this.dealDialog = true
      this.forbidden = true
    },
    del (id) {
      this.delDialog = true
      this.id = id
    },
    handleDel () {
      mylib.axios({
        url: '/alarm/delAlarmInfoById',
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
    search () {
      this.initData()
    },
    initData () {
      mylib.axios({
        url: '/alarm/findAlarmInfoAndInstruAndDevice',
        params: {
          instruName: this.name,
          instruId: this.code,
          alarmType: this.type,
          create_time: this.time,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        },
        done (res) {
          if (res.success) {
            this.tableData = res.data.list
            this.total = res.data.total
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
</style>
