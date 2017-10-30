<template>
  <div class="job-container">
    <group>
      <cell v-for="item in prefessionList" @click="setJob(item)" :hasArrow="hasArrow">
        {{item.proName}}
        <img v-show="userInfoAll.prefession == item.proId" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
    </group>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        hasArrow: false
      }
    },
    computed: {
      ...mapState([
        'userInfoAll',
        'prefessionList'
      ])
    },
    activated() {
      this.$emit('change-title', '请选择职业');
      this.$emit('change-goback-url', 'goBack');
    },
    methods: {
      setJob(item) {
        this.userInfoAll.prefession = item.proId;
        this.userInfoAll.prefessionName = item.proName;
        this.$store.dispatch('updateUserInfoAll', this.userInfoAll);
        this.$store.dispatch('updateIsFisrt', true)
      }
    }
  }
</script>
