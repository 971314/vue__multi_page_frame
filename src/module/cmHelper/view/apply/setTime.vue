<template>
  <div class="zdytime">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="zdytime-title" slot="body">
        自定义时间
      </div>
    </common-nav>
    <div class="time-selected-items">
      <div class="time-selected-options">
        <div class="time-start-title">开始时间</div>
        <span>{{setTime.startTime}}</span>
        <input type="date" v-model="setTime.startTime"/>
      </div>
      <div class="time-selected-options">
        <div class="time-start-title">结束时间</div>
        <span>{{setTime.endTime}}</span>
        <input type="date" v-model="setTime.endTime"/>
      </div>
    </div>

    <a class="zdytime-submit-button" @click="parseParams">
      确认
    </a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gobackUrl: 'goBack',
        setTime: {
          startTime: this.GetDateStr(0),
          endTime: this.GetDateStr(0)
        }
      }
    },
    created () {

    },
    activated () {
      this.setTime = {
        startTime: this.GetDateStr(0),
        endTime: this.GetDateStr(0)
      }
    },
    mounted () {

    },
    methods: {
      //保存时间
      parseParams () {
        let Time = {
          startTime: this.setTime.startTime,
          endTime: this.setTime.endTime
        }
        this.$store.dispatch('updataRankingTime', Time)
        this.$router.back()
      }
    }
  }
</script>
