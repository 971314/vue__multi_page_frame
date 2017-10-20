<template>
  <div>
    <div class="user-info" @click="detailInfo" v-if="isShowHerd">
      <img src=
             "../images/uimg.png" alt="">
      <a href="pobo:uncheck=0&pageId=900005&url=mine/index.html#/userInfo" id="login">
      <!--<a href="pobo:uncheck=0&pageId=905002&url=reg/view/reg-one.html" id="login">-->
        <span>{{info}}</span>
        <!--<img class="more" src="../../../assets/images/chakanxiangqingdefault@2x.png" alt="详细">-->
      </a>
    </div>
    <div class="groupp">
      <a v-for="data in group" v-if="data.isShow" target="_blank" :href="data.url">
        <div>
          <img :src="data.img">
          {{data.name}}
        </div>
        <img src="../../../assets/images/chakanxiangqingdefault@2x.png"/>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        group: null,
        token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : 'S6LBFUhuVKGatIstQrKz9t4NfAXhMS/6AN9merP86nJGJsL9p6pMmbQVuIPhutcrNOmitsx8uQHbnmsiZMf7jDE3Ouy/kzfp2sMr7NIPbTtcFLtuRDIedYGLtloxCFZH',
        marketAccount: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745',//手机号/用户名
        id: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证userid
        isShowHerd: null,
        info: null
      }
    },
    mounted() {
      this.initPage();
      let _this = this;
      if (_this.marketAccount && _this.marketAccount.length != 0) {
        _this.info = _this.marketAccount.substr(0, 3) + '****' + _this.marketAccount.substr(-4);
      } else {
        _this.info = '请用手机号码登录';
      }
      if (pbE.isPoboApp) {
        this.readConfig(pbE.SYS().readConfig(this.confUrlH5 + "main.json") ? pbE.SYS().readConfig(this.confUrlH5 + "main.json") : pbE.SYS().readConfig(this.confUrlPbe + "main.json"));
      } else {
        _this.$axios.get(this.confUrl + 'main.json').then(function (data) {
          _this.isShowHerd = data.data.my.isShowH;
          data = data.data.my.data;
          for (let y = 0; y < data.length; y++) {
            if (data[y].isShow) {
              if (data[y].isLogin) {
                data[y].isShow = true;
              } else {
                data[y].isShow = true;
              }
            } else {
              data[y].isShow = false
            }
          }
          _this.group = data;

        }).catch(function (err) {
          console.log('服务器异常', err)
        })
      }
    },
    methods: {
      detailInfo() {
        this.$router.push({name: 'userInfo'});
      },
      readConfig(conf) {
        this.isShowHerd = JSON.parse(conf).my.isShowH;
        conf = JSON.parse(conf).my.data;
        for (let y = 0; y < conf.length; y++) {
          if (conf[y].isShow) {
            if (conf[y].isLogin) {
              let transaction = pbE.WT().wtGetConnectionAccountInfo();
              if (transaction && transaction.length != 0) {
                transaction = JSON.parse(transaction);
                for (let n = 0; n < transaction.length; n++) {
                  if (transaction[n].PbKey_Trade_Login_Type == '8') {
                    let CID = transaction[n].PbKey_Trade_Login_CID;
                    if (pbE.WT().wtGetYunTradeUserId(CID) > 0) {
                      conf[y].isShow = true;
                    } else {
                      conf[y].isShow = false;
                    }
                  } else {
                    conf[y].isShow = false;
                  }
                }
              } else {
                conf[y].isShow = false;
              }
            } else {
              conf[y].isShow = true;
            }
          } else {
            conf[y].isShow = false;
          }
        }
        this.group = conf;
        console.log(conf, '4')
      },
      initPage() {
        if (pbPage.getInitState()) {
          pbPage.addReloadFunByKey('mine', this.pageReload);
        } else {
          pbPage.initPage({
            reload: this.pageReload
          });
        }
      },
      pageReload() {
        this.marketAccount = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
        if (this.marketAccount && this.marketAccount.length != 0) {
          this.info = this.marketAccount.substr(0, 3) + '****' + this.marketAccount.substr(-4);
        } else {
          this.info = '请用手机号码登录';
        }
        this.readConfig(pbE.SYS().readConfig(this.confUrlH5 + "main.json") ? pbE.SYS().readConfig(this.confUrlH5 + "main.json") : pbE.SYS().readConfig(this.confUrlPbe + "main.json"));
      }
    }
  }
</script>
