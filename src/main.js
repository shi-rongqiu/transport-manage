// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ECharts from 'vue-echarts/components/ECharts'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import 'babel-polyfill'
import 'echarts-gl'
import 'echarts'
Vue.prototype.HOST = '/api'
Vue.component('chart', ECharts)
// import 'lib-flexible/flexible.js'

Vue.use(ElementUI)

Vue.config.productionTip = false
let ajax = axios.create({timeout: 5000})
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
ajax.interceptors.request.use(
  config => {
    config.headers.Authorization = `${sessionStorage.getItem('token')}`
    return config
  }
)
Vue.directive('allow', {
  inserted: (el, binding, vnode) => {
    let permissionList = vnode.context.$route.meta.permission
    if (!permissionList.includes(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
