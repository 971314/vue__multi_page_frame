<template>
  <div class="pobo-followup-record">
    <div class="followup-record-warpper">
      <div class="followup-record-content">
        <div class="record-item" v-for="(recordItem, index) in recordList">
          <div class="item-left">
            <span class="item-name" v-text="recordItem.PROBLEM_TYP"></span>
            <span class="item-time" v-text="recordItem.PROBLEM_PROCESS_DT"></span>
          </div>
          <div class="item-right" v-text="recordItem.PROBLEM_DESC"></div>
          <img class="record-arrow" src="../../images/exhibitionPage/showdetail@2x.png">
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
            PROBLEM_ID: "",
            PROBLEM_TYP: "日常事务",
            PROBLEM_DESC: "确认下次回访时间地点确认下次回访时间地点确认下次回访时间地点",
            PROBLEM_PROCESS_DT: "2017-08-30 10:09",
          },
          {
            PROBLEM_ID: "",
            PROBLEM_TYP: "日常事务",
            PROBLEM_DESC: "确认下次回访时间地点",
            PROBLEM_PROCESS_DT: "2017-08-30 10:09",
          },
          {
            PROBLEM_ID: "",
            PROBLEM_TYP: "日常事务",
            PROBLEM_DESC: "介绍近期投资方向",
            PROBLEM_PROCESS_DT: "2017-08-30 10:09",
          }
        ]
      }
    },
    mounted() {
      this.investorFollowList()
    },
    methods: {
      investorFollowList() { //查询留存客户跟进列表
        this.$$axios({restUrl: 'investorFollowList', join: [this.userId, this.investorId]})
          .then((response) => {
            this.recordList.splice(0, this.recordList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['PROBLEM_ID'] = item['PROBLEM_ID']
              tempObj['PROBLEM_TYP'] = item['PROBLEM_TYP']
              tempObj['PROBLEM_DESC'] = item['PROBLEM_DESC']
              tempObj['PROBLEM_PROCESS_DT'] = this.$$timeFormate({date: item['PROBLEM_PROCESS_DT'], format: 'Y-M-D h:m'})
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
