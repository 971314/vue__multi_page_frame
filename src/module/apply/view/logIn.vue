<template>
  <div class="log_in">
    <common-nav>
      <span slot="body">登录</span>
    </common-nav>
    <div class="log_input">
      <input type="text" placeholder="请输入CRM用户名" class="input" v-model="crmAccount"/>
      <input type="text" placeholder="请输入CRM用户口令" class="input" v-model="pwd"/>
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
        mobilePhone: ''
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
    },
    activated () {
      this.crmAccount = ''
      this.pwd = ''
    },
    mounted () {
      this.mobilePhone = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745'
      if (!this.mobilePhone) {
        location.href = 'pobo:uncheck=1&pageId=900005&url=reg/index.html'
      }
    },
    methods: {
      submit () {
        let _this = this
        if (_this.crmAccount && _this.pwd) {
          _this.$loading.toggle(' ')
          _this.$axios.post(PBHttpServer.apply.serverUrl + this.urlList.approvalLog.url + _this.crmAccount, {
            pwd: _this.pwd,
            mobilePhone: _this.mobilePhone
          }, {timeout: 10000}).then((data) => {
            data = data.data
            console.log(data)
            _this.$loading.hide()
            if (data.retHead == 0) {
              if (pbE.isPoboApp) {
                pbE.SYS().storePrivateData('managerInfo', data.data)
              } else {
                localStorage.managerInfo = data.data
              }
            } else {
              _this.$toast(data.desc)
            }
          }).catch((err) => {
            _this.$loading.hide()
            if (err.message.split(' ')[0] == 'timeout') {
              _this.$toast('网络超时，请稍后重试！')
            } else {
              _this.$toast('网络异常，请稍后重试！')
            }
            console.log(err)
          })
        } else if (_this.crmAccount == '') {
          _this.$toast('CRM用户名不能为空')
        } else if (_this.pwd == '') {
          _this.$toast('CRM口令不能为空')
        }
      },
      check () {
        if (this.crmAccount && this.pwd) {
          this.checkFlag = true
        } else {
          this.checkFlag = false
        }
      }
    }
  }
</script>
