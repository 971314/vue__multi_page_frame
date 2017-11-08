<template>
  <div class="potential-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body" v-text="customerTitle"></span>
      <span slot="footer" style="margin-right: 15px;" @click="editPage">编辑</span>
    </common-nav>
    <div class="potential-info-center">
      <div class="customer-info-center">
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">姓名</div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.CUST_NAM" maxlength="12"
                     type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">性别</div>
            <div class="input-item-input">
              {{sex}}
              <!--<input class="item-input-content" disabled v-model="customerMessage.SEX" maxlength="12" type="text"/>-->
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">身份证号码</div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.ID_NO" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">出生日期</div>
            <div class="input-item-input">
              <span>{{customerMessage.BIRTH_DT}}</span>
              <input class="item-input-date" disabled v-model="customerMessage.BIRTH_DT" maxlength="12" type="date"/>
            </div>
            <img class="customer-showdetail-arrow" src="../../images/exhibitionPage/showdetail@2x.png"/>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">通讯地址</div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.LINKADDR" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">手机号码<img class="user-must-icon" src="../../images/exhibitionPage/musticon@2x.png"/></div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.MOBILE_NO" type="tel"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">固定电话</div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.LINKTELEPHONE" type="tel"/>
            </div>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">客户来源</div>
            <div class="input-item-input">
              <input class="item-input-content" disabled v-model="customerMessage.CUST_SRC" type="text"/>
            </div>
          </div>
        </div>
        <div class="customer-remarks">
          <textarea class="remarks-text-area" disabled v-model="customerMessage.CUST_DESC"></textarea>
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
        pInvestor: ({followUpRecord}) => followUpRecord.pInvestor
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
        this.customerTitle = '客户资料'
        this.getPInvestorInfo()
    },
    methods: {
      editPage() {
          this.$router.push({
            name: 'potentialCustomerEdit'
          })
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
      getPInvestorInfo() { //获取单一潜在客户信息
        this.$$axios({restUrl: 'pInvestorInfo', join: [this.userId, this.pInvestor.CUST_ID]})
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
      }
    }
  }
</script>
