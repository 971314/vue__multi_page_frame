<template>
  <div class="pobo-main-index">
    <div class="fzj-zy-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body" v-text="MainText"></span>
      </common-nav>
      <div class="bg-qx-blue"></div>
      <div class="lunbo-wrapper-content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-item-div" @click="goToDepart">
                <div class="text-content-wrapper">
                  <div class="text-content-header">
                    <div class="content-header-left">
                      <img class="content-header-icon" src="../../images/leaderApply/qimoquanyi@2x.png"/>
                      <span class="content-header-text">
                          期末权益
                        </span>
                    </div>
                    <div class="content-header-right">
                      截至 {{$$timeFormate({date: leaderInfo.EQUITYUPTIME, format: 'Y-M-D'})}}
                    </div>
                  </div>
                  <div class="text-content-center">
                      <span class="content-center-title">
                        最新权益(万)
                      </span>
                    <span class="content-center-body"
                          v-text="$$comma((leaderInfo.ENDEQUITY / 10000).toFixed(2))"></span>
                  </div>
                  <div class="text-content-footer">
                    <div class="content-footer-left">
                        <span class="footer-left-title">
                          同比
                        </span>
                      <span class="footer-left-text"
                            v-text="leaderInfo.YOY != '-' ? `${(leaderInfo.YOY * 100).toFixed(2)}%` : leaderInfo.YOY"></span>
                    </div>
                    <div class="content-footer-right">
                        <span class="footer-right-title">
                          环比
                        </span>
                      <span class="footer-right-text"
                            v-text="leaderInfo.MOM != '-' ? `${(leaderInfo.MOM * 100).toFixed(2)}%` : leaderInfo.MOM"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div" @click="goToDepart">
                <div class="text-content-wrapper">
                  <div class="text-content-header">
                    <div class="content-header-left">
                      <img class="content-header-icon" src="../../images/leaderApply/shichangfene@2x.png"/>
                      <span class="content-header-text">
                          市场份额
                        </span>
                    </div>
                    <div class="content-header-right">
                      统计 {{$$timeFormate({date: leaderInfo.SHAREUPTIME, format: 'Y-M'})}}
                    </div>
                  </div>
                  <div class="text-content-center">
                      <span class="content-center-title">
                        综合市场份额
                      </span>
                    <!-- content-center-color2 颜色 -->
                    <span class="content-center-body" v-text="leaderInfo.MARKETSHARE"></span>
                  </div>
                  <div class="text-content-footer">
                    <div class="content-footer-left">
                        <span class="footer-left-title">
                          成交额市场份额
                        </span>
                      <!-- footer-left-color2 颜色 -->
                      <span class="footer-left-text" v-text="leaderInfo.CLOSINGSHARE"></span>
                    </div>
                    <div class="content-footer-right">
                        <span class="footer-right-title">
                          成交量市场份额
                        </span>
                      <!-- footer-right-color3 颜色 -->
                      <span class="footer-right-text" v-text="leaderInfo.VOLUMESHARE"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div" @click="goToDepart">
                <div class="text-content-wrapper">
                  <div class="text-content-header">
                    <div class="content-header-left">
                      <img class="content-header-icon" src="../../images/leaderApply/jiaoyiqingkuang@2x.png"/>
                      <span class="content-header-text">
                          交易情况
                        </span>
                    </div>
                    <div class="content-header-right">
                      统计 {{$$timeFormate({date: leaderInfo.VOLUMUPTIME, format: 'Y-M'})}}
                    </div>
                  </div>
                  <div class="text-jyqk-center">
                    <div class="jyqk-center-row">
                      <div class="center-row-item">
                          <span class="row-item-title">
                            本月成交量(手)
                          </span>
                        <span class="row-item-text"
                              v-text="leaderInfo.VOLUM != '-' ? $$comma(leaderInfo.VOLUM) : leaderInfo.VOLUM"></span>
                      </div>
                      <div class="center-row-item">
                          <span class="row-item-title">
                            本月持仓量(手)
                          </span>
                        <span class="row-item-text"
                              v-text="leaderInfo.HOLD_CNT != '-' ? $$comma(leaderInfo.HOLD_CNT) : leaderInfo.HOLD_CNT"></span>
                      </div>
                    </div>
                    <div class="jyqk-center-row">
                      <div class="center-row-item">
                          <span class="row-item-title">
                            本月手续费(万)
                          </span>
                        <span class="row-item-text"
                              v-text="leaderInfo.COMMISSIONCHARGE != '-' ? $$comma((leaderInfo.COMMISSIONCHARGE / 10000).toFixed(2)) : leaderInfo.COMMISSIONCHARGE"></span>
                      </div>
                      <div class="center-row-item">
                          <span class="row-item-title">
                            本月留存手续费(万)
                          </span>
                        <span class="row-item-text"
                              v-text="leaderInfo.RETENTIONFEE != '-' ? $$comma((leaderInfo.RETENTIONFEE / 10000).toFixed(2)) : leaderInfo.RETENTIONFEE"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item-div" @click="goToDepart">
                <div class="text-content-wrapper">
                  <div class="text-content-header">
                    <div class="content-header-left">
                      <img class="content-header-icon" src="../../images/leaderApply/kehushuliang@2x.png"/>
                      <span class="content-header-text">
                          客户数量
                        </span>
                    </div>
                    <div class="content-header-right">
                      截至 {{$$timeFormate({date: leaderInfo.CUSTUPTIME, format: 'Y-M-D'})}}
                    </div>
                  </div>
                  <div class="text-content-center">
                      <span class="content-center-title">
                        当前有效客户
                      </span>
                    <span class="content-center-body"
                          v-text="leaderInfo.CUST_CNT || leaderInfo.CUST_CNT == 0 ? leaderInfo.CUST_CNT : '-' "></span>
                  </div>
                  <div class="text-content-footer">
                    <div class="content-footer-left">
                        <span class="footer-left-title">
                          本月新开客户
                        </span>
                      <span class="footer-left-text"
                            v-text="leaderInfo.CUST_ADD_M || leaderInfo.CUST_ADD_M == 0 ? leaderInfo.CUST_ADD_M : '-'"></span>
                    </div>
                    <div class="content-footer-center">
                        <span class="footer-left-title">
                          股指客户
                        </span>
                      <span class="footer-left-text"
                            v-text="leaderInfo.STOCKINDEXCUST || leaderInfo.STOCKINDEXCUST == 0 ? leaderInfo.STOCKINDEXCUST : '-'"></span>
                    </div>
                    <div class="content-footer-right">
                        <span class="footer-right-title">
                          期货期权客户
                        </span>
                      <span class="footer-right-text"
                            v-text="leaderInfo.FUTURESCUST || leaderInfo.FUTURESCUST == 0 ? leaderInfo.FUTURESCUST : '-'"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fzj-zy-content">
      <div class="fzj-func-content">
        <div class="func-content-first">
          <div class="func-content-item" @click="goToFuc('approTask')">
            <div class="content-item-left">
              <span class="item-left-title">
                审核管理
              </span>
              <span class="item-left-text">
                你的任务在这里
              </span>
            </div>
            <img class="item-right-img" src="../../images/leaderApply/shenheguanli@2x.png">
          </div>
          <div class="func-content-item" @click="goToFuc('performanceClassification')">
            <div class="content-item-left">
              <span class="item-left-title">
                业绩排行榜
              </span>
              <span class="item-left-text">
                业绩战报及时看
              </span>
            </div>
            <img class="item-right-img" src="../../images/leaderApply/yejipaihangbangdabn@2x.png">
          </div>
        </div>
        <div class="func-content-second">
          <div class="func-content-item" @click="goToFuc('staffInfo')">
            <div class="content-item-left">
              <span class="item-left-title">
                员工资料
              </span>
              <span class="item-left-text">
                查一查 就知道
              </span>
            </div>
            <img class="item-right-img" src="../../images/leaderApply/yuangongziliao@2x.png">
          </div>
          <div class="func-content-item" @click="goToFuc('businessDpt')">
            <div class="content-item-left">
              <span class="item-left-title">
                营业部资料
              </span>
              <span class="item-left-text">
                部门业绩全掌握
              </span>
            </div>
            <img class="item-right-img" src="../../images/leaderApply/yingyebuziliao@2x.png">
          </div>
        </div>
      </div>
      <!--<div class="fzj-gsgg-content">-->
      <!--<more-header leftTitle="公司公告" toWhere="#"></more-header>-->
      <!--<div class="gsgg-content-body">-->
      <!--<div class="content-body-item">-->
      <!--<div class="body-item-left">-->
      <!--节后首周回血计划已准备好！-->
      <!--</div>-->
      <!--<div class="body-item-right">-->
      <!--10-23-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="content-body-item">-->
      <!--<div class="body-item-left">-->
      <!--节后首周回血计划已准备好！请查阅已备好的方案。-->
      <!--</div>-->
      <!--<div class="body-item-right">-->
      <!--10-23-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="content-body-item">-->
      <!--<div class="body-item-left">-->
      <!--节后首周回血计划已阅已阅！-->
      <!--</div>-->
      <!--<div class="body-item-right">-->
      <!--10-23-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  export default{
    data() {
      return {
        MainText: '',
        gobackUrl: 'goBack',
        leaderInfo: {
          CLOSINGSHARE: '',
          COMMISSIONCHARGE: '',
          CUSTUPTIME: '',
          ENDEQUITY: '',
          EQUITYUPTIME: "",
          HOLD_CNT: '',
          MARKETSHARE: '',
          MOM: '',
          RETENTIONFEE: '',
          SHAREUPTIME: "",
          VOLUM: '',
          VOLUMESHARE: '',
          VOLUMUPTIME: "",
          YOY: '',
          STOCKINDEXCUST: '',
          FUTURESCUST: ''
        }
      }
    },
    activated() {
      this.$store.dispatch('updataDepartId', this.info.departId)
      this.$store.dispatch('updataDepartName', this.info.departName)
      this.MainText = this.info.departName
      let vm = this
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
//        loop: true, //无缝滚动
        pagination: '.swiper-pagination',
        paginationClickable: false,
        onProgress: function (swiper) {
          for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var progress = slide.progress;
            Swiper.scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            Swiper.es = slide.style;
            Swiper.es.opacity = 1;
            Swiper.es.webkitTransform = Swiper.es.MsTransform = Swiper.es.msTransform = Swiper.es.MozTransform = Swiper.es.OTransform = Swiper.es.transform = 'translate3d(0px,0,' + (-Math.abs(progress * 200)) + 'px)';
//            vm.$forceUpdate()
          }
        },

        onSetTransition: function (swiper, speed) {
          for (var i = 0; i < swiper.slides.length; i++) {
            Swiper.es = swiper.slides[i].style;
            Swiper.es.webkitTransitionDuration = Swiper.es.MsTransitionDuration = Swiper.es.msTransitionDuration = Swiper.es.MozTransitionDuration = Swiper.es.OTransitionDuration = Swiper.es.transitionDuration = speed + 'ms';
          }
//          vm.$forceUpdate()
        }
      })
      this.getLeaderHomeInfo()
    },
    methods: {
      goToDepart() { //营业部资料主页
        if (this.info.departId == '0000000') {
          return
        }
        this.$router.push({
          name: 'departmentDetail'
        })
      },
      goToFuc(str) {  //功能区跳转
        if(str=="businessDpt"){
          this.$store.dispatch('updataDepartPageReturn', '');
        }else if(str=="staffInfo"){
          this.$store.dispatch('updataDepartPageReturn', 1);
          str = "businessDpt";
        }
        this.$router.push({
          name: str
        })
      },
      getLeaderHomeInfo() { //获取领导版入口概览
        this.$$axios({
          restUrl: 'leaderHomeInfo',
          join: [this.info.userId],
          loading: true
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              return
            }
            this.leaderInfo = response[0]
            console.log(response)
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  }
</script>
