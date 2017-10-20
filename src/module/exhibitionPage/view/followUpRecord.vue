<template>
  <div class="pobo-followup-record">
    <div class="followup-record-warpper">
      <div class="followup-record-content">
        <div class="record-item" v-for="(recordItem, index) in recordList">
          <div class="item-left">
            <span class="item-name" v-text="recordItem.followType"></span>
            <span class="item-time" v-text="recordItem.upDate"></span>
          </div>
          <div class="item-right" v-text="recordItem.followDesc"></div>
          <img class="record-arrow" src="../images/showdetail@2x.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        recordList: [
          {
            followId: "",
            followType: "日常事务",
            followDesc: "确认下次回访时间地点确认下次回访时间地点确认下次回访时间地点",
            upDate: "2017-08-30 10:09",
          },
          {
            followId: "",
            followType: "日常事务",
            followDesc: "确认下次回访时间地点",
            upDate: "2017-08-30 10:09",
          },
          {
            followId: "",
            followType: "日常事务",
            followDesc: "介绍近期投资方向",
            upDate: "2017-08-30 10:09",
          }
        ]
      }
    },
    mounted() {
//          this.$parent.nowIndex = 3
    }
  }
</script>
