<template>
  <div>
    <div class="user-info" v-if="isShowHerd">
      <img src=
             "../images/uimg.png" alt="">

      <a v-if="newUserDetail" href="pobo:uncheck=0&pageId=905002&url=mine/index.html#/userInfo" id="login">
        <span>{{info}}</span>
      </a>
      <a  v-if="!newUserDetail" href="pobo:uncheck=0&pageId=905002&url=reg/view/reg-one.html" id="login">
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
    data () {
      return {
        group: null,
        token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : 'S6LBFUhuVKGatIstQrKz9t4NfAXhMS/6AN9merP86nJGJsL9p6pMmbQVuIPhutcrNOmitsx8uQHbnmsiZMf7jDE3Ouy/kzfp2sMr7NIPbTtcFLtuRDIedYGLtloxCFZH',
        marketAccount: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '15889470643',//手机号/用户名
        id: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '46461',//认证userid
        isShowHerd: null,
        newUserDetail:false,
        info: null,
        testIp: null,
        testMac: null,
        testVersion: null,
        testId: null,
        userName: null,
        testToken: null,
        isShowCRm: false//展业是否显示
      }
    },
    mounted () {
      this.testIp = pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['71'] : ''//ip
      this.testMac = pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['72'] : ''//物理地址
      this.testVersion = pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo()['73'] : ''//版本
      this.testId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '8'//认证userId/id
      this.userName = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '15889470643'//认证手机号
      this.testToken = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '11111111111kkkkkkskskslslslsls'//token

      this.initPage()
      let _this = this
      if (_this.marketAccount && _this.marketAccount.length != 0) {
        _this.info = _this.marketAccount.substr(0, 3) + '****' + _this.marketAccount.substr(-4)
      } else {
        _this.info = '请用手机号码登录'
      }
      this.isShowExhibitionIndustry()
//      this.initial()
    },
    methods: {
      readConfig (conf) {
        this.isShowHerd = JSON.parse(conf).my.isShowH
        this.newUserDetail = JSON.parse(conf).my.newUserDetail;
        conf = JSON.parse(conf).my.data
        for (let y = 0; y < conf.length; y++) {
          if (conf[y].isShow) {
            if (conf[y].isLogin) {
              let transaction = pbE.WT().wtGetConnectionAccountInfo()
              if (transaction && transaction.length != 0) {
                transaction = JSON.parse(transaction)
                for (let n = 0; n < transaction.length; n++) {
                  if (transaction[n].PbKey_Trade_Login_Type == '8') {
                    let CID = transaction[n].PbKey_Trade_Login_CID
                    if (pbE.WT().wtGetYunTradeUserId(CID) > 0) {
                      conf[y].isShow = true
                    } else {
                      conf[y].isShow = false
                    }
                  } else {
                    conf[y].isShow = false
                  }
                }
              } else {
                conf[y].isShow = false
              }
            }
            if (conf[y].isCm) {
              if (this.isShowCRm) {
                conf[y].isShow = true
              }else if(!this.marketAccount){
                conf[y].isShow = false
              } else {
                conf[y].isShow = false
              }
            }
          } else {
            conf[y].isShow = false
          }
        }
        this.group = conf
        console.log(conf, '4')
      },
      initPage () {
        if (pbPage.getInitState()) {
          pbPage.addReloadFunByKey('mine', this.pageReload)
        } else {
          pbPage.initPage({
            reload: this.pageReload
          })
        }
      },
      pageReload () {
        this.marketAccount = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName')
        if (this.marketAccount && this.marketAccount.length != 0) {
          this.info = this.marketAccount.substr(0, 3) + '****' + this.marketAccount.substr(-4)
        } else {
          this.info = '请用手机号码登录'
        }
        /*this.readConfig(pbE.SYS().readConfig(this.confUrlH5 + 'main.json') ? pbE.SYS().readConfig(this.confUrlH5 + 'main.json') : pbE.SYS().readConfig(this.confUrlPbe + 'main.json'))*/
        this.isShowExhibitionIndustry()
      },
      //校验展业显示
      isShowExhibitionIndustry () {
        let _this = this
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + 'account/paly/' + _this.marketAccount).then((data) => {
          data = data.data
          if (data.retHead == 0) {
            if (data.data[0].FLAG == 1) {
              _this.isShowCRm = true
            } else if (data.data[0].FLAG == 0) {
              _this.isShowCRm = false
            }
          } else {
            _this.isShowCRm = false
//            _this.$toast(data.desc)
          }
          _this.initial()
        }).catch((err) => {
          _this.isShowCRm = false
          _this.initial()
          console.log(err)
        })
      },
      initial () {
        let _this = this
        if (pbE.isPoboApp) {
          this.readConfig(pbE.SYS().readConfig(this.confUrlH5 + 'main.json') ? pbE.SYS().readConfig(this.confUrlH5 + 'main.json') : pbE.SYS().readConfig(this.confUrlPbe + 'main.json'))
        } else {
          _this.$axios.get(this.confUrl + 'main.json').then(function (data) {
            _this.isShowHerd = data.data.my.isShowH
            _this.newUserDetail = data.data.my.newUserDetail;
            data = data.data.my.data
            for (let y = 0; y < data.length; y++) {
              if (data[y].isShow) {
                if (data[y].isLogin) {
                  data[y].isShow = true
                } else {
                  data[y].isShow = true
                }
                if (data[y].isCm) {
                  if (_this.isShowCRm) {
                    data[y].isShow = true
                  } else {
                    data[y].isShow = false
                  }
                } else {
                  data[y].isShow = true
                }
              } else {
                data[y].isShow = false
              }
            }
            _this.group = data
          }).catch(function (err) {
            console.log('服务器异常', err)
          })
        }
      }
    }
  }
</script>
