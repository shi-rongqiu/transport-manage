<template>
  <div>
    <div class="header-top">
      <div>
        仪表名称：<el-input class="input" placeholder="请输入" v-model="name"></el-input>
      </div>
      <div>
        仪表型号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
      </div>
      <div>
        所属系统：
        <el-select class="input" v-model="system" clearable>
          <el-option label="海事卫星系统" value="海事卫星系统"></el-option>
          <el-option label="VSAT卫星系统" value="VSAT卫星系统"></el-option>
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
          width="180"
          label="仪表型号">
        </el-table-column>
        <el-table-column
          prop="id"
          width="180"
          label="仪表编号">
        </el-table-column>
        <el-table-column
          prop="system"
          width="180"
          label="所属系统">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="监测设备">
        </el-table-column>
        <el-table-column
          prop="observedName"
          label="测量功能">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="checkDetail(scope.row)">
              查看
            </el-button>
            <el-button type="primary" @click="delParam(scope.row.funcId)">
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
  name: 'param-manage',
  data () {
    return {
      height: mylib.height,
      delDialog: false,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      name: '',
      code: '',
      system: '',
      id: null
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    add () {
      this.$router.push('/parameter/add')
    },
    checkDetail (item) {
      this.$router.push({path: '/parameter/detail/' + item.id, query: {title: item.instruName, funcName: item.observedName}})
    },
    handleCurrentChange () {
      this.initData()
    },
    handleSizeChange () {
      this.initData()
    },
    search () {
      this.initData()
    },
    delParam (id) {
      this.id = id
      this.delDialog = true
    },
    handleDel () {
      mylib.axios({
        url: '/parameterList/deleteById',
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
    initData () {
      mylib.axios({
        url: '/parameterList/findObservedAll',
        params: {
          instruName: this.name,
          instruType: this.code,
          system: this.system,
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
