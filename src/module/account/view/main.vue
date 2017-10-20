<template>
  <div>
    <div v-if="dataType && dataType.length != 0">
      <div v-for="data in transactionType" v-if="data.isShow">
        <div class="transactionType">
          <span>{{data.name}}</span>
          <!--<span @click="addBinding(data.type)">添加绑定</span>-->
        </div>
        <div class="tradingAccount">
          <a v-for=" dataType in dataType" v-if="data.type == dataType.loginType" @click="untie(dataType.userID,dataType.account,dataType.type,dataType.loginType)">
            <span>{{dataType.account}}</span>
            <!--<span>{{dataType.userID}}</span>-->
            <span>解绑</span>
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="data in transactionType" v-if="data.isShow">
        <div class="transactionType">
          <span>{{data.name}}</span>
          <!--<span @click="addBinding(data.type)">添加绑定</span>-->
        </div>
      </div>
      <img src="../images/none.png" class="noneBinding"/>
      <span class="noneText">您还没有绑定账号</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '',
        transactionType: null,//配置交易类别
        dataType: null
      }
    },
    created() {
      let _this = this;
      _this.$emit('get-titlt', '账户管理');
//      读取配置
      if (pbE.isPoboApp) {
        _this.readConf(JSON.parse(pbE.SYS().readConfig(this.confUrlPbe + "account.json")));
      } else {
        _this.$axios.get(this.confUrl + 'account.json').then(function (data) {
          _this.transactionType = data.data.index;
        })
      }
      //获取绑定信息
      _this.getBindingInfo();
    },
    methods: {
      //解绑
      untie(userID, account, type, loginType) {
        let _this = this;
        _this.$alert({
          maskClosable: true,
          message: '解绑后无法使用条件单/止盈止损，是否继续？',
          btns: [{
            text:'取消'
          },{
            text: '继续',
            click: () => {
              _this.$axios.post(_this.url, {
                "func": "1016",
                "token": _this.testToken,
                "id": _this.testId,
                "userID": userID + '',
                "account": account + '',
                "orgCode": _this.orgCode,
                "accountType": type + '',
                "loginType": loginType + '',
                "os": _this.os,
                "type": '1'
              }).then(function (data) {
                data = data.data;
                console.log(data);
                if(data.status == 0){
                  _this.$alert({
                  maskClosable: true,
                  message: data.msg,
                  btns: [{
                    text: '确认',
                    click: () => {
                      _this.getBindingInfo();
                    }
                  }],
                });
                  pbE.WT().wtRemoveYunTradeUserId(loginType + '',type + '',account + '');
                }else{
                  _this.$alert({
                    maskClosable: true,
                    message: data.msg,
                    btns: [{
                      text: '确认',
                      click: () => {
//                        _this.getBindingInfo();
                      }
                    }],
                  });
                }
              }).catch(function () {
                console.log(err);
              })
            }
          }],
        });
      },
      //原生读取本地配置
      readConf(conf) {
        let _this = this;
        _this.transactionType = conf.index;
      },
      //获取已绑定信息
      getBindingInfo() {
        let _this = this;
        _this.$axios.post(_this.url, {
          "func": "1017",
          "token": _this.testToken,
          "id": _this.testId,
          "marketAccount": _this.userName,
          "orgCode": _this.orgCode,
          "os": _this.os,
          "type": '1'
        }).then(function (data) {
          data = data.data;
          console.log(data);
          if (data.status == 0) {
            _this.dataType = data.data;
          }else if (data.status == -11){
            _this.dataType = data.data;
          } else {
            _this.$alert({
              maskClosable: true,
              message: data.msg,
              btns: [{
                text: '确认'
              }],
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
