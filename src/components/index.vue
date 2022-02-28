<template>
  <div>
    <el-container :style="{height: height + 'px'}">
      <el-container>
        <el-header>
          <div>
            <span class="title-name">交通运输应急平台系统</span>
<!--            <div class="logout" @click="logout">-->
<!--              <span><img src="" alt=""></span>-->
<!--              退出-->
<!--            </div>-->
<!--            <div class="change-pass">-->
<!--              <el-dropdown trigger="click">-->
<!--                <span class="el-dropdown-link" style="color:#fff;font-size: 14px;">-->
<!--                  <span><img src="" alt="" style="width:22px;height:22px;margin-top:15px;"></span>-->
<!--                   管理员<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                </span>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item>-->
<!--                    <div @click="changePassword">修改密码</div>-->
<!--                  </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--            </div>-->
          </div>
        </el-header>
        <el-container>
          <el-aside class="aside">
            <div v-for="(item, index) in list" :key="index">
              <div class="title">
                <div>
                  <img :src="'./static/' + item.icon" alt="" style="vertical-align: middle;margin-left:15px;">
                </div>
                <div>
                  {{item.name}}
                </div>
              </div>
              <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                text-color="#fff">
                <el-menu-item  v-for="(cell, ind) in item.content" :key="ind" :index="cell.index">
                  <div slot="title" @click="change(cell, ind)" class="subtitle">
                    <span>{{cell.name}}</span>
                  </div>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-main>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog
      :visible.sync="Dialog"
      width="620px"
      :show-close="false"
      center>
      <div>
        <div class="dialog-top-null"></div>
        <div class="dialog-top">修改密码</div>
      </div>
      <div class="step-content">
        <div :class="{'stepItem': step == 1, 'vertify': step == 2 || step == 3}">
          <span class="step-num" v-if="step == 1">1</span>
          <span class="step-num" v-else>√</span>
          <span class="step-tit">验证旧密码</span>
          <span class="step-line"></span>
        </div>
        <div :class="{'stepItem' : step == 2, 'vertify': step == 3}">
          <span class="step-num" v-if="step !== 3">2</span>
          <span class="step-num" v-else>√</span>
          <span class="step-tit">设置新密码</span>
          <span class="step-line"></span>
        </div>
        <div :class="[step == 3 ? 'stepItem' : '']">
          <span class="step-num">3</span>
          <span class="step-tit">修改成功</span>
        </div>
      </div>
      <div class="dialog">
        <div v-if="step == 1">
          <el-input placeholder="请输入旧密码" v-model="oldpassword">
            <template slot="prepend">旧密码</template>
          </el-input>
        </div>
        <div v-if="step == 2">
          <el-input placeholder="请输入新密码" v-model="password">
            <template slot="prepend">新密码</template>
          </el-input>
          <el-input style="margin-top:20px;" placeholder="请确定新密码" v-model="newpassword">
            <template slot="prepend">确认新密码</template>
          </el-input>
        </div>
        <div class="success" v-if="step == 3">
          <div>
            <img src="../assets/img/success.svg" alt="">
          </div>
          <div style="margin-top:17px;">
            修改成功！
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="step == 1" @click="next">下一步</el-button>
        <el-button type="primary" v-if="step == 2" @click="confirm">确认修改</el-button>
        <el-button class="cancel" @click="Dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../mylib'
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'index',
  data () {
    return {
      Dialog: false,
      siteDialog: false,
      name: '',
      code: '',
      IP: '',
      id: '',
      active: 0,
      userId: localStorage.getItem('user') || '',
      userName: localStorage.getItem('userName') || '',
      height: null,
      activeIndex: 1,
      list: [
        {
          name: '拓扑结构',
          icon: 'nav-one-icon.svg',
          content: [
            {name: '全网拓扑', index: '1', path: '/index'},
            {name: 'IP拓扑', index: '2', path: '/ipchart'},
            {name: '二层拓扑', index: '3', path: '/layerchart'}
          ]
        },
        {
          name: '远程控制',
          icon: 'nav-two-icon.svg',
          content: [
            {name: '操作面板', index: '4', path: '/operate'},
            {name: '参数管理', index: '5', path: '/parameter'},
            {name: '轮询机制', index: '6', path: '/poll'}
          ]
        },
        {
          name: '集中监控',
          icon: 'nav-three-icon.svg',
          content: [
            {name: '仪表管理', index: '7', path: '/device'},
            {name: '阈值管理', index: '9', path: '/threshold'},
            {name: '告警管理', index: '8', path: '/warn'}
          ]
        },
        {
          name: '监控统计',
          icon: 'nav-four-icon.svg',
          content: [
            {name: '异常率分析', index: '10', path: '/analyze'},
            {name: '日志管理', index: '11', path: '/log'}
          ]
        }
      ],
      step: 1,
      oldpassword: '',
      password: '',
      newpassword: ''
    }
  },
  methods: {
    change (item) {
      this.$router.push(item.path)
      this.activeIndex = item.index
      sessionStorage.setItem('activeIndex', item.index)
    },
    changePassword () {
      this.Dialog = true
      this.step = 1
    },
    next () {
      // if (!this.oldpassword) {
      //   return this.$message('旧密码为空')
      // }
      // mylib.axios({
      //   url: 'app/login',
      //   type: 'post',
      //   params: {
      //     username: this.userName,
      //     password: this.oldpassword
      //   },
      //   done (res) {
      //     if (res.code === 0) {
            this.step = 2
      //     } else {
      //       this.$message.error(res.message)
      //     }
      //   }
      // }, this)
    },
    confirm () {
      // if (this.password === '' || this.newpassword === '') {
      //   return this.$message('密码为空')
      // }
      // if (this.password !== this.newpassword) {
      //   return this.$message('两次输入密码不一致')
      // }
      //
      // if (/[\u4E00-\u9FA5\uFE30-\uFFA0]/.test(this.password)){
      //   return this.$message('密码包含中文字符')
      // }
      // var params = {
      //   userId: this.userId,
      //   password: this.oldpassword,
      //   newPassword: this.newpassword
      // }
      // axios({
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   method: 'post',
      //   url: mylib.URL + 'app/user/password',
      //   data: Qs.stringify(params)
      // }).then((res) => {
      //   if (res.data.code === 0) {
          this.step = 3
      //     var timer = setTimeout(() => {
      //       clearTimeout(timer)
      //       location.href = '#/login'
      //     }, 1000)
      //   } else {
      //     this.$message.error(res.data.msg)
      //   }
      // })
    },
    logout () {
      mylib.axios({
        url: 'app/user/logout',
        type: 'post',
        params: {
          userId: this.userId
        },
        done (res) {
          if (res.code === 0) {
            sessionStorage.setItem('activeIndex', '1')
            localStorage.setItem('user', '')
            sessionStorage.setItem('token', '')
            this.$router.push('/')
          }
        }
      }, this)
    }
  },
  mounted () {
  },
  created () {
    this.activeIndex = sessionStorage.getItem('activeIndex') || '1'
    this.height = document.documentElement.clientHeight
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    width:100%;
    min-width: 900px;
    background-color: #292e43;
    height:60px !important;
    line-height: 60px;
    font-size: 16px;
    color:#fff;
    padding:0;
    position:fixed;
    top:0;
    z-index: 222;
  }
  .title-name{
    font-size:18px;
    font-weight: bold;
    padding-left:40px;
  }
  .aside{
    width:150px !important;
    background-color: #292e43;
    padding-top:55px;
  }

  .title{display:flex;color:#fff;font-size:16px;font-weight: bold;height:50px;line-height:50px;}
  .title>div:first-child{width:45px;}
  .subtitle{font-size:14px;font-weight: normal;}
  .change-pass,.logout{float:right;margin-right:10px;font-size:12px;cursor: pointer;}
  .logout span{float:left;padding-top:5px;margin-right:5px;}
  .change-pass span{float:left;margin-right:5px;}
  .step-content{display:flex;width:90%;margin:20px auto;}
  .step-content>div{margin-left:10px;}
  .step-num{
    width:24px;height:24px;display:inline-block;border:1px solid #0AF0F3;color:#fff;font-size:14px;
    line-height:24px;text-align:center;border-radius: 50%;
  }
  .step-tit{font-size:14px;color:#fff;margin:0 8px;}
  .step-line{
    display:inline-block;width:50px;border:1px solid rgba(255,255,255,0.5);margin-bottom:4px;
  }
  .stepItem>.step-num{color:#021539;background:#0AF0F3;}
  .stepItem>.step-tit{color:#fff;font-weight: bold;}
  .stepItem>.step-line{border-color:#0AF0F3;}
  .vertify>.step-num{color:#0AF0F3;border-color:#0AF0F3;}
  .vertify>.step-tit{color:#0AF0F3;}
  .vertify>.step-line{border-color:#0AF0F3;}
  .dialog{width:70%;margin:30px auto;}
  .btn{width:100%;margin-top:77px;text-align:center;}
  .success{width:100%;text-align:center;font-size:16px;color:#fff;}
  .item{
    width:80%;
    margin:50px auto;
    display:flex;
  }
  .item-cell{
    width:130px;
    margin-top:5px;
  }
</style>
