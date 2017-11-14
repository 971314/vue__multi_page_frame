<template>
  <div class="pobo-followup-record">
    <div class="followup-record-warpper">
      <div class="followup-record-content">
        <div class="record-item" v-for="(recordItem, index) in recordList" @click="gotoDetail(recordItem)">
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
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        recordList: []
      }
    },
    computed: {
      ...mapState({
        investor: ({followUpRecord}) => followUpRecord.investor,
        addFollow: ({followUpRecord}) => followUpRecord.addFollow
      })
    },
    activated() {
      this.investorFollowList()
    },
    methods: {
      gotoDetail(recordItem) {
        this.$store.dispatch('updatepIsEdit', true)
        this.$store.dispatch('updatepShowEditBtn', true)
        this.$store.dispatch('updateAddFollow', Object.assign(this.addFollow, {
          businessType: 1,
          followId: recordItem.PROBLEM_ID,
          InvestorId: this.investor.INVESTOR_ID
        }))
        this.$router.push({
          name: 'addAndEdit'
        })
      },
      investorFollowList() { //查询留存客户跟进列表
        this.$$axios({restUrl: 'investorFollowList', join: [this.info.userId, this.investor.INVESTOR_ID]})
          .then((response) => {
            this.recordList.splice(0, this.recordList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['PROBLEM_ID'] = item['PROBLEM_ID']
              tempObj['PROBLEM_TYP'] = item['PROBLEM_TYP']
              tempObj['PROBLEM_DESC'] = item['PROBLEM_DESC']
              tempObj['PROBLEM_PROCESS_DT'] = this.$$timeFormate({
                date: item['PROBLEM_PROCESS_DT'],
                format: 'Y-M-D h:m'
              })
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
