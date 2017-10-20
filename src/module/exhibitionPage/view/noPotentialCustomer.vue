<template>
  <div class="pobo-nopotential-cunstomer">
    <div class="pobo-customer-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户详情</span>
        <a slot="footer" class="customer-add-delete" @click="showSelected">
          <img class="add-delete-icon" src="../images/sandianicon@2x.png"/>
        </a>
      </common-nav>
      <div class="customer-info-grid" @click="gotoDetail">
        <div class="customer-info-group">
          <div class="left-avatar">
            <div class="avatar-cover"></div>
          </div>
          <div class="center-info-list">
            <div class="info-name-group">
              <span class="info-name">陈嫣</span>
              <img class="info-star" src="../images/3-star@2x.png"></img>
              <img class="info-new" src="../images/NEW@2x.png"></img>
            </div>
            <div class="info-zjzh">资金账号 983940192</div>
            <div class="info-yingye">营业部门 上海商城路</div>
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
      <router-view></router-view>
    </div>
    <div class="pobo-customer-footer">
      <div class="message-footer">
        <img class="message-icon" src="../images/message@2x.png"/>
      </div>
      <div class="mobile-phone-footer">
        <img class="mobile-phone-icon" src="../images/mobilePhone@2x.png"/>
      </div>
      <div class="new-follow-footer">
        <img class="new-follow-icon" src="../images/newfollowUp@2x.png"/>
      </div>
    </div>
    <multi-slide v-model="showEvent">
      <div class="no-potential-group">
        <div class="no-potential-edit" @click="editInfo">编辑</div>
        <div class="no-potential-cancel" @click="cancelSelected">取消</div>
      </div>
    </multi-slide>
  </div>

</template>

<script>
  export default{
    data() {
      return {
        showEvent: false,
        gobackUrl: 'goBack',
        nowIndex: 1
      }
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
        this.$router.push({
          name: 'customerInfo'
        })
      },
      editInfo() {
        this.showEvent = false
        this.$router.push({
          name: 'customerInfo'
        })
      },
      cancelSelected() {
        this.showEvent = false
      }
    }
  }
</script>
