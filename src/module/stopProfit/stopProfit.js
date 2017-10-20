import 'lib-flexible'; //引入阿里js布局
import Vue from 'vue';
import Axios from 'axios';
import VueRouter from 'vue-router';
import pbUI from '../../components';
import FastClick from 'fastclick';
import vueTap from '../adequacy/common/v-tap';
import stateChange from '../alerted/components/mixin';
import methods from '../alerted/components/methods';
import filters from '../alerted/components/filters';

// 去掉ios上300毫秒延迟
FastClick.attach(document.body)

import Index from './index.vue';
//止损止盈
import slIndex from './view/index.vue';
import noneSlList from './view/mobileList.vue';
import isSlList from './view/pcList.vue';
import slAdd from './view/slAddSettings.vue';
import slmodify from './view/slModifySetting.vue';


Vue.use(VueRouter);
Vue.use(pbUI);
Vue.use(vueTap);

Vue.prototype.$axios = Axios;


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
//止损止盈的设置
Vue.prototype.stopOfFiled = function () {
  this.Name = '';
  this.AttachObject = [// 止损止盈规则的绑定对象，支持数组，表示对组合持仓进行止损止盈
    {
      "EAccountId": { //实体账号Id
        "Type": "EAccountID",   //  ID类型
        "Generator": "KeyElements",
        "67": "",              //  登录类别
        "53": "",              //  账号类别
        "249": "",            //  登录账号
        "895": "",   //  澎博机构代码(STEP_PBJGDM)
        "879": "",   //  席位类别(STEP_XWLB)
      },
      "Contract": {
        "ExchangeCode": "", //市场
        "ContractCode": "" //品种
      },
      "Direction": "0",   //  方向
      "Volume": 0,        //  数量
      "OpenPrice": 45600, //  开仓价，浮点数，不带放大倍率
      "HedgeFlag": "",   //  投保标记，参见交易协议中STEP_TBBZ
      "TodayFlag": "0",   //  今昨仓标记，参见交易协议中STEP_JZCBZ
      //  可能还需要别的键值，将来发现再加
    }
  ],
    this.Contracts = [      //  与AttachObject中合约相同，用于快速订阅
      {
        "ExchangeCode": "", //市场
        "ContractCode": "" //品种
      }
    ],
    this.CreateTime = "", //创建时间
    this.UpdateTime = "", //条件单更改时间
    this.TradeDate = "",  //交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
    this.TimeCondition = 1,         //有效期: 1-当日有效，2-永久有效
    this.ConditionChoiced = 1,      //当前选择条件：1-PositionStop（止损止盈模板）
    this.ConditionList = [ //条件列表
      {
        "PositionStop": {   //止损止盈条件参数

          //  止损参数
          "StopLossCheckPriceType": "最新价",     //  最新价，对手价，挂单价
          "StopLossCheckPriceCount": 2,
          "StopLossOrderPriceType": "最新价",     //  最新价，对手价，挂单价，停板价，止损价
          "StopLossOrderPriceOffset": 0,

          //  止盈参数
          "StopProfitCheckPriceType": "最新价",   //  最新价，对手价，挂单价
          "StopProfitCheckPriceCount": 2,
          "StopProfitOrderPriceType": "最新价",   //  最新价，对手价，挂单价，停板价，止盈价
          "StopProfitOrderPriceOffset": 0,

          //  绝对止损
          "AbsoluteStopLoss": false,      //绝对价格止损是否启用
          "StopLossPrice": 0.0,        //绝对止损价，0.0表示不启用绝对价格止损
          "FlowPrice": 0,               //绝对价止损浮动价格，0表示不启用绝对价止损的浮动功能
          //  绝对止盈
          "AbsoluteStopProfit": false,   //绝对价格止盈是否启用
          "StopProfitPrice": 0.0,        //绝对止盈价，0.0表示不启用绝对价格止盈

          //  相对止损
          "RelativeStopLoss": false,     //相对价格止损是否启用
          "StopLossPercent": 0.0,        //相对止损百分比，0.0表示不启用相对止损
          "FlowPercent": 0.0,            //相对止损浮动百分比，0.0表示不启用相对止损的浮动功能
          //  相对止盈
          "RelativeStopProfit": false,   //相对价格止盈是否启用
          "StopProfitPercent": 0.0,      //相对止盈百分比，0.0表示不启用相对止盈
          "FallbackPercent": 0.0,        //回撤百分比，0.0表示不启用相对止盈的回撤功能
          "FallbackRelativePercent": 0.0 //回撤上涨幅度的百分比，0.0表示不启用相对止盈的相对回撤功能
        }
      }
    ],
    this.OrderAction = { //下单参数
      "ActionType": 1, //1- 智能委托
      "SmartOrder": { //智能委托参数,仅在 "ActionType"= 1（智能委托）时有效
        "SplitOrderEnable": false, //是否要拆单
        "ReorderEnable": false, //是否要追单
        "CancelOrderEnable": false, //是否要撤单

        "Order": { //委托参数
          "MiniPriceTick": 1.0, //最小变动价位
          "EAccountId": { //实体账号Id
            "Type": "EAccountID",   //  ID类型
            "Generator": "KeyElements",
            "895": "",   //  澎博机构代码(STEP_PBJGDM)
            "879": "",   //  席位类别(STEP_XWLB)
            "67": "",              //  登录类别
            "53": "",              //  账号类别
            "249": ""            //  登录账号
          },
          "UserAccountID": "",    //  用户账号ID
          "Contract": { //品种
            "ExchangeCode": "", //市场
            "ContractCode": "" //品种
          },
          "Volume": 55, //委托总数
          "Direction": "0", //买卖方向
          "OffsetFlag": "1", //开平标识
          "PriceType": "2", //价格类别: 1-市价、2-限价
          "LimitPriceType": "", //限价类型: 仅PriceType为"2"（限价）时有本字段
          "LimitPriceOffset": 0, //限价超价，仅PriceType为"2"（限价）时本字段有效，仅LimitPriceType为"对手价"、"挂单价"、"最新价"、"涨停价"、"跌停价"时有意义
          "LimitPrice": "", //仅PriceType为"2"（限价）时本字段有效，仅LimitPriceType为"CustomPrice"（指定价格）时有意义
          "IgnoreAccidentCancel": false,    //  全局参数：被意外撤单时是否继续追单（是否忽略意料之外的撤单）
          "ExtRawData": //参考STEP协议，投保标记、备兑标记、市价相关参数，等等，直接复制到下单参数中
            {   //  以下仅为举例
              "119": "",//投保标志
              "52": "",//股东账号
              "164": "mobile_yun",//下单原因
              "127": "0",//市价委托类别
              "125": "0",//期权备兑标志
              "161": "",//席位号
              "41": '3',//有效期类型
              "42": "1",//成交量类型
              "495": "1",//触发条件
              "683": "0"//组合类型
            }
        }
      }
    }
};

let deviceRelated = pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()) : {255: "3", jgid: "1998"}, os;
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
      stopFiledType: "2",//止损止盈
      loginAccount: null,//登录账号
      accountClass: null,//账号类别
      loginClass: null,//登陆类别
      CID: null,//交易CID
      token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '111',//token
      authId: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证的id
      orgCode: deviceRelated.jgid,//机构编号
      os: os,//手机系统
      marketSHFE: 'SHFE',//上海期货
      marketBOCE: 'BOCE',//渤海商品交易所
      marketHXCE: 'HXCE',//华西村
      marketWXBXG: 'WXBXG',//无锡不锈钢
      marketQDGCXH: 'QDGCXH',//果菜现货
      PaasFun: '1020',//制定平台
    }
  }
}, stateChange, methods));

Vue.filter('verifydecimal', function (value) {
  let intReg = /^[\-\+]?\d+(\.\d)$/;
  if (!intReg.test(value)) {
    this.showMessage('请输入数字字符');
  }
});
let router = new VueRouter({
  routes: [
    {
      path: '/', component: slIndex,
      children: [
        {path: '/mobileList/:id', component: noneSlList},//移动
        {path: '/pcList/:id', component: isSlList},//pc
      ]
    },
    {path: '/slAdd', component: slAdd},//止损止盈添加
    {path: '/slmodify', component: slmodify}//止损止盈修改/编辑
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
new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
