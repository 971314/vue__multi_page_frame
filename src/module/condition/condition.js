import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import Axios from 'axios';
import VueRouter from 'vue-router';
import pbUI from '../../components';
import FastClick from 'fastclick';
import vueTap from '../adequacy/common/v-tap';
import VueTimepicker from 'vue2-timepicker';
import stateChange from '../alerted/components/mixin';
import methods from '../alerted/components/methods';
import alertModal from '../alerted/components/alert-modal.vue';


// 去掉ios上300毫秒延迟
FastClick.attach(document.body)

import Index from './index.vue';
//条件单
import conIndex from './view/index.vue'
import noneConList from './view/mobileList.vue';
import isConList from './view/pcList.vue';
import setCon from './view/setCon.vue';
import editCon from './view/editCon.vue';

Vue.use(VueRouter);
Vue.use(pbUI);
Vue.use(vueTap);
// Vue.use(wckeyBoard);

Vue.prototype.$axios = Axios;


//获取当前时间/去掉秒显示及二十四格式转换
Vue.prototype.timeCycle = function () {
  let dateH = new Date().toLocaleTimeString().substring(new Date().toLocaleTimeString().indexOf("午") + 1);
  let date24 = (Number(dateH.length == 8 ? dateH.substring(0, 2) : dateH.substring(0, 1)) + 12) + (dateH.length == 8 ? dateH.substring(2) : dateH.substring(1)),
    output;
  if (new Date().toLocaleTimeString().indexOf("上") == 0) {
    if (dateH.length == 7) {
      output = dateH.substring(0, 4);
    } else {
      output = dateH.substring(0, 5);
    }
  } else {
    output = date24.substring(0, 5);
  }
  return output;
};
//存储信息
Vue.prototype.saveStorageInfo = function (userName, obj) {
  if (pbE.isPoboApp) {
    pbE.SYS().storePrivateData(userName, JSON.stringify(obj));
  } else {
    sessionStorage.setItem(userName, JSON.stringify(obj))
  }
}
//获取保存的信息
Vue.prototype.getStorageInfo = function (userName) {
  if (pbE.isPoboApp) {
    return pbE.SYS().getPrivateData(userName)
  } else {
    return sessionStorage.getItem(userName)
  }
}
//条件单的设置属性
Vue.prototype.setConData = function () {
  this.Name = '';
  this.Id = "";  //条件单条件Id
  this.PlanId = {//计划任务号
    Type: "",
    Identity: "",
    "CheckSum": ""
  }
  this.Contracts = [ //可以有多个市场、品种,用于行情订阅和比价，
    {
      "ExchangeCode": "",     //市场  **行情端的市场代码 例如：2001
      "ContractCode": ""    //品种  **行情端代码，PBCODE  字符串
    }
  ]
  this.CreateTime = "";//条件单创建时间
  this.UpdateTime = "";//条件单更改时间
  this.TradeDate = "";//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日

  this.TimeCondition = ""; //有效期: 1-当日有效，2-永久有效
  this.ConditionChoiced = ""; //当前选择条件：1-价格，2-时间，3-开盘，4-手工
  this.ConditionList = [
    {
      "Price": {
        "Type": "最新价", //价格：最新价、买一价、卖一价
        "Operator": "",
        "Value": "",
        "Counter": 2, //连续次数
        "MatchedCounter": 0, // 已匹配次数,程序填写
        "Enabled": true
      }
    },
    {"Time": ""} //某个触发时间点
  ];
  this.OrderAction = { //下单参数
    "ActionType": 1, //1- 智能委托， 2 - 组合委托
    "SmartOrder": { //智能委托参数,仅在 "ActionType"= 1（组合委托）时有效
      "Id": "",   //智能委托ID（uuid）,下单前生成
      "PlanId": { //计划任务号
        "Type": "",
        "Identity": "",
        "CheckSum": ""
      },
      "ComboOrderId": "", //组合委托ID，如果不属于组合委托，这儿为空
      "SplitOrderEnable": false, //是否要拆单
      "ReorderEnable": false, //是否要追单
      "CancelOrderEnable": false, //是否要撤单

      "Order": { //委托参数
        "EAccountId": { //实体账号Id   注意这里要从原生读取值
          "Type": "EAccountID",
          "Generator": "KeyElements",
          "895": "",   //  澎博机构代码(STEP_PBJGDM)
          "879": "",   //  席位类别(STEP_XWLB)
          "67": "",              //  登录类别
          "53": "",              //  账号类别
          "249": ""            //  登录账号
        },
        "UserAccountID": "1111",    //  用户账号ID
        "Contract": { //品种
          "ExchangeCode": "", //市场
          "ContractCode": "" //品种
        },
        "Volume": "", //委托总数
        "Direction": "", //买卖方向
        "OffsetFlag": "", //开平标识
        "PriceType": "2", //价格类别: 市价、限价（类型）//暂且不考虑限价
        "LimitPriceType": "", //限价类型: 仅PriceType为“限价”时有本字段
        "LimitPriceOffset": 0, //限价超价，仅PriceType为“限价”时有本字段，仅LimitPriceType为“对手价”、“挂单价”、“最新价”、“涨停价”、“跌停价”时有意义
        "LimitPrice": "", //仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
        "AnyPriceType": "1", //市价类型，仅PriceType为“市价”时有本字段 1-POBO_TRADE_OPT_AnyPrice,3-POBO_TRADE_OPT_BestPrice,G-POBO_TRADE_OPT_FiveLevelPrice
        // "41": "3", //有效期类型(STEP_YXQLX)仅PriceType为“市价”时有本字段  1-POBO_TRADE_TC_IOC(立即完成，否则撤销)，3-POBO_TRADE_TC_GFD（当日有效）
        // "42": "1", //成交量类型(STEP_CJLLX)仅PriceType为“市价”时有本字段 1-POBO_TRADE_VC_AV（任意数量）,2-POBO_TRADE_VC_MV(最小)
        // "OutFactorFalg": false, //全局参数,外部撤单，是否继续追单
        "ExtRawData": //参考STEP协议，投保标记、备兑标记，等等，直接复制到下单参数中
          {
            "119": "1",//投保标志
            "52": "",//股东账号
            "164": "mobile_yun",//下单原因
            "127": "0",//市价委托类别
            "125": "0",//期权备兑标志
            "161": "",//席位号
            "41": '3',//有效期类型
            "42": "1",//成交量类型
            "495": "1",//触发条件
            "683": "0"//组合类型
          },
        "MiniPriceTick": 1.0 //最小变动价位
      }
    }
  }
};

let deviceRelated = pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255: "3", jgid: "1995"}, os;
if (deviceRelated['255'] == '2') {
  os = 'IOS';
} else if (deviceRelated['255'] == '3') {
  os = 'android';
} else {
  os = '';
}
Vue.mixin(Object.assign({
  data() {
    return {
      conditionUrl: PBHttpServer.condition.serverUrl,
      // conditionUrl: 'http://101.226.207.142:9080/mockjsdata/5/cloud_trade/1_0',
      noneConTouch: "1005",//未触发
      isConTouch: "1004",//已触发
      addContract: "1002",
      conStopOrOn: "1007",//暂停或继续
      delCon: "1003",//删除
      conIdQuery: "1013",//根据条件单编号，查询条件单信息
      editCon: "1006",//编辑条件单的设置
      PaasFun: '1020',
      loginAccount: null,//登录账号
      accountClass: null,//账号类别
      loginClass: null,//登陆类别
      CID: null,//交易CID
      token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '18292320745',//token
      authId: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证的id
      orgCode: deviceRelated.jgid,//机构编号
      os: os,//手机系统
      marketSHFE: 'SHFE',//上海期货
      marketBOCE: 'BOCE',//渤海商品交易所
      marketHXCE: 'HXCE',//华西村
      marketWXBXG: 'WXBXG',//无锡不锈钢
      marketQDGCXH: 'QDGCXH',//果菜现货
      numRex: /^\d+(\.\d+)?$/,
      contractType: '1',
      aaa: null
    }
  }
}, stateChange, methods));
const Baz = {template: '<span></span>'}
let router = new VueRouter({
  routes: [
    {//条件单
      path: '/', component: conIndex,
      children: [
        {path: 'mobileList/:id', components: {a: noneConList}},//移动
        {path: 'pcList/:id', components: {a: isConList}},//pc
        {path: 'setCon/:id', components: {a: setCon}},//设置
        {path: 'editCon/:id', components: {b: editCon}},//修改
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (pbE.isPoboApp) {
    var cId_boyi;
    let transaction = pbE.WT().wtGetConnectionAccountInfo();
    if (transaction) {
      transaction = JSON.parse(transaction)
      for (let n = 0; n < transaction.length; n++) {
        if (transaction[n].PbKey_Trade_Login_Type == '8') {
          cId_boyi = transaction[n].PbKey_Trade_Login_CID;
          next();
        }
      }
    } else {
      alert('交易已退出');
      // location.href = 'close';
    }
  } else {
    next();
  }
});

Vue.component(VueTimepicker.name, VueTimepicker);
Vue.component(alertModal.name, alertModal);
new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
