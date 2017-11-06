<template>
  <div class="cc-zdytime">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="zdytime-title" slot="body">
        自定义时间
      </div>
    </common-nav>
    <div class="time-selected-items">
      <div class="time-selected-options">
        <div class="time-start-title">选择时间</div>
        <div class="time-start-content">
          <span>{{ccSetTime1}}</span>
          <input type="date" v-model="ccSetTime1"/>
        </div>
      </div>
    </div>

    <a class="zdytime-submit-button" @click="parseParams">
      确认
    </a>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        gobackUrl: 'goBack',
        ccSetTime1: ''
//        ccSetTime: this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
      }
    },
//    activated () {
//    },
    computed: {
      ...mapState({
        ccSetTime: ({exhibitionPage}) => exhibitionPage.ccSetTime
      })
    },
    mounted () {
      document.body.style.backgroundColor = '#f7f7fa';
      if (this.ccSetTime) {
        this.ccSetTime1 = this.ccSetTime
      } else {
        this.ccSetTime1 = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
      }
    },
    methods: {
      //保存时间
      parseParams () {
        this.$store.dispatch('updateCcSetTime', this.ccSetTime1)
        this.$router.back()
      }
    }
  }
</script>
