<template>
  <div class="performance_ranking">
    <common-nav>
      <span slot="body">业绩排行榜</span>
    </common-nav>
    <!--<div class="performance_father" v-for="data in classificationData">
      <div class="performance_header"><img src="../../images/leaderboards/icon_biaoQian.png"/>{{data.name}}</div>
      <div class="performance_body" v-for="child in data.data">
        <div @click="jumpClick(child)"><img :src="'./images/leaderboards/'+child.img"/>{{child.name}}</div>
      </div>
    </div>-->
    <div class="performance_father" v-if="classificationData && info.accountType != 'M'">
      <div class="performance_header"><img
        src="../../images/leaderboards/icon_biaoQian.png"/>{{ classificationData.data1.name}}
      </div>
      <div class="performance_body"
           v-for="data in classificationData.data1.data">
        <div @click="jumpClick(data)"><img :src="'./images/leaderboards/'+data.img"/>{{data.name}}</div>
      </div>
    </div>
    <div class="performance_father" v-if="classificationData">
      <div class="performance_header"><img
        src="../../images/leaderboards/icon_biaoQian.png"/>{{ classificationData.data2.name}}
      </div>
      <div class="performance_body"
           v-for="data in classificationData.data2.data">
        <div @click="jumpClick(data)"><img :src="'./images/leaderboards/'+data.img"/>{{data.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        classificationData: null
      }
    },
    computed: {},
    created () {
      let _this = this
      if (pbE.isPoboApp) {
        _this.classificationData = pbE.SYS().readConfig(this.cPbeUrl + 'apply.json') ? JSON.parse(pbE.SYS().readConfig(this.cPbeUrl + 'apply.json')).leaderboards : ''
      } else {
        _this.$axios.get(_this.cPcUrl + 'apply.json').then((data) => {
          data = data.data
          console.log(data)
          _this.classificationData = data.leaderboards
        })
      }
    },
    activated () {
    },
    mounted () {
    },
    methods: {
      //跳转及数据存储
      jumpClick (child) {
        this.$store.dispatch('updataPerformanceData', child)
        this.$router.push('/performanceList')
      }
    }
  }
</script>
