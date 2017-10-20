<template>
  <div style="padding-top: 44px">
    <span @click="reset()" class="navThreeTitle"
          style="position: fixed; top: 13px; right: 10px; z-index: 1030;">重置</span>
    <alert-modal v-model="alertModal">
      <div class="alert_body">
        <div>
          <div v-for="data in selectContract" @click.stop="selectContractClick(data)">{{data.name}}</div>
        </div>
      </div>
    </alert-modal>
    <div class="setDiv">
      <div class="setOut">
        <ul>
          <li>
            <div class="setDivOne" @click="isShowModal" v-text="selectContractName"
                 :style="{color:selectContractClor}"></div>
            <div class="setDivTwo">最新：<span class="setDivThree" id="newPrice">--</span></div>
          </li>
          <li>
            <div class="conOne">
              条件单名称
            </div>
            <input class="setDivOne" type="text" placeholder="条件单名称（可选填）" v-model="setDataObj.conditionName"
                   maxlength="10"/>
          </li>
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
            <div class="priceOne" @click="priceTypeClick" v-text="setDataObj.Operator"></div>
            <input type="number" placeholder="价格" v-model="setDataObj.tjPriceValue" class="priceInput"
                   @blur="verifyDecimal(setDataObj.tjPriceValue)"/>
          </li>
          <li v-else="initTime">
            <div class="conOne">时间到达</div>
            <div class="timeConTwo">
              <vue-timepicker v-model="touchTimeValue" format="HH:mm:ss" hide-clear-button
                              v-if="!openingTimeClick"></vue-timepicker>
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
              <input v-if="inputType" type="text" @click="trustFocus" class="commissionInput"
                     v-model="setDataObj.priceName"/>
              <input v-else type="number" @blur="trustPrice(1,setDataObj.priceName)" class="foucs commissionInput"
                     v-model="setDataObj.priceName" autofocus/>
              <span class="trustSpanOne" @click="priceInfoDialog">类型</span>
            </div>
          </li>
          <li>
            <div class="conOne">委托数量</div>
            <input type="number" class="market" v-model="setDataObj.Volume" pattern="[0-9]*"/>
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
    <!--<div class="btnDiv conBtn"  v-show="initAddBtn" >
        <button type="button" class="btnSubmitFFF" data-toggle="button">
            添加
        </button>
    </div>-->
    <div class="btnDiv conBtn">
      <button type="button" class="btnSubmit" data-toggle="button" @click="addContractInfo">
        添加
      </button>
    </div>
  </div>
</template>
<script>
  //价格倍数
  var priceMulriple
  var decimal//价格小数位
  var lastPrice//最新价
  var opponentPriceBuy//对手价买
  var opponentPriceSell//对手价卖
  var upPrice//涨停价
  var downPrice//跌停价
  var nameCode = '', gdZH//股东账户

  export default {
    data: function () {
      return {
        selectContractName: '选择期货合约',
        selectContractClor: '#c0c6cd',//合约字体颜色
        selectContract: [],//选择合约
        setDataObj: {
          contractMarket: '',//合约市场
          contractCode: '',//合约品种
          validity: 1,//1-当日有效，2-永久有效   注：默认给当日有效
          tj: 1,//条件1-价格，2-时间            注：默认给 1 价格
          tjTime: '19:50:00',
          Operator: '<=',//条件是价格时的操作，
          tjPriceValue: '',
          dealOpen: 0,//买卖方向  0 买 1 卖     注：默认给 0 买
          OffsetFlag: 0,//开平标识 0，1,2 开仓，平仓，平今  注：默认给 0 开仓
          Volume: '',//委托数量
          LimitPriceType: '', //限价类型: 仅PriceType为“限价”时有本字段
          LimitPrice: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
          priceName: '',
          conditionName: '',//条件单名称
          TradeDate: '',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
          selectPriceName: ''
        },
        touchTimeValue: {
          HH: '',
          mm: '',
          ss: ''
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
        pingDay: true,
        pingCangBlue: false,
        pingDayBlue: false,

        //初始化按钮 颜色
        // initAddBtn: true,
        // blueBtn: false,

        trustPriceType: 1,//默认给1表示是输入  的委托价格

        userId: pbE.isPoboApp ? null : '10160',//云交易userId
//        CID: '',

        //价格和时间
        initPrice: true,
        initTime: false,

        WTInfo: {//获取当前所选交易的合约名称
          wtCode: '',
          wtMarket: '',
        },
        HQInfo: {//获取当前所选行情的合约名称
          hqCode: '',
          hqMarket: ''
        },
        pingDayShow: true,
        destroyMarket: '',//取消订阅时存的值
        seatNumber: null,//席位号
        XWLB: pbE.isPoboApp ? pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB') : '',
        openingTimeClick: false,//开盘时点击未点击
        alertModal: false,//合约弹框
        decimal: null,
        inputType: true,
        XWH: null,//席位号
        GDZG: null//股东账号
      }
    },
    mounted: function () {
      var _this = this
      this.nativeInteraction()
      _this.getTradeInfo()
      // 根据market 和 code 查出单个条件单的合约
//      _this.nativeInteraction();
      if (pbE.isPoboApp) {
        //交易合约
        _this.WTInfo.wtCode = _this.$route.query.wtCode
        _this.WTInfo.wtMarket = _this.$route.query.wtMarket
        //行情合约
        _this.HQInfo.hqCode = _this.$route.query.hqCode
        _this.HQInfo.hqMarket = _this.$route.query.hqMarket
        console.log(this.$route.params.id, 'params')
        if (_this.$route.params.id == 3) {
          if (_this.WTInfo.wtCode && _this.WTInfo.wtMarket) {
            _this.XWH = pbE.WT().wtGetXWH(_this.WTInfo.wtMarket)//席位号
            _this.GDZG = pbE.WT().wtGetGDZH(_this.WTInfo.wtMarket)//股东帐号
            if (_this.WTInfo.wtMarket != 'SHFE') {//只有沪市支持平今
              _this.pingDayShow = false//将平今置为不可点击
              _this.storehouseTypeClick(0)
            } else {
              _this.pingDayShow = true
            }
            var tradeHq = pbE.WT().wtGetHQInfo(_this.WTInfo.wtCode, _this.WTInfo.wtMarket)//交易信息转换行情信息
            _this.decimal = _this.minPrice(_this.CID, _this.WTInfo.wtCode, _this.WTInfo.wtMarket)
            if (tradeHq) {
              var data = JSON.parse(tradeHq)
              if (data.HQCode == '') {
                this.showMessage('柜台不支持此类型合约', () => {
                  location.href = 'close'
                }, 2)
              } else {
                _this.setDataObj.conditionName = data.HQName//合约名称
                _this.setDataObj.contractMarket = data.HQMarket//合约市场
                _this.setDataObj.contractCode = data.HQCode//合约品种
                _this.selectContractName = data.HQName
                _this.selectContractClor = '#1a1a1a'
              }

              //订阅行情
              nameCode = _this.WTInfo.wtCode
              pbE.HQ().hqSubscribe(0, JSON.stringify({
                '1': [{
                  2: _this.setDataObj.contractMarket,
                  3: _this.setDataObj.contractCode
                }]
              }))//订阅最新价
              this.nativeInteraction()
              //获取行情商品价格倍数
              priceMulriple = pbE.HQ().hqGetPriceRate(_this.WTInfo.wtCode, _this.WTInfo.wtMarket)
              decimal = pbE.HQ().hqGetPriceDecimal(_this.setDataObj.contractCode, _this.setDataObj.contractMarket)
            }
          } else if (_this.HQInfo.hqCode && _this.HQInfo.hqMarket) {
            var tradeWT = pbE.HQ().hqGetWTInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket, _this.CID)//行情信息转换交易信息
            var nameJson = pbE.HQ().getHQInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket)//
            if (tradeWT || nameJson) {
              var data = JSON.parse(tradeWT)
              console.log(data.WTCode,'data.WTCode');
              if (data.WTCode == '') {
                this.showMessage('柜台不支持此类型合约', () => {
                  location.href = 'close'
                }, 2)
              } else {
                if (data.WTMarket != 'SHFE') {//只有沪市支持平今
                  _this.pingDayShow = false//将平今置为不可点击
                  _this.storehouseTypeClick(0)
                } else {
                  _this.pingDayShow = true
                }
                _this.decimal = _this.minPrice(_this.CID, data.WTCode, data.WTMarket)
                _this.XWH = pbE.WT().wtGetXWH(data.WTMarket)//席位号
                _this.GDZG = pbE.WT().wtGetGDZH(data.WTMarket)//股东帐号
                _this.setDataObj.contractMarket = data.WTMarket//合约市场
                _this.setDataObj.contractCode = data.WTCode//合约品种
                var dataName = JSON.parse(nameJson)
                _this.selectContractName = dataName.name
                _this.selectContractClor = '#1a1a1a'

                //订阅行情
                nameCode = _this.HQInfo.hqCode
                pbE.HQ().hqSubscribe(0, JSON.stringify({'1': [{2: _this.HQInfo.hqMarket, 3: _this.HQInfo.hqCode}]}))//订阅最新价
                this.nativeInteraction()
                //获取行情商品价格倍数
                priceMulriple = pbE.HQ().hqGetPriceRate(_this.HQInfo.hqCode, _this.HQInfo.hqMarket)
                decimal = pbE.HQ().hqGetPriceDecimal(_this.HQInfo.hqCode, _this.HQInfo.hqMarket)
              }
            }
          }
        }
      }
      //从原生接口读取
      if (pbE.isPoboApp) {
        var allData = pbE.WT().wtLoginRe(_this.CID)
        if (allData) {
          var data = JSON.parse(allData).data
          _this.setDataObj.TradeDate = data[0]['75']
          this.$toast({
            message: data[0]['75'],
            position: 'center'
          })
        }
      }
      //获取合约信息
      if (pbE.isPoboApp) {
        var selectContractName = pbE.ZX().getSelfStock(0) ? JSON.parse(pbE.ZX().getSelfStock(0)) : ''//0代表全部合约信息
        if (selectContractName) {
          var flag = [],
            hyType = []
          for (var i = 0; i < selectContractName.length; i++) {//判断合约 8为期货
            if (pbE.HQ().hqGetHqType(selectContractName[i].code, String(selectContractName[i].market), pbE.HQ().hqGetGroupFlag(selectContractName[i].code, String(selectContractName[i].market))) == 8) {
              let wtInfo = pbE.HQ().hqGetWTInfo(selectContractName[i].code, selectContractName[i].market, _this.CID)
              if (wtInfo) {
                wtInfo = JSON.parse(wtInfo)
                if (wtInfo.WTCode && wtInfo.WTCode.length != 0) {
                  _this.selectContract.push(selectContractName[i])
                }
              }
            }
          }
        }
      } else {
        _this.selectContract = [
          {'name': '沪铜1702', 'market': '2001', 'code': '010002'},
          {'name': '沪铝1702', 'market': '2001', 'code': '010102'},
          {'name': '沪锌1702', 'market': '2001', 'code': '010302'},
          {'name': '沪铅1702', 'market': '2001', 'code': '010902'},
          {'name': '黄金1706', 'market': '2001', 'code': '010506'}, {
            'name': '沪铜1702',
            'market': '2001',
            'code': '010002'
          },
          {'name': '沪铝1702', 'market': '2001', 'code': '010102'},
          {'name': '沪锌1702', 'market': '2001', 'code': '010302'},
          {'name': '沪铅1702', 'market': '2001', 'code': '010902'},
          {'name': '黄金1706', 'market': '2001', 'code': '010506'}, {
            'name': '沪铜1702',
            'market': '2001',
            'code': '010002'
          },
          {'name': '沪铝1702', 'market': '2001', 'code': '010102'},
          {'name': '沪锌1702', 'market': '2001', 'code': '010302'},
          {'name': '沪铅1702', 'market': '2001', 'code': '010902'},
          {'name': '黄金1706', 'market': '2001', 'code': '010506'}, {
            'name': '沪铜1702',
            'market': '2001',
            'code': '010002'
          },
          {'name': '沪铝1702', 'market': '2001', 'code': '010102'},
          {'name': '沪锌1702', 'market': '2001', 'code': '010302'},
          {'name': '沪铅1702', 'market': '2001', 'code': '010902'},
          {'name': '黄金1706', 'market': '2001', 'code': '010506'}
        ]
      }
      //获取云交易的userID
      if (pbE.isPoboApp) {
        _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID)//获取云交易的userId
        //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
        if (!_this.userId) {
//                    testUserId = null;//等于0代表未上传交易账号此时应该callback 102001
        }
      }
    },
    activated () {
      var _this = this
      document.getElementsByTagName('body')[0].scrollTop = 0
      _this.isConnected()
      //从原生接口读取当前交易日
      if (pbE.isPoboApp) {
        var allData = pbE.WT().wtLoginRe(_this.CID)
        if (allData) {
          var data = JSON.parse(allData).data
          _this.setDataObj.TradeDate = data[0]['75']
          this.$toast({
            message: data[0]['75'],
            position: 'center'
          })
        }
      }
      //获取云交易的userID
      if (pbE.isPoboApp) {
        _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID)//获取云交易的userId
        //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
        if (!_this.userId) {
//                    testUserId = null;//等于0代表未上传交易账号此时应该callback 102001
        }
      }
      this.getTradeInfo()
      this.nativeInteraction()

//      this.reset();

//      this.touchTimeValue = this.timeCycle();
    },
    destroyed: function () {
      if (pbE.isPoboApp) {
        pbE.HQ().hqUnSubscribe(0, JSON.stringify({'1': [{2: this.destroyMarket, 3: nameCode}]}))//订阅最新价
      }
    },

    methods: {
      //选择合约
      selectContractClick: function (item) {
        console.log(item)
        var _this = this
        _this.selectContractName = item.name
        _this.destroyMarket = item.market
        _this.selectContractClor = '#1a1a1a'
        if (pbE.isPoboApp) {
          //订阅行情
          nameCode = item.code
          pbE.HQ().hqSubscribe(0, JSON.stringify({'1': [{2: item.market, 3: item.code}]}))//订阅最新价
          this.nativeInteraction()
          //获取行情商品价格倍数
          priceMulriple = pbE.HQ().hqGetPriceRate(item.code, item.market)
          decimal = pbE.HQ().hqGetPriceDecimal(item.code, item.market)

          var tradeWT = pbE.HQ().hqGetWTInfo(item.code, item.market, _this.CID)//行情信息转换交易信息
          if (tradeWT) {
            //添加时保存的值
            var data = JSON.parse(tradeWT)
            _this.setDataObj.contractMarket = data.WTMarket//合约市场
            _this.setDataObj.contractCode = data.WTCode//合约品种
            _this.seatNumber = pbE.WT().wtGetXWH(data.WTMarket)//席位号
            _this.decimal = _this.minPrice(_this.CID, data.WTCode, data.WTMarket)
            //通过查持仓，获取该合约可平数量
            _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode, _this.setDataObj.OffsetFlag == 1 || _this.setDataObj.OffsetFlag == 2 ? _this.setDataObj.dealOpen == 0 ? 1 : 0 : _this.setDataObj.dealOpen, _this.setDataObj.OffsetFlag == 2 ? '1' : null)
          }
          //只有这几个市场支持平今
          if (_this.setDataObj.contractMarket != 'SHFE') {//只有沪市支持平今
            _this.pingDayShow = false//将平今置为不可点击
            _this.storehouseTypeClick(0)
          } else {
            _this.pingDayShow = true
          }
          //查询可开
          _this.getStockBuyNum()
        }
        _this.alertModal = false
      },
      //合约弹框显示
      isShowModal () {
        if (this.selectContract && this.selectContract.length != 0) {
          this.alertModal = true
        } else {
          this.$toast({
            message: '请添加自选',
            position: 'center',
          })
        }
      },
      priceInfoDialog: function () {
        let _this = this
        this.inputType = true
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '涨停价',
            click () {
              _this.priceInfoClick(1)
            }
          },
            {
              text: '跌停价',
              click () {
                _this.priceInfoClick(2)
              }
            },
            {
              text: '对手价',
              click () {
                _this.priceInfoClick(3)
              }
            },
            {
              text: '最新价',
              click () {
                _this.priceInfoClick(4)
              }
            }]
        })
      },
      //条件
      conditionClick: function (flag) {
        var _this = this
        _this.openingTimeClick = false
        if (flag == 0) {//价格
          _this.conPrice = true
          _this.conTime = false
          _this.initPrice = true
          _this.initFooter = false
          _this.setDataObj.tj = 1
        }
        if (flag == 1) {//时间
          _this.conPrice = false
          _this.conTime = true
          _this.initPrice = false
          _this.initFooter = false
          //获取当前时间
          var timePicker = {},
            currentTime = new Date()
          timePicker['HH'] = currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours()
          timePicker['mm'] = currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes()
          timePicker['ss'] = currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds()
          _this.touchTimeValue = timePicker
          _this.setDataObj.tj = 2
        }
      },
      //条件单设置中有效期  切换样式
      validDateClick: function (flag) {
        var _this = this
        //  1-当日有效，2-永久有效
        if (flag == 0) {//当日
          _this.validPrice = true
          _this.validTime = false
          _this.setDataObj.validity = 1
          if (_this.setDataObj.contractMarket != '') {
            if (_this.setDataObj.contractMarket != 'SHFE') {//只有沪市支持平今
              _this.pingDayShow = false//将平今置为不可点击
              _this.storehouseTypeClick(0)
            } else {
              _this.pingDayShow = true
            }
          } else {
            _this.pingDayShow = true
          }
          // _this.pingDayShow = true;//将平今置为可点击
        }
        if (flag == 1) {//永久
          _this.validPrice = false
          _this.validTime = true
          _this.setDataObj.validity = 2

          _this.pingDayShow = false//将平今置为不可点击
          _this.storehouseTypeClick(0)

        }
      },
      //条件单设置中买卖方向 切换样式
      buyClick: function (flag) {
        var _this = this
        if (flag == 0) {//买
          _this.buyPrice = true
          _this.buyTime = false
          _this.setDataObj.dealOpen = 0//添加时入库
          //买卖方向  0 买 1 卖     注：默认给 0 买
          _this.setDataObj.selectPriceName = opponentPriceSell
          //根据当前合约和买卖方向从持仓里面再次查下可平
        }
        if (flag == 1) {//卖
          _this.buyPrice = false
          _this.buyTime = true
          _this.setDataObj.dealOpen = 1//添加时入库
          //买卖方向  0 买 1 卖     注：默认给 0 买
          _this.setDataObj.selectPriceName = opponentPriceBuy
          //根据当前合约和买卖方向从持仓里面再次查下可平
        }
        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode, _this.setDataObj.OffsetFlag == 1 || _this.setDataObj.OffsetFlag == 2 ? _this.setDataObj.dealOpen == 0 ? 1 : 0 : _this.setDataObj.dealOpen, _this.setDataObj.OffsetFlag == 2 ? '1' : null)
      },
      //条件单设置中类型 切换样式
      storehouseTypeClick: function (flag) {
        var _this = this
        //开仓
        if (flag == 0) {
          _this.openCang = true

          _this.pingCangBlue = false
          _this.pingDayBlue = false
          _this.setDataObj.OffsetFlag = 0
          $('#openNum').html('--')
        }
        //平仓
        if (flag == 1) {
          _this.pingCangBlue = true
          _this.openCang = false
          _this.pingDayBlue = false
          _this.setDataObj.OffsetFlag = 1
          //buyWay字段要根据买卖类别的反方向取值
          /*var buyWay;
          if (_this.setDataObj.dealOpen == 0) {//买
            buyWay = 1;
          } else if (_this.setDataObj.dealOpen == 1) {//卖
            buyWay = 0;
          }*/
        }
        //平今
        if (flag == 2) {
          _this.pingDayBlue = true

          _this.pingCangBlue = false
          _this.openCang = false
          _this.setDataObj.OffsetFlag = 2
          //buyWay字段要根据买卖类别的反方向取值
          /* var buyWay;
           if (_this.setDataObj.dealOpen == 0) {//买
             buyWay = 1;
           } else if (_this.setDataObj.dealOpen == 1) {//卖
             buyWay = 0;
           }*/
          //503 == 1 平今
        }
        //选择今仓  今昨仓标识传1
        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode, _this.setDataObj.OffsetFlag == 1 || _this.setDataObj.OffsetFlag == 2 ? _this.setDataObj.dealOpen == 0 ? 1 : 0 : _this.setDataObj.dealOpen, _this.setDataObj.OffsetFlag == 2 ? 1 : null)
        _this.getStockBuyNum()
      },
      trustFocus: function () {
        this.inputType = false
        this.setDataObj.priceName = ''
        if (this.os == 'android') {
          setTimeout(() => {
            $('.commissionInput').focus()
          }, 300)
        }
      },
      priceTypeClick: function () {
        if (this.setDataObj.Operator == '>=') {
          this.setDataObj.Operator = '<='
        } else {
          this.setDataObj.Operator = '>='
        }
      },
      //添加设置信息
      addContractInfo: function () {
        var _this = this, isConnected = pbE.isPoboApp ? pbE.WT().wtGetIsConnected(this.CID) : ''
        if (isConnected) {
          if (_this.setDataObj.validity == 1) {
            console.log(_this.setDataObj.validity, _this.setDataObj.TradeDate, 'addinfo2')
            if (_this.setDataObj.TradeDate && _this.setDataObj.TradeDate != '') {
              _this.addinput()
            } else {
//            _this.showMessage('交易已退出！');
              _this.isConnected()
            }
          } else {
            console.log(_this.setDataObj.validity, _this.setDataObj.TradeDate, 'addinfo4')
            _this.addinput()
          }
        } else {
          _this.isConnected()
        }

      },
      //添加前必填项判断
      addinput () {
        var _this = this
        if (_this.setDataObj.tj == 1) {
          if (_this.selectContractName && _this.setDataObj.tjPriceValue && _this.setDataObj.priceName && _this.setDataObj.Volume) {
            _this.addInfo()
          } else {
            _this.showMessage('合约、价格、委托价格、委托数量为必填项！')
          }
        } else if (_this.selectContractName && _this.setDataObj.priceName && _this.setDataObj.Volume) {
          this.addInfo()
        } else {
          _this.showMessage('合约、价格、委托价格、委托数量为必填项！')
        }
      },
      trustPrice: function (type, value) {
        let intReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
        if (value != '') {
          if (!intReg.test(value)) {
            this.showMessage('请输入数字字符')
          } else {
            this.trustPriceType = type
            if (this.selectContractName) {
              this.getStockBuyNum()
            }
          }
        }
      },
      //设置条件单的类型
      priceInfoClick: function (flag) {
        this.trustPriceType = 2
        var _this = this
        if (flag == 1) {//涨停价
          this.setDataObj.priceName = '涨停价' //新增
          this.setDataObj.selectPriceName = upPrice
        }
        if (flag == 2) {//跌停价
          this.setDataObj.priceName = '跌停价'
          this.setDataObj.selectPriceName = downPrice
        }
        if (flag == 3) {//对手价
          this.setDataObj.priceName = '对手价'
          //根据选择的类型买还是卖   //买卖方向  0 买 1 卖     注：默认给 0 买
          if (_this.setDataObj.dealOpen == 0) {
            _this.setDataObj.selectPriceName = opponentPriceSell
          } else if (_this.setDataObj.dealOpen == 1) {
            _this.setDataObj.selectPriceName = opponentPriceBuy
          }
        }
        if (flag == 4) {//最新价
          this.setDataObj.priceName = '最新价'
          this.setDataObj.selectPriceName = lastPrice
        }
        //查询可开
        _this.getStockBuyNum()
      },
      //查可平
      getCanBuy: function (market, code, buyWay, todayFlag) {
        console.log(market, code, buyWay, todayFlag, '可平')
        if (pbE.isPoboApp) {
          //通过查持仓，获取该合约可平数量
          var _this = this,
            allData = pbE.WT().wtQueryStockRe(_this.CID)
          if (allData) {
            var stocks = JSON.parse(allData).data
            for (var i = 0; i < stocks.length; i++) {
              if (market == stocks[i]['54'] && code == stocks[i]['63']) {
                if (buyWay == stocks[i]['112'] && todayFlag) {
                  if (stocks[i]['54'] == 'SHFE') {
                    if (todayFlag == stocks[i]['503']) {
                      if (stocks[i][137]) {
                        $('#openNum').html(stocks[i][137])
                      } else {
                        $('#openNum').html('--')
                      }
                      break
                    } else {
                      $('#openNum').html('--')
                    }
                  } else if (stocks[i]['503'] == '0') {
                    if (stocks[i][137]) {
                      $('#openNum').html(stocks[i][137])
                    } else {
                      $('#openNum').html('--')
                    }
                    break
                  }
                } else if (buyWay == stocks[i]['112'] && _this.setDataObj.OffsetFlag == 2) {
                  if (stocks[i]['503'] == '2') {
                    if (stocks[i][137]) {
                      $('#openNum').html(stocks[i][137])
                    } else {
                      $('#openNum').html('--')
                    }
                    break
                  } else {
                    $('#openNum').html('--')
                  }
                } else if (buyWay == stocks[i]['112'] && _this.setDataObj.OffsetFlag != 0) {
                  if (stocks[i][137]) {
                    $('#openNum').html(stocks[i][137])
                  } else {
                    $('#openNum').html('--')
                  }
                  break
                }
              } else {
                $('#openNum').html('--')
              }
            }
          }
        }
      },
      //查可开
      getStockBuyNum: function () {
        console.log('查可开')
        var _this = this
        if (_this.selectContractName && _this.setDataObj.priceName) {
          if (pbE.isPoboApp) {
            var priceValue
            if (_this.trustPriceType == 2) {//表示选择
              priceValue = _this.setDataObj.selectPriceName + '' //选择的委托价格
            } else if (_this.trustPriceType == 1) {//表示输入
              priceValue = _this.setDataObj.priceName + ''
            }
            gdZH = pbE.WT().wtGetGDZH(_this.setDataObj.contractMarket)
            var data = {
              63: _this.setDataObj.contractCode,//合约代码
              54: _this.setDataObj.contractMarket,//市场代码
              129: priceValue,//委托价格
              112: _this.setDataObj.dealOpen + '',//买卖类别
              117: '0',//开平仓标志
              119: '1',//投保标志
              52: gdZH,//股东账号
              125: '0',//期权备兑标志
              161: _this.seatNumber,//席位号
              40: '2',//价格类别、
              41: '3',//有效期类别
              42: '1'//成交数量
            }
            console.log(JSON.stringify(data))
            pbE.WT().wtQueryStockBuy(_this.CID, JSON.stringify(data))//可开
          }
        }
      },
      reset: function () {
        console.log('1')
        this.selectContractName = '选择期货合约'
        this.selectContractClor = '#c0c6cd'
        $('#newPrice').html('--')//最新价
        this.setDataObj.conditionName = ''
        this.validPrice = true
        this.validTime = false
        this.setDataObj.validity = 1
        this.pingDayShow = true//将平今置为可点击
        this.conPrice = true
        this.conTime = false
        this.initPrice = true
        this.initFooter = false
        this.setDataObj.tj = 1
        this.setDataObj.Operator = '<='
        this.setDataObj.tjPriceValue = ''
        this.touchTimeValue = {
          HH: '',
          mm: '',
          ss: ''
        }
        this.buyPrice = true
        this.buyTime = false
        this.setDataObj.dealOpen = 0
        this.setDataObj.selectPriceName = ''
        this.openCang = true
        this.pingCangBlue = false
        this.pingDayBlue = false
        this.setDataObj.OffsetFlag = 0
        this.trustPriceType = 1
        this.setDataObj.priceName = ''
        this.setDataObj.Volume = ''
        $('#openBuy').html('--')
        $('#openNum').html('--')
        this.openingTimeClick = false
      },
      addInfo: function () {
        var _this = this
        var data = new _this.setConData()
        if (_this.selectContractName && _this.selectContractName == '选择期货合约') {
          _this.showMessage('请选择选择期货合约！')
          return
        }
        if (!_this.userId) {
          _this.showMessage('userId不能为空！')
          return
        }
        data.Contracts[0] = {
          ExchangeCode: _this.setDataObj.contractMarket,//合约名称
          ContractCode: _this.setDataObj.contractCode//合约品种
        }
        data.TimeCondition = _this.setDataObj.validity//有效期 1-当日有效，2-永久有效
//        if (data.TimeCondition == 1) {
        data.TradeDate = _this.setDataObj.TradeDate////交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
//        }
        data.ConditionChoiced = _this.setDataObj.tj//当前选择条件：1-价格，2-时间
        if (_this.setDataObj.tj == 1) {//代表价格
          data.ConditionList[0].Price.Operator = _this.setDataObj.Operator//操作
          //data.ConditionList[0].Price.Value = _this.setDataObj.tjPriceValue;//条件里面的输入价格
          //data.ConditionList[0].Price.Value = 3;//条件里面的输入价格
          //如果输入的是整数，就直接强转为整数类型，如果输入的是小数就转换为double类型
          if (!_this.numRex.test(_this.setDataObj.tjPriceValue)) {
            data.ConditionList[0].Price.Value = parseInt(_this.setDataObj.tjPriceValue)//条件里面的输入价格
          } else {
            data.ConditionList[0].Price.Value = _this.setDataObj.tjPriceValue * 1//条件里面的输入价格
          }
        }
        if (_this.setDataObj.tj == 2) {//代表时间
          data.ConditionList[1].Time = _this.touchTimeValue.HH + ':' + _this.touchTimeValue.mm + ':' + _this.touchTimeValue.ss
        }
        //最小变动价位
        data.OrderAction.SmartOrder.Order.MiniPriceTick = _this.decimal
        //下单
        data.OrderAction.SmartOrder.Order.Contract = {
          ExchangeCode: _this.setDataObj.contractMarket,//合约名称  市场
          ContractCode: _this.setDataObj.contractCode//合约品种    合约
        }
        //委托数
        data.OrderAction.SmartOrder.Order.Direction = _this.setDataObj.dealOpen + ''//买卖方向
        data.OrderAction.SmartOrder.Order.OffsetFlag = _this.setDataObj.OffsetFlag + ''//开平标识
        data.OrderAction.SmartOrder.Order.Volume = parseInt(_this.setDataObj.Volume)//委托数量
        //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
        if (_this.trustPriceType == 2) {//表示选择
          data.OrderAction.SmartOrder.Order.LimitPriceType = _this.setDataObj.priceName //选择的委托价格
//                    data.OrderAction.SmartOrder.Order.LimitPrice = _this.setDataObj.selectPriceName+'';
        } else if (_this.trustPriceType == 1) {//表示输入
          data.OrderAction.SmartOrder.Order.LimitPrice = _this.setDataObj.priceName + '' //输入的委托价格
          data.OrderAction.SmartOrder.Order.LimitPriceType = 'CustomPrice'//如果是输入的价格就将CustomPrice赋给LimitPriceType
        }
        data.OrderAction.SmartOrder.Order.ExtRawData['52'] = gdZH//股东账户
        data.OrderAction.SmartOrder.Order.ExtRawData['161'] = _this.seatNumber//席位号
        //console.log(data)
        //条件单名称：让客户选填，不填的默认为合约名称+条件的值(价格[操作>=、<= 和价格的值]和时间)
        if (!_this.setDataObj.conditionName) {
          /*if (_this.setDataObj.tj == 1) {//价格
            _this.setDataObj.conditionName = _this.selectContractName + _this.setDataObj.Operator + _this.setDataObj.tjPriceValue;
          } else {//时间（2）
            _this.setDataObj.conditionName = _this.selectContractName + _this.touchTimeValue.HH + ":" + _this.touchTimeValue.mm + ":" + _this.touchTimeValue.ss;
//            _this.setDataObj.conditionName = _this.selectContractName + _this.touchTimeValue + ':00';
          }*/
          _this.setDataObj.conditionName = _this.selectContractName + '的' + (_this.setDataObj.dealOpen == 0 ? '买' : '卖') + (_this.setDataObj.OffsetFlag == 0 ? '开' : '平') + '条件单'
        }
        //登录账号类别   从原生读取
        data.Name = _this.setDataObj.conditionName
        data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass//登录类别
        data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass//账号类别
        data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount//登录账号
        data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.orgCode//机构代码
        data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB//席位类别
        data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId//用户账号
        console.log(JSON.stringify(data), '添加')
        _this.$loading.toggle(' ')//显示转圈
        _this.$axios.post(_this.conditionUrl, {
          func: _this.addContract,
          token: _this.token,
          id: _this.authId,
          name: _this.setDataObj.conditionName,//条件单名称
          subType: _this.setDataObj.tj + '',
          HYMC: _this.selectContractName,
          orgCode: _this.orgCode,
          type: _this.contractType,
          userID: _this.userId,
          data: data,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data
          console.log(data)
          _this.$loading.hide()//隐藏转圈
          if (data.status == 0) {
            _this.pageNoneNum = 0
            _this.dataOrFlag = 1
            _this.reset()
            _this.showMessage('设置成功！', () => {
              _this.$router.replace('/mobileList/1')
            }, 2)
            console.log('设置成功！')
          } else {
            _this.showMessage(data.msg)
            return
          }
        }).catch(function (error) {
          console.error(error)
          _this.$loading.hide()
          _this.showMessage('网络超时，请稍后再试')
        })
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
          pbPage.addModuleCallback(90000, this.marketCallback)
          pbPage.addFunCallback(6044, this.fundCallback)//查询可开 可买数量
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
      marketCallback (msg) {
        let _this = this
        msg = msg.jData.Data
        console.log(msg, '90000')
        for (var i = 0; i < msg.length; i++) {//最新价
          if (_this.selectContractName != '选择期货合约') {
            if (msg[i][10] == nameCode) {
              if (msg[i][29]) {
                lastPrice = pbUtils.decimalDecPrice(decimal, msg[i][29] / priceMulriple)//最新价
                $('#newPrice').html(pbUtils.decimalDecPrice(decimal, msg[i][29] / priceMulriple))//最新价
              } else {
                $('#newPrice').html('--')//最新价
              }
              if (msg[i][30]) {
                upPrice = pbUtils.decimalDecPrice(decimal, msg[i][30] / priceMulriple)//涨停价
              }
              if (msg[i][31]) {
                downPrice = pbUtils.decimalDecPrice(decimal, msg[i][30] / priceMulriple)//跌停价
              }
              if (msg[i].BidSize[0][40]) {
                opponentPriceSell = pbUtils.decimalDecPrice(decimal, msg[i].BidSize[0][40] / priceMulriple)//卖
              }
              if (msg[i].AskSize[0][42]) {
                opponentPriceBuy = pbUtils.decimalDecPrice(decimal, msg[i].AskSize[0][42] / priceMulriple)//买
              }
            }
          }
        }
      },
      //6044 callback
      fundCallback (msg) {
        console.log(msg, '6044')
        msg = msg.jData.data
        if (msg) {
          if (msg[0]) {
            $('#openBuy').html(msg[0][250])
            console.log(msg[0][250])
          } else {
            $('#openBuy').html(0)//如果没值就显示0
          }
        }
      },
//      102001 callback
      userIdCallback (msg) {
        if (this.userId == null) {
          if (msg) {
            if (102001 == msg.functionNo) {
              this.userId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID())//获取云交易的userId
            }
          }
        }
      },
      //开盘时点击
      openingTime () {
        this.openingTimeClick = !this.openingTimeClick
        if (this.openingTimeClick) {
          this.setDataObj.tj = 3
        } else {
          this.setDataObj.tj = 2
        }
      }
    }
  }
</script>
