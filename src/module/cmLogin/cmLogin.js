import 'lib-flexible'
import Vue from 'vue'
import Index from './Index.vue'
import pbUI from '../../components'
import Axios from 'axios'
import router from './router'
import Impression from 'vue-impression'
import urlList from '../cmHelper/config'

Vue.prototype.$axios = Axios //首次登陆需要的请求
Vue.use(Impression)
Vue.use(pbUI)

import FastClick from 'fastclick'

// 去掉ios上300毫秒延迟
FastClick.attach(document.body)

Vue.mixin({
  data () {
    return {
      urlList: urlList
    }
  }
})
const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
})
