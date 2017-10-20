<template>
  <div class="noneConList-content">
    <img @click="refresh" :src="refreshImg"
         style="position: fixed; top: 15px; right: 17px; width: 18px; height:   18px; z-index: 1030;">
    <div class="warCon refreshContent" id="refreshContent">
      <div class="TheadWrap">
        <table class="brief static">
          <tbody>
          <tr>
            <td class="tdT">
              合约
            </td>
          </tr>
          </tbody>
        </table>
        <div class="detailOuter">
          <table class="detail">
            <thead>
            <tr>
              <th>状态</th>
              <th>数量</th>
              <th>止损价</th>
              <th>止盈价</th>
              <th>更新时间</th>
              <th>触发时间</th>
              <!--<th>备注</th>-->
            </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="noneList" class="bottom">
        <div class="TbodyInner">
          <table class="brief static" v-if="noneTouchLen">
            <tbody>
            <tr class="clickBack1" v-for="(data,i) in noneTouchLen"
                v-tap="[conNoneClick,data.conditionID,data.flag1,data.flag3,i]"
                :key="i">
              <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                {{data.hyName ? data.hyName : '----'}}
              </td>
            </tr>
            </tbody>
          </table>
          <div class="detailOuter">
            <table class="detail" v-if="noneTouchLen">
              <tbody class="checkStyle">
              <tr class="clickBack" v-for="(data,i) in noneTouchLen"
                  v-tap="[conNoneClick,data.conditionID,data.flag1,data.flag3,i]"
                  :key="i">
                <state-change :flag1="data.flag1" :flag3="data.flag3"></state-change>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">{{data.Volume}}</td>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                  {{data.StopLossCheckPriceType}}
                </td>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                  {{data.StopProfitCheckPriceType}}
                </td>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">{{data.createTime}}</td>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                  {{data.triggeringTime ? data.triggeringTime : '--'}}
                </td>
                <!--<td>&#45;&#45;</td>-->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--点击刷新-->
        <div class="clickRefresh" @click="clickRefresh" v-show="noneTouchLen.length >= 20">{{refreshText}}</div>
      </div>
    </div>
    <footer-info :text="`止盈止损`"></footer-info>
    <a id="stopInfo"></a>
  </div>
</template>
<script>
  import footerInfo from '../../condition/view/footer.vue';

  export default {
    data: function () {
      return {
        initImg: true,
        stopFiledNoTuch: true,//未触发初始化样式
        stopFiledIsTuch: true,//已触发初始化样式
        noneTouchLen: [],
        isTouchArray: [],//已触发list
        conNoneTouchObj: {
          conditionID: '',//条件单编号
          clientFlag: '',//客户端操作状态
          serverFlag: ''//服务器端操作状态
        },
        stopNoneTouchShow: true,
        stopIsTouchShow: false,
        pageNoneNum: 1,
        pageIsNum: 1,
        userId: pbE.isPoboApp ? null : '10160',
        msg: '',

        refreshImg: '../images/refresh.png',
        refreshing: false,
//        CID: '',
        noneTouchConID: [],
        alertDelay: true,//弹框延时标志
        clickNum: 0,//点击次数
        refreshText: '点击加载更多'
      }
    },
    components: {
      footerInfo
    },
    created: function () {
      var _this = this;
      _this.getTradeInfo();
      if (pbE.isPoboApp) {
        _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
        //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
        if (!_this.userId) {
          _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
        }
      }
    },
    activated() {
      this.pageReload();
    },
    mounted() {
      Ps.initialize(document.getElementById('noneList'), {
        frozen: true,
        wheelSpeed: 200
      });
    },
    updated: function () {
      Ps.update(document.getElementById('noneList'));
    },
    methods: {
      //点击未触发的每条记录获取信息
      conNoneClick: function (conditionID, flag1, flag3, i) {
        $('.clickBack').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        $('.clickBack1').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        if (!this.alertDelay) return;
        this.alertDelay = false;
        let _this = this;
        this.conNoneTouchObj = {
          conditionID: conditionID,
          clientFlag: flag1,
          serverFlag: flag3
        };
        setTimeout(() => {
          _this.alertDelay = true;
          _this.operateTipPc(flag1, flag3);
        }, 360)
      },
      noneTouchList: function () {
        this.clickNum = 0;
        this.refreshText = '点击加载更多';
        var _this = this;
        _this.$loading.toggle(' ');//显示转圈
        //未触发列表信息
        _this.$axios.post(_this.conditionUrl, {
          func: _this.PaasFun,
          token: _this.token,
          id: _this.authId,
          userID: _this.userId,
          orgCode: _this.orgCode,
          begin: '0',
          total: '20',
          type: _this.stopFiledType,
          os: _this.os,
          platform: "2"
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data, '1');
          _this.$loading.hide();
          if (data.status == 0) {
            _this.noneTouchConID = [];
            _this.noneTouchLen = [];
            $.each(data.data, function (key, value) {
              _this.noneTouchConID.push(value.conditionID);
              var list = JSON.parse(value.conditionValue);
              _this.$set(_this.noneTouchLen, key, {
                  conditionID: value.conditionID,
                  flag1: value.flag1,
                  flag3: value.flag3,
                  hyName: value.HYMC,
                  market: list.Contracts[0].ExchangeCode,
                  code: list.Contracts[0].ContractCode,
                  StopLossCheckPriceType: list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                  StopProfitCheckPriceType: list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                  createTime: value.createTime,//创建时间
                  triggeringTime: value.triggerTime,//触发时间
                  Volume: list.AttachObject[0].Volume//数量
                }
              )
            });
          } else {
            _this.showMessage(data.msg);
            return;
          }
        }).catch(function (error) {
          console.error(error);
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
        });
      },
      //暂停、运行、删除、删除全部、修改
      conStopOrOnClick: function (type) {
        var _this = this;
        if (type == 1 || type == 2) {//暂停
          _this.$axios.post(_this.conditionUrl, {
            func: _this.conStopOrOn,
            token: _this.token,
            id: _this.authId,
            operType: type + '',
            orgCode: _this.orgCode,
            conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
            type: _this.stopFiledType,
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            if (data.status == 0) {
              _this.noneTouchList();
              if (type == 1) {
                console.log("暂停成功！")
                //关闭当前webview
                $("#stopInfo").attr('href', 'goBack');
//                                    window.setTimeout(function(){
//                                        $("#stopInfo")[0].click();
//                                    },1000)
              }
              if (type == 2) {
                console.log("运行成功！")
              }
            } else {
              _this.showMessage(data.msg);
              return;
            }
          }).catch(function (error) {
            console.error(error);
            _this.$loading.hide();
            _this.showMessage('网络超时，请稍后再试');
          });
        }
        if (type == 3) {//修改
          _this.$axios.post(_this.conditionUrl, {
            func: _this.conIdQuery,
            token: _this.token,
            id: _this.authId,
            orgCode: _this.orgCode,
            userID: _this.userId,
            type: _this.stopFiledType,
            data: [_this.conNoneTouchObj.conditionID],//条件点编号
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            console.log(data)
            if (data.status == 0) {
              //缓存信息 并跳转页面
              _this.saveStorageInfo("stopOfFiledObj", data.data);
              _this.$router.push('/slmodify')//跳转至编辑页面
            } else {
              _this.showMessage(data.msg);
              return;
            }
          }).catch(function (error) {
            console.error(error);
            _this.$loading.hide();
            _this.showMessage('网络超时，请稍后再试');
          });
        }
        //删除
        if (type == 4) {
          _this.$axios.post(_this.conditionUrl, {
            func: _this.delCon,
            token: _this.token,
            id: _this.authId,
            orgCode: _this.orgCode,
            type: _this.stopFiledType,
            data: [_this.conNoneTouchObj.conditionID],//条件点
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            if (data.status == 0) {
              window.setTimeout(function () {
                _this.noneTouchList();
              }, 2000);
              console.log("删除成功！")
            } else {
              _this.showMessage(data.msg);
              return;
            }
          }).catch(function (error) {
            console.error(error);
            _this.$loading.hide();
            _this.showMessage('网络超时，请稍后再试');
          });
        }
        //全部删除
        if (type == 5) {
          console.log(_this.noneTouchConID)
          _this.$axios.post(_this.conditionUrl, {
            func: _this.delCon,
            token: _this.token,
            id: _this.authId,
            orgCode: _this.orgCode,
            type: _this.stopFiledType,
            data: _this.noneTouchConID,//条件点编号
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            if (data.status == 0) {
              _this.noneTouchList();
              console.log("删除成功！")
            } else {
              _this.showMessage(data.msg);
              return;
            }
          }).catch(function (error) {
            console.error(error);
            _this.$loading.hide();
            _this.showMessage('网络超时，请稍后再试');
          });
        }
      },
      refresh: function () {
        var _this = this;
        if (_this.refreshing) {
          _this.showMessage('刷新过于频繁，两次查询间隔至少5秒');
        } else {
          document.getElementsByTagName('body')[0].scrollTop = 0;
          _this.refreshing = true;
          setTimeout(function () {
            _this.refreshing = false;
          }, 5000);
          _this.noneTouchList();
        }
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
          pbPage.addFunCallback(102001, this.userIdCallback);
          pbPage.addModuleFunCallback(90007, 200, this.unreadCallback);
          pbPage.addReloadFunByKey('stopP', this.pageReload);
        } else {
          pbPage.initPage({
            callbacks: [
              {fun: 102001, callback: this.userIdCallback},
              {module: 90007, fun: 200, callback: this.unreadCallback}
            ],
            reload: this.pageReload
          })
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
      //在线推送
      unreadCallback(msg) {
        let _this = this;
        console.log(msg);
        msg = msg.jData;
        if (msg && msg.length != 0) {
          if (msg.type == 6) {
            let p = msg.p.split(',');
            for (let n = 0; n < _this.noneTouchLen.length; n++) {
              if (_this.noneTouchLen[n].conditionID == p[1]) {
                if (p[0] == 26) {
                  _this.noneTouchLen.splice(n, 1);
                } else {
                  _this.noneTouchLen[n].flag3 = p[0];
                }
                break;
              }
            }
          }
        }
      },
      //点击刷新
      clickRefresh() {
        let _this = this;
        _this.clickNum += 1;
        _this.$loading.toggle(' ');

        _this.$axios.post(_this.conditionUrl, {
          func: _this.PaasFun,
          token: _this.token,
          id: _this.authId,
          userID: _this.userId,
          orgCode: _this.orgCode,
          begin: _this.clickNum * 20 + '',
          total: '20',
          type: _this.stopFiledType,
          os: _this.os,
          platform: "2"
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data, '1');
          _this.$loading.hide();
          if (data.status == 0) {
            if (data.data.length != 0) {
              $.each(data.data, function (key, value) {
                _this.noneTouchConID.push(value.conditionID);
                var list = JSON.parse(value.conditionValue);
                _this.noneTouchLen.push({
                  conditionID: value.conditionID,
                  flag1: value.flag1,
                  flag3: value.flag3,
                  hyName: value.HYMC,
                  market: list.Contracts[0].ExchangeCode,
                  code: list.Contracts[0].ContractCode,
                  StopLossCheckPriceType: list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                  StopProfitCheckPriceType: list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                  createTime: value.createTime,//创建时间
                  triggeringTime: value.triggerTime,//触发时间
                  Volume: list.AttachObject[0].Volume//数量
                });
              });
            } else {
              _this.refreshText = '已经没有更多';
            }
            //排序
            _this.noneTouchLen = _this.dataSort(_this.noneTouchLen);
          } else {
            _this.showMessage(data.msg);
            return;
          }
        }).catch(function (error) {
          console.error(error);
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
        });
      },
      pageReload() {
        this.nativeInteraction();
        this.noneTouchList();
        this.getTradeInfo();
      }
    }
  }
</script>
