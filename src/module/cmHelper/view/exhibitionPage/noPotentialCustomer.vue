<template>
  <div class="pobo-nopotential-cunstomer">
    <div class="pobo-customer-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户详情</span>
        <!--<a slot="footer" class="customer-add-delete" @click="showSelected">-->
        <!--<img class="add-delete-icon" src="../images/sandianicon@2x.png"/>-->
        <!--</a>-->
      </common-nav>
      <div class="customer-info-grid" @click="gotoDetail">
        <div class="customer-info-group">
          <div class="left-avatar">
            <div class="avatar-cover"></div>
          </div>
          <div class="center-info-list">
            <div class="info-name-group">
              <span class="info-name" v-text="customerInfo.INVESTOR_NAM">陈嫣</span>
              <img v-if="customerInfo.VIPTYP != '0'" class="info-star"
                   :src="customerInfo.VIPTYP != '0' ? `./images/exhibitionPage/${customerInfo.VIPTYP}-star@2x.png` : ''"></img>
              <img v-if="customerInfo.OPEN_STS == '1' || customerInfo.OPEN_STS == '2'" class="info-new"
                   src="../../images/exhibitionPage/NEW@2x.png"></img>
            </div>
            <div class="info-zjzh">资金账号 {{customerInfo.INVESTOR_ID}}</div>
            <div class="info-yingye">营业部门 {{customerInfo.DEPARTMENT_NAM}}</div>
          </div>
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
    <div class="customer-tab-wrapper">
      <div class="customer-tab-group">
        <div class="account-tips" :class="{'selected-record': nowIndex == 1}" @click="LinkToTab('accountOverView', 1)">
          账户概览
          <div class="selected-line"></div>
        </div>
        <div class="yewu-liushui" :class="{'selected-record': nowIndex == 2}" @click="LinkToTab('businessPipeline', 2)">
          业务流水
          <div class="selected-line"></div>
        </div>
        <div class="genjin-record" :class="{'selected-record': nowIndex == 3}" @click="LinkToTab('followUpRecord', 3)">
          跟进记录
          <div class="selected-line"></div>
        </div>
      </div>
    </div>
    <div class="pobo-customer-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="pobo-customer-footer">
      <div class="message-footer">
        <img class="message-icon" src="../../images/exhibitionPage/message@2x.png"/>
      </div>
      <div class="mobile-phone-footer">
        <img class="mobile-phone-icon" src="../../images/exhibitionPage/mobilePhone@2x.png"/>
      </div>
      <div class="new-follow-footer">
        <img class="new-follow-icon" src="../../images/exhibitionPage/newfollowUp@2x.png"/>
      </div>
    </div>
    <!--<multi-slide v-model="showEvent">-->
    <!--<div class="no-potential-group">-->
    <!--<div class="no-potential-edit" @click="editInfo">编辑</div>-->
    <!--<div class="no-potential-edit" @click="addInfo">新增潜在用户</div>-->
    <!--<div class="no-potential-cancel" @click="cancelSelected">取消</div>-->
    <!--</div>-->
    <!--</multi-slide>-->
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        showEvent: false,
        gobackUrl: 'goBack',
        nowIndex: 1,
        customerInfo: {
          INVESTOR_NAM: '',
          DEPARTMENT_NAM: '',
          INVESTOR_ID: '',
          OPENACCT_DT: '',
          EXCHANGE_NAM: '',
          FIRST_IN_DT: '',
          VIPTYP: '',
          OPEN_STS: ''
        }
      }
    },
    computed: {
      ...mapState({
        customerMessage: ({exhibitionPage}) => exhibitionPage.customerMessage
      })
    },
    mounted() {
      this.getInvestorOpen()
    },
    methods: {
      LinkToTab(routerViewName, index) {
        this.nowIndex = index
        this.$router.push({
          name: routerViewName
        })
      },
      showSelected() {
        this.showEvent = !this.showEvent
      },
      gotoDetail() {
        this.$store.dispatch('updateCzType', 0)
        this.$router.push({
          name: 'customerInfo'
        })
      },
//      editInfo() { //编辑客户资料
//        this.showEvent = false
//        this.$store.dispatch('updateCzType', 1)
//        this.$router.push({
//          name: 'customerInfo'
//        })
//      },
      cancelSelected() {
        this.showEvent = false
      },
      getInvestorOpen() { //单一投资者开户信息
        this.$$axios({restUrl: 'investorOpen', join: [this.userId, this.investorId]})
          .then((response) => {
            console.log('response', response);
            this.customerInfo['INVESTOR_NAM'] = response[0]['INVESTOR_NAM']
            this.customerInfo['DEPARTMENT_NAM'] = response[0]['DEPARTMENT_NAM']
            this.customerInfo['INVESTOR_ID'] = response[0]['INVESTOR_ID']
            this.customerInfo['OPENACCT_DT'] = response[0]['OPENACCT_DT']
            this.customerInfo['EXCHANGE_ID'] = response[0]['EXCHANGE_ID']
            this.customerInfo['FIRST_IN_DT'] = response[0]['FIRST_IN_DT']
            this.customerInfo['VIPTYP'] = response[0]['VIPTYP']
            this.customerInfo['OPEN_STS'] = response[0]['OPEN_STS']


            this.$store.dispatch('updateCustomerMessage', {
              OPENACCT_DT: response[0].OPENACCT_DT,
              FIRST_IN_DT: response[0].FIRST_IN_DT,
              EXCHANGE_NAM: response[0].EXCHANGE_NAM
            })

          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
