<template>
  <div class="main-active">
    <div class="main-active-content">
      <div class="main-active-header">
        <div class="active-header-left">活动推广</div>
        <div class="active-header-right" @click="goToMore">更多</div>
      </div>
      <div class="active-swpier-content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="activity-swpier-content">
                <div class="activity-bg" style="background-image: url(../images/activepeitu1.png)"></div>
                <div class="cover-layer"></div>
                <div class="center-tips">
                  <div class="fitst-title-tips">企业上市</div>
                  <div class="second-level-tips">如何进行资本运作如何进行资本运作</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="activity-swpier-content">
                <div class="activity-bg" style="background-image: url(../images/activepeitu2.png)"></div>
                <div class="cover-layer"></div>
                <div class="center-tips">
                  <div class="fitst-title-tips">企业上市</div>
                  <div class="second-level-tips">如何进行资本运作</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="activity-swpier-content">
                <div class="activity-bg bg-blur" style="background-image: url(../images/activepeitu3.png)"></div>
                <div class="cover-layer"></div>
                <div class="center-tips">
                  <div class="fitst-title-tips">企业上市</div>
                  <div class="second-level-tips">如何进行资本运作</div>
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
  export default{
    name: 'main-active',
    data() {
      return {
        textContent: '第二期原油期货相关二'
      }
    },
    mounted() {
      let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true
//        spaceBetween: 30,
//        freeMode: true
      });
    },
    methods: {
      goToMore() {
        window.location.href = '';
      }
    }
  }
</script>
