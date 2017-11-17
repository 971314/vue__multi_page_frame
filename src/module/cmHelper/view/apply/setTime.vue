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
        <span>{{rankingTime.startTime}}</span>
        <input type="date" v-model="rankingTime.startTime"/>
      </div>
      <div class="time-selected-options">
        <div class="time-start-title">结束时间</div>
        <span>{{rankingTime.endTime}}</span>
        <input type="date" v-model="rankingTime.endTime"/>
      </div>
    </div>

    <a class="zdytime-submit-button" @click="parseParams">
      确认
    </a>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        gobackUrl: 'goBack'
      }
    },
    computed: {
      ...mapState({
        rankingTime: ({apply}) => apply.rankingTime
      })
    },
    created () {

    },
    activated () {

    },
    mounted () {

    },
    methods: {
      //保存时间
      parseParams () {
        let Time = {
          startTime: this.rankingTime.startTime,
          endTime: this.rankingTime.endTime
        }
        console.log(Time)
        this.$store.dispatch('updataRankingTime', Time)
        this.$router.back()
      }
    }
  }
</script>
