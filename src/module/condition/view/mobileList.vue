<template>
  <div class="noneConList-content">
    <img @click="refresh" :src="refreshImg"
         style="position: fixed; top: 15px; right: 17px; width: 18px; height: 18px; z-index: 1030;">
    <div class="warCon refreshContent">
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
              <th>类型</th>
              <th>条件单名称</th>
              <th>更新时间</th>
              <th>触发时间</th>
              <!--<th>备注</th>-->
            </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="noneList">
        <div class="TbodyInner">
          <table class="brief static" v-if="noneTouchLen">
            <tbody>
            <tr class="clickBack1" v-for="(data,i) in noneTouchLen"
                :class="{clickTrTd:data.conditionID == 1612290000000105}"
                v-tap="[conNoneClick,data.conditionID,data.flag1,data.flag3,i]" :key="i">
              <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                {{data.HYMC ? data.HYMC : '----'}}
              </td>
            </tr>
            </tbody>
          </table>
          <div class="detailOuter" afterDescendants>
            <table class="detail" v-if="noneTouchLen">
              <tbody>
              <tr class="clickBack" v-for="(data,i) in noneTouchLen"
                  :class="{clickTrTd:data.conditionID == 1612290000000105 }"
                  v-tap="[conNoneClick,data.conditionID,data.flag1,data.flag3,i]" :key="i">
                <state-change :flag1="data.flag1" :flag3="data.flag3"></state-change>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">
                  {{data.subType == 1 ? '价格' : '时间'}}
                </td>
                <td :class="{none : data.flag3 == 25 || data.flag3 == 29 || data.flag3 == 24}">{{data.name}}</td>
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
    <footer-info :text="`条件单`"></footer-info>
  </div>
</template>
<script>
  //    var testUserId = "10023";//云交易userId;
  import footerInfo from './footer.vue';

  export default {
    data: function () {
      return {
        noneTouchConID: [],//删除全部未触发的条件单id
        noneTouchLen: [],
        userId: pbE.isPoboApp ? null : '10326',//云交易userId
//        CID: '',

        conNoneTouchObj: {
          conditionID: '',//条件单编号
          clientFlag: '',//客户端操作状态
          serverFlag: ''//服务器端操作状态
        },

        refreshImg: '../images/refresh.png',
        refreshing: false,
        alertDelay: true,//弹框延时标志
        clickNum: 0,//点击次数
        refreshText: '点击加载更多'
      }
    },
    components: {
      footerInfo
    },
    activated() {
      document.getElementsByTagName('body')[0].scrollTop = 0;
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
      conNoneClick: function (conditionID, flag1, flag3, i) {
        $('.clickBack').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        $('.clickBack1').eq(i).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
        if (!this.alertDelay) return;
        this.alertDelay = false;
        this.conNoneTouchObj = {
          conditionID: conditionID,
          clientFlag: flag1,
          serverFlag: flag3
        };
        setTimeout(() => {
          this.alertDelay = true;
          this.operateTip(flag1, flag3, '条件单');
        }, 360)
      },
      //获取列表
      noneTouchClick: function () {
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
          type: _this.contractType,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data);
          _this.$loading.hide();
          if (data.status == 0) {
            _this.noneTouchConID = [];
            _this.noneTouchLen = [];
            $.each(data.data, function (key, value) {
              _this.noneTouchConID.push(value.conditionID);
              _this.$set(_this.noneTouchLen, key, {
                  conditionID: value.conditionID,
                  flag1: value.flag1,
                  flag3: value.flag3,
                  createTime: value.createTime,//创建时间
                  triggeringTime: value.triggerTime,//触发时间
                  HYMC: value.HYMC,
                  name: value.name,//条件单名称
                  subType: JSON.parse(value.conditionValue).ConditionChoiced,
                }
              );
            });
          } else {
            _this.showMessage(data.msg);
          }
        }).catch(function (error) {
          console.error(error);
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
        });
      },
      //暂停或继续
      conStopOrOnClick: function () {
        let type = arguments[0];
        var _this = this;
        //type 1：暂停 2：继续 3:修改 4：删除 5:全部删除
        //暂停和继续
        if (type == 1 || type == 2) {
          _this.$axios.post(_this.conditionUrl, {
            func: _this.conStopOrOn,
            token: _this.token,
            id: _this.authId,
            orgCode: _this.orgCode,
            operType: type + "",
            conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
            type: _this.contractType,
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            if (data.status == 0) {
              _this.dataOrFlag = 1;
              _this.noneTouchClick();
              if (type == 1) {
                console.log("暂停成功！")
              }
              if (type == 2) {
                console.log("运行成功！")
              }
            } else {
              _this.showMessage(data.msg);
            }
          }).catch(function (error) {
            console.error(error);
            _this.showMessage('网络超时，请稍后再试');
          });
        }
        //修改
        if (type == 3) {
          var _this = this;
          _this.$axios.post(_this.conditionUrl, {
            func: _this.conIdQuery,
            token: _this.token,
            id: _this.authId,
            userID: _this.userId,
            orgCode: _this.orgCode,
            type: _this.contractType + "",
            data: [_this.conNoneTouchObj.conditionID],//条件单编号
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            if (data.status == 0) {
              console.log(data.data)
              //缓存条件单的单条信息信息
              _this.saveStorageInfo("conNoneListObj", data.data);
              _this.$router.replace('/editCon/4');
            } else {
              _this.showMessage(data.msg);
            }
          }).catch(function (error) {
            console.error(error);
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
            type: _this.contractType,
            data: [_this.conNoneTouchObj.conditionID],//条件点编号
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            console.log(data);
            if (data.status == 0) {
              _this.dataOrFlag = 1;
              for (let s = 0; s < _this.noneTouchLen.length; s++) {
                if (_this.noneTouchLen[s].conditionID == data.data[0]) {
                  _this.noneTouchLen.splice(s, 1);
                  $('.clickBack1').removeClass("tableCheckCss");
                  $('.clickBack').removeClass("tableCheckCss");
                }
              }
              _this.showMessage('删除成功');
            } else {
              _this.showMessage(data.msg);
              $('.alert-btn').css('color', '#36c');
            }
          }).catch(function (error) {
            console.error(error);
            _this.showMessage('网络超时，请稍后再试');
          });
        }
        //全部删除
        if (type == 5) {
          console.log(_this.noneTouchConID);
          _this.$axios.post(_this.conditionUrl, {
            func: _this.delCon,
            token: _this.token,
            id: _this.authId,
            orgCode: _this.orgCode,
            type: _this.contractType,
            data: _this.noneTouchConID,//条件單编号
            userID: _this.userId
          }, {timeout: 10000}).then(function (data) {
            data = data.data;
            console.log(data);
            if (data.status == 0) {
              _this.dataOrFlag = 1;
              for (let e = 0; e < _this.noneTouchLen.length; e++) {
                for (let y = 0; y < data.data.length; y++) {
                  if (_this.noneTouchLen[e].conditionID == data.data[y]) {
                    _this.noneTouchLen.splice(e, 1);
                    $('.clickBack1').removeClass("tableCheckCss");
                    $('.clickBack').removeClass("tableCheckCss");
                  }
                }
              }
              _this.pageReload();
              _this.showMessage('删除成功');
              console.log("删除成功！")
            } else {
              _this.showMessage(data.msg);
            }
          }).catch(function (error) {
            console.error(error);
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
          _this.noneTouchClick();
        }
      },
      //原生交互
      nativeInteraction: function () {
        if (pbPage.getInitState()) {
          pbPage.addFunCallback(102001, this.userIdCallback);
          pbPage.addModuleFunCallback(90007, 200, this.unreadCallback);
          pbPage.addReloadFunByKey('conditonM', this.pageReload);
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
        console.log(msg, '200');
        msg = msg.jData;
        if (msg && msg.length != 0) {
          if (msg.type == 4) {
            let p = msg.p.split(',');
            for (let n = 0; n < _this.noneTouchLen.length; n++) {
              if (_this.noneTouchLen[n].conditionID == p[1]) {
                if (p[0] == 26) {
                  _this.noneTouchLen.splice(n, 1);
                  $('.clickBack1').removeClass("tableCheckCss");
                  $('.clickBack').removeClass("tableCheckCss");
                } else {
                  _this.noneTouchLen[n].flag3 = p[0];
                }
                break;
              }
            }
          }
        }
      },
      //分页
      clickRefresh() {
        console.log(this.clickNum);
        let _this = this;
        _this.clickNum += 1;
        _this.$loading.toggle(' ');
        console.log(_this.clickNum);
        _this.$axios.post(_this.conditionUrl, {
          func: _this.PaasFun,
          token: _this.token,
          id: _this.authId,
          userID: _this.userId,
          orgCode: _this.orgCode,
          begin: _this.clickNum * 20 + '',
          total: '20',
          type: _this.contractType,
          os: _this.os,
          platform: '1'
        }, {timeout: 10000}).then(function (data) {
          data = data.data;
          console.log(data);
          _this.$loading.hide();
          if (data.status == 0) {
            if (data.data.length != 0) {
              $.each(data.data, function (key, value) {
                _this.noneTouchConID.push(value.conditionID);
                _this.noneTouchLen.push({
                  conditionID: value.conditionID,
                  flag1: value.flag1,
                  flag3: value.flag3,
                  createTime: value.createTime,//创建时间
                  triggeringTime: value.triggerTime,//触发时间
                  HYMC: value.HYMC,
                  name: value.name,//条件单名称
                  subType: JSON.parse(value.conditionValue).ConditionChoiced,
                });
              });
            } else {
              _this.refreshText = '已经没有更多';
            }
            //排序
            _this.noneTouchLen = _this.dataSort(_this.noneTouchLen);
          } else {
            _this.showMessage(data.msg);
          }
        }).catch(function (error) {
          _this.$loading.hide();
          _this.showMessage('网络超时，请稍后再试');
          console.error(error);
        });
      },
      pageReload() {
        console.log('pageReload condition');
        var _this = this;
        _this.getTradeInfo();
        _this.nativeInteraction();
        //获取云交易的userID
        if (pbE.isPoboApp) {
          _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId

          //未触发列表
          _this.noneTouchClick();
          //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
          if (!_this.userId) {
            _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
          }
        } else {
          //未触发列表
          _this.noneTouchClick();
        }
      }
    }
  }
</script>
