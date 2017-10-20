<template>
  <div class="tab-content jiangePadding">
    <nav-tress @resettingButton="resettingButton"></nav-tress>
    <alert-modal v-model="alertModal">
      <div class="alert_body">
        <div>
          <div v-for="data in dealnames" @click.stop="dealnameClick(data)">{{data.name}}</div>
        </div>
      </div>
    </alert-modal>
    <!--预警设置-->
    <div>
      <div class="setDiv">
        <ul class="clearfloat">
          <li>
            <div class="heyuk" @click="isShowModal" :style="{color:dealnameColor}">{{dealname}}</div>
            <div>
              <span class="fontcol8080">仓差：</span>
              <span id="warehouseBad">--</span>
            </div>
          </li>
          <li>
            <div><span class="fontcol8080">最新价：</span><span class="fontcol1423" id="priceValue">--</span></div>
            <div><span class="fontcol8080">持仓量：</span><span id="openInterest">--</span></div>
          </li>
          <li class="font15">
            <div @click="selectClick(0)">
              <span :class="{set:selectOne,unset:unselectOne}" class="select"></span>
              <span>价格上限</span>
            </div>
            <input type="number" disabled id="priceup" v-model="msg0"/>
          </li>
          <li>
            <div @click="selectClick(1)">
              <span :class="{set:selectTwo,unset:unselectTwo}" class="select"></span>
              <span>价格下限</span>
            </div>
            <input type="number" disabled id="pricedown" v-model="msg1"/>
          </li>
          <li>
            <div @click="selectClick(2)">
              <span :class="{set:selectThree,unset:unselectThree}" class="select"></span>
              <span>现手上限</span>
            </div>
            <input type="number" disabled id="curVolUp" v-model="msg2"/>
          </li>
          <li>
            <div @click="selectClick(3)">
              <span :class="{set:selectFour,unset:unselectFour}" class="select"></span>
              <span>成交量上限</span>
            </div>
            <input type="number" disabled id="volumeUp" v-model="msg3"/>
          </li>
          <li>
            <div @click="selectClick(4)">
              <span :class="{set:selectFive,unset:unselectFive}" class="select"></span>
              <span>持仓上限</span>
            </div>
            <input type="number" disabled id="entrustUp" v-model="msg4"/>
          </li>
        </ul>
      </div>
      <div class="tips">
        注：该预警永久有效<br/>
        当其中一条条件被触发后，不会再次预警
      </div>
      <button id="btnSubmits" :style={background:buttonColor} :disabled="buttonDisabled"
              @click="insertClick">
        添加
      </button>
    </div>
  </div>
</template>
<script>
  import navTress from './navThree.vue';

  export default {
    data: function () {
      return {
        selectOne: false,//设置
        unselectOne: true,
        selectTwo: false,
        unselectTwo: true,
        selectThree: false,
        unselectThree: true,
        selectFour: false,
        unselectFour: true,
        selectFive: false,
        unselectFive: true,
        msg0: '',//价格上限
        msg1: '',//价格下限
        msg2: '',//现手上限
        msg3: '',//成交量上限
        msg4: '',//持仓上限
        dealnames: [],//选择合约名称数组
        dealnameColor: 'black',//合约名称显示框字体颜色
        dealname: '选择合约',//合约名称显示框
        buttonColor: '#c0c6cd',//按钮颜色
        buttonDisabled: true, //按钮属性
        limit: true,//是否可添加
        nameCode: '',//合约代码
        nameMarket: '',//合约市场
        Android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
        GetPriceRate: null,//价格倍数
        decimal: null,//价格小数位
        accountID: null,
        yesterdayP: null,//保存callback【225】字段
        alertModal: false
      }
    },
    watch: {
      msg0: function (val) {
        this.iblur(val)
      },
      msg1: function (val) {
        if (val.indexOf('-') > -1) {
          this.msg1 = '';
        } else {
          this.iblur(val)
        }
      },
      msg2: function (val) {
        this.iblur(val)
      },
      msg3: function (val) {
        this.iblur(val)
      },
      msg4: function (val) {
        this.iblur(val)
      }
    },
    mounted: function () {
      this.nativeInteraction();
      var constractName;
      if (pbE.isPoboApp) {
        constractName = pbE.ZX().getSelfStock(0) ? JSON.parse(pbE.ZX().getSelfStock(0)) : '';
        if (constractName) {
          var flag = [],
            hyType = [];
          for (var i = 0; i < constractName.length; i++) {//判断合约  8为期货
            if (pbE.HQ().hqGetHqType(constractName[i].code, String(constractName[i].market), pbE.HQ().hqGetGroupFlag(constractName[i].code, String(constractName[i].market))) == 8) {
              this.dealnames.push(constractName[i]);
            }
          }
          // this.dealnames = constractName;
        }
      } else {
        this.dealnames = [
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'},
          {"name": "沪铜1702", "market": 5000, "code": 'GLNG'}
        ]
      }
      this.nameCode = this.$route.query.hqCode;
      this.nameMarket = this.$route.query.hqMarket;
      if (this.nameCode && this.nameMarket) {
        if (pbE.isPoboApp) {
          pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: this.nameMarket, 3: this.nameCode}]}));
          this.nativeInteraction();
          this.GetPriceRate = pbE.HQ().hqGetPriceRate(this.nameCode, this.nameMarket);
          this.decimal = pbE.HQ().hqGetPriceDecimal(this.nameCode, this.nameMarket)
          var tradeHq = JSON.parse(pbE.HQ().getHQInfo(this.nameCode, this.nameMarket)).name;
          if (tradeHq) {
            this.dealname = tradeHq;
          }
//          this.nativeInteraction();
        } else {
          this.dealname = "沪铜1702";
        }
      }
    },
    activated() {
      if (!this.accountID) {
        this.getAccountId();
      }
      this.nativeInteraction();
    },
    components: {
      navTress: navTress
    },
    methods: {
      changeAlert(str) {
        this.alertModal = str;
      },
      //添加预警点击事件
      insertClick: function () {
        var insertAlerted = new this.alertInsert(),
          _this = this,
          priceup = $("#priceup").prop('disabled'),
          pricedown = $("#pricedown").prop('disabled'),
          curVolUp = $("#curVolUp").prop('disabled'),
          volumeUp = $("#volumeUp").prop('disabled'),
          entrustUp = $("#entrustUp").prop('disabled');
        if (_this.limit && $('#dealname').html() !== '选择合约') {
          insertAlerted.Stock.MarketID = Number(_this.nameMarket);
          insertAlerted.Stock.PBCode = _this.nameCode;
          if (!priceup) {
            if (_this.msg0 !== '') {
              insertAlerted.ConditionList[0].PriceUpLimit.Enabled = true;
              insertAlerted.ConditionList[0].PriceUpLimit.Value = parseFloat($("#priceup").val());
            } else {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('请输入数字字符');
              return;
            }
          }
          if (!pricedown) {
            if (_this.msg1 != '') {
              insertAlerted.ConditionList[0].PriceDownLimit.Enabled = true;
              insertAlerted.ConditionList[0].PriceDownLimit.Value = parseFloat($("#pricedown").val());
            } else {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('请输入数字字符');
              return;
            }
          }
          if (!curVolUp) {
            if (_this.msg2 != '') {
              insertAlerted.ConditionList[0].CurVolUpLimit.Enabled = true;
              insertAlerted.ConditionList[0].CurVolUpLimit.Value = parseFloat($("#curVolUp").val());
            } else {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('请输入数字字符');
              return;
            }
          }
          if (!volumeUp) {
            if (_this.msg3 != '') {
              insertAlerted.ConditionList[0].VolumeUpLimit.Enabled = true;
              insertAlerted.ConditionList[0].VolumeUpLimit.Value = parseFloat($("#volumeUp").val());
            } else {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('请输入数字字符');
              return;
            }
          }
          if (!entrustUp) {
            if (_this.msg4 != '') {
              insertAlerted.ConditionList[0].AmountUpLimit.Enabled = true;
              insertAlerted.ConditionList[0].AmountUpLimit.Value = parseFloat($("#entrustUp").val());
            } else {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('请输入数字字符');
              return;
            }
          }
          if (!priceup && !pricedown) {
            if (Number(_this.msg0) < Number(_this.msg1)) {
              _this.buttonColor = '#c0c6cd';
              _this.buttonDisabled = true;
              _this.showMessage('价格下限不能高于价格上限');
              return;
            }
          }
          if (!_this.buttonDisabled) {
            this.$loading.toggle(' ');
            if (!_this.accountID) {
              _this.getAccountId();
              _this.$loading.hide();
              _this.showMessage('网络异常，请稍后再试！');
            } else {
              _this.$axios.post(_this.conditionUrl, {
                func: '1002',
                token: _this.token,
                type: _this.alertType,
                userID: _this.accountID,
                id: _this.testId,
                subType: "",
                name: "",
                orgCode: _this.orgCode,
                data: insertAlerted,
                HYMC: _this.dealname,
                os: _this.os
              }, {timeout: 10000}).then(function (data) {
                console.log(data.data);
                _this.$loading.hide();
                if (data.data.status == 0) {
                  _this.showMessage('添加成功！', () => {
                    _this.$router.replace('/mobileList/1');
                  }, 2);
                  _this.dealname = '选择合约';
                  _this.dealnameColor = '#c0c6cd';
                  _this.inputDisabled();
                } else if (data.data.status == -10) {
                  _this.showMessage('预警限制为20条！');
                  _this.inputDisabled();
                  _this.dealname = '预警限制为20条';
                  _this.dealnameColor = 'red';
                  _this.limit = false;
                } else {
                  _this.showMessage(data.data.msg);
                }
              }).catch(function (error) {
                _this.$loading.hide();
                _this.showMessage('网络超时，请稍后再试');
                console.error(error);
              });
            }
          }
        }
      },
      isShowModal() {
        if (this.limit && this.dealnames && this.dealnames.length != 0) {
          this.alertModal = true;
        } else {
          this.$toast({
            message: '请添加自选',
            position: 'center',
          });
        }
      },
      //选择点击设置
      async selectClick(flag) {
        var _this = this;
        if (_this.limit) {
          if (_this.dealname != '选择合约') {
            if (flag == 0) {
              _this.selectOne = !_this.selectOne;
              _this.unselectOne = !_this.unselectOne;
              if (_this.selectOne) {
                $('#priceup').removeAttr('disabled');
                /* setTimeout(() => {
                   $('#priceup').focus();
                 }, 200)*/
              } else {
                $('#priceup').attr('disabled', 'disabled');
                _this.msg0 = '';
              }
            } else if (flag == 1) {
              _this.selectTwo = !_this.selectTwo;
              _this.unselectTwo = !_this.unselectTwo;
              if (_this.selectTwo) {
                $('#pricedown').removeAttr('disabled');
                /*setTimeout(() => {
                  $('#pricedown').focus();
                }, 200)*/
              } else {
                $('#pricedown').attr('disabled', 'disabled');
                _this.msg1 = '';
              }
            } else if (flag == 2) {
              _this.selectThree = !_this.selectThree;
              _this.unselectThree = !_this.unselectThree;
              if (_this.selectThree) {
                $('#curVolUp').removeAttr('disabled');
                /*setTimeout(() => {
                  $('#curVolUp').focus();
                }, 200)*/
              } else {
                $('#curVolUp').attr('disabled', 'disabled');
                _this.msg2 = '';
              }
            } else if (flag == 3) {
              _this.selectFour = !_this.selectFour;
              _this.unselectFour = !_this.unselectFour;
              if (_this.selectFour) {
                $('#volumeUp').removeAttr('disabled');
                /*setTimeout(() => {
                  $('#volumeUp').focus();
                }, 200)*/
              } else {
                $('#volumeUp').attr('disabled', 'disabled');
                _this.msg3 = '';
              }
            } else if (flag == 4) {
              _this.selectFive = !_this.selectFive;
              _this.unselectFive = !_this.unselectFive;
              if (_this.selectFive) {
                $('#entrustUp').removeAttr('disabled');
                /* setTimeout(() => {
                   $('#entrustUp').focus();
                 }, 200)*/
              } else {
                $('#entrustUp').attr('disabled', 'disabled');
                _this.msg4 = '';
              }
            }
          } else {
            _this.showMessage('请选择合约');
          }
        }
      },
      //input变化判断
      iblur: function (val) {
        var _this = this;
        if (isNaN(val)) {
          _this.showMessage('请输入数字');
          _this.buttonColor = '#c0c6cd';
          _this.buttonDisabled = true;
        } else if (val == '') {
        } else {
          _this.buttonColor = '#3366cc';
          _this.buttonDisabled = false;
        }
      },
      // 合约选择点击事件
      dealnameClick: function (name) {
        var _this = this;
        if (this.dealnames && this.dealnames.length !== 0) {
          if (_this.limit) {
            _this.dealnameColor = 'black';
            _this.dealname = name.name;
            _this.nameCode = name.code;
            _this.nameMarket = name.market;
            if (pbE.isPoboApp) {
              _this.GetPriceRate = pbE.HQ().hqGetPriceRate(_this.nameCode, _this.nameMarket);
              _this.decimal = pbE.HQ().hqGetPriceDecimal(_this.nameCode, _this.nameMarket);
              pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: _this.nameMarket, 3: _this.nameCode}]}));
              $('#priceValue').text('--');
              $("#openInterest").text('--');
              $('#warehouseBad').text('--');
              _this.nativeInteraction();
            }
            _this.alertModal = false;
          }
        }
      },
      //input 禁止编辑&&为空(初始值)
      inputDisabled: function () {
        var _this = this;
        _this.selectOne = false;
        _this.unselectOne = true;
        _this.selectTwo = false;
        _this.unselectTwo = true;
        _this.selectThree = false;
        _this.unselectThree = true;
        _this.selectFour = false;
        _this.unselectFour = true;
        _this.selectFive = false;
        _this.unselectFive = true;
        _this.buttonColor = '#c0c6cd';
        _this.buttonDisabled = true;
        $('#priceup').attr('disabled', 'disabled');
        _this.msg0 = '';
        $('#pricedown').attr('disabled', 'disabled');
        _this.msg1 = '';
        $('#curVolUp').attr('disabled', 'disabled');
        _this.msg2 = '';
        $('#volumeUp').attr('disabled', 'disabled');
        _this.msg3 = '';
        $('#entrustUp').attr('disabled', 'disabled');
        _this.msg4 = '';
        $('#priceValue').text('--');
        $('#warehouseBad').text('--');
        $("#openInterest").text('--');
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
          console.log(data)
          if (data.status == '0') {
            _this.accountID = data.data.userID;
          }
        }).catch(function (error) {
          console.error(error);
          _this.showMessage('网络超时，请稍后再试');
        });
      },
      //重置
      resettingButton: function () {
        this.dealname = '选择合约';
        this.selectOne = false;
        this.unselectOne = true;
        this.selectTwo = false;
        this.unselectTwo = true;
        this.selectThree = false;
        this.unselectThree = true;
        this.selectFour = false;
        this.unselectFour = true;
        this.selectFive = false;
        this.unselectFive = true;
        this.buttonDisabled = true;
        this.buttonColor = '#c0c6cd';
        $('#priceup').attr('disabled', 'disabled');
        this.msg0 = '';
        $('#pricedown').attr('disabled', 'disabled');
        this.msg1 = '';
        $('#curVolUp').attr('disabled', 'disabled');
        this.msg2 = '';
        $('#volumeUp').attr('disabled', 'disabled');
        this.msg3 = '';
        $('#entrustUp').attr('disabled', 'disabled');
        this.msg4 = '';
        $('#priceValue').text('--');
        $('#warehouseBad').text('--');
        $("#openInterest").text('--');
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
          pbPage.addModuleCallback(90000, this.marketCallback)
        } else {
          pbPage.initPage({
            callbacks: [{module: 90000, callback: this.marketCallback}]
          })
        }
      },
//      9000 callback,
      marketCallback(mag) {
        let _this = this;
        console.log(mag);
        mag = mag.jData.Data;
        for (var i = 0; i < mag.length; i++) {
          if (_this.dealname != '' && _this.dealname != '选择合约') {
            if (mag[i]['10'] == _this.nameCode) {
              var priceNew = pbUtils.decimalDecPrice(_this.decimal, mag[i]['29'] / _this.GetPriceRate);
              if (!isNaN(priceNew)) {
                $('#priceValue').text(priceNew);
              } else {
                $('#priceValue').text('--');
              }
              $("#openInterest").text(mag[i]['39']);
              if (mag[i]['25']) {
                _this.yesterdayP = mag[i]['25'];
                $('#warehouseBad').text(mag[i]['39'] - mag[i]['25']);
              } else if (_this.yesterdayP) {
                $('#warehouseBad').text(mag[i]['39'] - _this.yesterdayP);
              } else {
                $('#warehouseBad').text('--')
              }
            }
          } else if (_this.dealname != '预警限制为20条') {
            $('#priceValue').text('--');
            $('#warehouseBad').text('--');
            $("#openInterest").text('--');
          }
        }
      }
    }
  }
</script>
