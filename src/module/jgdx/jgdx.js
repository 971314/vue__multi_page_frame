// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import _ from "lodash";
//import 'lib-flexible'; //阿里js
import Vue from "vue";
import MintUI from 'mint-ui';
import Impression from 'vue-impression';
import router from './routers/router';
import store from './store/store';
import "./common/directive";
import "./common/mixin";
import "./common/filter";
import Index from './Index.vue';
import pbUI from '../../components';

// import vueEventCalendar from './components/plugs/vue-event-calendar/index.js';
// Vue.use(vueEventCalendar, {locale: 'zh',color: '#eb1212'});
Vue.use(pbUI);
Vue.use(Impression);

Vue.filter('getTimeFmt', function (value) { //获取时间
  value = value + '';
  let yearServer = value.substr(0,4);
  let monthServer = value.substr(4,2);
  let dayServer = value.substr(6,2);
  return `${yearServer}-${monthServer}-${dayServer}`;
});

import FastClick from "fastclick";

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);

Vue.use(MintUI);

Vue.config.devtools = true;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
});
