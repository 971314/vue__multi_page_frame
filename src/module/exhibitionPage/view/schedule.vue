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
  import {mapState} from 'vuex'
  export default {
    data() {
        return {
          gobackUrl: 'goBack'
        }
    },
    created() {
      console.log(this.mixinTest)
      console.log(this.test)
      this.$store.dispatch('updateTest', 222)
      console.log(this.test);
    },
    computed: {
      ...mapState([
        'test'
      ])
    },
    methods: {
      linkToDetail() {
        this.$router.push({
          name: 'scheduleDetail'
        })
      },
      opScheduleList() { //查询开户进度列表
        this.$$axios({restUrl: 'opScheduleList', join: [1, 2, 3, 4, 5]})
          .then((response) => {
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
