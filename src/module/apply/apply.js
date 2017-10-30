import 'lib-flexible'
import Vue from 'vue'
import Axios from 'axios'
import pbUI from '../../components'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/store.js'
import mixinDatas from './utils/datas.js'
import mixinMethods from './utils/methods.js'
import urlList from './config/retUrl.js'

import Index from './index.vue'
// 去掉ios上300毫秒延迟
FastClick.attach(document.body)
Vue.prototype.$axios = Axios
if (pbE.isPoboApp) {
  Axios.defaults.headers['id'] = pbE.SYS().getPrivateData('managerInfo').token
} else {
  /*Axios.defaults.headers['id'] = localStorage.managerInfo.token */
  Axios.defaults.headers['id'] = localStorage.managerInfo ? localStorage.managerInfo.token : ''
}
Vue.prototype.$axios = Axios
Vue.prototype.urlList = urlList
Vue.use(pbUI)

Vue.mixin(Object.assign(mixinDatas, mixinMethods))

const index = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
})
