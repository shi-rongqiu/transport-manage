<template>
  <div>
    <div><span class="back-icon" @click="back">返回</span></div>
    <div class="title">{{title}}</div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="paramter"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="paramValue"
          label="值">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="changeParam(scope.row)">
              修改
            </el-button>
            <el-button type="primary" @click="del(scope.row.paramId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="changeDialog"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">参数修改</div>
      </div>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="list-item">
            <div>{{changeInfor.name}}:</div>
            <div><el-input v-model="changeInfor.value"></el-input></div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="changeDialog = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
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
import mylib from '../../mylib'

export default {
  name: 'paramDetail',
  props: ['id'],
  data () {
    return {
      tableData: [],
      title: '',
      funcName: '',
      paramsId: '',
      changeDialog: false,
      delDialog: false,
      changeInfor: {
        name: '',
        value: '',
        id: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/parameter')
    },
    changeParam (item) {
      this.changeDialog = true
      this.changeInfor.name = item.paramter
      this.changeInfor.value = item.paramValue
      this.changeInfor.id = item.id
      this.changeInfor.funcId = item.paramId
    },
    del (id) {
      this.paramsId = id
      this.delDialog = true
    },
    handleDel () {
      mylib.axios({
        url: '/parameterList/deleteByParamId',
        params: {
          id: this.paramsId
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
    update () {
      mylib.axios({
        url: '/parameterList/updateByParamId',
        type: 'post',
        params: {
          paramId: this.changeInfor.funcId,
          id: this.changeInfor.id,
          paramValue: this.changeInfor.value,
          paramter: this.changeInfor.name
        },
        done (res) {
          if (res.success) {
            this.$message.success('修改成功！')
            this.changeDialog = false
            this.initData()
          } else {
            this.$message.error(res.message)
          }
        }
      }, this)
    },
    initData () {
      mylib.axios({
        url: '/parameterList/findByFuncId',
        params: {
          instruId: this.id,
          observedName: this.funcName
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
  created () {
    this.title = this.$route.query.title
    this.funcName = this.$route.query.funcName
    this.initData()
  }
}
</script>

<style scoped>
 .title{
   color:#fff;
   font-size:14px;
   font-weight: bold;
   margin:40px 0;
 }
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
