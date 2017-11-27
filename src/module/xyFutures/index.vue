<template>
  <div class="flexbody">
    <div class="xyFinance">
      <common-nav :goback="false" :gobackUrl="backUrl">
        <div slot="body">
          <span>兴业期货</span>
        </div>
      </common-nav>

      <div class="content">

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

        <div class="func">
          <a @click="openUrl('https://www.cifutures.com.cn/mobile/summary/index.html')">
            <img src="images/jj.png"/>
            <span>公司简介</span>
          </a>
          <a @click="openUrl('https://www.cifutures.com.cn/mobile/gsnotice/index.html')">
            <img src="images/gg.png"/>
            <span>公司公告</span>
          </a>
          <a @click="openUrl('https://www.cifutures.com.cn/mobile/dongtai/index.html')">
            <img src="images/yw.png"/>
            <span>今日要闻</span>
          </a>
        </div>


        <div class="info-header clearfix">
          <b>兴业研究</b>
          <a>
            <img class="more" src="./images/more.png" alt="更多"
                 @click="openUrl('https://www.cifutures.com.cn/mobile/yanjiu/index.html')"/>
          </a>
        </div>
        <div class="news">
          <a v-for="item in newsList" @click="openUrl(item.url)">
            <div class="list">
              <div class="type"><span>{{item.parentTitle}}</span></div>
              <div class="title">{{item.title}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </a>

        </div>
      </div>

      <div class="banner" v-show="!isPoboApp">
        <img src="images/banner2.png" @click="openApp()"/>
      </div>
    </div>
  </div>


</template>
<script>

  import Swiper from 'swiper';
  import {Pagination} from 'swiper'
  export default {
    data(){
      return {
        newsList: [],
        advDelay: 5000,
        advList: [],
        showDot: false,
        imgSet: {'height': '220px'},//图片设置
        swiperInstance: null,
        isPoboApp : pbE.isPoboApp,
        backUrl:pbE.isPoboApp?"goBack":"javascript:cibApp.goBackHomeApp()"
      }
    },
    components: {

    },
    mounted(){
      this.advList = window.xyFinanceConf.data;
      this.showDot = this.advList.length > 1;
      this.initPage();

      this.newsList = this.newsList.concat(window._caozuo.slice(0, 2));
      this.newsList = this.newsList.concat(window._day.slice(0, 2));
      this.newsList = this.newsList.concat(window._celue.slice(0, 2));
      this.newsList = this.newsList.concat(window._analysis.slice(0, 2));

    },
    methods: {
      openUrl(url){
        if (pbE.isPoboApp) {
          window.location.href = "pobo:pageId=900004&url=" + url;
        }
        this.itemClick(url);
      },
      itemClick(url){
        window.location.href = url;
      },
      openApp(){
          var cibApp={};
          cibApp.doOpenApp=({
            iOSScheme:"",
            AndroidPackageName:"com.xingyeqihuo.pbmobile",
            AndroidClassName:"com.pengbo.pbmobile.startup.PbStartupActivity",
            callbackName:this.downApp
          })
      },
      downApp(){
        if (this.versions().ios) {
          window.location.href = window.xyFinanceConf.iosUrl;
          console.log(true);
        }
        if (this.versions().android) {
          window.location.href = window.xyFinanceConf.androidUrl;
          console.log(true);
        }
      },
      getCode(){
        let tiem = document.getElementById("co1").value;
        alert(tiem)
      },
      initPage(){
        this.swiperInstance = new Swiper('.swiper-container3', {
          pagination: '.pagination3',
          slidesPerView: 1,
          autoplay: 5000,
          autoplayDisableOnInteraction: false,
          paginationClickable: true,
          observer: true,
          observeParents: true,
          effect: 'fade',
        });
      },
      versions() {
        let u = navigator.userAgent
        return {// 移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('Presto') > -1, // opera内核
          webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/iPhone|Android|iPad/), // 是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, // 是否iPad
          webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
        }
      }
    }
  }
</script>
