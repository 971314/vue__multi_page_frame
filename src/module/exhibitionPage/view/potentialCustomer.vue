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
              <span class="info-name">嵇伟民</span>
              <img v-if="false" class="info-star" src="../images/3-star@2x.png"></img>
              <img v-if="false" class="info-new" src="../images/NEW@2x.png"></img>
            </div>
            <div class="info-zjzh">创建时间 2017-08-12</div>
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
              <span class="item-time" v-text="recordItem.upDate"></span>
            </div>
            <div class="item-right" v-text="recordItem.followDesc"></div>
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
        recordList: [
          {
            followId: "",
            followDesc: "确认下次回访时间地点确认下次回访时间地点确认下次回访时间地点",
            upDate: "2017-09-12",
          },
          {
            followId: "",
            followDesc: "确认下次回访时间地点",
            upDate: "2017-08-30",
          },
          {
            followId: "",
            followDesc: "介绍近期投资方向",
            upDate: "2017-08-30",
          }
        ]
      }
    },
    methods: {
      showSelected() {
        this.showEvent = !this.showEvent
      },
      gotoDetail() {
        this.$router.push({
          name: 'potentialCustomerInfo'
        })
      },
      editInfo() {
        this.showEvent = false
        this.$router.push({
          name: 'potentialCustomerInfo'
        })
      },
      deleteInfo() {
        this.showEvent = false
      },
      cancelSelected() {
        this.showEvent = false
      }
    }
  }
</script>
