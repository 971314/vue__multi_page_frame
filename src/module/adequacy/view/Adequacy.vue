<template>
  <div class="height100p bg22">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <span>基本信息</span>
      </div>
    </common-nav>
    <div class="header-bung54"></div>
    <div class="adequacy">
      <div class="basic-info">
        <div class="warp">
          <div>
            <input class="basic" type="text" v-model="personalInfo.INVESTOR_NAM" placeholder="请输入姓名"/>
          </div>
          <div>
            <input class="basic" type="text" v-model="personalInfo.ID_NO" maxlength="18" placeholder="请输入身份证号"/>
          </div>
          <div>
            <input class="basic" type="tel" v-model="personalInfo.PHONENUM" maxlength="11" placeholder="请输入手机号"/>
          </div>
          <flex class="row rowbottom">
            <flex-item flex="4" class="text-center item">
              <input class="verify" type="tel" v-model="verifyCode" maxlength="6" placeholder="请输入验证码"/>
            </flex-item>
            <flex-item flex="3" class="text-center item1">
              <button class="verifyGet" theme="default" :disabled="disabled || timeout > 0" @click="getCode" :value="timeMsg">
                {{timeMsg}}
              </button>
            </flex-item>
          </flex>
        </div>
        <button :class="{'start-btn': 1}" @click="submit" value="开始测试">开始测试</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        codeInput: '',
        verifyCode: '',
        nameChecked: false,
        identityChecked: false,
        cellphoneChecked: false,
        verifyCodeChecked: false,
        timeout: 0,
        disabled: false
      }
    },
    computed: {
      timeMsg () {
        return this.timeout > 0 ? '重新获取(' + this.timeout + ')' : '点击获取'
      },
      ...mapState([
        'serverUrl',
        'personalInfo',
        'basicInfo',
        'token'
      ])
    },
    created(){
      // 身份证转大写（有带字母的情况）
      this.$watch('personalInfo.ID_NO', (newVal, oldVal)=>{
        this.personalInfo.ID_NO = newVal.toUpperCase()
      })
    },
    methods: {
      async submit () {
        this.$loading.toggle('')

        try {
          if (!this.nameCheck()) {
            return
          } else if (!this.identityCheck()) {
            return
          } else if (!this.cellphoneCheck()) {
            return
          } else if (!this.verifyCodeCheck()) {
            return
          }
          this.personalInfo.INVESTOR_NAM = this.personalInfo.INVESTOR_NAM.trim()
          this.personalInfo.ID_NO = this.personalInfo.ID_NO.trim()
          this.personalInfo.PHONENUM = this.personalInfo.PHONENUM.trim()
          let param = {
            method: 'post',
            url: this.$getApiUrl('login'),
            data: {
              'func': 2020,
              'type': 2,
              'account': this.personalInfo.PHONENUM,
              'token': this.token,
              'data': [{
                'service': 'adequacy.101',
                'json': JSON.stringify(this.personalInfo),
                'smscaptcha': this.verifyCode
              }]
            }
          }

          let response = await this.$axios(param)

          if (response.data.data) {
            let rsltdata = JSON.parse(response.data.data[0].proxyresult)

            let result = await this.getDefautDepartment()
            // 如果是存量客户，则指定默认部门，且不允许修改
            if (result) {
              if (this.basicInfo.DEPARTMENT_ID) {
                this.basicInfo.hasDefaultDepartment = true
                this.basicInfo.DEPARTMENT_ID = result.DEPARTMENT_ID
                this.basicInfo.DEPARTMENT_NAME = result.DEPARTMENT_NAM // 注意，这里的name单词
              }
              this.basicInfo.CHANNEL_DEPARTMENT_ID = result.CHANNEL_DEPARTMENT_ID
              this.basicInfo.CHANNEL_DEPARTMENT_NAM = result.CHANNEL_DEPARTMENT_NAM
            }

            // 如果已经完成双录，则直接进入成功页面
            if (rsltdata.body && rsltdata.body.result && rsltdata.body.result.VIDEO_FLG === 'Y') {
              return this.$router2.push('/success')
            }

            // 如果只完成签字，则进入视频页面
            if (rsltdata.body && rsltdata.body.result && rsltdata.body.result.HAS_BASE_INFO === 'Y') {
              let hasAllFile = true
              for (let key of Object.keys(rsltdata.body.result)) {
                if (key.startsWith('HAS_') && rsltdata.body.result[key] !== 'Y') {
                  hasAllFile = false
                  break
                }
              }

              if (hasAllFile) {
                this.basicInfo.CHANNEL_DEPARTMENT_ID || (this.basicInfo.CHANNEL_DEPARTMENT_ID = rsltdata.body.result.DEPARTMENT_ID)
                return this.$router2.push('/videoCheck')
              }
            }

            if (rsltdata.head.code !== '0') {
              this.showMessage(rsltdata.head.message) // 系统消息
              return
            }

            // 通过身份证解析数据
            Object.assign(this.basicInfo, this.personalInfo)
            this.basicInfo.SEX = String(2 - this.basicInfo.ID_NO.substr(16, 1) % 2)
            this.basicInfo.BIRTH_DT = [this.basicInfo.ID_NO.substr(6, 4), this.basicInfo.ID_NO.substr(10, 2), this.basicInfo.ID_NO.substr(12, 2)].join('-')

            if (rsltdata.body.result.result && rsltdata.body.result.result === '1') {
              await this.$store.dispatch('updatePersonalInfo', this.personalInfo)
              this.$router2.push('/info')
            } else if (rsltdata.body.result.result && rsltdata.body.result.result === '0') {
              this.$router2.push('/qrt')
            }
          } else {
            this.$alert({
              maskClosable: true,
              btns: [{
                text: '确定',
                click: () => {
                }
              }],
              title: '<h4>提示</h4>',
              message: '<p>' + response.data.desc + '</p>'
            })
          }
        } finally {
          setTimeout(() => {
            this.$loading.hide()
          }, 0)
        }
      },
      async getDefautDepartment () {
        let response = await this.$axios({
          method: 'post',
          url: this.$getApiUrl('getDefaultDepartment'),
          data: {
            'func': 2020,
            'type': 2,
            'token': this.token,
            'account': this.personalInfo.PHONENUM,
            'data': [{
              'service': 'adequacy.119',
              'json': JSON.stringify({ID_NO: this.personalInfo.ID_NO})
            }]
          }
        })
        if (response.data.data) {
          let rsltdata = JSON.parse(response.data.data[0].proxyresult)

          // 如果是存量客户，则指定默认部门，且不允许修改
          if (rsltdata.body && rsltdata.body.result && rsltdata.body.result) {
            return rsltdata.body.result
          }
        }

        return null
      },
      async getRandomCode () {
        let imt = document.getElementById('imgCode')
        imt.setAttribute('src', this.$getApiUrl('getRandomCode') + '?token=' + this.token)
        imt.onclick = () => {
          this.getRandomCode()
        }
      },
      async verifyRandomCode (code) {
        code.randomcode = code.randomcode.replace(/(^\s*)|(\s*$)/g, '')
        if (code.randomcode === undefined || code.randomcode.length === 0) {
          this.$alert({
            maskClosable: true,
            btns: [{
              text: '确定',
              click: () => {
                this.getCode()
              }
            }],
            title: '<h4>提示</h4>',
            message: '<p>输入不能为空</p>'
          })
          return
        }

        let param = {
          method: 'post',
          url: this.$getApiUrl('verifyRandomCode'),
          data: {
            'func': 2021,
            'type': 2,
            'token': this.token,
            'data': [{
              '15': code.randomcode,
              '30': this.personalInfo.PHONENUM
            }]
          }
        }
        this.$axios(param).then((response) => {
          if (response.data.data) {
            this.setBtnTimeOut()
          } else {
            this.$alert({
              maskClosable: true,
              btns: [{
                text: '确定',
                click: () => {
                  this.getCode()
                }
              }],
              title: '<h4>提示</h4>',
              message: '<p>图片验证码不正确</p>'
            })
          }
        }).catch((response) => {
        })
      },
      async getCode () {
        if (!this.cellphoneCheck()) {
          return
        }

        this.$alert({
          maskClosable: true,
          btns: [{
            text: '取消',
            click: () => {
            }
          }, {
            text: '确定',
            click: () => {
              let code = {}
              let codeInput = document.getElementById('codeInput').value

              code.randomcode = codeInput
              code.cellphone = this.personalInfo.PHONENUM

              this.verifyRandomCode(code)
            }
          }],
          title: '<h4>图形验证码</h4>',
          message: '<div class=\'codemsg\'><input type=\'text\' id=\'codeInput\' v-model=\'codeInput\' placeholder=\'请输入右侧验证码\'/><img id=\'imgCode\' alt=\'waiting\'/></div>'
        })

        this.$nextTick(() => {
          this.getRandomCode()
        })
      },
      nameCheck () {
        return this.isNull(this.personalInfo.INVESTOR_NAM, '姓名不能为空')
      },
      identityCheck () {
        if (!this.isNull(this.personalInfo.ID_NO, '身份证不能为空')) {
          return false
        } else if (!this.isIdentityNum(this.personalInfo.ID_NO)) {
          return false
        }
        return true
      },
      cellphoneCheck () {
        if (!this.isNull(this.personalInfo.PHONENUM, '手机号不能为空')) {
          return false
        } else if (!this.isPhoneNum(this.personalInfo.PHONENUM)) {
          return false
        }

        return true
      },
      verifyCodeCheck () {
        return this.isNull(this.verifyCode, '验证码错误')
      },
      isNull (val, tips) {
        if (val.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
          this.$alert({
            maskClosable: true,
            btns: [{
              text: '确定',
              click: () => {
              }
            }],
            title: '<h5>输入提示</h5>',
            message: '<p>' + tips + '</p>'
          })
          return false
        }
        return true
      },
      isPhoneNum (val) {
        if (!val.match(/^[0-9]{11}$/)) {
          this.$alert({
            maskClosable: true,
            btns: [{
              text: '确定',
              click: () => {
              }
            }],
            title: '<h4>输入提示</h4>',
            message: '<p>手机号格式不正确</p>'
          })
          return false
        }
        return true
      },
      isIdentityNum (code) {
        code = code.toString().replace(/(^\s*)|(\s*$)/g, '')
        let pass = false
        if (code.length && code.length === 18) {
          let codeArr = code.split('')
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
          let parity = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2] // 校验位
          let sum = 0
          let ai = 0
          let wi = 0
          for (let i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          let verifyNum = parity[sum % 11]
          let lastNum = codeArr[17]

          if (sum % 11 === 2) {
            if (lastNum === 'X' || lastNum === 'x') {
              pass = true
            }
          } else {
            lastNum = parseInt(codeArr[17], 10)
            if (lastNum === verifyNum) {
              pass = true
            }
          }
        }

        if (!pass) {
          this.$alert({
            maskClosable: true,
            btns: [{
              text: '确定',
              click: () => {
              }
            }],
            title: '<h4>输入提示</h4>',
            message: '<p>身份证号格式错误</p>'
          })
          return false
        }

        return true
      },
      showMessage (msg) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: function () {
            }
          }],
          title: '<h4>提示</h4>',
          message: '<div>' + msg + '</div>'
        })
      },
      setBtnTimeOut (seconds) {
        this.timeout = 60
        let i = setInterval(() => {
          if (this.timeout === 0) {
            clearInterval(i)
          }
          this.timeout--
        }, 1000)
      }
    }
  }
</script>
