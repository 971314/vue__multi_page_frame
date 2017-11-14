<template>
  <div class="indNews">
    <common-nav :goback="false" v-show="this.$route.name == 'newsFirm' || this.$route.name == 'newsDCD'">
      <div slot="body" class="navtab">
        <router-link to="/" replace class="navTab1" :class=" this.$route.name == 'newsFirm' ? 'background': ''">
          公司专栏
        </router-link>
        <router-link to="/newsDCD" class="navTab1" :class=" this.$route.name == 'newsDCD' ? 'background': ''"
                     replace>
          新闻快讯
        </router-link>
      </div>
    </common-nav>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="indNews-router-view" id="indNews-router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        transitionName: '',
        isToDetail: false,
        isFirstTime: true,
      }
    },
//    watch: {
//      '$route'(to, from) {
//        if (to.name == 'newsDCD') {
//          this.transitionName = '';
//        } else if (to.name == 'newsFirm') {
//          this.transitionName = '';
//        } else {
//          this.transitionName = 'indNews-slide-left';
//        }
//
//        if (!!!from.name){
//          this.transitionName = 'indNews-slide-right';
//        }
//        if (this.isFirstTime) {
//          this.transitionName = '';
//        }
//      }
//    },
    mounted() {
      if (this.$route.query.type && this.$route.query.info) {
        this.$router.replace({
          path: '/details',
          query: {type: this.$route.query.type, info: this.$route.query.info}
        });
      } else if (this.$route.query.infoId) {
        this.$router.replace({path: '/', query: {infoId: this.$route.query.infoId}});
      } else {
        this.$router.replace('/');
      }
    }
  }
</script>
