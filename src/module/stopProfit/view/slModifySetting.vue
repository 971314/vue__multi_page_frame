<template>
  <div id="editStopOfFiled">
    <common-nav :search="false" :message="false" :service="false" :goback="false">
      <div slot="body">止损止盈</div>
    </common-nav>
    <div @click="addInfo()" class="navThreeTitle">添加</div>
    <div class="setDiv setStop">
      <div class="setOut">
        <a id="nativeUrl"></a>
        <ul>
          <li>
            <div class="setOne">合约</div>
            <div class="setTwo">
              <input type="text" class="inputText" v-model="stopFiledObj.hyName" readonly="true"/>
              <span>类型：</span>
              <span class="stopSpan1">{{stopFiledObj.Direction == 0 ? '卖开' : '买开'}}</span><br/>
              <span>开仓均价：</span>
              <span v-text="stopFiledObj.OpenPrice"></span>
            </div>
          </li>
          <li>
            <div class="setOne">数量</div>
            <input type="number" class="inputText " v-model="stopFiledObj.Volume" pattern="[0-9]*"/>
          </li>
          <li>
            <div class="setOne">止盈价</div>
            <input type="number" @blur="blurInfo(stopFiledObj.filedPrice)" class="inputText"
                   v-model="stopFiledObj.filedPrice"/>
          </li>
          <li>
            <div class="setOne">止损价</div>
            <input type="number" @blur="blurInfo(stopFiledObj.stopPrice)" class="inputText"
                   v-model="stopFiledObj.stopPrice"/>
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
    <div class="btnDiv conBtn">
      <button type="button" class="btnSubmit" data-toggle="button" @click="btnConfirmClick">
        保存
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        initAddBtn: true,//初始化按钮
        blueBtn: false,
        stopFiledObj: {
          conditionID: '',//条件单编号
          Direction: '',//方向//买卖方向  0 买 1 卖
          Volume: '',//数量
          OffsetFlag: '',//开平方向
          stopPrice: '',//止损价
          filedPrice: '',//止盈价
          ExchangeCode: '',//市场
          ContractCode: '',//品种
          hyName: '',
          TimeCondition: 1,         //有效期: 1-当日有效，2-永久有效
          ConditionChoiced: 1,      //当前选择条件：1-PositionStop（止损止盈模板）
          LimitPriceType: '',
          TodayFlag: "",//持仓均价
          DirectionObj: '',
          slName: '',
          PriceDecimal: null,
          TradeDate: null,//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
          HedgeFlag:''//投保标识
        },
        //有效期
        validPrice: true,
        validTime: false,
        userId: pbE.isPoboApp ? null : '10160',//云交易userId
        msgTip: '',
        msgInfo: '',
        XWLB: pbE.isPoboApp ? pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB') : '',
        addFlag: true,
        XWH: null,//席位号
        GDZG: null//股东账号
      }
    },
    created: function () {
      var _this = this;
      _this.getTradeInfo();
      if (pbE.isPoboApp) {
        _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);
      }
      //从原生入口编辑止损止盈时获取的详细信息
      var plantId = _this.$route.query.plantId;//市场代码
      if (plantId) {
        console.log('plantId');
        _this.stopFiledObj.conditionID = plantId;
        _this.$axios.post(_this.conditionUrl, {
          func: _this.conIdQuery,
          token: _this.token,
          id: _this.authId,
          orgCode: _this.orgCode,
          userID: _this.userId,
          type: _this.stopFiledType,
          data: [plantId],//条件单编号
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data.data);
          if (data.data) {
            var dataValue = JSON.parse(data.data[0].conditionValue);
            _this.stopFiledObj.slName = data.data[0].name;
            _this.stopFiledObj.hyName = data.data[0].HYMC;
            _this.stopFiledObj.Direction = dataValue.OrderAction.SmartOrder.Order.Direction;//买卖方向下单的
            console.log(_this.stopFiledObj.Direction, 'plantId');
            _this.stopFiledObj.TodayFlag = dataValue.AttachObject[0].TodayFlag;//今昨仓标志
            _this.stopFiledObj.Volume = dataValue.OrderAction.SmartOrder.Order.Volume;
            _this.stopFiledObj.TimeCondition = dataValue.TimeCondition; //有效期 1-当日有效，2-永久有效
            if (dataValue.TimeCondition == 2 || dataValue.TimeCondition == '2') {
              _this.validPrice = false;
              _this.validTime = true;
            } else {
              _this.validPrice = true;
              _this.validTime = false;
            }
            _this.stopFiledObj.TradeDate = dataValue.TradeDate;
            _this.stopFiledObj.stopPrice = dataValue.ConditionList[0].PositionStop.StopLossPrice;//绝对止损
            _this.stopFiledObj.filedPrice = dataValue.ConditionList[0].PositionStop.StopProfitPrice;//绝对止盈
            _this.stopFiledObj.OpenPrice = dataValue.AttachObject[0].OpenPrice;//开仓价
            _this.stopFiledObj.LimitPriceType = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;//委托价
            _this.stopFiledObj.ExchangeCode = dataValue.AttachObject[0].Contract.ExchangeCode;
            _this.stopFiledObj.ContractCode = dataValue.AttachObject[0].Contract.ContractCode;
            _this.stopFiledObj.DirectionObj = dataValue.AttachObject[0].Direction;//持仓方向
            _this.XWH = pbE.WT().wtGetXWH(_this.stopFiledObj.ExchangeCode);//席位号
            _this.GDZG = pbE.WT().wtGetGDZH(_this.stopFiledObj.ExchangeCode);//股东帐号
            _this.stopFiledObj.HedgeFlag = dataValue.AttachObject[0].HedgeFlag;//投保标识
          }
        }).catch(function (error) {
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
          console.log('服务器异常！')
        });
      } else {
        //取出从止损止盈列表进来要编辑修改的信息
        var data = _this.getStorageInfo("stopOfFiledObj");
        if (data) {
          var dataValue = JSON.parse(data);
          console.log(JSON.parse(data), 'stopOfFiledObj');
          var allContext = JSON.parse(JSON.parse(data)[0].conditionValue);

          _this.stopFiledObj.slName = dataValue[0].name;
          _this.stopFiledObj.hyName = dataValue[0].HYMC;
          _this.stopFiledObj.conditionID = dataValue[0].conditionID;
          var tempDataValue = JSON.parse(dataValue[0].conditionValue);
          _this.stopFiledObj.TimeCondition = tempDataValue.TimeCondition; //有效期 1-当日有效，2-永久有效
          if (tempDataValue.TimeCondition == 2 || tempDataValue.TimeCondition == '2') {
            _this.validPrice = false;
            _this.validTime = true;
          } else {
            _this.validPrice = true;
            _this.validTime = false;
          }
          _this.stopFiledObj.TradeDate = tempDataValue.TradeDate;
          _this.stopFiledObj.Volume = allContext.OrderAction.SmartOrder.Order.Volume;
          _this.stopFiledObj.Direction = allContext.OrderAction.SmartOrder.Order.Direction;
          _this.stopFiledObj.OffsetFlag = allContext.OrderAction.SmartOrder.Order.OffsetFlag;
          _this.stopFiledObj.LimitPriceType = allContext.OrderAction.SmartOrder.Order.LimitPriceType;
          _this.stopFiledObj.PriceDecimal = allContext.OrderAction.SmartOrder.Order.MiniPriceTick;//最小变动价位


          _this.stopFiledObj.OpenPrice = allContext.AttachObject[0].OpenPrice;//开仓价
          _this.stopFiledObj.stopPrice = allContext.ConditionList[0].PositionStop.StopLossPrice;//绝对止损
          _this.stopFiledObj.filedPrice = allContext.ConditionList[0].PositionStop.StopProfitPrice;//绝对止盈
          _this.stopFiledObj.ExchangeCode = allContext.Contracts[0].ExchangeCode;
          _this.stopFiledObj.ContractCode = allContext.Contracts[0].ContractCode;

          _this.stopFiledObj.TodayFlag = allContext.AttachObject[0].TodayFlag;//今昨仓
          _this.stopFiledObj.DirectionObj = allContext.AttachObject[0].Direction;//持仓方向
          _this.stopFiledObj.HedgeFlag = allContext.AttachObject[0].HedgeFlag;//投保标识
        }
        _this.XWH = pbE.WT().wtGetXWH(_this.stopFiledObj.ExchangeCode);//席位号
        _this.GDZG = pbE.WT().wtGetGDZH(_this.stopFiledObj.ExchangeCode);//股东帐号
      }
    },
    methods: {
      addInfo: function () {
        var _this = this;
        //缓存合约信息 添加时
        var obj = {
          HYMC: _this.stopFiledObj.hyName,
          Direction: _this.stopFiledObj.Direction,//买卖方向
          openPrice: _this.stopFiledObj.OpenPrice,
          Volume: _this.stopFiledObj.Volume,
          ExchangeCode: _this.stopFiledObj.ExchangeCode,
          ContractCode: _this.stopFiledObj.ContractCode,

          TodayFlag: _this.stopFiledObj.TodayFlag,//今昨仓标志
          DirectionObj: _this.stopFiledObj.DirectionObj,//方向
          PriceDecimal: _this.stopFiledObj.PriceDecimal,
          HedgeFlag:_this.stopFiledObj.HedgeFlag//投保标识
        };
        console.log(obj);
        _this.saveStorageInfo("addSlInfo", obj);
        if (pbE.isPoboApp) {
          _this.$router.replace({path: '/slAdd', query: {type: 3}});//添加页面
//          $("#nativeUrl").attr('href', 'pobo:uncheck=1&goback=0&pageId=900005&url=stopProfit/index.html#/slAdd?type=3');
//          if (_this.addFlag) {
//            window.setTimeout(function () {
//              $("#nativeUrl")[0].click();
//              _this.addFlag = true;
//            }, 1000)
//          }
//          _this.addFlag = false;
        } else {
          _this.$router.replace({path: '/slAdd', query: {type: 3}});//添加页面
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
        if (pbE.isPoboApp) {
          //查询交易日
          var allData = pbE.WT().wtLoginRe(_this.CID);
          if (allData) {
            var data = JSON.parse(allData).data;
            _this.stopFiledObj.TradeDate = data[0]['75']
          }
        }
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
      blurInfo: function (val) {
        //非空判断
        if (val != '') {
          let intReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
          if (!intReg.test(val)) {
            this.showMessage('请输入数字字符');
            val = '';
          } else {
            this.blueBtn = true;
            this.initAddBtn = false;
          }
        }
      },
      //修改
      btnConfirmClick: function () {
        var _this = this, isConnected = pbE.isPoboApp ? pbE.WT().wtGetIsConnected(this.CID) : '';
        _this.isConnected();
        if (this.stopFiledObj.filedPrice || this.stopFiledObj.stopPrice) {
          var data = new _this.stopOfFiled();
          data.Name = _this.stopFiledObj.slName;
          data.AttachObject[0].Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
          data.AttachObject[0].Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
          data.AttachObject[0].TodayFlag = _this.stopFiledObj.TodayFlag;
          data.AttachObject[0].EAccountId['67'] = _this.loginClass;//登录类别
          data.AttachObject[0].EAccountId['53'] = _this.accountClass;//账号类别
          data.AttachObject[0].EAccountId['249'] = _this.loginAccount;//登录账号;
          data.AttachObject[0].EAccountId['895'] = _this.orgCode;//机构代码
          data.AttachObject[0].EAccountId['879'] = _this.XWLB;//席位类别
          data.AttachObject[0].HedgeFlag = _this.stopFiledObj.HedgeFlag;//投保标识
          data.TimeCondition = _this.stopFiledObj.TimeCondition;//有效期 1-当日有效，2-永久有效
          data.TradeDate = _this.stopFiledObj.TradeDate;//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
          //从原生持仓里面获取
          data.AttachObject[0].OpenPrice = _this.stopFiledObj.OpenPrice * 1;//开仓价
          data.AttachObject[0].Direction = _this.stopFiledObj.DirectionObj;//持仓方向
          data.AttachObject[0].Volume = _this.stopFiledObj.Volume;//买卖数量
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
          //止损止盈条件参数
          data.ConditionList[0].PositionStop.StopLossPrice = Number(_this.stopFiledObj.stopPrice) ? Number(_this.stopFiledObj.stopPrice) : '';//止损价
          data.ConditionList[0].PositionStop.StopProfitPrice = Number(_this.stopFiledObj.filedPrice) ? Number(_this.stopFiledObj.filedPrice) : '';//止盈价
          //下单参数
          //data.OrderAction.SmartOrder.Order.EAccountId

          data.OrderAction.SmartOrder.Order.MiniPriceTick = _this.stopFiledObj.PriceDecimal;//最小变动价位
          data.OrderAction.SmartOrder.Order.Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
          data.OrderAction.SmartOrder.Order.Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
          data.OrderAction.SmartOrder.Order.Volume = _this.stopFiledObj.Volume;//买卖数量
          data.OrderAction.SmartOrder.Order.Direction = _this.stopFiledObj.Direction;//买卖方向

          data.OrderAction.SmartOrder.Order.ExtRawData['52'] = _this.GDZG;//股东账号
          data.OrderAction.SmartOrder.Order.ExtRawData['161'] = _this.XWH;//席位号
          data.OrderAction.SmartOrder.Order.ExtRawData['119'] = _this.stopFiledObj.HedgeFlag;//投保标识
          data.OrderAction.SmartOrder.Order.OffsetFlag = _this.stopFiledObj.OffsetFlag;//开平方向
          data.ConditionList[0].PositionStop.StopLossOrderPriceType = _this.stopFiledObj.LimitPriceType;
          data.ConditionList[0].PositionStop.StopProfitOrderPriceType = _this.stopFiledObj.LimitPriceType;
          data.OrderAction.SmartOrder.Order.LimitPriceType = _this.stopFiledObj.LimitPriceType;
          //登录账号类别   从原生读取
          data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
          data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
          data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
          data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.orgCode;//机构代码
          data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB;//席位类别
          data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId;//用户账号
          console.log(data, '止盈止损修改');
          if (isConnected) {
            if (_this.stopFiledObj.TimeCondition == '1' || _this.stopFiledObj.TimeCondition == 1) {
              if (_this.stopFiledObj.TradeDate && _this.stopFiledObj.TradeDate != '') {
                _this.reviseAjax(data);
              } else {
                _this.showMessage("修改失败!");
              }
            } else {
              _this.reviseAjax(data);
            }
          } else {
            _this.isConnected();
          }
        } else {
          _this.showMessage('请输入正确格式价格!');
        }
      },
      //修改请求
      reviseAjax(data) {
        var _this = this;
        _this.$loading.toggle(' ');//显示转圈
        _this.$axios.post(_this.conditionUrl, {
          func: _this.editCon,
          token: _this.token,
          id: _this.authId,
          orgCode: _this.orgCode,
          conditionID: _this.stopFiledObj.conditionID,
          userID: _this.userId,
          data: data,
          type: _this.stopFiledType,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          _this.$loading.hide();//隐藏转圈
          console.log(data);
          if (data.status == 0) {
            _this.showMessage(" 修改成功！", () => {
              window.location.href = 'goBack';
            }, 2);
            return;
          } else if (data.status == -7) {//首先要暂停才可以修改
            _this.$alert({
              maskClosable: true,
              message: data.msg,
              btns: [{
                text: '取消'
              }, {
                text: '去暂停',
                click() {
                  _this.$router.replace('/mobileList/1')
                }
              }],
            });
            return;
          } else {
            _this.showMessage(data.msg);
            return;
          }

          console.log(data.msg)
        }).catch(function (error) {
          _this.$loading.hide();//隐藏转圈
          _this.showMessage("服务器异常!");
          return;
        });
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
