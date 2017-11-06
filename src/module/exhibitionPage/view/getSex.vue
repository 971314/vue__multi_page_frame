<template>
  <div class="pobo-getSex">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body">选择性别</span>
    </common-nav>
    <group>
      <cell @click="setSex(1)" :hasArrow="hasArrow">
        男
        <img v-show="sexFlag == 1" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
      <cell @click="setSex(2)" :hasArrow="hasArrow">
        女
        <img v-show="sexFlag == 2" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
      <cell @click="setSex(3)" :hasArrow="hasArrow">
        非人类
        <img v-show="sexFlag == 3" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
      <cell @click="setSex(0)" :hasArrow="hasArrow">
        未知
        <img v-show="sexFlag == 0" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
    </group>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        hasArrow: false,
        sexFlag: '',
        gobackUrl: 'goBack'
      }
    },
    computed: {
      ...mapState([
          'noPotSex'
      ])
    },
    methods: {
      setSex(str) {
        this.sexFlag = str;
        this.$store.dispatch('updateNoPotSex', this.sexFlag)
      }
    }
  }
</script>
