<template>
  <div class="potential-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body" v-text="customerTitle"></span>
      <span slot="footer" style="margin-right: 15px; font-size: 15px" @click="completeClick">完成</span>
    </common-nav>
    <div class="potential-info-center">
      <div class="customer-info-center">
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">姓名</div>
            <div class="input-item-input">
              <input class="item-input-content" placeholder="请填写姓名" v-model="customerMessage.CUST_NAM" maxlength="80"
                     type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">性别</div>
            <div class="input-item-input" :class="{'item-click-input': colorClick1}" @click="chooseSex">
              {{noPotSex ? sex : ''}}
              <!--<input class="item-input-content" v-model="customerMessage.SEX" maxlength="12" type="text"/>-->
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">身份证号码</div>
            <div class="input-item-input">
              <input class="item-input-content" placeholder="请填写身份证号码" v-model="customerMessage.ID_NO" maxlength="20"
                     type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">出生日期</div>
            <div class="input-item-input">
              <span :class="{'item-click-input': colorClick2}">{{customerMessage.BIRTH_DT}}</span>
              <input class="item-input-date" v-model="customerMessage.BIRTH_DT" maxlength="12" type="date"/>
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item customer-breakword-item">
            <div class="input-item-name">通讯地址</div>
            <div class="input-item-input" @click="clickEvent" @blur="blurEvent"
                 id="input-item-input" style="-webkit-user-select:text;display: block;"
                 v-html="customerMessage.LINKADDR"
                 :class="{'item-input-color': !isfocus,'item-click-input': colorClick3}">
              <!--{{customerMessage.LINKADDR ? customerMessage.LINKADDR : "请填写通讯地址"}}-->
              <!--<input class="item-input-content" placeholder="请填写通讯地址"-->
              <!--v-model="customerMessage.LINKADDR" type="text"/>-->
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">手机号码<img class="user-must-icon"
                                                  src="../../images/exhibitionPage/musticon@2x.png"/></div>
            <div class="input-item-input">
              <input class="item-input-content" @focus="cellPhoneFocus" @blur="cellPhoneBlur" placeholder="请填写手机号码"
                     v-model="customerMessage.MOBILE_NO" maxlength="40"
                     type="tel"/>
              <!--<img v-show="showClickBtn" @click="clearCellPhone" class="input-close-click"
                   src="../../images/exhibitionPage/closeclick@2x.png"/>-->
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">固定电话</div>
            <div class="input-item-input">
              <input class="item-input-content" placeholder="请填写固定电话" v-model="customerMessage.LINKTELEPHONE"
                     maxlength="40" type="tel"/>
            </div>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">客户来源</div>
            <div class="input-item-input">
              <input class="item-input-content" placeholder="请填写客户来源" v-model="customerMessage.CUST_SRC" maxlength="50"
                     type="text"/>
            </div>
          </div>
        </div>
        <div class="customer-remarks">
          <textarea class="remarks-text-area" placeholder="请添加备注" maxlength="500"
                    v-model="customerMessage.CUST_DESC"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        showClickBtn: false,
        colorClick1: false,
        colorClick2: false,
        colorClick3: false,
        isfocus: false,
        customerTitle: '新增未开户',
        gobackUrl: 'goBack',
        customerMessage: {
          CUST_NAM: '',
          SEX: '',
          ID_NO: '',
          BIRTH_DT: '',
          LINKADDR: '请填写通讯地址', //地址
          LINKTELEPHONE: '',
          MOBILE_NO: '',
          CUST_SRC: '',
          CUST_DESC: ''
        }
      }
    },
    computed: {
      ...mapState({
        noPotSex: ({exhibitionPage}) => exhibitionPage.noPotSex,
        czSex: ({exhibitionPage}) => exhibitionPage.czSex
      }),
      sex: function () {
        if (this.noPotSex) {
          let sex = this.getSex(this.noPotSex)
          return sex
        } else if (this.noPotSex == '0' || this.noPotSex == 0) {
          let sex = this.getSex(this.noPotSex)
          return sex
        }
        return ''
      }
    },
    activated () {
      this.customerTitle = '新增未开户'
      console.log(this.czSex, 'this.czSex')
      document.getElementById('input-item-input').innerHTML = this.customerMessage.LINKADDR
      if (this.czSex) {
        this.isfocus = false
        this.colorClick3 = false
      }
    },
    watch: {
      $route(to, from) {
        if (from.name == 'customerInfoList') {
          this.$store.dispatch('updateNoPotSex', '')
          this.$store.dispatch('updatepSegmentedIndex', 2)
        }
      },
      'customerMessage.BIRTH_DT'(val, oldVal) {
        if (val) {
          this.colorClick2 = true
        }
      },
      'customerMessage.MOBILE_NO'(val, oldVal) {
        if (val) {
          this.showClickBtn = true
        } else {
          this.showClickBtn = false
        }
      }
    },
    methods: {
      cellPhoneFocus() {
        if (this.customerMessage.MOBILE_NO) {
          this.showClickBtn = true
        }
      },
      cellPhoneBlur() {
        this.showClickBtn = false
      },
      clearCellPhone() {
        this.showClickBtn = false
        this.customerMessage.MOBILE_NO = ''
      },
      clickEvent(e) {
        e.target.setAttribute('contenteditable', true)
        document.getElementById('input-item-input').focus()
        if (document.getElementById('input-item-input').innerHTML == '请填写通讯地址') {
          document.getElementById('input-item-input').innerHTML = ''
        }
        this.colorClick3 = true
        this.isfocus = true
      },
      blurEvent(e) {
        this.customerMessage.LINKADDR = e.target.innerText
        if (!(e.target.innerHTML.trim())) {
          this.$nextTick(() => {
            this.customerMessage.LINKADDR = '请填写通讯地址'
            this.isfocus = false
          })
        }
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
          this.$toast('身份证号格式错误')
          return false
        }

        return true
      },
      $isTel (str) { // 是否为固定电话
        return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)
      },
      $isMobile (str) { // 是否是手机号码
        return /^1\d{10}$/.test(str)
      },
      checkcustomerMessage() {
//        if (!this.customerMessage.CUST_NAM || this.customerMessage.CUST_NAM.trim().length === 0) {
//          this.$toast('姓名不能为空！')
//          return false
//        }

        if (this.customerMessage.ID_NO && !this.isIdentityNum(this.customerMessage.ID_NO)) {
          return false
        }

        if (!this.customerMessage.MOBILE_NO || this.customerMessage.MOBILE_NO.trim().length === 0) {
          this.$toast('手机号码不能为空！')
          return false
        }

        if (!this.$isMobile(this.customerMessage.MOBILE_NO)) {
          this.$toast('手机号码格式不正确！')
          return false
        }

        if (this.customerMessage.LINKTELEPHONE && !this.$isTel(this.customerMessage.LINKTELEPHONE)) {
          this.$toast('固定电话格式不正确！')
          return false
        }
        return true
      },
      clear () {
        this.customerMessage['CUST_NAM'] = ''
        this.customerMessage['SEX'] = ''
        this.customerMessage['ID_NO'] = ''
        this.customerMessage['BIRTH_DT'] = ''
        this.customerMessage['LINKADDR'] = '请填写通讯地址'
        this.customerMessage['LINKTELEPHONE'] = ''
        this.customerMessage['MOBILE_NO'] = ''
        this.customerMessage['CUST_SRC'] = ''
        this.customerMessage['CUST_DESC'] = ''
        this.$store.dispatch('updateNoPotSex', '')
        document.getElementById('input-item-input').innerHTML = ''
        this.isfocus = false
        this.colorClick3 = false
        this.$forceUpdate()
      },
      getSex (flag) {
        if (flag == '1') {
          return '男'
        } else if (flag == '2') {
          return '女'
        } else if (flag == '3') {
          return '非人类'
        }
        return '未知'
      },
      chooseSex () {
        this.colorClick1 = true
        this.$router.push({
          name: 'getSex'
        })
      },
      completeClick () { //完成点击的操作
        this.customerMessage.SEX = this.noPotSex
        if (!this.checkcustomerMessage()) {
          return
        }
        this.pInvestorAdd()
      },
      pInvestorAdd () { //新增潜在客户
        this.$$axios({
          restUrl: 'pInvestorAdd',
          join: [this.info.userId],
          options: {
            pInvestorName: this.customerMessage.CUST_NAM,
            gender: this.customerMessage.SEX,
            certId: this.customerMessage.ID_NO,
            birthdate: this.customerMessage.BIRTH_DT,
            address: this.customerMessage.LINKADDR == '请填写通讯地址' ? '' : this.customerMessage.LINKADDR,
            mobilePhone: this.customerMessage.MOBILE_NO,
            phone: this.customerMessage.LINKTELEPHONE,
            investorSource: this.customerMessage.CUST_SRC,
            note: this.customerMessage.CUST_DESC
          }
        })
          .then((response) => {
            console.log('response', response)
            this.$toast('添加成功!')
            setTimeout(() => {
              this.$store.dispatch('updatepSegmentedIndex', 2)
              this.$router.back()
              this.clear()
            }, 1500)
          })
          .catch((res) => {
            console.log('res', res)
          })
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'getSex') {
        next()
      } else {
        this.$store.dispatch('updateCzSex', true)
        this.clear()
        next()
      }
    }
  }
</script>
