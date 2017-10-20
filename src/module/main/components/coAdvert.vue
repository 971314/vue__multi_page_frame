<template>
  <div class="adver" id="adver">
    <div class="swiper-container parent-wrap swiper-container3">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="adv in advList">
          <a :href="adv.url?adv.url:'javascript:void(0)'">
            <!--加上this.onerror=null  可以避免找不到图片进入死循环-->
            <img :src="adv.img" onerror="this.onerror=null;this.src='../images/default-adv.png'">
          </a>
        </div>
      </div>
      <div v-show="showDot" class="pagination pagination3 swiper-pagination"></div>
    </div>

   <!-- <swipe :interval="advDelay" :dots="advList.length > 1 ? true : false" :style="imgSet">
        <swipe-item v-for="adv in advList">
          &lt;!&ndash;<a :href="getUrl && getUrl(adv)">&ndash;&gt;
            &lt;!&ndash;&lt;!&ndash;加上this.onerror=null  可以避免找不到图片进入死循环&ndash;&gt;&ndash;&gt;
            &lt;!&ndash;<img :src="imgurl + adv.imageid +'.png'" onerror="this.onerror=null;this.src='../images/default-adv.png'">&ndash;&gt;
          &lt;!&ndash;</a>&ndash;&gt;
          <a :href="adv.url?adv.url:'javascript:void(0)'">
            &lt;!&ndash;加上this.onerror=null  可以避免找不到图片进入死循环&ndash;&gt;
            <img :src="adv.img" onerror="this.onerror=null;this.src='../images/default-adv.png'">
          </a>
        </swipe-item>
    </swipe>-->
  </div>
</template>
<script>
  import Swiper from 'swiper';
  import {Pagination} from 'swiper'
  export default {
    name: 'advert',
    props: {
      coInstance: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        advDelay: 5000,
        advList: [],
        showDot:false,
        imgSet: {'height':'220px'},//图片设置
        swiperInstance: null
      }
    },
    mounted() {
//      this.getAdvSet && this.getAdvSet();
      var _this = this;
      if (pbE.isPoboApp) {
        var mainlist = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json"));
        _this.advList = mainlist[_this.coInstance].data;
        _this.showDot = _this.advList.length >1;
        _this.initPage();
      }else{
        _this.$axios.get(this.confUrl + 'main.json').then(function(data){
          _this.advList = data.data[_this.coInstance].data;
          _this.showDot = _this.advList.length >1;
          _this.initPage();
        }).catch(function(err){
          _this.$axios.get("../"+ _this.pbconfUrl + 'main.json').then(function(data){
            _this.advList = data.data[_this.coInstance].data;
            _this.showDot = _this.advList.length >1;
            _this.initPage();
          });
        });
      }

    },
    methods: {
      initPage(){
        this.swiperInstance = new Swiper('.swiper-container3', {
          pagination: '.pagination3',
          slidesPerView: 1,
          autoplay: 5000,
          autoplayDisableOnInteraction : false,
          paginationClickable: true,
          observer: true,
          observeParents: true,
          effect : 'fade',
        });
      }
    }
  }


</script>
