<template>
  <div class="pb-activity-main">
    <common-nav id="navbarContent" :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl" class="pb-jgdx">
      <ul slot="body"
          style="font-size: 0; padding-left: 20px; height: 44px; display: flex; justify-content: center; align-items: center;">
        <li class="ventor lileft" :class="{ active: activeIndex == 0  }" @click="changeHandle(0)">
          <span>最新活动</span>
        </li>
        <li class="ventor liright" :class="{ active: activeIndex == 1  }" @click="changeHandle(1)">
          <span>往期回顾</span>
        </li>
      </ul>
    </common-nav>
    <keep-alive>
      <router-view name="a"></router-view>
    </keep-alive>
    <router-view name="b"></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        gobackUrl: "close",
        activeIndex: 0
      }
    },
    created() {
      this.$parent.activeIndex = 0;
    },
    mounted(){
      document.querySelector('body').style.backgroundColor = 'f7f7fa';
    },
    methods: {
      changeHandle(index) {
        this.activeIndex = index;
        if (this.activeIndex == 0) {
          this.$router.replace({name: 'activity'});
        } else {
          this.$router.replace({name: 'lastaword'});
        }
      }
    }
  }
</script>
