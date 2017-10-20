<template>
  <div>
    <keep-alive exclude="zdytime">
      <router-view @xxx="changeNum" :aaa="aaa"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aaa: 1
      }
    },
    mounted() {
    },
    methods: {
      changeNum(val) {
        this.aaa = val;
      }
    }
  }
</script>
