/**
 * Created by xiajing on 2017/2/16.
 */
import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import FastClick from 'fastclick';
import vueTap from '../adequacy/common/v-tap';
import methods from './components/methods';
import AlertModal from "./components/alert-modal.vue";


import main from './view/index.vue';
import alertShezhi from './view/alertShezhi.vue';
import mobile from './view/mobileList.vue';
import pc from './view/pcList.vue';
import pbUI from '../../components';
import Axios from 'axios';
import VueRouter from 'vue-router';
import stateChange from './components/mixin';

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);



Vue.use(VueRouter);
Vue.use(pbUI);
Vue.use(vueTap);
Vue.prototype.$axios = Axios;
Vue.prototype.alertInsert = function () {
  this.Stock = {MarketID:null,PBCode:''};
  this.ConditionChoiced = 1;
  this.ConditionList = [{
    PriceUpLimit:{Enabled:false,Value:'--'},
    PriceDownLimit:{Enabled:false,Value:'--'},
    CurVolUpLimit:{Enabled:false,Value:'--'},
    VolumeUpLimit:{Enabled:false,Value:'--'},
    AmountUpLimit:{Enabled:false,Value:'--'},
    TurnOverUpLimit:{Enabled:false,Value:'--'}
  }];
};

 let deviceRelated = pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255:"3",jgid:"1995"},os;
if (deviceRelated['255'] == '2') {
  os = 'IOS';
} else if (deviceRelated['255'] == '3') {
  os = 'android';
}else{
  os = '123'
}
Vue.mixin(Object.assign({
  data() {
    return {
      conditionUrl : PBHttpServer.condition.serverUrl,
      // conditionUrl: 'http://101.226.207.142:9080/mockjsdata/5/cloud_trade/1_0',
      alertType : '3',//预警type
      testId : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证userId/id
      userName : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745',//认证手机号
      token : pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '123456',//token
      orgCode : deviceRelated.jgid,//机构编码
      os:os,
      conStopOrOn: "1007",//暂停或继续
      conIdQuery: "1013",//根据条件单编号，查询条件单信息
      contractType: "1",//1表示条件单
      PaasFun:'1020'
    }
  }
},stateChange,methods));

let router = new VueRouter({
  routes:[
    { path:'/',component: main,
      children:[
        {path:'mobileList/:id',component:mobile},
        {path:'pcList/:id',component:pc},
        {path:'alert/:id',component:alertShezhi}
      ]
    }
  ]
});
Vue.component(AlertModal.name,AlertModal);
const app = new Vue({ router}).$mount('#app');
