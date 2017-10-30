import 'lib-flexible';
import Vue from 'vue'
import "./common/mixins.js";
import VueRouter from 'vue-router'
import Impression from 'vue-impression'
import Axios from 'axios'
import pbUI from '../../components'
import Index from './Index.vue'
import browser from './common/browser'
import cmHelperIndex from './view/cmHelperIndex.vue'
import cmTrends from './view/cmTrends.vue'
import myAttention from './view/myAttention.vue'
import customerInfo from './view/customerInfo.vue'
import info from './view/info.vue'
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
    {path: '/', name: 'cmHelperIndex',component: cmHelperIndex},
    {path: '/cmTrends', component: cmTrends},
    {path: '/myAttention', component: myAttention},
    {path: '/customerInfo', component: customerInfo},
    {path: '/info', component: info}
  ]
})

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});



