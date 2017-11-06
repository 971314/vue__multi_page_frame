<template>
  <div class="pobo-schedule">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body">开户进度</span>
    </common-nav>
    <div class="pobo-schedule-center">
      <div class="center-backgrand-warpper">
        <div class="center-schedule-content">
          <div class="schedule-item">
            <div class="item-left">
              <span class="item-name">稽伟民</span>
              <span class="item-time">09-12 10:09</span>
            </div>
            <div class="item-right">适当性测试已完成</div>
          </div>
          <div class="schedule-item">
            <div class="item-left">
              <span class="item-name">陈嫣</span>
              <span class="item-time">09-12 10:09</span>
            </div>
            <div class="item-right">适当性测试进行中</div>
          </div>
          <div class="schedule-item">
            <div class="item-left">
              <span class="item-name">王泽</span>
              <span class="item-time">09-12 10:09</span>
            </div>
            <div class="item-right bohui-failed">适当性测试驳回</div>
          </div>
          <div class="schedule-item">
            <div class="item-left">
              <span class="item-name">张豪</span>
              <span class="item-time">09-12 10:09</span>
            </div>
            <div class="item-right kaihu-success">开户完成</div>
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
        this.$$axios({restUrl: 'opScheduleList', join: [this.userId]})
          .then((response) => {
            if (response.length <= 0) {
              return
            }
            this.scheduleList.splice(0, this.scheduleList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['INVESTOR_NAM'] = response['INVESTOR_NAM']
              tempObj['OPENSTATUS'] = response['OPENSTATUS']
              tempObj['OPDT'] = response['OPDT']
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
