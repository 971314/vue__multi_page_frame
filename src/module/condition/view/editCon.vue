<template>
  <div style="padding-top: 44px">
    <span @click="gotoSet()" class="navThreeTitle"
          style="position: fixed; top: 13px; right: 10px; z-index: 1030;">添加</span>
    <div class="setDiv">
      <div class="setOut">
        <ul>
          <li>
            <div class="setDivOne">{{editQueryInfo.selectContractName ? editQueryInfo.selectContractName : '---'}}</div>
            <div class="setDivTwo">最新：<span class="setDivThree" id="newPrice">--</span></div>
          </li>
          <li>
            <div class="conOne">
              条件单名称
            </div>
            <input class="setDivOne" type="text" placeholder="条件单名称" v-model="editQueryInfo.conditionEditName"/>
          <li>
            <div class="conOne">有效期</div>
            <div class="conTwo">
              <span class="conSpanThree" :class="{backColor : validPrice}" @click="validDateClick(0)">当日</span>
              <span class="conSpanTwo" :class="{backColor : validTime}" @click="validDateClick(1)">永久</span>
            </div>
          </li>
          <li>
            <div class="conOne">条件</div>
            <div class="conTwo">
              <span class="conSpanThree" :class="{backColor : conPrice}" @click="conditionClick(0)">价格</span>
              <span class="conSpanTwo" :class="{backColor : conTime}" @click="conditionClick(1)">时间</span>
            </div>
          </li>
          <li v-if="initPrice">
            <div class="conOne">价格到达</div>
            <div class="priceOne" @click="priceTypeClick" v-text="editQueryInfo.OperatorEdit"></div>
            <input type="number" placeholder="价格" v-model="editQueryInfo.valueEdit" class="priceInput"
                   @blur="verifyDecimal(editQueryInfo.valueEdit)"/>
          </li>
          <li v-else="initTime">
            <div class="conOne">时间到达</div>
            <div class="timeConTwo">
              <vue-timepicker v-model="editQueryInfo.tjTimeEdit" hide-clear-button
                              v-if="!openingTimeClick" format='HH:mm:ss'></vue-timepicker>
              <span v-else class="poenTimeKong">--:--:--</span>
            </div>
            <span class="timeSpan" @click="openingTime" :class="{openingTime:openingTimeClick}">开盘时</span>
          </li>
          <li>
            <div class="conOne">买卖方向</div>
            <div class="conTwo">
              <span class="conSpanThree" :class="{backColor : buyPrice}" @click="buyClick(0)">买</span>
              <span class="conSpanTwo" :class="{backColor : buyTime}" @click="buyClick(1)">卖</span>
            </div>
          </li>
          <li>
            <div class="conTypeOne">类型</div>
            <div class="conTypeTwo">
              <span class="conSpanTye" :class="{backColor:openCang}"
                    @click="storehouseTypeClick(0)">开仓</span>
              <span class="conSpanTye" :class="{backColor:pingCangBlue}"
                    @click="storehouseTypeClick(1)">平仓</span>
              <template v-if="pingDayShow">
                <span class="conSpanTye" :class="{backColor:pingDayBlue}"
                      @click="storehouseTypeClick(2)">平今</span>
              </template>
              <template v-else>
                <span :class="{pingDayB:pingDay, conSpanTyeThreeBlue:pingDayBlue}">平今</span>
              </template>
            </div>
          </li>
          <li>
            <div class="entrustOne">委托价格</div>
            <div class="entrustTwo">
              <input v-if="inputType" type="text" @click="trustClick" class="commissionInput"
                     v-model="editQueryInfo.priceNameEdit"/>
              <input v-else type="number" class="commissionInput"
                     v-model="editQueryInfo.priceNameEdit" autofocus/>
              <span class="trustSpanOne" @click="priceInfoDialog">类型</span>
            </div>
          </li>
          <li>
            <div class="conOne">委托数量</div>
            <input type="number" class="market" v-model="editQueryInfo.VolumeEdit" pattern="[0-9]*"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="conDivInfo">
      <span class="spanRed">
           约可开：  <span id="openBuy">--</span>
       </span>
      <span class="spanBlue">
           约可平： <span id="openNum">--</span>
       </span>
    </div>
    <div class="btnDiv conBtn" style="display: block">
      <button type="button" class="btnSubmit" data-toggle="button" @click="editConClick">
        编辑
      </button>
    </div>
  </div>
</template>
<script>
  //价格倍数
  let priceMulriple,
    decimal,//现价小数位
    lastPrice,//最新价
    opponentPriceBuy,//对手价买
    opponentPriceSell,//对手价卖
    upPrice,//涨停价
    downPrice,//跌停价
    nameCode = '';

  export default {
    data: function () {
      return {
        editQueryInfo: {//编辑条件单设置时获取的参数
          HYDM: '',//合约市场 market
          contractEditCode: '',//合约品种 code
          TimeCondition: '',//有效期 1-当日有效，2-永久有效
          ConditionChoicedEdit: '',//当前选择条件：1-价格，2-时间
          OperatorEdit: '',//操作 >= <=
          valueEdit: '',//条件里面的 输入价格值
          dealOpenEdit: 0,//买卖方向
          OffsetFlagEdit: 0,//开平标识
          VolumeEdit: '',//委托数量
          LimitPriceTypeEdit: '', //限价类型: 仅PriceType为“限价”时有本字段
          LimitPriceEdit: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
          priceNameEdit: '',
          conditionEditName: '',//条件单名称
          selectContractName: '',
          conditionID: '',//条件单id
          TradeDate: '',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
          tjTimeEdit: {//条件里面的时分秒
            HH: "",
            mm: "",
            ss: ""
          },
          decimal: null//最小变动价位
        },
        //有效期 当日、永久
        validPrice: true,
        validTime: false,
        //条件：价格、时间
        conPrice: true,
        conTime: false,
        //买卖方向
        buyPrice: true,
        buyTime: false,
        //开仓、平仓、平今
        openCang: true,
        pingCang: true,
        pingDay: true,
        pingCangBlue: false,
        openCangFFF: false,
        pingDayBlue: false,

        trustPriceType: null,//默认给mull 表示是选择  的委托价格
        selectContract: [],//选择合约
//        CID: '',
        pingDayShow: true,
        destroyMarket: '',//取消订阅时存的值

        WTInfo: {//获取当前所选交易的合约名称
          wtCode: '',
          wtMarket: '',
        },
        HQInfo: {//获取当前所选行情的合约名称
          hqCode: '',
          hqMarket: ''
        },
        userID: pbE.isPoboApp ? null : '10160',
        XWLB: pbE.isPoboApp ? pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB') : '',
        openingTimeClick: false,//开盘时点击未点击
        initPrice: null,
        inputType: true,
        XWH: null,//席位号
        GDZG: null//股东账号
//        loginAccount: pbE.isPoboApp ? null : '',//登录账号
//        accountClass: pbE.isPoboApp ? null : '',//账号类别
//        loginClass: pbE.isPoboApp ? null : '',//登陆类别
      }
    },
    mounted() {
      var _this = this;
      _this.getTradeInfo();
      // 根据market 和 code 查出单个条件单的合约
      this.nativeInteraction();
      //取出条件单单条详情
      var data = _this.getStorageInfo("conNoneListObj");
      if (data) {
        var list = JSON.parse(data);
        console.log(JSON.parse(list[0].conditionValue), 'conNoneListObj');
        var dataValue = JSON.parse(list[0].conditionValue);
        //当前选择条件：1-价格，2-时间
        var priceValue,
          priceOper;
        if (dataValue.ConditionChoiced == 1) {
          //取价格里面的值
          priceValue = dataValue.ConditionList[0].Price.Value;
          priceOper = dataValue.ConditionList[0].Price.Operator;
        } else if (dataValue.ConditionChoiced == 2) {
          _this.openingTimeClick = false;
          //取时间的值
          //(需要按照插件的格式来)
          var temp = dataValue.ConditionList[1].Time.split(':');
          console.log(temp, 'temp');
          //条件里面的时分秒
          _this.editQueryInfo.tjTimeEdit.HH = temp[0];
          _this.editQueryInfo.tjTimeEdit.mm = temp[1];
          _this.editQueryInfo.tjTimeEdit.ss = temp[2];
          _this.$forceUpdate()
        } else if (dataValue.ConditionChoiced == 3) {
          _this.openingTimeClick = true;
        }
        //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
        var priceOne;
        var priceTwo;
        if (dataValue.OrderAction.SmartOrder.Order.LimitPrice) {//表示输入的
          _this.inputType = false;
          priceOne = dataValue.OrderAction.SmartOrder.Order.LimitPrice;
          priceTwo = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;
          _this.trustPriceType = 1;
        } else {
          _this.inputType = true;
          priceTwo = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;
          _this.trustPriceType = 2;
        }
        _this.editQueryInfo.conditionID = list[0].conditionID;
        _this.editQueryInfo.conditionEditName = list[0].name;
        _this.editQueryInfo.selectContractName = list[0].HYMC;
        _this.editQueryInfo.HYDM = dataValue.Contracts[0].ExchangeCode;//market
        _this.editQueryInfo.contractEditCode = dataValue.Contracts[0].ContractCode;//合约品种
        _this.editQueryInfo.TimeCondition = dataValue.TimeCondition;//有效期 1-当日有效，2-永久有效 3 开盘
        _this.editQueryInfo.TradeDate = dataValue.TradeDate;//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
        _this.editQueryInfo.ConditionChoicedEdit = dataValue.ConditionChoiced;//当前选择条件：1-价格，2-时间
        _this.editQueryInfo.OperatorEdit = priceOper;//操作 >= <=
        _this.editQueryInfo.valueEdit = priceValue;//条件里面的 输入价格值
        _this.editQueryInfo.dealOpenEdit = dataValue.OrderAction.SmartOrder.Order.Direction + '';//买卖方向
        _this.editQueryInfo.OffsetFlagEdit = dataValue.OrderAction.SmartOrder.Order.OffsetFlag + '';//开平标识
        _this.editQueryInfo.VolumeEdit = dataValue.OrderAction.SmartOrder.Order.Volume;//委托数量
        _this.editQueryInfo.LimitPriceTypeEdit = dataValue.OrderAction.SmartOrder.Order.LimitPriceType; //限价类型= 仅PriceType为“限价”时有本字段
        _this.editQueryInfo.LimitPriceEdit = priceOne;//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
        _this.editQueryInfo.priceNameEdit = priceTwo == 'CustomPrice' ? priceOne : priceTwo; //判断怎么显示价格
        _this.editQueryInfo.decimal = dataValue.OrderAction.SmartOrder.Order.MiniPriceTick//最小变动价位
        _this.XWH = pbE.WT().wtGetXWH(_this.editQueryInfo.HYDM);//席位号
        _this.GDZG = pbE.WT().wtGetGDZH(_this.editQueryInfo.HYDM);//股东帐号
        console.log(_this.editQueryInfo, 'editQueryInfo');
        if (_this.editQueryInfo.HYDM != 'SHFE') {//只有沪市支持平今
          console.log('SHFE');
          _this.pingDayShow = false;//将平今置为不可点击
        } else {
          _this.pingDayShow = true;
        }
        // 查可平
        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, _this.editQueryInfo.OffsetFlagEdit == 1 || _this.editQueryInfo.OffsetFlagEdit == 2 ? _this.editQueryInfo.dealOpenEdit == 0 ? 1 : 0 : _this.editQueryInfo.dealOpenEdit, _this.editQueryInfo.OffsetFlagEdit == 2 ? '1' : null);
        //根据合约名称订阅最新价
        if (pbE.isPoboApp) {
          var tradeHq = pbE.WT().wtGetHQInfo(_this.editQueryInfo.contractEditCode, _this.editQueryInfo.HYDM);//交易信息转换行情信息
          if (tradeHq) {
            var data = JSON.parse(tradeHq);
            //订阅行情
            nameCode = data.HQCode;
            //market\code
            pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: data.HQMarket, 3: data.HQCode}]}));//订阅最新价
            this.nativeInteraction();
            //获取行情商品价格倍数
            priceMulriple = pbE.HQ().hqGetPriceRate(data.HQCode, data.HQMarket);
            decimal = pbE.HQ().hqGetPriceDecimal(data.HQCode, data.HQMarket + '');
          }
        }
        //以下是根据类型来判断当前选中的样式

        // 有效期 1-当日有效，2-永久有效
        if (dataValue.TimeCondition == 1) {
          _this.validPrice = true;
          _this.validTime = false;
        } else if (dataValue.TimeCondition == 2) {
          _this.validPrice = false;
          _this.validTime = true;
        }
        //当前选择条件：1-价格，2-时间
        if (dataValue.ConditionChoiced == 1) {//价格
          _this.conPrice = true;
          _this.conTime = false;
          _this.initPrice = true;
          _this.initFooter = false;

        }
        if (dataValue.ConditionChoiced == 2 || dataValue.ConditionChoiced == 3) {//时间
          _this.conPrice = false;
          _this.conTime = true;
          _this.initPrice = false;
          _this.initFooter = false;
        }
        //买卖方向
        if (dataValue.OrderAction.SmartOrder.Order.Direction == 0) {//买
          _this.buyPrice = true;
          _this.buyTime = false;
        }
        if (dataValue.OrderAction.SmartOrder.Order.Direction == 1) {//卖
          _this.buyPrice = false;
          _this.buyTime = true;
        }
        //开平标识
        //开仓
        if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 0) {
          _this.openCang = true;
          _this.openCangFFF = false;
          _this.pingCangBlue = false;
          _this.pingDayBlue = false;

          //buyWay字段要根据买卖类别的反方向取值
          var buyWay;
          if (_this.editQueryInfo.dealOpenEdit == 0) {//买
            buyWay = 1;
          } else if (_this.editQueryInfo.dealOpenEdit == 1) {//卖
            buyWay = 0;
          }
        }
        //平仓
        if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 1) {
          _this.pingCangBlue = true;
          _this.openCang = false;
          _this.openCangFFF = true;
          _this.pingDayBlue = false;

          //buyWay字段要根据买卖类别的反方向取值
          var buyWay;
          if (_this.editQueryInfo.dealOpenEdit == 0) {//买
            buyWay = 1;
          } else if (_this.editQueryInfo.dealOpenEdit == 1) {//卖
            buyWay = 0;
          }
        }
        //平今
        if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 2) {
          _this.pingDayBlue = true;
          _this.pingCangBlue = false;
          _this.openCang = false;
          _this.openCangFFF = true;
        }
        if (dataValue.ConditionChoiced == 1) {//当前选择条件：1-价格，2-时间
          _this.conPrice = true;
          _this.conTime = false;
          _this.initPrice = true;
          _this.initFooter = false;
          _this.pingDayShow = true;//将平今置为可点击
        } else if (dataValue.ConditionChoiced == 2) {
          _this.conPrice = false;
          _this.conTime = true;
          _this.initPrice = false;
          _this.initFooter = false;
          // _this.pingDayShow = false;//将平今置为不可点击
        }
      }
      //从原生接口读取

      //获取云交易的userID
      if (pbE.isPoboApp) {
        _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
        _this.getStockBuyNum();//查可开

        //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
        if (!_this.userId) {
          _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
        }
      }
    },
    destroyed: function () {
      if (pbE.isPoboApp) {
        pbE.HQ().hqUnSubscribe(0, JSON.stringify({"1": [{2: this.destroyMarket, 3: nameCode}]}));//订阅最新价
      }
    },
    methods: {
      priceInfoDialog: function () {
        let _this = this;
        _this.inputType = true;
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
      },
      //条件
      conditionClick: function (flag) {
        var _this = this;
        _this.openingTimeClick = false;
        if (flag == 0) {//价格
          _this.conPrice = true;
          _this.conTime = false;
          _this.initPrice = true;
          _this.initFooter = false;
          _this.editQueryInfo.ConditionChoicedEdit = 1;//编辑时条件类型赋值
          _this.editQueryInfo.OperatorEdit = '<=';
        }
        if (flag == 1) {//时间
          _this.conPrice = false;
          _this.conTime = true;
          _this.initPrice = false;
          _this.initFooter = false;
          //获取当前时间
          var currentTime = new Date();
          _this.editQueryInfo.tjTimeEdit['HH'] = currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours();
          _this.editQueryInfo.tjTimeEdit['mm'] = currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes();
          _this.editQueryInfo.tjTimeEdit['ss'] = currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds();
          console.log(_this.editQueryInfo.tjTimeEdit, 'timePicker');
          _this.editQueryInfo.ConditionChoicedEdit = 2;//编辑时条件类型赋值
        }
      },
      //条件单设置中有效期  切换样式
      validDateClick: function (flag) {
        var _this = this;
        //从原生接口读取当前交易日
        if (pbE.isPoboApp) {
          var allData = pbE.WT().wtLoginRe(_this.CID);
          if (allData) {
            var data = JSON.parse(allData).data;
            _this.editQueryInfo.TradeDate = data[0]['75'];
          }
        }
        //  1-当日有效，2-永久有效
        if (flag == 0) {//当日
          _this.validPrice = true;
          _this.validTime = false;
          _this.editQueryInfo.TimeCondition = 1;//编辑时有效期类型赋值
          _this.pingDayShow = true;//将平今置为不可点击
        }
        if (flag == 1) {//永久
          _this.validPrice = false;
          _this.validTime = true;
          _this.editQueryInfo.TimeCondition = 2;//编辑时有效期类型赋值

          _this.pingDayShow = false;//将平今置为不可点击
          _this.storehouseTypeClick(0);
        }
      },
      //条件单设置中买卖方向 切换样式
      buyClick: function (flag) {
        console.log(this.editQueryInfo.tjTimeEdit, '买卖方向');
        var _this = this;
        if (flag == 0) {//买
          _this.buyPrice = true;
          _this.buyTime = false;
          _this.editQueryInfo.dealOpenEdit = 0;//编辑时入

          //根据当前合约和买卖方向从持仓里面再次查下可平
        }
        if (flag == 1) {//卖
          _this.buyPrice = false;
          _this.buyTime = true;
          _this.editQueryInfo.dealOpenEdit = 1;//编辑时入库

          //根据当前合约和买卖方向从持仓里面再次查下可平
        }
        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, _this.editQueryInfo.OffsetFlagEdit == 1 || _this.editQueryInfo.OffsetFlagEdit == 2 ? _this.editQueryInfo.dealOpenEdit == 0 ? 1 : 0 : _this.editQueryInfo.dealOpenEdit, _this.editQueryInfo.OffsetFlagEdit == 2 ? '1' : null);
      },
      //条件单设置中类型 切换样式
      storehouseTypeClick: function (flag) {
        var _this = this;
        //开仓
        if (flag == 0) {
          _this.openCang = true;

          _this.openCangFFF = false;
          _this.pingCangBlue = false;
          _this.pingDayBlue = false;
          _this.editQueryInfo.OffsetFlagEdit = 0;//编辑时入库
          $("#openNum").html("--");//开仓时设为--
        }
        //平仓
        if (flag == 1) {
          _this.pingCangBlue = true;
          _this.openCang = false;
          _this.openCangFFF = true;
          _this.pingDayBlue = false;
          _this.editQueryInfo.OffsetFlagEdit = 1;//编辑时入库
          //buyWay字段要根据买卖类别的反方向取值
         /* var buyWay;
          if (_this.editQueryInfo.dealOpenEdit == 0) {//买
            buyWay = 1;
          } else if (_this.editQueryInfo.dealOpenEdit == 1) {//卖
            buyWay = 0;
          }*/
        }
        //平今
        if (flag == 2) {
          _this.pingDayBlue = true;

          _this.pingCangBlue = false;
          _this.openCang = false;
          _this.openCangFFF = true;
          _this.editQueryInfo.OffsetFlagEdit = 2;//编辑时入库
          //buyWay字段要根据买卖类别的反方向取值
          /*var buyWay;
          if (_this.editQueryInfo.dealOpenEdit == 0) {//买
            buyWay = 1;
          } else if (_this.editQueryInfo.dealOpenEdit == 1) {//卖
            buyWay = 0;
          }*/
        }
        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, _this.editQueryInfo.OffsetFlagEdit == 1 || _this.editQueryInfo.OffsetFlagEdit == 2 ? _this.editQueryInfo.dealOpenEdit == 0 ? 1 : 0 : _this.editQueryInfo.dealOpenEdit, _this.editQueryInfo.OffsetFlagEdit == 2 ? '1' : null);
      },
      priceTypeClick: function () {
        if (this.editQueryInfo.OperatorEdit == ">=") {
          this.editQueryInfo.OperatorEdit = "<=";
        } else {
          this.editQueryInfo.OperatorEdit = ">=";
        }
      },
      //修改保存条件单的信息
      editConClick: function () {
        var _this = this, isConnected = pbE.isPoboApp ? pbE.WT().wtGetIsConnected(this.CID) : '';
        var data = new _this.setConData();
        data.OrderAction.SmartOrder.Order.MiniPriceTick = _this.editQueryInfo.decimal;//最小变动价位
        data.Name = _this.editQueryInfo.conditionEditName;
        data.Contracts[0] = {
          ExchangeCode: _this.editQueryInfo.HYDM,//合约名称
          ContractCode: _this.editQueryInfo.contractEditCode//合约品种
        }
        data.TimeCondition = _this.editQueryInfo.TimeCondition;//有效期 1-当日有效，2-永久有效
//        if (data.TimeCondition == 1) {
        data.TradeDate = _this.editQueryInfo.TradeDate;////交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
//        }
        data.ConditionChoiced = _this.editQueryInfo.ConditionChoicedEdit;//当前选择条件：1-价格，2-时间
        console.log(_this.editQueryInfo.tjTimeEdit, '修改后时间');
        if (_this.editQueryInfo.ConditionChoicedEdit == 1) {//代表价格
          data.ConditionList[0].Price.Operator = _this.editQueryInfo.OperatorEdit;//操作
          if (!_this.numRex.test(_this.editQueryInfo.valueEdit)) {
            data.ConditionList[0].Price.Value = parseInt(_this.editQueryInfo.valueEdit);//条件里面的输入价格
          } else {
            data.ConditionList[0].Price.Value = _this.editQueryInfo.valueEdit * 1;//条件里面的输入价格
          }
        }
        if (_this.editQueryInfo.ConditionChoicedEdit == 2) {//代表时间
          data.ConditionList[1].Time = _this.editQueryInfo.tjTimeEdit.HH + ":" + _this.editQueryInfo.tjTimeEdit.mm + ":" + _this.editQueryInfo.tjTimeEdit.ss;
        }
        //下单
        data.OrderAction.SmartOrder.Order.Contract = {
          ExchangeCode: _this.editQueryInfo.HYDM,//合约  市场
          ContractCode: _this.editQueryInfo.contractEditCode//合约品种    合约
        }
        //委托数
        data.OrderAction.SmartOrder.Order.Direction = _this.editQueryInfo.dealOpenEdit + '';//买卖方向
        data.OrderAction.SmartOrder.Order.OffsetFlag = _this.editQueryInfo.OffsetFlagEdit + '';//开平标识
        data.OrderAction.SmartOrder.Order.Volume = parseInt(_this.editQueryInfo.VolumeEdit);//委托数量
        data.OrderAction.SmartOrder.Order.ExtRawData['52'] = _this.GDZG;//股东账户
        data.OrderAction.SmartOrder.Order.ExtRawData['161'] = _this.XWH;//席位号
        //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
        if (_this.trustPriceType == 2) {//表示选择
          _this.inputType = true;
          data.OrderAction.SmartOrder.Order.LimitPriceType = _this.editQueryInfo.priceNameEdit; //选择的委托价格
        } else if (_this.trustPriceType == 1) {//表示输入
          _this.inputType = false;
          data.OrderAction.SmartOrder.Order.LimitPrice = _this.editQueryInfo.priceNameEdit + "";//输入的委托价格
          data.OrderAction.SmartOrder.Order.LimitPriceType = 'CustomPrice';//如果是输入的价格就将CustomPrice赋给LimitPriceType
        }
        //登录账号类别   从原生读取
        data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
        data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
        data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
        data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.orgCode;//机构代码
        data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB;//席位类别
        data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId;//用户账号
        console.log(JSON.stringify(data), '修改');
        if (isConnected) {
          if (data.TimeCondition == 1) {
            console.log(data.TimeCondition, data.TradeDate, '1');
            if (data.TradeDate != '') {
              _this.editConAjax(data);
            } else {
              _this.showMessage('设置失败！');
            }
          } else {
            console.log(data.TimeCondition, data.TradeDate, '2');
            _this.editConAjax(data);
          }
        } else {
          _this.isConnected();
        }

      },
      //设置请求
      editConAjax(data) {
        var _this = this;
        _this.$axios.post(_this.conditionUrl, {
          func: _this.editCon,
          token: _this.token,
          id: _this.authId,
          orgCode: _this.orgCode,
          conditionID: _this.editQueryInfo.conditionID,
          data: data,
          type: _this.contractType,
          userID: _this.userID,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          if (data.status == 0) {
            _this.showMessage('设置成功！', () => {
              _this.$router.replace('/mobileList/1');
            }, 2);
          } else {
            _this.showMessage(data.msg);
            return;
          }
        }).catch(function (error) {
          console.error(error);
          _this.showMessage('网络超时，请稍后再试');
        });
      },
      //设置条件单的类型
      priceInfoClick: function (flag) {
        this.trustPriceType = 2;
        var _this = this;
        if (flag == 1) {//涨停价
          this.editQueryInfo.priceNameEdit = '涨停价';
          this.editQueryInfo.selectPriceName = upPrice;
        }
        if (flag == 2) {//跌停价
          this.editQueryInfo.priceNameEdit = '跌停价';
          this.editQueryInfo.selectPriceName = downPrice;
        }
        if (flag == 3) {//对手价
          this.editQueryInfo.priceNameEdit = '对手价';
          //根据选择的类型买还是卖   //买卖方向  0 买 1 卖     注：默认给 0 买
          if (_this.editQueryInfo.dealOpenEdit == 0) {
            _this.editQueryInfo.selectPriceName = opponentPriceSell;
          } else if (_this.editQueryInfo.dealOpenEdit == 1) {
            _this.editQueryInfo.selectPriceName = opponentPriceBuy;
          }
        }
        if (flag == 4) {//最新价
          this.editQueryInfo.priceNameEdit = '最新价';
          this.editQueryInfo.selectPriceName = lastPrice;
        }
        //查询可开
        _this.getStockBuyNum();
      },
      //查可平
      getCanBuy: function (market, code, buyWay, todayFlag) {
        console.log(market, code, buyWay, todayFlag,'可平');
        //通过查持仓，获取该合约可平数量
        if (pbE.isPoboApp) {
          var allData = pbE.WT().wtQueryStockRe(this.CID);
          if (allData) {
            var stocks = JSON.parse(allData).data;
            for (var i = 0; i < stocks.length; i++) {
              if (market == stocks[i]['54'] && code == stocks[i]['63']) {
                if (buyWay == stocks[i]['112'] && todayFlag) {
                  if (stocks[i]['54'] == 'SHFE') {
                    if (todayFlag == stocks[i]['503']) {
                      if (stocks[i][137]) {
                        $("#openNum").html(stocks[i][137]);
                      } else {
                        $("#openNum").html('--');
                      }
                      break;
                    } else {
                      $("#openNum").html('--');
                    }
                  } else if (stocks[i]['503'] == '0') {
                    if (stocks[i][137]) {
                      $("#openNum").html(stocks[i][137]);
                    } else {
                      $("#openNum").html('--');
                    }
                    break;
                  }
                }else if(buyWay == stocks[i]['112'] && this.editQueryInfo.OffsetFlagEdit == 2){
                  if(stocks[i]['503'] == '2'){
                    if (stocks[i][137]) {
                      $("#openNum").html(stocks[i][137]);
                    } else {
                      $("#openNum").html('--');
                    }
                    break;
                  }else{
                    $("#openNum").html('--');
                  }
                } else if (buyWay == stocks[i]['112'] && this.editQueryInfo.OffsetFlagEdit != 0) {
                  if (stocks[i][137]) {
                    $("#openNum").html(stocks[i][137]);
                  } else {
                    $("#openNum").html('--');
                  }
                  break;
                }
              } else {
                $("#openNum").html('--');
              }
            }
          }
        }
      },
      //查可开
      getStockBuyNum: function () {
        var _this = this;
        if (_this.editQueryInfo.selectContractName && _this.editQueryInfo.priceNameEdit) {
          if (pbE.isPoboApp) {
            var priceValue;
            if (_this.trustPriceType == 2) {//表示选择

              //选择的委托价格
              if (_this.editQueryInfo.priceNameEdit == '涨停价') {
                priceValue = upPrice;
              } else if (_this.editQueryInfo.priceNameEdit == '跌停价') {
                priceValue = downPrice;
              } else if (_this.editQueryInfo.priceNameEdit == '对手价') {
                if (_this.editQueryInfo.dealOpenEdit == 0) {
                  priceValue = opponentPriceSell;
                } else if (_this.editQueryInfo.dealOpenEdit == 1) {
                  priceValue = opponentPriceBuy;
                }
              } else if (_this.editQueryInfo.priceNameEdit == '最新价') {
                priceValue = lastPrice;
              }
            } else if (_this.trustPriceType == 1) {//表示输入
              priceValue = _this.editQueryInfo.priceNameEdit + '';
            }
            var gdZH = pbE.WT().wtGetGDZH(_this.editQueryInfo.HYDM);
            var xwh = pbE.WT().wtGetXWH(_this.editQueryInfo.HYDM);
            var data = {
              63: _this.editQueryInfo.contractEditCode,//合约代码
              54: _this.editQueryInfo.HYDM,//市场代码
              129: priceValue,//委托价格
              112: _this.editQueryInfo.dealOpenEdit + '',//买卖类别
              117: '0',//开平仓标志
              119: '1',//投保标志
              52: gdZH,//股东账号
              125: '0',//期权备兑标志
              161: xwh,//席位号
              40: '2',//价格类别、
              41: '3',//有效期类别
              42: '1'//成交数量
            };
            console.log(JSON.stringify(data));
            pbE.WT().wtQueryStockBuy(_this.CID, JSON.stringify(data));//可开
          }
        }
      },
      gotoSet: function () {
        this.$router.replace('/setCon/3');
      },
      trustClick: function () {
        this.trustPriceType = 1;
        this.inputType = false;
        setTimeout(() => {
          $('.commissionInput').focus();
        }, 300)
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
          pbPage.addModuleCallback(90000, this.marketCallback);
          pbPage.addFunCallback(6044, this.fundCallback);//查询可开 可买数量
          pbPage.addFunCallback(102001, this.userIdCallback)
        } else {
          pbPage.initPage({
            callbacks: [
              {module: 90000, callback: this.marketCallback},
              {fun: 6044, callback: this.fundCallback},//查询可开 可买数量
              {fun: 102001, callback: this.userIdCallback}
            ]
          })
        }
      },
//      9000 callback,
      marketCallback(msg) {
        let _this = this;
        msg = msg.jData.Data;
        console.log(msg)
        for (var i = 0; i < msg.length; i++) {//最新价
          if (_this.editQueryInfo.selectContractName != '选择期货合约') {
            if (msg[i][10] == nameCode) {
              if (msg[i][29]) {
                lastPrice = pbUtils.decimalDecPrice(decimal, msg[i][29] / priceMulriple);//最新价
                $("#newPrice").html(pbUtils.decimalDecPrice(decimal, msg[i][29] / priceMulriple));//最新价
              } else {
                $("#newPrice").html("--");//最新价
              }
              if (msg[i][30]) {
                upPrice = pbUtils.decimalDecPrice(decimal, msg[i][30] / priceMulriple);//涨停价
              }
              if (msg[i][31]) {
                downPrice = pbUtils.decimalDecPrice(decimal, msg[i][31] / priceMulriple);//跌停价
              }
              if (msg[i].BidSize[0][40]) {
                opponentPriceSell = pbUtils.decimalDecPrice(decimal, msg[i].BidSize[0][40] / priceMulriple);//卖
              }
              if (msg[i].AskSize[0][42]) {
                opponentPriceBuy = pbUtils.decimalDecPrice(decimal, msg[i].AskSize[0][42] / priceMulriple);//买
              }
            }
          }
        }
      },
      //6044 callback
      fundCallback(msg) {
        msg = msg.jData.data;
        if (msg) {
          if (msg[0]) {
            $("#openBuy").html(msg[0][250]);
          } else {
            $("#openBuy").html(0)//如果没值就显示0
          }
        }
      },
//      102001 callback
      userIdCallback(msg) {
        if (this.userId == null) {
          if (msg) {
            if (102001 == msg.functionNo) {
              this.userId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID());//获取云交易的userId
            }
          }
        }
      },
      //开盘时点击
      openingTime() {
        this.openingTimeClick = !this.openingTimeClick;
        if (this.openingTimeClick) {
          this.editQueryInfo.ConditionChoicedEdit = 3;
        } else {
          //获取当前时间
          var currentTime = new Date();
          this.editQueryInfo.tjTimeEdit['HH'] = currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours();
          this.editQueryInfo.tjTimeEdit['mm'] = currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes();
          this.editQueryInfo.tjTimeEdit['ss'] = currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds();
          this.editQueryInfo.ConditionChoicedEdit = 2;
        }
      }
    }
  }
</script>
