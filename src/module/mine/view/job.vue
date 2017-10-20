<template>
  <div class="job-container">
    <group>
      <cell v-for="item in prefessionList" @click="setJob(item)" :hasArrow="hasArrow">
        {{item.proName}}
        <img v-show="jobFlag == item.proId" class="gougou" slot="footer" src="../images/gougou@2x.png">
      </cell>
    </group>
  </div>

</template>

<script>
  export default {
    props: ['userInfoAll', 'prefessionList'],
    data() {
      return {
        jobFlag: this.userInfoAll.prefession,
        hasArrow: false
      }
    },
    created() {
      this.$emit('change-title', '请选择职业');
    },
    methods: {
      setJob(item) {
        this.jobFlag = item.proId;
        this.userInfoAll.prefession = item.proId;
        this.userInfoAll.prefessionName = item.proName;
      }
    }
  }
</script>
