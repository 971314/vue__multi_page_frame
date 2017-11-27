<template>
  <div class="pobo-depart-detail">
    <div class="pobo-customer-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body" v-text="departTitle"></span>
      </common-nav>
      <div class="customer-info-grid">
        <div class="customer-info-group">
          <div class="info-group-first">
            <span class="group-first-text"
                  v-text="departInfo.EQUITY ? $$comma((departInfo.EQUITY / 10000).toFixed(2)) : ((departInfo.EQUITY / 1) == 0 ? 0 : '-')"></span>
            <span class="group-first-title">最新权益(万)</span>
          </div>
          <div class="info-group-second">
            <div class="group-second-item">
              <span class="second-item-title">
                客户总数
              </span>
              <span class="second-item-text" v-text="departInfo.CUST_NUM || (departInfo.CUST_NUM / 1) == 0 ? departInfo.CUST_NUM : '-'"></span>
            </div>
            <div class="group-second-item">
              <span class="second-item-title">
                本月开户
              </span>
              <span class="second-item-text" v-text="departInfo.CUST_ADD_M || (departInfo.CUST_ADD_M / 1) == 0 ? departInfo.CUST_ADD_M : '-'"></span>
            </div>
            <div class="group-second-item">
              <span class="second-item-title">
                活跃客户
              </span>
              <span class="second-item-text" v-text="departInfo.ACTIVE_CUST || (departInfo.ACTIVE_CUST / 1) == 0 ? departInfo.ACTIVE_CUST : '-'"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="customer-tab-wrapper">
      <div class="customer-tab-group">
        <div class="account-tips" :class="{'selected-record': nowIndex == 1}" @click="LinkToTab('inviolableRights', 1)">
          <div class="zhanwei-line"></div>
          <span class="account-tips-text">权益</span>
          <div class="selected-line"></div>
        </div>
        <div class="yewu-liushui" :class="{'selected-record': nowIndex == 2}" @click="LinkToTab('payments', 2)">
          <div class="zhanwei-line"></div>
          <span class="account-tips-text">出入金</span>
          <div class="selected-line"></div>
        </div>
        <div class="genjin-record" :class="{'selected-record': nowIndex == 3}" @click="LinkToTab('poundage', 3)">
          <div class="zhanwei-line"></div>
          <span class="account-tips-text">手续费</span>
          <div class="selected-line"></div>
        </div>
        <div class="genjin-record" :class="{'selected-record': nowIndex == 4}" @click="LinkToTab('closingPosition', 4)">
          <div class="zhanwei-line"></div>
          <span class="account-tips-text">成交持仓</span>
          <div class="selected-line"></div>
        </div>
      </div>
    </div>
    <div class="pobo-customer-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        departTitle: '',
        gobackUrl: 'goBack',
        nowIndex: 1,
        departInfo: {
          ACTIVE_CUST: '',
          CUST_ADD_M: '',
          CUST_NUM: '',
          EQUITY: ''
        }
      }
    },
    computed: {
      ...mapState({
        departId: ({others}) => others.departId,
        departName: ({others}) => others.departName
      })
    },
    activated() {
      this.departTitle = this.departName
      this.$router.replace({
        name: 'inviolableRights'
      })
      this.getLeaderDepartDetail()
    },
    methods: {
      LinkToTab(routerViewName, index) {
        this.nowIndex = index
        this.$router.replace({
          name: routerViewName
        })
      },
      getLeaderDepartDetail() { //查询部门基本资料
        this.$$axios({
          restUrl: 'leaderDepartDetail',
          join: [this.info.userId, this.departId]
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              return
            }
            this.departInfo = response[0]
            console.log(response)
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  }
</script>
