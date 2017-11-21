<template>
  <div class="log_in">
    <common-nav>
      <span slot="body">登录</span>
    </common-nav>
    <div class="log_input">
      <input type="text" placeholder="请输入CRM用户名" class="input" v-model="crmAccount"/>
      <!--<img src="../../../../assets/images/open.png" class="open" @click="openclose" v-if="openClose"/>
      <img src="../../../../assets/images/close.png" class="close" @click="openclose" v-else/>-->
      <span :class="openClose?'open':'close'" @click.stop="openclose"></span>
      <input type="text" placeholder="请输入CRM用户口令" class="input" v-model="pwd" v-if="openClose"/>
      <input type="password" placeholder="请输入CRM用户口令" class="input" v-model="pwd" v-else/>
    </div>
    <button v-if="checkFlag" class="button available" @click="submit">登录</button>
    <button class="button" v-else>登录</button>
    <div class="log_tip">
      还没有绑定账号？ <span @click="$router.push('/bindCRM')">立刻绑定</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        crmAccount: '',
        pwd: '',
        checkFlag: false,
        mobilePhone: '',
        openClose: false
      }
    },
    watch: {
      crmAccount () {
        this.check()
      },
      pwd () {
        this.check()
      }
    },
    computed: {},
    created () {
      this.crmAccount = ''
      this.pwd = ''
    },
    activated () {
    },
    mounted () {
      this.mobilePhone = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745'
      if (!this.mobilePhone) {
        location.href = 'pobo:uncheck=1&pageId=900005&url=reg/index.html'
      }
    },
    methods: {
      //登录
      submit () {
        let _this = this
        if (_this.crmAccount == '') {
          _this.$toast('CRM用户名不能为空')
          return
        }
        if (_this.pwd == '') {
          _this.$toast('CRM口令不能为空')
          return
        }
        _this.$loading.toggle(' ')
        _this.$axios.post(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalLog.url + _this.crmAccount, {
          pwd: _this.pwd.trim(),
          mobilePhone: _this.mobilePhone.trim(),
          crmAccount: _this.crmAccount
        }, {
          timeout: 10000
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            if (pbE.isPoboApp) {
              pbE.SYS().privateClear()
              pbE.SYS().storePrivateData('managerInfo', JSON.stringify(data.data))
              if (data.data.accountType == 'C') {
                location.href = 'pobo:uncheck=1&pageId=900005&url=cmHelper/index.html'
              } else {
                location.href = 'pobo:uncheck=1&pageId=900005&url=cmApproval/index.html'
              }
            } else {
              sessionStorage.managerInfo = JSON.stringify(data.data)
              if (data.data.accountType == 'C') {
                location.href = 'http://localhost:8000/cmHelper/index.html'
              } else {
                location.href = 'http://localhost:8000/cmApproval/index.html'
              }
            }
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.message.split(' ')[0] == 'timeout') {
            _this.$toast('网络超时，请稍后重试！')
          } else {
            if (err.response && err.response.status == 401) {
              _this.$router.replace('/')
            } else if (err.response) {
              _this.$toast(err.response.data.desc)
            } else {
              _this.$toast('网络超时，请稍后重试！')
            }
          }
          console.log(err)
        })
      },
      //必填项判断
      check () {
        if (this.crmAccount && this.pwd) {
          this.checkFlag = true
        } else {
          this.checkFlag = false
        }
      },
      //密码显示隐藏
      openclose () {
        this.openClose = !this.openClose
      }
    }
  }
</script>
