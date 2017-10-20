import 'lib-flexible';
import Vue from 'vue'
import "./common/mixins.js";
import VueRouter from 'vue-router'
import Impression from 'vue-impression'
import Axios from 'axios'
import pbUI from '../../components'
import Index from './Index.vue'
import browser from './common/browser'
import eCalendar from './view/eCalendar.vue'
import FastClick from 'fastclick'

import {DatePicker} from 'element-ui'

Vue.use(VueRouter)
Vue.use(Impression)
Vue.use(pbUI)
Vue.use(DatePicker)
Vue.prototype.$axios = Axios // Vue.prototype.$http = Axios ; Vue.use(Axios)

if (browser.versions.mobile) {
  // 去掉ios上300毫秒延迟
  FastClick.attach(document.body)
}

const router = new VueRouter({
  routes: [
    {path: '/', name: 'eCalendar',component: eCalendar}
  ]
})

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});



