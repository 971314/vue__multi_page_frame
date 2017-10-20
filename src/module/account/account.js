import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import FastClick from 'fastclick';

import pbUI from '../../components';

import Index from './index.vue';
import main from './view/main.vue';
import unbundle from './view/unbundleInput.vue';//解绑输入资金密码

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);

Vue.use(pbUI);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

let deviceRelated = pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255:"3",jgid:"1995"},os;
if (deviceRelated['255'] == '2') {
  os = 'IOS';
} else if (deviceRelated['255'] == '3') {
  os = 'android';
}

Vue.mixin({
  data() {
    return {
      url: PBHttpServer.condition.serverUrl,
      confUrlPbe: 'conf/h5/',
      confUrl: '../conf/h5/',
      os:os,
      orgCode:deviceRelated.jgid,
      testId : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证userId/id
      userName : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745',//认证手机号
      testToken : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : 'g/rQXcJmYpvkMdEpmTAuFqGLaiFpwgaTKdawaQTUPSA3tt49ezuH8afZXZOGT0TsNOmitsx8uQHbnmsiZMf7jDE3Ouy/kzfp2sMr7NIPbTtITBt6QAQqaIPNnhd1wiLp',//token
    }
  }
});

const router = new VueRouter({
  routes: [
    {path: '/', component: main },
    {path: '/unbundle', component: unbundle}//解绑输入资金密码
  ]
});

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
