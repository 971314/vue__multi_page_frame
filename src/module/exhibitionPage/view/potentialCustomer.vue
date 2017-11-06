<template>
  <div class="pobo-potential-customer">
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
              <span class="info-name" v-text="customerInfo.investorName">嵇伟民</span>
              <img v-if="false" class="info-star" src="../images/3-star@2x.png"></img>
              <img v-if="false" class="info-new" src="../images/NEW@2x.png"></img>
            </div>
            <div class="info-zjzh">创建时间 {{customerInfo.openingTime}}</div>
            <div class="info-yingye">客户来源 扫码</div>
          </div>
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
    <div class="pobo-customer-center">
      <div class="followup-record-warpper">
        <div class="followup-record-header">
          <img class="record-header-tips" src="../images/tabtips@2x.png"/>
          跟进记录
        </div>
        <div class="followup-record-content">
          <div class="record-item" v-for="(recordItem, index) in recordList">
            <div class="item-left">
              <!--<span class="item-name">日常事务</span>-->
              <span class="item-time" v-text="recordItem.UPDT"></span>
            </div>
            <div class="item-right" v-text="recordItem.FOLLOWDESC"></div>
            <img class="record-arrow" src="../images/showdetail@2x.png">
          </div>
        </div>
      </div>
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
        <div class="no-potential-delete" @click="deleteInfo">删除</div>
        <div class="no-potential-cancel" @click="cancelSelected">取消</div>
      </div>
    </multi-slide>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        showEvent: false,
        customerInfo: {
          investorName: '',
          departName: '',
          capitalAccount: '',
          openingTime: '',
          exchanges: '',
          firstInFundDate: '',
          starLevel: '',
          isNew: ''
        },
        recordList: [
          {
            FOLLOWDESC: "确认下次回访时间地点确认下次回访时间地点确认下次回访时间地点",
            UPDT: "2017-09-12",
          },
          {
            FOLLOWDESC: "确认下次回访时间地点",
            UPDT: "2017-08-30",
          },
          {
            FOLLOWDESC: "介绍近期投资方向",
            UPDT: "2017-08-30",
          }
        ]
      }
    },
    mounted() {
      this.pInvestorFollowList()
    },
    methods: {
      showSelected() {
        this.showEvent = !this.showEvent
      },
      gotoDetail() {
        this.$store.dispatch('updateCzType', 0)
        this.$router.push({
          name: 'potentialCustomerInfo'
        })
      },
      editInfo() {
        this.showEvent = false
        this.$store.dispatch('updateCzType', 1)
        this.$router.push({
          name: 'potentialCustomerInfo'
        })
      },
      deleteInfo() {
        this.showEvent = false
        this.pInvestorDelete()
      },
      cancelSelected() {
        this.showEvent = false
      },
      pInvestorDelete() { //删除潜在客户
        this.$$axios({restUrl: 'pInvestorDelete', join: [this.userId, this.investorId]})
          .then((response) => {
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      pInvestorFollowList() { //查询某个潜在客户跟进列表
        this.$$axios({restUrl: 'pInvestorFollowList', join: [this.userId, this.investorId]})
          .then((response) => {
            this.recordList.splice(0, this.recordList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['FOLLOWDESC '] = item['FOLLOWDESC ']
              tempObj['UPDT '] = item['UPDT ']
              this.recordList.push(tempObj)
            })
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
