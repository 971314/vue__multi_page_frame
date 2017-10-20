<template>
  <div class="alert-content tab-content jiangePadding">
    <nav-tress @refurbishButton="refurbishButton"></nav-tress>
    <!--我的预警-->
    <div id="TableList">
      <div class="TheadWrap color52">
        <table class="brief static">
          <tbody>
          <tr>
            <td>合约</td>
          </tr>
          </tbody>
        </table>
        <div class="detailOuter">
          <table class="staticBody">
            <tbody>
            <tr>
              <td>状态</td>
              <!--<td>最新价</td>-->
              <td>价格上限</td>
              <td>价格下限</td>
              <td>现手上限</td>
              <td>成交量上限</td>
              <td>持仓上限</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="TbodyWrap" id="alertList">
        <div class="TbodyInner">
          <table class="brief static">
            <tbody>
            <tr class="clickBack1" v-for="(myVal,i) in myAlerted"
                v-tap="[deleteListShow,myVal.conditionID,i]"
                :key="i">
              <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">
                {{myVal.HYDM}}
              </td>
            </tr>
            </tbody>
          </table>
          <div class="detailOuter">
            <table class="detail staticBody">
              <tbody>
              <tr class="clickBack" v-for="(myVal,i) in myAlerted"
                  v-tap="[deleteListShow,myVal.conditionID,i]"
                  :key="i">
                <state-change :flag1="myVal.flag1" :flag3="myVal.flag3"></state-change>
                <!--<td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.newPrice}}-->
                <!--</td>-->
                <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.priceup}}</td>
                <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.pricedown}}
                </td>
                <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.CurVolUp}}
                </td>
                <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.VolumeUp}}
                </td>
                <td :class="{none : myVal.flag3 == 25 || myVal.flag3 == 29 || myVal.flag3 == 24}">{{myVal.AmountUp}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--点击刷新-->
      <div class="clickRefresh" @click="clickRefresh" v-show="myAlerted.length >= 20">{{refreshText}}</div>
    </div>
  </div>
</template>
<script>
  import navTress from './navThree.vue';

  export default {
    data: function () {
      return {
        myAlerted: [],//预警列表
        ContractCode: [],//我的预警code
        GetPriceRateMy: [],//行情商品价格倍数
        conditionID: [],//条件单编号
        refreshing: false,
        os: '',//系统
        decimal: [],//现价价格小数位
        accountID: null,
        alertDelay: true,//弹框延时标志
        clickNum: 0,//点击次数
        refreshText: '点击加载更多',
        marketArr: [],
        bufferNew: [],//缓存最新价
        interval1: null,
        interval2: null,
      }
    },
    mounted() {
      Ps.initialize(document.getElementById('alertList'), {
        frozen: true,
        wheelSpeed: 200
      });
    },
    updated: function () {
      Ps.update(document.getElementById('alertList'));
    },
    activated() {
      this.pageReload();
    },
    components: {
      navTress
    },
    methods: {
      // 删除
      deleteListShow: function (conditionID, i) {
        let _this = this;
        $('.clickBack').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        $('.clickBack1').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        if (!this.alertDelay) return;
        this.alertDelay = false;
        setTimeout(() => {
          _this.alertDelay = true;
          _this.$alertBtn({
            maskClosable: true,
            btns: [{
              text: '删除',
              click: () => {
                _this.showMessage('是否删除当前预警', () => {
                  _this.$axios.post(_this.conditionUrl, {
                    func: '1003',
                    token: _this.token,
                    id: _this.testId,
                    userID: _this.accountID,
                    orgCode: _this.orgCode,
                    data: [conditionID],
                    type: _this.alertType
                  }, {timeout: 10000}).then(function (data) {
                    data = data.data;
                    console.log(data);
                    if (data.status == 0) {
                      for (let s = 0; s < _this.myAlerted.length; s++) {
                        if (_this.myAlerted[s].conditionID == data.data[0]) {
                          _this.myAlerted.splice(s, 1);
                          $('.clickBack1').removeClass("tableCheckCss");
                          $('.clickBack').removeClass("tableCheckCss");
                        }
                      }
                      _this.showMessage('删除成功');
                    } else {
                      _this.showMessage('删除失败');
                    }
                  }).catch(function (error) {
                    _this.showMessage('网络超时，请稍后再试');
                    console.error(error);
                  });
                }, 1);
              }
            }, {
              text: '全部删除',
              click: () => {
                console.log(_this.conditionID, 'conditionID');
                _this.showMessage('是否删除全部预警', () => {
                  _this.$axios.post(_this.conditionUrl, {
                    func: '1003',
                    token: _this.token,
                    id: _this.testId,
                    userID: _this.accountID,
                    orgCode: _this.orgCode,
                    data: _this.conditionID,
                    type: _this.alertType
                  }, {timeout: 10000}).then(function (data) {
                    data = data.data;
                    console.log(data);
                    if (data.status == 0) {
                      for (let s = 0; s < _this.myAlerted.length; s++) {
                        if (_this.myAlerted[s].conditionID == data.data[0]) {
                          _this.myAlerted.splice(s, 1);
                          $('.clickBack1').removeClass("tableCheckCss");
                          $('.clickBack').removeClass("tableCheckCss");
                        }
                      }
                      _this.pageReload();
                      _this.showMessage('删除成功');
                    } else {
                      _this.showMessage('删除失败');
                    }
                  }).catch(function (error) {
                    _this.showMessage('网络超时，请稍后再试');
                    console.error(error);
                  });
                }, 1);
              }
            }]
          });
        }, 360);
//          this.conditionID = conditionID;/
      },
      //获取列表
      listRequest: function () {
        this.clickNum = 0;
        this.refreshText = '点击加载更多';
        var _this = this;
        _this.$loading.toggle(' ');
        _this.$axios.post(_this.conditionUrl, {
          func: _this.PaasFun,
          token: _this.token,
          type: _this.alertType,
          id: _this.testId,
          userID: _this.accountID,
          begin: _this.clickNum * 20 + '',
          total: '20',
          orgCode: _this.orgCode,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data);
          _this.$loading.hide();
          if (data.status == 0) {
            _this.myAlerted = [];
            _this.ContractCode = [];
            _this.GetPriceRateMy = [];
            _this.decimal = [];
            _this.marketArr = [];
            _this.conditionID = [];
            $.each(data.data, function (key, val) {
              var market = JSON.parse(val.conditionValue).Stock.MarketID,
                code = JSON.parse(val.conditionValue).Stock.PBCode;
              if (val.gr == 0) {
                _this.myAlerted.push({
                  HYDM: val.HYMC,
                  newPrice: '--',//最新价
                  priceup: JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                  pricedown: JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                  CurVolUp: JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                  VolumeUp: JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                  AmountUp: JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value,//持仓上限
                  conditionID: val.conditionID,
                  flag1: val.flag1,
                  flag3: val.flag3,
                  code:code
                });
                _this.conditionID.push(val.conditionID);
                _this.ContractCode.push(code);
                _this.marketArr.push({
                  '2': market,
                  '3': code
                });
                if (pbE.isPoboApp) {
                  _this.GetPriceRateMy.push(pbE.HQ().hqGetPriceRate(code, market));//价格倍数
                  _this.decimal.push(pbE.HQ().hqGetPriceDecimal(code, market));
                }
              }
            });
           /* if (pbE.isPoboApp) {
              pbE.HQ().hqSubscribe(0, JSON.stringify({"1": _this.marketArr}));
              _this.onchengnewPrice();
            }*/
          } else {
            _this.showMessage('加载失败');
          }
        }).catch(function (error) {
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
          console.error(error);
        });
      },
//      最新价定时器
      onchengnewPrice() {
       this.interval1 = setInterval(() => {
          for (let n = 0; n < this.myAlerted.length; n++) {
            for(let s = 0; s < this.bufferNew.length;s++){
              if(this.myAlerted[n].code == this.bufferNew[s].code){
                if(this.myAlerted[n].newPrice != this.bufferNew[s].newPrice){
                  this.myAlerted[n].newPrice =this.bufferNew[s].newPrice
                }
              }
            }
          }
        }, 500)
      },
      //获取账号信息
      getAccountId: function () {
        var _this = this;
        _this.$axios.post(_this.conditionUrl, {
          func: '1001',
          token: _this.token,
          id: _this.testId,
          orgCode: _this.orgCode,
          account: _this.userName,
          accountType: '',
          loginType: '',
          type: _this.alertType,
          seatNumber: '',
          os: _this.os
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data);
          if (data.status == 0) {
            _this.accountID = data.data.userID;
            _this.listRequest()
          }
        }).catch(function (error) {
          _this.showMessage('网络超时，请稍后再试');
          console.error(error);
        });
      },
      //刷新
      refurbishButton: function () {
        var _this = this;
        if (_this.refreshing) {
          _this.showMessage('刷新过于频繁，两次查询间隔至少5秒');
        } else {
          document.getElementsByTagName('body')[0].scrollTop = 0;
          _this.refreshing = true;
          setTimeout(function () {
            _this.refreshing = false;
          }, 5000);
          _this.listRequest();
        }
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
//          pbPage.addModuleCallback(90000, this.marketCallback);
          pbPage.addModuleFunCallback(90007, 200, this.unreadCallback);
          pbPage.addReloadFunByKey('alertedM', this.pageReload);
        } else {
          pbPage.initPage({
            callbacks: [
//              {module: 90000, callback: this.marketCallback},
              {module: 90007, fun: 200, callback: this.unreadCallback}],
            reload: this.pageReload
          })
        }
      },
      marketCallback(mag) {
        let _this = this;
        mag = mag.jData.Data;
        console.log(mag);
        for (let i = 0; i < mag.length; i++) {
          if (_this.myAlerted.length > 0) {
            for (let j = 0; j < _this.myAlerted.length; j++) {
              if (mag[i]['10'] == _this.ContractCode[j]) {
                let newPrice = mag[i]['29'] / _this.GetPriceRateMy[j];
                if (!isNaN(newPrice)) {
                  _this.bufferNew.push({
                    code: _this.ContractCode[j],
                    newPrice: pbUtils.decimalDecPrice(_this.decimal[j], newPrice)
                  });
//                    _this.myAlerted[j].newPrice = pbUtils.decimalDecPrice(_this.decimal[j], newPrice)
                }else{
                  _this.bufferNew.push({
                    code: _this.ContractCode[j],
                    newPrice: '--'
                  });
                }
              }
            }
          }
        }
        _this.bufferNew = _.uniq(_this.bufferNew, true, 'code');
      },
      //在线推送
      unreadCallback(msg) {
        let _this = this;
        console.log(msg);
        msg = msg.jData;
        if (msg && msg.length != 0) {
          if (msg.type == 5) {
            let p = msg.p.split(',');
            for (let n = 0; n < _this.myAlerted.length; n++) {
              if (_this.myAlerted[n].conditionID == p[1]) {
                if (p[0] == 26) {
                  _this.myAlerted.splice(n, 1);
                  $('.clickBack1').removeClass("tableCheckCss");
                  $('.clickBack').removeClass("tableCheckCss");
                } else {
                  _this.myAlerted[n].flag3 = p[0];
                }
                break;
              }
            }
          }
        }
      },
      //分页
      clickRefresh() {
        let _this = this;
        console.log(this.clickNum);
        _this.clickNum += 1;
        _this.$loading.toggle(' ');
        _this.$axios.post(_this.conditionUrl, {
          func: _this.PaasFun,
          token: _this.token,
          type: _this.alertType,
          id: _this.testId,
          userID: _this.accountID,
          begin: _this.clickNum * 20 + '',
          total: '20',
          orgCode: _this.orgCode,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data);
          if (data.status == 0) {
            _this.$loading.hide();
            if (data.data.length != 0) {
              $.each(data.data, function (key, val) {
                var market = JSON.parse(val.conditionValue).Stock.MarketID,
                  code = JSON.parse(val.conditionValue).Stock.PBCode;
                if (val.gr == 0) {
                  _this.myAlerted.push({
                    HYDM: val.HYMC,
                    newPrice: '--',//最新价
                    priceup: JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                    pricedown: JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                    CurVolUp: JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                    VolumeUp: JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                    AmountUp: JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value,//持仓上限
                    conditionID: val.conditionID,
                    flag1: val.flag1,
                    flag3: val.flag3,
                    code:code
                  });
                  _this.conditionID.push(val.conditionID);
                  _this.ContractCode.push(code);
                  _this.marketArr.push({
                    '2': market,
                    '3': code
                  });
                  if (pbE.isPoboApp) {
                    _this.GetPriceRateMy.push(pbE.HQ().hqGetPriceRate(code, market));//价格倍数
                    _this.decimal.push(pbE.HQ().hqGetPriceDecimal(code, market));
                  }
                }
              });
              /*if (pbE.isPoboApp) {
                pbE.HQ().hqSubscribe(0, JSON.stringify({"1": _this.marketArr}));
                _this.onchengnewPrice();
              }*/
            } else {
              _this.refreshText = '已经没有更多';
            }
            _this.myAlerted = _this.dataSort(_this.myAlerted);
          } else {
            _this.showMessage('加载失败');
          }
        }).catch(function (error) {
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
          console.error(error);
        });
      },
      pageReload() {
        console.log('pageReload alerted');
        this.nativeInteraction();
        if (this.accountID) {
          this.listRequest()
        } else {
          this.getAccountId()
        }
      }
    }
  }
</script>
