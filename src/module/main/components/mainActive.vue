<template>
  <div class="main-active">
    <div class="main-active-content">
      <main-header :leftTitle="leftTitle" :toWhere="toWhere"></main-header>
      <div class="active-swpier-content">
        <div class="swiper-container swiper-container1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="active in activeList" @click="goToDetail(active)">
              <div class="activity-swpier-content">
                <!--<img class="activity-bg" :src="active.thumbIcon">-->
                <img class="activity-bg" :src="active.thumbIcon"></img>
                <div class="cover-layer"></div>
                <div class="center-tips">
                  <div class="fitst-title-tips" v-text="active.actType" v-cloak>企业上市</div>
                  <div class="second-level-tips" v-text="active.actName" v-cloak>如何进行资本运作如何进行资本运作</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import MainHeader from './moreHeader.vue';
  export default{
    name: 'main-active',
    data() {
      return {
        toWhere: 'pobo:uncheck=1&pageId=900005&url=activity/index.html#/',
        leftTitle: '活动推广',
        zdySortCode: '',
        textContent: '第二期原油期货相关二',
        activeList: [],
        userId: pbE.isPoboApp ? (pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '0') : '0'
      }
    },
    mounted() {
      let params = {
        "func": "11106",
        "data": [{}]
      };
      //http://180.169.30.6:8080/poboactivityapp/1_0
      this.$axios.post('http://180.169.30.6:8080/poboactivityapp/1_0', params).then((response) => {
        let result = response.data.data;
        this.activeList.splice(0, this.activeList.length);
        result.map((item, index) => {
          item.thumbIcon = `http://180.169.30.6:8080/${item.thumbIcon}`;
          if (index < 6) {
            this.activeList.push(item);
          }
        });
        console.log('activeList', this.activeList);

      }).catch((res) => {
        console.log(res);
      });
    },
    components: {
      MainHeader
    },
    watch: {
      activeList(val, oldVal) {
        if (val.length >= 1) {
          setTimeout(() => {
            let swiper4 = new Swiper('.swiper-container1', {
              slidesPerView: 'auto',
              observer: true,
              observeParents: true,
              initialSlide: 0,
              freeMode: true //加速滑动(更加流畅)
//          onSlideChangeEnd: function (swiper) {
//            swiper.update();
//          }
            });
          }, 50);

        }
      }
    },
    methods: {
//      goToMore() {
//        window.location.href = 'pobo:uncheck=1&pageId=900005&url=activity/index.html#/';
//      },
      goToDetail(item) {
//          console.log(`pobo:uncheck=1&pageId=900005&url=activity/index.html#/activityDetail?userId=${this.userId}&currentId=${item.actId}`);
        window.location.href = `pobo:uncheck=1&pageId=900005&url=activity/index.html#/activityDetail?currentId=${item.actId}`;
      }
    }
  }
</script>
