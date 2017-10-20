import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import VueRouter from 'vue-router';
import pbUI from '../../components';
import "./utils/mixins.js";


import Index from './Index.vue';
import Yield from './view/yield.vue';
import Profit from './view/profit.vue';
import MoneyPaid from './view/moneyPaid.vue';
import Diagnosis from './view/Diagnosis.vue';
import zdytime from './view/zdytime.vue';

import fqzj from './view/fqzj.vue';
import ykfx from './view/ykfx.vue';
import zjxx from './view/zjxx.vue';
import jyxx from './view/jyxx.vue';
import syxfx from './view/syxfx.vue';
import FastClick from 'fastclick'

import store from './vuex/store';
// 去掉ios上300毫秒延迟
FastClick.attach(document.body)


Vue.use(pbUI);
Vue.use(VueRouter);

const routes = [
  {
    path: '/Yield', //业绩基本分析
    name: 'Yield',
    component: Yield,
    children: [
      {
        path: '',
        name: 'zjxx',
        component: zjxx
      },
      {
        path: 'jyxx',
        name: 'jyxx',
        component: jyxx
      },
      {
        path: 'syxfx',
        name: 'syxfx',
        component: syxfx
      }
    ]
  },
  {
    path: '/Profit', //散点图
    name: 'Profit',
    component: Profit
  },
  {
    path: '/MoneyPaid', //投资者盈亏分析
    name: 'MoneyPaid',
    component: MoneyPaid
  },
  {
    path: '/', //首页
    name: 'Diagnosis',
    component: Diagnosis
  },
  {
    path: '/ykfx', //投资者盈利率曲线
    name: 'ykfx',
    component: ykfx
  },
  {
    path: '/fqzj', //投资者盈利率曲线
    name: 'fqzj',
    component: fqzj
  },
  {
    path: '/zdytime',  //日期控件
    name: 'zdytime',
    component: zdytime
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
