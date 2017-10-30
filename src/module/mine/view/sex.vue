<template>
  <div class="sex-container">
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
  export default {
    data() {
      return {
        hasArrow: false,
        sexFlag: ''
      }
    },
    computed: {
      ...mapState([
        'userInfoAll'
      ])
    },
    activated() {
      this.$emit('change-title', '性别');
      this.$emit('change-goback-url', 'goBack');
      this.sexFlag = this.userInfoAll.sex
    },
    methods: {
      setSex(str) {
        this.sexFlag = str;
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.sexFlag !== '') {
        this.userInfoAll.sex = this.sexFlag;
        this.$store.dispatch('updateUserInfoAll', this.userInfoAll);
        this.$store.dispatch('updateIsFisrt', true)
      }
      next();
    }
  }
</script>
