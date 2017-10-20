<template>
  <div id="setStopOfFiled">
    <common-nav :search="false" :message="false" :service="false" :goback="false">
      <div slot="body">止损止盈</div>
    </common-nav>
    <span @click="resetClick()" class="navThreeTitle">重置</span>
    <div class="setDiv setStop">
      <div class="setOut">
        <ul>
          <li>
            <div class="setOne">合约</div>
            <div class="setTwo">
              <input type="text" class="inputText" v-model="stopFiledObj.hyName" readonly="true"/>
              <span>类型：</span>
              <span class="stopSpan1" v-text="directionValue"></span><br/>
              <span>开仓均价：</span>
              <span v-text="positionPrice"></span>
            </div>
          </li>
          <li>
            <div class="setOne">数量</div>
            <input type="number" class="inputText" v-model="stopFiledObj.Volume" pattern="[0-9]*"/>
          </li>
          <li>
            <div class="setOne">止盈价</div>
            <input type="number" class="inputText" v-model="stopFiledObj.filedPrice"
                   @blur="verifyDecimal(stopFiledObj.filedPrice)" id="ying"/>
          </li>
          <li>
            <div class="setOne">止损价</div>
            <input type="number" class="inputText" v-model="stopFiledObj.stopPrice"
                   @blur="verifyDecimal(stopFiledObj.filedPrice)"/>
          </li>
          <li>
            <div class="setOne">委托价</div>
            <span class="stopSelect"
                  @click="priceSelectClick">{{stopFiledObj.LimitPriceType ? stopFiledObj.LimitPriceType : '---'}}</span>
          </li>
          <li>
            <div class="conOne">有效期</div>
            <div class="conTwo">
              <span class="conSpanThree" :class="{backColor:validPrice}" @click="validDateClick(0)">当日</span>
              <span class="conSpanTwo" :class="{backColor:validTime}" @click="validDateClick(1)">永久</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btnDiv" v-if="initAddBtn">
      <button type="button" class="btnSubmitFFF" data-toggle="button">
        添加
      </button>
    </div>
    <div class="btnDiv conBtn" v-else="">
      <button type="button" class="btnSubmit" data-toggle="button" @click="btnConfirmClick">
        添加
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        initAddBtn: true,//初始化按钮
        stopFiledObj: {
          Direction: '',//买卖方向  0 买 1 卖
          Volume: '',//数量
          OffsetFlag: '1',//开平方向0，1,2 开仓，平仓，平今  注：默认给 0 开仓
          stopPrice: '',//止损价
          filedPrice: '',//止盈价
          ExchangeCode: '',//市场
          ContractCode: '',//品种
          hyName: '',
          TimeCondition: 1,         //有效期: 1-当日有效，2-永久有效
          ConditionChoiced: 1,      //当前选择条件：1-PositionStop（止损止盈模板）
          LimitPriceType: '对手价',
          OpenPrice: '',//开仓价
          TradeDate: '',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
          TodayFlag: '',//今昨仓
          DirectionObj: '',//持仓方向
          PriceDecimal: null,//最小变动价位
          HedgeFlag: ''//投保标识
        },
        directionValue: '',//买卖方向  0 买 1 卖
        positionPrice: '--',//持仓均价
        msgTip: '',
        tipNum: '',
        WTInfo: {//获取当前所选交易的合约名称
          wtCode: '',
          wtMarket: '',
        },
        HQInfo: {//获取当前所选行情的合约名称
          hqCode: '',
          hqMarket: ''
        },
        //有效期
        validPrice: true,
        validTime: false,
        userId: pbE.isPoboApp ? null : '10160',//云交易userId
        XWLB: pbE.isPoboApp ? pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB') : '',
        stopLessType: this.$route.query.type,
        XWH: null,//席位号
        GDZG: null//股东账号
      }
    },
    created: function () {//交易合约
      var _this = this;
      _this.WTInfo.wtCode = _this.$route.query.wtCode;
      _this.WTInfo.wtMarket = _this.$route.query.wtMarket;
      //行情合约
      _this.HQInfo.hqCode = _this.$route.query.hqCode;
      _this.HQInfo.hqMarket = _this.$route.query.hqMarket;
      var direction = _this.$route.query.direction;//买卖方向
      var todayFlag = _this.$route.query.todayFlag;//今昨仓 （0：总仓，1：今仓，2：昨仓）
      _this.getTradeInfo();
      _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
      //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
      if (!_this.userId) {
        _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
      }
      var data = _this.getStorageInfo('addSlInfo');
      if (pbE.isPoboApp) {
        if (_this.WTInfo.wtCode || _this.HQInfo.hqCode) {
          if (_this.WTInfo.wtCode && _this.WTInfo.wtMarket) {
            var tradeHq = pbE.WT().wtGetHQInfo(_this.WTInfo.wtCode, _this.WTInfo.wtMarket);//交易信息转换行情信息
            _this.stopFiledObj.PriceDecimal = _this.minPrice(_this.CID, _this.WTInfo.wtCode, _this.WTInfo.wtMarket);//最小变动价位
            _this.XWH = pbE.WT().wtGetXWH(_this.HQInfo.hqCode);//席位号
            _this.GDZG = pbE.WT().wtGetGDZH(_this.HQInfo.hqCode);//股东帐号
            if (tradeHq) {
              var data = JSON.parse(tradeHq);
              _this.stopFiledObj.hyName = data.HQName;//合约名称
              _this.stopFiledObj.ExchangeCode = _this.WTInfo.wtMarket;//合约市场
              _this.stopFiledObj.ContractCode = _this.WTInfo.wtCode;//合约品种
            }
          } else if (_this.HQInfo.hqCode && _this.HQInfo.hqMarket) {
            var tradeWT = pbE.HQ().hqGetWTInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket, _this.CID);//行情信息转换交易信息
            var nameJson = pbE.HQ().getHQInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket);//
            if (tradeWT || nameJson) {
              var data = JSON.parse(tradeWT);
              _this.stopFiledObj.PriceDecimal = _this.minPrice(_this.CID, data.WTCode, data.WTMarket);//最小变动价位
              _this.XWH = pbE.WT().wtGetXWH(data.WTMarket);//席位号
              _this.GDZG = pbE.WT().wtGetGDZH(data.WTMarket);//股东帐号
              _this.stopFiledObj.ExchangeCode = data.WTMarket;//合约市场
              _this.stopFiledObj.ContractCode = data.WTCode;//合约品种
              var dataName = JSON.parse(nameJson);
              _this.stopFiledObj.hyName = dataName.name;
            }
          }
          _this.stopFiledObj.DirectionObj = direction;//持仓方向

          //查询全部持仓
          var allData = pbE.WT().wtQueryStockRe(_this.CID);
          if (allData) {
            var list = JSON.parse(allData).data;
            console.log(list, '持仓');
            //market：市场，code：合约代码，direction：买卖方向，todayFlag：今昨仓 （0：总仓，1：今仓，2：昨仓） 手机上传过来的值
            for (var i = 0; i < list.length; i++) {
              //list[i]['503'] ‘0’总仓  ‘2’昨仓 ‘1’今仓
              var tyDay;
              var saveDay;
              if (todayFlag == 1 && list[i]['503'] == 1) {//表示是今仓
                tyDay = 1;
                saveDay = '2';
                _this.stopFiledObj.OffsetFlag = '2'
              } else if (todayFlag == 2 && list[i]['503'] == 2) {//表示是昨仓
                tyDay = 2;
                saveDay = '1';
                _this.stopFiledObj.OffsetFlag = '1'
              } else if (todayFlag == 0 && list[i]['503'] != 1 || list[i]['503'] != 2) {//表示总仓
                tyDay = 0;
                saveDay = '0';
                _this.stopFiledObj.OffsetFlag = '1'
              }

              if (_this.stopFiledObj.ContractCode == list[i]['63'] && _this.stopFiledObj.ExchangeCode == list[i]['54'] && direction == list[i]['112'] && todayFlag == tyDay) {
                if (list[i]['112'] == 0) {
                  _this.directionValue = "买开";
                  _this.stopFiledObj.Direction = 0
                } else if (list[i]['112'] == 1) {
                  _this.directionValue = "卖开";
                  _this.stopFiledObj.Direction = 1
                } else {
                  _this.directionValue = "----";
                }
                _this.positionPrice = list[i]['136'] * 1;//开仓均价
                _this.stopFiledObj.Volume = list[i]['137'];//可用数量
                _this.tipNum = list[i]['137'];//可用数量
                _this.stopFiledObj.OpenPrice = list[i]['136'];//开仓价
                _this.stopFiledObj.TodayFlag = saveDay;//今昨仓
                _this.stopFiledObj.HedgeFlag = list[i]['119'] == 3 ? list[i]['119'] : '1';
                console.log(list[i]['119'],'投保标识');
              }
            }
          }
        } else if (data) {
          var list = JSON.parse(data);
          console.log(list)
          _this.stopFiledObj.hyName = list.HYMC;
          var value;
          if (list.Direction == 0) {
            value = '买开'
          } else if (list.Direction == 1) {
            value = '卖开'
          }
          _this.directionValue = value;
          _this.positionPrice = list.openPrice;
          _this.stopFiledObj.Volume = list.Volume;
          _this.XWH = pbE.WT().wtGetXWH(list.ExchangeCode);//席位号
          _this.GDZG = pbE.WT().wtGetGDZH(list.ExchangeCode);//股东帐号
          _this.stopFiledObj.ExchangeCode = list.ExchangeCode;//合约市场
          _this.stopFiledObj.ContractCode = list.ContractCode;//合约品种
          _this.stopFiledObj.Direction = list.Direction;//买卖方向
          _this.stopFiledObj.OpenPrice = list.openPrice;//开仓价
          _this.stopFiledObj.TodayFlag = list.TodayFlag;//今昨仓标志
          _this.stopFiledObj.DirectionObj = list.DirectionObj;//持仓方向
          _this.stopFiledObj.PriceDecimal = list.PriceDecimal;
          _this.stopFiledObj.HedgeFlag = list.HedgeFlag;//投保标识
        }
        console.log(_this.stopFiledObj, 'stopFiledObj');
        //查询交易日
        var allData = pbE.WT().wtLoginRe(_this.CID);
        if (allData) {
          var data = JSON.parse(allData).data;
          _this.stopFiledObj.TradeDate = data[0]['75']
        }
      }
    },
    watch: {
      //非空判断
      'stopFiledObj.filedPrice': function (newVal) {
        this.stopFiledObj.filedPrice = newVal;
        this.checkDemo(newVal);
      },
      'stopFiledObj.stopPrice': function (newVal) {
        this.stopFiledObj.stopPrice = newVal;
        this.checkDemo(newVal);
      },
    },
    methods: {
      checkDemo(value) {
        let intReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
        if (!isNaN(value)) {
          this.initAddBtn = false;
        } else {
          this.showMessage('请输入数字字符');
          this.initAddBtn = true;
        }
      },
      priceInfoClick: function (name) {
        if (name == 1) {//涨停价
          this.stopFiledObj.LimitPriceType = '涨停价'
        }
        if (name == 2) {//跌停价
          this.stopFiledObj.LimitPriceType = '跌停价'
        }
        if (name == 3) {//对手价
          this.stopFiledObj.LimitPriceType = '对手价'
        }
        if (name == 4) {//最新价
          this.stopFiledObj.LimitPriceType = '最新价'
        }
      },
      //条件单设置中有效期  切换样式
      validDateClick: function (flag) {
        var _this = this;
        //  1-当日有效，2-永久有效
        if (flag == 0) {//当日
          _this.validPrice = true;
          _this.validTime = false;
          _this.stopFiledObj.TimeCondition = 1;
        }
        if (flag == 1) {//永久
          _this.validPrice = false;
          _this.validTime = true;
          _this.stopFiledObj.TimeCondition = 2;
        }
      },
      //添加
      btnConfirmClick: function () {
        var _this = this, isConnected = pbE.isPoboApp ? pbE.WT().wtGetIsConnected(this.CID) : '';
        if (parseInt(_this.stopFiledObj.Volume) > parseInt(_this.tipNum)) {
          //弹出提示信息
          _this.showMessage("输入的数量不能大于当前的数量！");
          return;
        }
        if (!_this.userId) {
          _this.showMessage("userId不能为空！");
          return;
        }
        var data = new _this.stopOfFiled();
        data.Name = _this.stopFiledObj.hyName + '的' + _this.directionValue + '止盈止损';
        data.AttachObject[0].Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
        data.AttachObject[0].Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
        data.AttachObject[0].TodayFlag = _this.stopFiledObj.TodayFlag;//今昨仓
        data.AttachObject[0].EAccountId['67'] = _this.loginClass;//登录类别
        data.AttachObject[0].EAccountId['53'] = _this.accountClass;//账号类别
        data.AttachObject[0].EAccountId['249'] = _this.loginAccount;//登录账号;
        data.AttachObject[0].EAccountId['895'] = _this.orgCode;//机构代码
        data.AttachObject[0].EAccountId['879'] = _this.XWLB;//席位类别
        data.AttachObject[0].HedgeFlag = _this.stopFiledObj.HedgeFlag;//投保标识
        //从原生持仓里面获取
        data.TimeCondition = _this.stopFiledObj.TimeCondition;//有效期 1-当日有效，2-永久有效
//        if(data.TimeCondition == '1' || data.TimeCondition == 1){
        data.TradeDate = _this.stopFiledObj.TradeDate;//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
//        }
        data.AttachObject[0].OpenPrice = _this.stopFiledObj.OpenPrice * 1;//开仓价
        data.AttachObject[0].Volume = parseInt(_this.stopFiledObj.Volume);//买卖数量
        data.Contracts[0] = {
          ExchangeCode: _this.stopFiledObj.ExchangeCode,//市场
          ContractCode: _this.stopFiledObj.ContractCode//品种
        };
        if (_this.stopFiledObj.stopPrice) {
          data.ConditionList[0].PositionStop.AbsoluteStopLoss = true;//绝对价格止损是否启用
        }
        if (_this.stopFiledObj.filedPrice) {
          data.ConditionList[0].PositionStop.AbsoluteStopProfit = true;//绝对价格止盈是否启用
        }
        if (_this.stopFiledObj.stopPrice && _this.stopFiledObj.filedPrice) {
          data.ConditionList[0].PositionStop.AbsoluteStopLoss = true;//绝对价格止损是否启用
          data.ConditionList[0].PositionStop.AbsoluteStopProfit = true;//绝对价格止盈是否启用
        }
        //止损止盈条件参数

        data.OrderAction.SmartOrder.Order.MiniPriceTick = _this.stopFiledObj.PriceDecimal;
        //止损价
        data.ConditionList[0].PositionStop.StopLossPrice = Number(_this.stopFiledObj.stopPrice) ? Number(_this.stopFiledObj.stopPrice) : '';
        //止盈价
        data.ConditionList[0].PositionStop.StopProfitPrice = Number(_this.stopFiledObj.filedPrice) ? Number(_this.stopFiledObj.filedPrice) : '';
        //下单参数
        //data.OrderAction.SmartOrder.Order.EAccountId
        data.OrderAction.SmartOrder.Order.Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
        data.OrderAction.SmartOrder.Order.Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
        data.OrderAction.SmartOrder.Order.Volume = parseInt(_this.stopFiledObj.Volume);//买卖数量
        data.OrderAction.SmartOrder.Order.ExtRawData['52'] = _this.GDZG;//股东账号
        data.OrderAction.SmartOrder.Order.ExtRawData['161'] = _this.XWH;//席位号
        data.OrderAction.SmartOrder.Order.ExtRawData['119'] = _this.stopFiledObj.HedgeFlag;//投保标识
        if (_this.stopLessType == 3) {//表示在编辑页面重复添加这时下单的方向就不用相反直接取值
          console.log("3:里面的方向" + _this.stopFiledObj.Direction);
          data.AttachObject[0].Direction = _this.stopFiledObj.DirectionObj;//持仓方向
          data.OrderAction.SmartOrder.Order.Direction = _this.stopFiledObj.Direction + '';//买卖方向  下单时方向相反
        } else {
          var openWay;//下单的时候方向相反
          if (_this.stopFiledObj.Direction == 0) {//买
            openWay = '1';
          } else if (_this.stopFiledObj.Direction == 1) {//卖
            openWay = '0';
          }
          data.OrderAction.SmartOrder.Order.Direction = openWay;//买卖方向  下单时方向相反
          data.AttachObject[0].Direction = _this.stopFiledObj.DirectionObj + '';//持仓方向
        }
        data.OrderAction.SmartOrder.Order.OffsetFlag = _this.stopFiledObj.OffsetFlag;//开平方向
        data.ConditionList[0].PositionStop.StopLossOrderPriceType = _this.stopFiledObj.LimitPriceType + "";
        data.ConditionList[0].PositionStop.StopProfitOrderPriceType = _this.stopFiledObj.LimitPriceType + "";
        data.OrderAction.SmartOrder.Order.LimitPriceType = _this.stopFiledObj.LimitPriceType + "";
        //登录账号类别   从原生读取
        data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
        data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
        data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
        data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.orgCode;//机构代码
        data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB;//席位类别
        data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId;//用户账号
        console.log(data, '添加');
        if (isConnected) {
          if (_this.stopFiledObj.TimeCondition == '1' || _this.stopFiledObj.TimeCondition == 1) {
            console.log(_this.stopFiledObj.TimeCondition, _this.stopFiledObj.TradeDate, '123')
            if (_this.stopFiledObj.TradeDate && _this.stopFiledObj.TradeDate != '') {
              if (_this.stopFiledObj.filedPrice || _this.stopFiledObj.stopPrice) {
                this.addAjax(data);
              } else {
                _this.showMessage("请输入正确格式价格!");
              }
            } else {
              _this.showMessage("交易已退出!");
//            location.href = 'pobo:uncheck=1&pageId=802002'
            }
          } else {
            if (_this.stopFiledObj.filedPrice || _this.stopFiledObj.stopPrice) {
              this.addAjax(data);
            } else {
              _this.showMessage("请输入正确格式价格!");
            }
          }
        } else {
          _this.isConnected();
        }

      },
      //添加请求
      addAjax(data) {
        var _this = this;
        _this.$loading.toggle(' ');//显示转圈
        _this.$axios.post(_this.conditionUrl, {
          func: _this.addContract,
          token: _this.token,
          id: _this.authId,
          name: data.Name,//条件单名称
          HYMC: _this.stopFiledObj.hyName,
          type: _this.stopFiledType,
          terminal: '',
          userID: _this.userId,
          subType: _this.stopFiledObj.TimeCondition + "",
          orgCode: _this.orgCode,
          data: data,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data)
          if (data.status == 0) {
            _this.$loading.hide();//隐藏转圈
            _this.showMessage("设置成功!", () => {
              _this.$router.replace('/mobileList/1');
            }, 2);
            return;
          } else {
            _this.$loading.hide();//隐藏转圈
            _this.showMessage(data.msg);
            return;
          }
        }).catch(function (error) {
          _this.$loading.hide();//隐藏转圈
          _this.showMessage("服务器异常");
          console.log("服务器异常！")
          return;
        });
      },
      //重置信息
      resetClick: function () {
        this.stopFiledObj.Volume = '';
        this.stopFiledObj.filedPrice = '';
        this.stopFiledObj.stopPrice = '';
      },
      //价格选择事件
      priceSelectClick() {
        let _this = this;
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '涨停价',
            click() {
              _this.priceInfoClick(1)
            }
          },
            {
              text: '跌停价',
              click() {
                _this.priceInfoClick(2)
              }
            },
            {
              text: '对手价',
              click() {
                _this.priceInfoClick(3)
              }
            },
            {
              text: '最新价',
              click() {
                _this.priceInfoClick(4)
              }
            }]
        });
      }
    }
  }
</script>
