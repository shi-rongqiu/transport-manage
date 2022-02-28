<template>
  <div class="content tree">
    <div class="login-content">
        <div style="text-align:center;color:#fff;font-size:32px;font-weight: bold;">交通运输应急平台系统</div>
        <div class="login">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="userName">
              <div class="login-input">
                <div class="icon-content">
                  <img class="login-icon" src="../assets/img/user-icon.svg" alt="">
                </div>
                <el-input placeholder="请输入用户名" class="card-width" v-model="ruleForm.userName"></el-input>
              </div>
            </el-form-item>
            <el-form-item  prop="password">
              <div class="login-input">
                <div class="icon-content">
                  <img class="login-icon" src="../assets/img/pwd-icon.svg" alt="">
                </div>
                <el-input placeholder="请输入密码" type="password" class="card-width" v-model="ruleForm.password"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="password-check">
                <el-checkbox v-model="checked" @change="handleChange">记住密码</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="login-btn">
                <el-button class="btn" type="primary" @click="login('ruleForm')">登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import mylib from '../mylib'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      height: null,
      checked: false,
      userName: '',
      password: '',
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mylib.axios({
            url: '/user/login',
            params: {
              password: this.ruleForm.password,
              username: this.ruleForm.userName
            },
            done (res) {
              if (res.success) {
                // localStorage.setItem('user', response.data.user.userId)
                localStorage.setItem('userName', this.ruleForm.userName)
                sessionStorage.setItem('activeIndex', '1')
                this.$router.push('/index')
              } else {
                this.$message.error(res.message)
              }
            }
          }, this)
        }
      })
    },
    handleChange () {
      if (this.checked) {
        localStorage.setItem('checked', '1')
        localStorage.setItem('password', this.ruleForm.password)
      } else {
        localStorage.setItem('checked', '')
        localStorage.setItem('password', '')
      }
    }
  },
  created () {
    this.height = document.documentElement.clientHeight
    var value = localStorage.getItem('checked')
    this.ruleForm.userName = localStorage.getItem('userName') || ''
    this.ruleForm.password = localStorage.getItem('password') || ''
    sessionStorage.setItem('activeIndex', '1')
    sessionStorage.setItem('token', '')
    if (value === '1') {
      this.checked = true
    }
  }
}
</script>

<style scoped>
  .content{
    width:100%;
    min-width:1200px;
    height:100vh;
    min-height:400px;
    background:url(~@/assets/img/bg.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    position:relative;

  }
  .login-content{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
  .login-input{
    display:flex;
  }
  .login{
    width:510px;
    height:310px;
    background: rgba(42, 47, 68, 0.61);
    margin:45px auto;
    border-radius: 4px;
    padding-top:40px;
    box-sizing: border-box;
  }
  .btn{
    width:100%;
    background:#2edbdd;
    color: #0a1423;
  }
  .card-width{
    width:calc(100% - 45px);
  }
  .login-icon{
    vertical-align: middle;
    margin-left:10px;
  }
  .icon-content{
    width:45px;
  }
  .login-btn .el-button{
    padding: 14px 20px;
    font-size:16px;
  }
  .password-check{
    font-size:16px;
    color:#777c8f;
    text-align:right;
  }
</style>
