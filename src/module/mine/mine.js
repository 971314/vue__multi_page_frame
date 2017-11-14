import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import FastClick from 'fastclick';
// 去掉ios上300毫秒延迟
FastClick.attach(document.body);
// import filters from '../alerted/components/filters';
import store from './vuex/store';

import Index from './Index.vue';
import pbUI from '../../components';
import Mine from './view/mine.vue';
import UserInfo from './view/userInfo.vue';
import InfoAll from './view/infoAll.vue';
import Avatar from './view/avatar.vue';
import NickName from './view/nickName.vue';
import Sex from './view/sex.vue';
import Job from './view/job.vue';
import Email from './view/email.vue';
import PWD from './view/password.vue';

Vue.use(pbUI);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

let deviceRelated = pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255: "3", jgid: "1998"}, os;
if (deviceRelated['255'] == '2') {
  os = 'IOS';
} else if (deviceRelated['255'] == '3') {
  os = 'android';
}
Vue.mixin({
  data(){
    return {
      url: 'http://101.226.207.143:8888/cloud_trade/1_0',
      postUrl: PBHttpServer.mine.infoUrl,
      confUrlPbe: 'main/conf/',
      confUrl: '../conf/h5/',
      confUrlH5: 'conf/h5/',
      os: os,
      orgCode: deviceRelated.jgid,
      CID: null
    }
  }
});

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo,
      children: [
        {
          path: '',
          name: 'infoAll',
          components: {a: InfoAll}
        },
        {
          path: 'avatar',
          name: 'avatar',
          components: {a: Avatar}
        },
        {
          path: 'nickName',
          name: 'nickName',
          components: {a: NickName}
        },
        {
          path: 'sex',
          name: 'sex',
          components: {a: Sex}
        },
        {
          path: 'job',
          name: 'job',
          components: {a: Job}
        },
        {
          path: 'email',
          name: 'email',
          components: {a: Email}
        },
        {
          path: 'password',
          name: 'password',
          components: {b: PWD}
        }
      ]
    }
  ]
});

const index = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
});
