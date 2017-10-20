import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
// import FastClick from 'fastclick';
// import filters from '../alerted/components/filters';

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

let deviceRelated =  pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255:"3",jgid:"1998"},os;
if (deviceRelated['255'] == '2') {
  os = 'IOS';
} else if (deviceRelated['255'] == '3') {
  os = 'android';
}
Vue.mixin({
  data(){
    return {
      url : 'http://101.226.207.143:8888/cloud_trade/1_0',
      postUrl: 'http://192.168.6.119:8080/pobocertification_rest/1_0',
      confUrlPbe:'main/conf/',
      confUrl:'../conf/h5/',
      confUrlH5:'conf/h5/',
      os:os,
      orgCode:deviceRelated.jgid,
      testIp : pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['71'] : '',//ip
      testMac : pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['72'] : '',//物理地址
      testVersion : pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['73'] : '',//版本
      testId : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '8',//认证userId/id
      userName : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745',//认证手机号
      testToken : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '11111111111kkkkkkskskslslslsls',//token
      CID:null
    }
  }
});
const router = new VueRouter({
  routes:[
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
          component: InfoAll
        },
        {
          path: 'avatar',
          name: 'avatar',
          component: Avatar
        },
        {
          path: 'nickName',
          name: 'nickName',
          component: NickName
        },
        {
          path: 'sex',
          name: 'sex',
          component: Sex
        },
        {
          path: 'job',
          name: 'job',
          component: Job
        },
        {
          path: 'email',
          name: 'email',
          component: Email
        },
        {
          path: 'password',
          name: 'password',
          component: PWD
        }
      ]
    }
    ]
});

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
