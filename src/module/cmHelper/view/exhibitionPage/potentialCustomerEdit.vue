<template>
  <div class="potential-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body" v-text="customerTitle"></span>
      <span slot="footer" style="margin-right: 15px; font-size: 15px;" @click="completeClick">完成</span>
    </common-nav>
    <div class="potential-info-center">
      <div class="customer-info-center">
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">姓名</div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.CUST_NAM" maxlength="12"
                     type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">性别</div>
            <div class="input-item-input" @click="chooseSex">
              {{sex}}
              <!--<input class="item-input-content" v-model="customerMessage.SEX" maxlength="12" type="text"/>-->
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">身份证号码</div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.ID_NO" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">出生日期</div>
            <div class="input-item-input">
              <span>{{customerMessage.BIRTH_DT}}</span>
              <input class="item-input-date" v-model="customerMessage.BIRTH_DT" maxlength="12" type="date"/>
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">通讯地址</div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.LINKADDR" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">手机号码<img class="user-must-icon"
                                                  src="../../images/exhibitionPage/musticon@2x.png"/></div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.MOBILE_NO" type="tel"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">固定电话</div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.LINKTELEPHONE" type="tel"/>
            </div>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">客户来源</div>
            <div class="input-item-input">
              <input class="item-input-content" v-model="customerMessage.CUST_SRC" type="text"/>
            </div>
          </div>
        </div>
        <div class="customer-remarks">
          <textarea class="remarks-text-area" v-model="customerMessage.CUST_DESC"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        customerTitle: '客户资料',
        gobackUrl: 'goBack',
        customerMessage: {
          CUST_NAM: '',
          SEX: '',
          ID_NO: '',
          BIRTH_DT: '',
          LINKADDR: '',
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
        pInvestor: ({followUpRecord}) => followUpRecord.pInvestor,
        czSex: ({exhibitionPage}) => exhibitionPage.czSex
      }),
      sex: function () {
        if (this.noPotSex) {
          let sex = this.getSex(this.noPotSex);
          return sex;
        } else if (this.noPotSex == '0' || this.noPotSex == 0) {
          let sex = this.getSex(this.noPotSex);
          return sex;
        }
        return '';
      }
    },
    activated() {
      this.customerTitle = '编辑资料'
      if (this.czSex) {
        this.getPInvestorInfo()
      }
    },
    methods: {
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
      getSex (flag) {
        if (flag == '1') {
          return '男';
        } else if (flag == '2') {
          return '女';
        } else if (flag == '3') {
          return '非人类';
        }
        return '未知';
      },
      chooseSex() {
        this.$router.push({
          name: 'getSex'
        })
      },
      completeClick() { //完成点击的操作
        this.customerMessage.SEX = this.noPotSex
        if (!this.checkcustomerMessage()) {
          return
        }
        this.pInvestorEdit()
      },
      getPInvestorInfo() { //获取单一潜在客户信息
        this.$$axios({restUrl: 'pInvestorInfo', join: [this.info.userId, this.pInvestor.CUST_ID]})
          .then((response) => {
            if (response.length <= 0) {
              return
            }
            this.customerMessage = response[0]
//            this.customerMessage.BIRTH_DT = this.$$getTimeFmt(this.customerMessage.BIRTH_DT, '-')
            console.log('response', response[0]);

            this.$store.dispatch('updateNoPotSex', this.customerMessage.SEX)
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      pInvestorEdit() { //编辑潜在客户
        console.log(this.customerMessage.BIRTH_DT, 'this.customerMessage.BIRTH_DT');
        this.$$axios({
          restUrl: 'pInvestorEdit',
          join: [this.info.userId, this.pInvestor.CUST_ID],
          options: {
            pInvestorName: this.customerMessage.CUST_NAM,
            gender: this.customerMessage.SEX,
            certId: this.customerMessage.ID_NO,
            birthdate: this.customerMessage.BIRTH_DT == '--' || !this.customerMessage.BIRTH_DT ? null : this.$$timeFormate({
              date: this.customerMessage.BIRTH_DT,
              format: 'Y-M-D'
            }), //this.customerMessage.BIRTH_DT
            address: this.customerMessage.LINKADDR,
            mobilePhone: this.customerMessage.MOBILE_NO,
            phone: this.customerMessage.LINKTELEPHONE,
            investorSource: this.customerMessage.CUST_SRC,
            note: this.customerMessage.CUST_DESC
          }
        })
          .then((response) => {
            this.$store.dispatch('updateCustomerMessage', this.customerMessage)
            console.log('response', response);
            this.$router.back()
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'getSex') {
        next()
      } else {
        this.$store.dispatch('updateCzSex', true)
        next()
      }
    }
  }
</script>
