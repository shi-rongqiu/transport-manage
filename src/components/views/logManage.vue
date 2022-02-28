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
        监测设备：
        <el-select v-model="deviceName" class="input">
          <el-option v-for="item in deviceData" :key="item.deviceId" :label="item.deviceName" :value="item.deviceId"></el-option>
        </el-select>
      </div>
<!--      <div>-->
<!--        频谱状态：-->
<!--        <el-select class="input">-->
<!--          <el-option label="正常"></el-option>-->
<!--          <el-option label="异常"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->
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
          width="180"
          label="仪表编号">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="监测设备">
        </el-table-column>
        <el-table-column
          prop="system"
          width="180"
          label="所属系统">
        </el-table-column>
        <el-table-column
          prop="observedName"
          label="测量功能名称">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="address"-->
<!--          width="120"-->
<!--          label="频谱状态">-->
<!--          <template slot-scope="scope">-->
<!--            <span>正常</span>-->
<!--            <span style="color:#ff3f00;">异常</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="createTime"
          width="180"
          label="上传时间">
        </el-table-column>
        <el-table-column
          width="140"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="jump(scope.row)">
              回放频谱波形
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
  </div>
</template>

<script>
import mylib from '../../mylib.js'
export default {
  name: 'log-manage',
  data () {
    return {
      height: mylib.height,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      name: '',
      code: '',
      deviceData: [],
      deviceName: ''
    }
  },
  methods: {
    jump (item) {
      this.$router.push({path: '/playback', query: {id: item.id}})
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
    search () {
      this.initData()
    },
    initData () {
      mylib.axios({
        url: '/log/logManagement',
        params: {
          instruName: this.name,
          instruId: this.code,
          deviceId: this.deviceName,
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

</style>
