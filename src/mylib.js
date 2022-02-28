import _ from 'lodash'
import axios from 'axios'
// import Cookies from 'js-cookie'
import Qs from 'qs'

let str = window.location.href.split('#')[0]
let arr = str.split('?')[0]
let accnode = str.split('?')[1]

let URL = 'http://192.168.0.201:10086' // 'http://123.57.246.196:10086' // arr //

export default {
  URL: URL,
  height: document.documentElement.clientHeight - 230,
  ACCESS_TOKEN: '', // 'access-token': this.ACCESS_TOKEN,
  accNode: accnode || '',
  // @todo去缓存
  // axios (opt, _this) {
  //   let ajax = ''
  //   opt.type = opt.type || 'get'
  //   if (opt.type === 'get') {
  //     ajax = axios[opt.type](this.URL + opt.url, {
  //       params: _.extend(opt.params,
  //         {
  //           'accnode': this.accNode
  //         })
  //     })
  //   } else {
  //     if (opt.headers) {
  //       var params = opt.params
  //       ajax = axios({
  //         headers: opt.headers,
  //         method: 'post',
  //         url: this.URL + opt.url + '?accnode=' + this.accNode,
  //         data: Qs.stringify(params)
  //       })
  //     } else {
  //       ajax = axios[opt.type](this.URL + opt.url,
  //         opt.params,
  //         {
  //           params: {
  //             'accnode': this.accNode
  //           }
  //         }
  //       )
  //     }
  //   }
  //   return ajax.then((response) => {
  //     if (response.status) {
  //       if (this.accNode) {
  //         this.ACCESS_TOKEN = response.data.token || sessionStorage.getItem('token')
  //       } else {
  //         this.ACCESS_TOKEN = sessionStorage.getItem('token')
  //       }
  //       if (this.ACCESS_TOKEN) {
  //         if (typeof opt.done === 'function') opt.done.call(_this, response.data)
  //       } else {
  //         location.href = '#/login'
  //       }
  //     } else {
  //       if (typeof opt.error === 'function') opt.error.call(_this, response.data)
  //     }
  //   }).catch((error) => {
  //     location.href = '#/404'
  //   })
  // }

  axios (opt, _this) {
    let ajax = ''
    opt.type = opt.type || 'get'
    if (opt.type === 'get') {
      ajax = axios[opt.type](this.URL + opt.url, {
        params: _.extend(opt.params)
      })
    } else {
      ajax = axios[opt.type](this.URL + opt.url,
        opt.params
      )
    }
    return ajax.then((response) => {
      if (typeof opt.done === 'function') opt.done.call(_this, response.data)
      if (typeof opt.error === 'function') opt.error.call(_this, response.data)
    }).catch((error) => {
      // location.href = '#/404'
    })
  }
}
