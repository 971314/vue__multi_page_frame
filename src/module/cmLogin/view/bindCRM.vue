<template>
  <div class="bind_crm">
    <common-nav>
      <span slot="body">CRM客户绑定申请</span>
    </common-nav>
    <div class="bind_head">
      <span>已注册手机号</span>
      <span>{{mobilePhone}}</span>
    </div>
    <div class="bind_input">
      <input type="text" placeholder="请输入员工姓名" class="input" v-model="name"/>
      <input type="text" placeholder="请输入CRM用户名" class="input" v-model="crmAccount"/>
      <span :class="openClose?'open':'close'" @click.stop="openclose"></span>
      <input type="text" placeholder="请输入CRM口令" class="input" v-model="pwd" v-if="openClose"/>
      <input type="password" placeholder="请输入CRM口令" class="input" v-model="pwd" v-else/>
    </div>
    <div class="bind_tip">App不会已任何形式保存CRM口令</div>
    <button v-if="checkFlag" class="button available" @click="submit">申请绑定</button>
    <button class="button" v-else>申请绑定</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        crmAccount: '',//工号
        pwd: '',//密码
        mobilePhone: '',//手机号
        name: '',//用户姓名
        gender: '',//性别
        mail: '',//邮箱
        checkFlag: false,
        openClose: false
      }
    },
    watch: {
      crmAccount () {
        this.check()
      },
      name () {
        this.check()
      },
      pwd () {
        this.check()
      }
    },
    computed: {},
    created () {
      this.mobilePhone = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745'
      /*if (!this.mobilePhone) {
        location.href = 'pobo:uncheck=1&pageId=900005&url=reg/index.html'
      }*/
      this.crmAccount = ''//工号
      this.pwd = ''//密码
      this.name = ''//用户姓名
      this.gender = ''//性别
      this.mail = ''//邮箱
    },
    activated () {

    },
    mounted () {

    },
    methods: {
      //绑定提交请求
      submit () {
        let _this = this
        if (_this.name && _this.crmAccount && _this.pwd && _this.mobilePhone) {
          _this.$loading.toggle(' ')
          _this.$axios.post(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalBind.url + _this.crmAccount, {
            crmAccount: _this.crmAccount.trim(),
            pwd: _this.pwd.trim(),
            mobilePhone: _this.mobilePhone,
            name: _this.name,
            gender: _this.gender,
            mail: _this.mail,
          }, {
            timeout: 10000
          }).then((data) => {
            data = data.data
            console.log(data)
            _this.$loading.hide()
            if (data.retHead == 0) {
              _this.$toast('绑定成功！')
              setTimeout(() => {
//                window.close()
                location.href = 'close'
              }, 1500)
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
        } else if (_this.name == '') {
          _this.$toast('员工姓名不能为空！')
        } else if (_this.crmAccount == '') {
          _this.$toast('CRM用户名不能为空！')
        } else if (_this.pwd == '') {
          _this.$toast('CRM口令不能为空！')
        }
      },
      //必填判断
      check () {
        if (this.crmAccount && this.pwd && this.name) {
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
