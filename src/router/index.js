import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

Vue.use(Router)

const Route = [
  {
    path: '/',
    component: (resolve) => require(['@/components/login'], resolve)
  },
  {
    path: '/index',
    component: Index,
    name: '首页',
    children: [
      {
        path: '/index',
        component: (resolve) => require(['@/components/views/home'], resolve)
      },
      {
        path: '/ipchart',
        component: (resolve) => require(['@/components/views/IPChart'], resolve)
      },
      {
        path: '/layerchart',
        component: (resolve) => require(['@/components/views/layerChart'], resolve)
      },
      {
        path: '/operate',
        name: 'operate',
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(['@/components/views/operatePanel'], resolve)
      },
      {
        path: '/spectrum',
        name: 'spectrum',
        component: (resolve) => require(['@/components/views/spectrum'], resolve)
      },
      {
        path: '/parameter',
        component: (resolve) => require(['@/components/views/paramManage'], resolve)
      },
      {
        path: '/parameter/detail/:id',
        props: true,
        component: (resolve) => require(['@/components/views/paramDetail'], resolve)
      },
      {
        path: '/parameter/add',
        component: (resolve) => require(['@/components/views/paramAdd'], resolve)
      },
      {
        path: '/poll',
        meta: {
          keepAlive: true
        },
        component: (resolve) => require(['@/components/views/poll'], resolve)
      },
      {
        path: '/threshold',
        component: (resolve) => require(['@/components/views/thresholdManage'], resolve)
      },
      {
        path: '/device',
        component: (resolve) => require(['@/components/views/deviceManage'], resolve)
      },
      {
        path: '/warn',
        component: (resolve) => require(['@/components/views/warnManage'], resolve)
      },
      {
        path: '/analyze',
        component: (resolve) => require(['@/components/views/analyze'], resolve)
      },
      {
        path: '/log',
        component: (resolve) => require(['@/components/views/logManage'], resolve)
      },
      {
        path: '/playback',
        component: (resolve) => require(['@/components/views/spectrumPlayback'], resolve)
      }
    ]
  }
]

// 注册路由
export default new Router({
  routes: Route
})
