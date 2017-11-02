<template>
  <div class="pb-zy-lunbo">
    <div class="fzj-zy-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户经理展业</span>
      </common-nav>
      <div class="bg-qx-blue"></div>
      <div class="lunbo-wrapper-content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-item-div">1</div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div">2</div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div">3</div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div">4</div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div">5</div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div">6</div>
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
    data() {
      return {
        gobackUrl: 'goBack'
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        pagination: '.swiper-pagination',
        paginationClickable: false,
        onProgress: function (swiper) {
          for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var progress = slide.progress;
            Swiper.scale = 1 - Math.min(Math.abs(progress * 0.2), 1);

            Swiper.es = slide.style;
            Swiper.es.opacity = 1;
            Swiper.es.webkitTransform = Swiper.es.MsTransform = Swiper.es.msTransform = Swiper.es.MozTransform = Swiper.es.OTransform = Swiper.es.transform = 'translate3d(0px,0,' + (-Math.abs(progress * 100)) + 'px)';

          }
        },

        onSetTransition: function (swiper, speed) {
          for (var i = 0; i < swiper.slides.length; i++) {
            Swiper.es = swiper.slides[i].style;
            Swiper.es.webkitTransitionDuration = Swiper.es.MsTransitionDuration = Swiper.es.msTransitionDuration = Swiper.es.MozTransitionDuration = Swiper.es.OTransitionDuration = Swiper.es.transitionDuration = speed + 'ms';
          }

        }
      });
    }
  }
</script>
