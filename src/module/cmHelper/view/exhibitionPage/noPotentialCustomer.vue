<template>
  <div class="pobo-nopotential-cunstomer">
    <div class="pobo-customer-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户详情</span>
      </common-nav>
    </div>
    <div class="pobo-customer-center" id="pobo-customer-center">
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
            <div class="info-yingye">所属部门 {{customerInfo.DEPARTMENT_NAM}}</div>
          </div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <div class="customer-tab-wrapper">
        <div class="customer-tab-group">
          <div class="account-tips" :class="{'selected-record': nowIndex == 1}"
               @click="LinkToTab('accountOverView', 1)">
            账户概览
            <div class="selected-line"></div>
          </div>
          <div class="yewu-liushui" :class="{'selected-record': nowIndex == 2}"
               @click="LinkToTab('businessPipeline', 2)">
            业务流水
            <div class="selected-line"></div>
          </div>
          <div class="genjin-record" :class="{'selected-record': nowIndex == 3}"
               @click="LinkToTab('followUpRecord', 3)">
            跟进记录
            <div class="selected-line"></div>
          </div>
        </div>
      </div>
      <!--<div class="zhanwei-div" id="zhanwei-div">-->
      <!--<div class="customer-tab-group">-->
      <!--<div class="account-tips">-->
      <!--账户概览-->
      <!--<div class="selected-line"></div>-->
      <!--</div>-->
      <!--<div class="yewu-liushui">-->
      <!--业务流水-->
      <!--<div class="selected-line"></div>-->
      <!--</div>-->
      <!--<div class="genjin-record">-->
      <!--跟进记录-->
      <!--<div class="selected-line"></div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="pobo-customer-footer">
      <div class="message-footer">
        <img class="message-icon" src="../../images/exhibitionPage/message@2x.png"/>
      </div>
      <div class="mobile-phone-footer" @click="showSelected1">
        <img class="mobile-phone-icon" src="../../images/exhibitionPage/mobilePhone@2x.png"/>
      </div>
      <div class="new-follow-footer" @click="addAndEdit">
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
    <multi-slide v-model="showEvent1">
      <div class="no-potential-group">
        <div v-show="investor.MOBILE_NO" class="no-potential-tel" @click="goToTel(investor.MOBILE_NO)">
          {{investor.MOBILE_NO}}
        </div>
        <div v-show="investor.LINKTELEPHONE" class="no-potential-tel" @click="goToTel(investor.LINKTELEPHONE)">
          {{investor.LINKTELEPHONE}}
        </div>
        <div class="no-potential-cancel" @click="cancelSelected1">取消</div>
      </div>
    </multi-slide>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        showEvent: false,
        showEvent1: false,
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
    watch: {
      $route(to, from) {
        if (to.name == 'customerInfoList' && from.name == 'noPotentialCustomer') {
          this.$store.dispatch('updateAddFollow', Object.assign(this.addFollow, {
            businessType: ''
          }))
        }
      }
    },
    computed: {
      ...mapState({
        customerMessage: ({exhibitionPage}) => exhibitionPage.customerMessage,
        investor: ({followUpRecord}) => followUpRecord.investor,
        addFollow: ({followUpRecord}) => followUpRecord.addFollow
      })
    },
    activated() {
//      this.domScroll()
      this.getInvestorOpen()
      this.LinkToTab('accountOverView', 1)
//      document.getElementById('pobo-customer-center').onscroll = this.domScroll
    },
    methods: {
      goToTel(str) {
        this.showEvent1 = false
        this.callTel(str)
      },
      showSelected1() {
        if (!this.investor.LINKTELEPHONE && !this.investor.MOBILE_NO) {
          this.$toast('手机号不存在!')
          return
        }
        this.showEvent1 = !this.showEvent1
      },
      cancelSelected1() {
        this.showEvent1 = false
      },
      domScroll() {
        let distance = document.getElementById('pobo-customer-center').getElementsByClassName('customer-info-grid')[0].offsetHeight + 10
        if (document.getElementById('pobo-customer-center').scrollTop > distance) {
          document.getElementById('customer-tab-wrapper').style.position = 'fixed'
          document.getElementById('customer-tab-wrapper').style.zIndex = '9999'
          document.getElementById('zhanwei-div').style.display = 'block'
        } else {
          document.getElementById('customer-tab-wrapper').style.position = 'static'
          document.getElementById('zhanwei-div').style.display = 'none'
        }
      },
      callTel(tel) {
        window.location.href = `pobo:uncheck=1&pageId=800007&tel=${tel}`
      },
      addAndEdit() { //新建客户跟进
        var p = this.addFollow;//获取store中的 跟进情况
        p.InvestorId = this.investor.INVESTOR_ID;//客户代码
        p.name = this.investor.INVESTOR_NAM;//客户代码
        p.businessType = 1;//客户名称
        this.$store.dispatch('updateAddFollow', p)
        this.$store.dispatch('updatepIsEdit', false)
        this.$store.dispatch('updatepShowEditBtn', false)
        this.$router.push({
          name: 'addAndEdit'
        })
      },
      LinkToTab(routerViewName, index) {
        this.nowIndex = index
        this.$router.replace({
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
        console.log('investor', this.investor)
        this.$$axios({restUrl: 'investorOpen', join: [this.info.userId, this.investor.INVESTOR_ID]})
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
