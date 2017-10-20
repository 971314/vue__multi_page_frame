import 'lib-flexible';
import Vue from 'vue';
import pbUI from '../../components';
import Index from './index.vue';
import Axios from 'axios';
import VueRouter from 'vue-router'
// import Impression from 'vue-impression';
import Activity from './view/activity.vue';
import LastAword from './view/lastaword.vue';
import ActivityDetail from './view/activityDetail.vue';
import SignUp from './view/signUp.vue';
import TestVue from './view/testVue.vue';
import BaiduMap from './view/baiduMap.vue';

// import { InfiniteScroll } from 'mint-ui';
//
// Vue.use(InfiniteScroll);

import './utils/mixin.js';
import store from './vuex/store.js';

import Filters from  './utils/filter.js';

import FastClick from 'fastclick'

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);

Vue.prototype.$axios = Axios;
Vue.use(pbUI);
// Vue.use(Impression);
Vue.use(VueRouter);


for (let [k, v] of Object.entries(Filters)) {
  Vue.filter(k, v);
}

const routes = [
  {
    path: '/',
    name: 'activity',
    components: {a: Activity}
  },
  {
    path: '/lastaword',
    name: 'lastaword',
    components: {a: LastAword}
  },
  {
    path: '/activityDetail',
    name: 'activityDetail',
    components: {b: ActivityDetail}
  },
  {
    path: '/signUp',
    name: 'signUp',
    components: {b: SignUp}
  },
  {
    path: '/testvue',
    name: 'testvue',
    components: {b: TestVue}
  },
  {
    path: '/baiduMap',
    name: 'baiduMap',
    components: {b: BaiduMap}
  }
];

let router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
});
