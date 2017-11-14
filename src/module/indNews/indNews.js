import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue'
import VueRouter from 'vue-router';
import Axios from 'axios';
import '../../assets/js/jroll.min.js'
import Impression from 'vue-impression';
import pbUI from '../../components';
import methods from './utils/methods';
import datas from './utils/datas';

import index from './index.vue';
import news from './old/newsFlash.vue';
import notice from './old/notice.vue';
import hour from './old/hour.vue';
import newsCat from './old/newsView.vue';
import commodity from './old/commodity.vue';
import noticeView from './old/noticeView.vue';
import noticeGroup from './components/noticeGroup.vue';
import newsGroup from './components/newsGroup.vue';

import newsDCD from './view/news_DCD.vue';
import newsFirm from './view/news_firm.vue';
import VueLazyload from "vue-lazyload";
import FastClick from 'fastclick'

//图片懒加载
Vue.use(VueLazyload, {
  //error: 'static/error.png',//这个是请求失败后显示的图片
  loading: '../images/activitydefault@2x.png',//这个是图片加载中的过渡效果
  attempt: 1 //尝试次数
});

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);
Vue.use(Impression);
Vue.use(VueRouter);
Vue.use(pbUI);

Vue.prototype.$axios = Axios;


Vue.mixin(Object.assign(datas, methods));

Vue.filter('removeSpecialStr', function (value) {
  value = value.replace(/\n/g, '');
  value = value.replace(/\t/g, '');
  value = value.replace(/\s/g, '');
  value = value.replace(/\-/g, '');
  value = value.replace(/\—/g, '');
  value = value.replace(/\━/g, '');
  value = value.replace(/<[^>]+>/g, "");
  value = value.replace(/&nbsp;/g, "");
  return value;
});
Vue.filter('setDate', function (value) {
  value = value.replace(/-/g, '.');
  return value;
});

Vue.filter('reviseFileSize', function (value) {
  value = (value / 1024).toFixed(2);
  return value + 'KB';
});

Vue.filter('setTitle', function (value) {
  value = value.substr(6);
  return value;
});

/*Vue.filter('setTime', function(value) {
  value = value.replace(/\//g,'-');
  value = this.$$timeFormate(value,"Y-M-D h:m");
  return value;
});*/

/*const router = new VueRouter({
  routes: [
    {
      path: '/', component: index,
      children: [
        {
          path: 'news/:id', component: news,
          children: [
            {path: 'hour/:num', component: hour},
            {path: 'domestic/:num', component: newsCat, name: 'news2'},
            {
              path: 'commodity/:num', component: commodity,
              children: [
                {path: 'rare/:numm', component: newsCat, name: 'news4'},
                {path: 'metal/:numm', component: newsCat, name: 'news5'},
                {path: 'farm/:numm', component: newsCat, name: 'news6'},
                {path: 'energy/:numm', component: newsCat, name: 'news7'},
                {path: 'ferrous/:numm', component: newsCat, name: 'news8'}
              ]
            },
            {path: 'FITF/:num', component: newsCat,name: 'news9'}
          ]
        },
        {
          path: 'firm/:id', component: notice,
          children: [
            {
              name: 'noticeView',
              path: 'firmview/:type',
              component: noticeView
            }
          ]
        }
      ]
    },
    {
      path: '/details', component: require('./view/details.vue')
    }
  ]
});*/

const router = new VueRouter({
  routes: [
    {path: '/', component: newsFirm, name: 'newsFirm'},
    {path: '/newsDCD', component: newsDCD, name: 'newsDCD'},
    {path: '/details', component: require('./view/details.vue')}
  ]
});


Vue.component(newsGroup.name, newsGroup);
Vue.component(noticeGroup.name, noticeGroup);
new Vue({
  el: '#app',
  router,
  render: h => h(index)
});

/*new Vue({
  el: '#app',
  router
});*/
