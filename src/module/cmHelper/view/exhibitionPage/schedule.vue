<template>
  <div class="pobo-schedule">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body">开户进度</span>
    </common-nav>
    <div class="pobo-schedule-center">
      <div class="center-backgrand-warpper">
        <div class="center-schedule-content">
          <div class="schedule-item" v-for="item in scheduleList">
            <div class="item-left">
              <span class="item-name" v-text="item.INVESTOR_NAM">张豪</span>
              <span v-if="item.OPDT" class="item-time" v-text="item.OPDT">09-12 10:09</span>
            </div>
            <div class="item-right" v-text="item.OPENSTATUS">开户完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gobackUrl: 'goBack',
        scheduleList: [
          {
            INVESTOR_NAM: '',
            OPENSTATUS: '',
            OPDT: ''
          }
        ]
      }
    },
    created() {
      this.opScheduleList()
    },
    methods: {
      opScheduleList() { //查询开户进度列表
        this.$$axios({restUrl: 'opScheduleList', join: [this.info.userId]})
          .then((response) => {
            if (response.length <= 0) {
              return
            }
            this.scheduleList.splice(0, this.scheduleList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['INVESTOR_NAM'] = item['INVESTOR_NAM']
              tempObj['OPENSTATUS'] = item['OPENSTATUS']
              tempObj['OPDT'] = this.$$timeFormate({date: item['OPDT'], format: 'Y-M-D h:m'})
              this.scheduleList.push(tempObj)
            })
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
