<template>
  <div class="performance_ranking">
    <common-nav>
      <span slot="body">业绩排行榜</span>
    </common-nav>
    <div class="performance_father" v-for="data in classificationData">
      <div class="performance_header"><img src="../images/icon_biaoQian.png"/>{{data.name}}</div>
      <div class="performance_body" v-for="child in data.data">
        <div @click="jumpClick(child)"><img :src="'./images/'+child.img"/>{{child.name}}</div>
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
        _this.classificationDat = JSON.parse(pbE.SYS().readConfig(this.cPbeUrl + 'main.json')).performanceClassification
      } else {
        _this.$axios.get(_this.cPcUrl + 'apply.json').then((data) => {
          data = data.data
          console.log(data)
          _this.classificationData = data.performanceClassification
        })
      }
    },
    activated () {
    },
    mounted () {
    },
    methods: {
      jumpClick (child) {
        this.$store.dispatch('updataPerformanceData', child)
        this.$router.push('/performanceList')
      }
    }
  }
</script>
