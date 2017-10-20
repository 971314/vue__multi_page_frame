<template>
  <div class="newsFlash">
    <div class="newsTab2">
      <router-link to="/news/1/hour/1" :class=" this.$route.params.num == 1 ? 'background': ''" replace>24小时
      </router-link>
      <router-link :to="{path:'/news/1/domestic/2',query:{group1:10101}}"
                   :class=" this.$route.params.num == 2 ? 'background': ''" replace>国内国际
      </router-link>
      <router-link :to="{path:'/news/1/commodity/3/rare/1',query:{group1:40102,group2:40202}}"
                   :class=" this.$route.params.num == 3 ? 'background': ''" replace>
        商品期货
      </router-link>
      <router-link :to="{path:'/news/1/FITF/4',query:{group1:30101,group2:30102}}"
                   :class=" this.$route.params.num == 4 ? 'background': ''" replace>金融期货
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>
