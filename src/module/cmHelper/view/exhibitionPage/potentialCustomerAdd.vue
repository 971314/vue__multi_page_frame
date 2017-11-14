<template>
  <div class="potential-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body" v-text="customerTitle"></span>
      <span slot="footer" style="margin-right: 15px;" @click="completeClick">完成</span>
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

  export default {
    data () {
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
        noPotSex: ({exhibitionPage}) => exhibitionPage.noPotSex
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
      this.customerTitle = '新增客户'
    },
    methods: {
      $isTel (str) { // 是否为固定电话
        return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)
      },
      $isMobile (str) { // 是否是手机号码
        return /^1\d{10}$/.test(str)
      },
      checkcustomerMessage() {
        if (!this.customerMessage.CUST_NAM || this.customerMessage.CUST_NAM.trim().length === 0) {
          this.$toast('姓名不能为空！')
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

        if (this.customerMessage.LINKTELEPHONE && !$isTel(this.customerMessage.LINKTELEPHONE)) {
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
        this.customerMessage['LINKADDR'] = ''
        this.customerMessage['LINKTELEPHONE'] = ''
        this.customerMessage['MOBILE_NO'] = ''
        this.customerMessage['CUST_SRC'] = ''
        this.customerMessage['CUST_DESC'] = ''
        this.$store.dispatch('updateNoPotSex', '0')
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
            address: this.customerMessage.LINKADDR,
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
              this.$router.back()
              this.clear()
            }, 1500)
          })
          .catch((res) => {
            console.log('res', res)
          })
      }
    }
  }
</script>
