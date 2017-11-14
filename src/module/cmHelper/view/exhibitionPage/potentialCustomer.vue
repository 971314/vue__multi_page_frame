<template>
  <div class="pobo-potential-customer">
    <div class="pobo-customer-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户详情</span>
        <a slot="footer" class="customer-add-delete" @click="showSelected">
          <img class="add-delete-icon" src="../../images/exhibitionPage/sandianicon@2x.png"/>
        </a>
      </common-nav>
      <div class="customer-info-grid" @click="gotoDetail">
        <div class="customer-info-group">
          <div class="left-avatar">
            <div class="avatar-cover"></div>
          </div>
          <div class="center-info-list">
            <div class="info-name-group">
              <span class="info-name" v-text="pInvestor.CUST_NAM">嵇伟民</span>
              <img v-if="false" class="info-star" src="../../images/exhibitionPage/3-star@2x.png"></img>
              <img v-if="false" class="info-new" src="../../images/exhibitionPage/NEW@2x.png"></img>
            </div>
            <div class="info-zjzh">创建时间 {{pInvestor.INPUT_TIME}}</div>
            <div class="info-yingye">客户来源 {{pInvestor.CUST_SRC}}</div>
          </div>
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
    <div class="pobo-customer-center">
      <div class="followup-record-warpper">
        <div class="followup-record-header">
          <img class="record-header-tips" src="../../images/exhibitionPage/tabtips@2x.png"/>
          跟进记录
        </div>
        <div class="followup-record-content">
          <div class="record-item" v-for="(recordItem, index) in recordList">
            <div class="item-left">
              <!--<span class="item-name">日常事务</span>-->
              <span class="item-time" v-text="recordItem.UPDT"></span>
            </div>
            <div class="item-right" v-text="recordItem.FOLLOWDESC"></div>
            <img class="record-arrow" src="../../images/exhibitionPage/showdetail@2x.png">
          </div>
        </div>
      </div>
    </div>
    <div class="pobo-customer-footer">
      <div class="message-footer">
        <img class="message-icon" src="../../images/exhibitionPage/message@2x.png"/>
      </div>
      <div class="mobile-phone-footer" @click="callTel">
        <img class="mobile-phone-icon" src="../../images/exhibitionPage/mobilePhone@2x.png"/>
      </div>
      <div class="new-follow-footer" @click="addAndEdit">
        <img class="new-follow-icon" src="../../images/exhibitionPage/newfollowUp@2x.png"/>
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
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        showEvent: false,
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
    computed: {
      ...mapState({
        pInvestor: ({followUpRecord}) => followUpRecord.pInvestor,
        addFollow: ({followUpRecord}) => followUpRecord.addFollow
      })
    },
    activated() {
      console.log(this.pInvestor, 'pInvestor')
      this.pInvestorFollowList()
    },
    methods: {
      callTel() {
        window.location.href = `pobo:uncheck=1&pageId=800007&tel=${this.pInvestor.MOBILE_NO}`
      },
      addAndEdit() { //新建客户跟进
        var p = this.addFollow;//获取store中的 跟进情况
        p.InvestorId = this.pInvestor.CUST_ID;//客户代码
        p.businessType = 2;//客户名称
        this.$store.dispatch('updateAddFollow', p)
        this.$store.dispatch('updatepIsEdit', true)
        this.$store.dispatch('updatepShowEditBtn', false)
        this.$router.push({
          name: 'addAndEdit'
        })
      },
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
        this.$router.push({
          name: 'potentialCustomerEdit'
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
        this.$$axios({restUrl: 'pInvestorDelete', join: [this.info.userId, this.pInvestor.CUST_ID]})
          .then((response) => {
            this.$router.replace({
              name: 'customerInfoList'
            })
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      pInvestorFollowList() { //查询某个潜在客户跟进列表
        this.$$axios({restUrl: 'pInvestorFollowList', join: [this.info.userId, this.pInvestor.CUST_ID]})
          .then((response) => {
            this.recordList.splice(0, this.recordList.length)
            if (response.length <= 0 || !response[0]) {
              return;
            }
            response.map((item) => {
              let tempObj = {}
              tempObj['FOLLOWDESC'] = item['FOLLOWDESC']
              tempObj['UPDT'] = this.$$timeFormate({date: item['UPDT'], format: 'Y-M-D'})
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
