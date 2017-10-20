<template>
  <div class="commodity">
    <div class="commodityDiv">
      <router-link :to="{path:'/news/1/commodity/3/rare/1',query:{group1:40102,group2:40202}}" replace
                   :class=" this.$route.params.numm == 1 ? 'background': ''">
        稀贵金属
      </router-link>
      <router-link :to="{path:'/news/1/commodity/3/metal/2',query:{group1:40101,group2:40201}}" replace
                   :class=" this.$route.params.numm == 2 ? 'background': ''">
        金属市场
      </router-link>
      <router-link :to="{path:'/news/1/commodity/3/farm/3',query:{group1:40104,group2:40204}}" replace
                   :class=" this.$route.params.numm == 3 ? 'background': ''">
        农产品
      </router-link>
      <router-link :to="{path:'/news/1/commodity/3/energy/4',query:{group1:40105,group2:40205}}" replace
                   :class=" this.$route.params.numm == 4 ? 'background': ''">
        能源化工
      </router-link>
      <router-link :to="{path:'/news/1/commodity/3/ferrous/5',query:{group1:40103,group2:40203}}" replace
                   :class=" this.$route.params.numm == 5 ? 'background': ''">
        黑色金属
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
