<template>
  <div class="full-height">
    <common-nav id="navbarContent" :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl" class="pb-jgdx">
      <ul slot="body"
          style="font-size: 0; padding-left: 20px;height: 44px;display: flex;justify-content: center;align-items: center;">
        <li class="ventor" :class="{ active: activeIndex == 0  }" @click="changeHandle(0)">
          <span>品种</span>
        </li>
        <li class="ventor" :class="{ active: activeIndex == 1  }" @click="changeHandle(1)">
          <span>机构</span>
        </li>
      </ul>
    </common-nav>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        gobackUrl: 'goBack',
        activeIndex: 0,
        color: "#eb1212"
      }
    },
    created() {
      this.$store.commit("loading", false);
    },
    computed: {
      spinner() {
        return this.$store.state.spinner
      },
      loading() {
        return this.$store.state.loading
      }
    },
    methods: {
      changeHandle(type) {
        this.activeIndex = type;
        if (type == 0) {
          this.$router.replace('/variety')
        } else if (type == 1) {
          this.$router.replace('/institution')
        }
      }
    }
  }
</script>
