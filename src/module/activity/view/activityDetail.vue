<template>
  <div class="pb-activity-detail">
    <common-nav id="navbarContent1" :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl" class="pb-jgdx">
      <a slot="footer" class="share-b-link" @click="changeFont">
        <img class="font-btn-icon" src="../images/fontchange@2x.png"/>
      </a>
      <a slot="footer" class="share-a-link" @click="sharePage">
        <img class="share-btn-icon" src="../images/sharedefault@2x.png"/>
      </a>
    </common-nav>

    <div class="activity-detail-text">
      <div class="detail-title" :class="{'big-title-font': fontInfo.font1 == '25px'}" v-text="activeDetail.actName"
           :style="{fontSize: fontInfo.font1}">
      </div>
      <div class="detail-tips">
        <div class="detail-time">
          <span v-if="timeContent" class="detail-time-context" :style="{fontSize: fontInfo.font2}"
                v-text="timeContent"></span>
          <span v-else class="detail-time-context" :style="{fontSize: fontInfo.font2}"
                v-text="activeDetail.beginTime && activeDetail.endTime ? `${activeDetail.beginTime} - ${activeDetail.endTime}` : ''"></span>
        </div>
        <div v-if="activeDetail.region" class="detail-location">
          <span v-show="activeDetail.actId" class="detail-location-context"
                :style="{fontSize: fontInfo.font2}"
                v-cloak>{{`${activeDetail.region} ${activeDetail.address} `}}<span @click="gotoMap"
                                                                                   class="blue-color-text">[查看地图]</span></span>
        </div>
        <div v-else class="detail-online">
          <span v-show="activeDetail.actId" class="detail-location-context"
                :style="{fontSize: fontInfo.font2}"
                v-cloak>线上</span>
        </div>
        <div class="detail-people">
          <span class="detail-people-context" :style="{fontSize: fontInfo.font2}"
                v-text="`${activeDetail.scale}`"></span>
        </div>
      </div>
      <div v-show="activeDetail.actId" class="detail-split-line"></div>
      <div v-show="activeDetail.actId" class="detail-img-content">
        <img class="detail-chatu" :src="activeDetail.imgPath"/>
      </div>
      <div class="detail-main-content">
        <div v-show="activeDetail.actId" class="main-content-title" :style="{fontSize: fontInfo.font3}">活动介绍:</div>
        <div class="main-content-content"
             :class="{'big-content-font': fontInfo.font1 == '25px','moren-content-font': fontInfo.font1 == '21px','little-content-font': fontInfo.font1 == '18px'}"
             :style="{fontSize: fontInfo.font4}" v-html="activeDetail.content">

        </div>
      </div>
      <div v-if="showbmTips" class="right-center-tips"></div>
    </div>
    <div v-if="this.currentAct && (this.remainDay/1) >=0" class="baoming-btn" @click="toSignUp">
      <div class="detail-btn-group">
        <div :class="{'wy-baoming': activeDetail.enrollNumber == 0}" class="baoming-btn1">我要报名</div>
        <div v-if="activeDetail.enrollNumber > 0" class="baoming-btn2" v-text="`已报名${activeDetail.enrollNumber}名`">已报名56名</div>
      </div>
    </div>
    <div v-else-if="this.currentAct && (this.remainDay/1) < 0" class="baoming-btn">
      <div class="detail-btn-group no-padding-top">
        <div class="baoming-btn1 game-over">报名已结束</div>
      </div>
    </div>
    <div v-else class="baoming-btn">
      <div class="detail-btn-group no-padding-top">
        <div class="baoming-btn1 game-over">活动已结束</div>
      </div>
    </div>

    <!--放大代码 -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>

      </div>

    </div>
    <!-- -->

    <multi-slide v-model="showEvent">
      <div class="font-change">
        <div class="font-selected-group">
          <div class="font-selected-item" v-for="(font, index) in fontList"
               :class="{'font-active': index === fontActiveIndex}" @click="fontSelected(index, font.font)">
            {{font.name}}
            <div v-show="index === fontActiveIndex" class="gougou"></div>
          </div>
        </div>
        <div class="selected-cancel" @click="cancelSelected">取消</div>
      </div>
    </multi-slide>
    <multi-slide v-model="showEvent1">
      <div class="wx-share">
        <div class="share-header-group">
          <div class="share-header">分享至</div>
          <div class="wx-icon-group">
            <a class="to-wx-icon">
              <!--<img class="wx-icon" src="../images/wx@2x.png"/>-->
              <span class="wx-content">微信</span>
            </a>
            <a class="to-pyq-icon">
              <!--<img class="pyq-icon" src="../images/pyq@2x.png"/>-->
              <span class="pyq-content">朋友圈</span>
            </a>
          </div>
        </div>
        <div class="selected-cancel" @click="cancelSelected1">取消</div>
      </div>
    </multi-slide>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data() {
      return {
        t_flag_ready: false,
        t_flag: false,
        t_timer1: null,
        t_timer2: null,
        t_timer3: null,
        imgListLength: 0,
        timeContent: '',
        isLogin: false,
        showbmTips: false,
        showEvent1: false,
        showEvent: false,
        gobackUrl: 'goBack',
        fontActiveIndex: 1, //字体标志位
        fontInfo: {
          font1: '21px', //title
          font2: '14px',  //详细信息
          font3: '17px',  //小标题
          font4: '17px'  //正文内容
        },
        fontList: [
          {
            name: '小字体',
            font: {
              font1: '18px', //title
              font2: '13px',  //详细信息
              font3: '15px',  //小标题
              font4: '15px'  //正文内容
            }
          },
          {
            name: '默认',
            font: {
              font1: '21px', //title
              font2: '14px',  //详细信息
              font3: '17px',  //小标题
              font4: '17px'  //正文内容
            }
          },
          {
            name: '大字体',
            font: {
              font1: '25px', //title
              font2: '15px',  //详细信息
              font3: '19px',  //小标题
              font4: '19px'  //正文内容
            }
          }
        ],
        activeDetail: {
          actId: ``,  //活动ID
          actName: ``,  //活动名称
          beginTime: ``, //开始时间
          endTime: ``,  //结束时间
          address: ``,  //地址
          region: ``, //区域
          scale: ``,   //规模
          imgPath: ``,  //图片
          content: ``,  //正文
          isEnroll: false,  //是否已报名
          enrollNumber: ``  //已报名人数
        }
      }
    },
    computed: {
      ...mapState([
        'currentId',
        'activeInfo',
        'currentAct',
        'remainDay'
      ])
    },
    mounted() {
      let Content = '';
      let ImgList_All = '';
      let t_length = -1;
      let t_count = 0;
      let t_count1 = 0;
      let t_count2 = 0;
      let image_ready_count = 0;
      this.t_timer1 = setInterval(() => {
        t_count += 50;
        Content = document.getElementsByClassName('main-content-content')[0];
        ImgList_All = Content.getElementsByTagName('img');
        t_length = ImgList_All.length > 0 ? ImgList_All.length : t_length;
        if (ImgList_All.length > 0 && t_length == ImgList_All.length) {
          this.t_flag = true;
          t_count = 0;
          clearInterval(this.t_timer1);
        }
        if (t_count >= 5000 && t_length == ImgList_All.length || t_count >= 5000 && t_length == -1) {
          t_count = 0;
          clearInterval(this.t_timer1);
        }
      }, 50);
      this.t_timer3 = setInterval(() => {
        t_count2 += 50;
        if (this.t_flag) {
          let contentList = document.getElementsByClassName('main-content-content')[0];
          let contentImgList = contentList.getElementsByTagName('img');
//          let currentWidth = this.$getViewPortWidth() - 40;
          for (let i = 0; i < contentImgList.length; i++) {
            if (contentImgList[i].height > 0) {
                //让图片宽高比例缩放
//              var imgScale = contentImgList[i].getAttribute('width') / currentWidth;
//              contentImgList[i].height = contentImgList[i].height / imgScale;
              image_ready_count += 1;
            }
          }
          if (image_ready_count < contentImgList.length) {
            image_ready_count = 0;
          } else {
            t_count2 = 0;
            this.t_flag_ready = true;
            clearInterval(this.t_timer3);
          }
        }
        if (t_count2 >= 5000 && !this.t_flag_ready) {
          t_count2 = 0;
          clearInterval(this.t_timer3);
        }
      }, 50);
      this.t_timer2 = setInterval(() => {
        t_count1 += 50;
        if (this.t_flag_ready) {
          t_count1 = 0;
          let MainContent = document.getElementsByClassName('main-content-content')[0];
          let ImgList = MainContent.getElementsByTagName('img');
          for (let k = 0; k < ImgList.length; k++) {
            let tempParent = ImgList[k].parentNode;
            tempParent.setAttribute('class', 'po-figure');
            tempParent.style.margin = '0';
            let TempimgW = ImgList[k].offsetWidth;
            let TempimgH = ImgList[k].offsetHeight;
            let TemplinkEl = document.createElement('a');
            TemplinkEl.setAttribute('data-size', `${TempimgW}x${TempimgH}`);
            TemplinkEl.setAttribute('href', ImgList[k].getAttribute('src'));
            TemplinkEl.appendChild(ImgList[k]);
//              tempParent.innerHTML = TemplinkEl;
            tempParent.appendChild(TemplinkEl);
          }

          var initPhotoSwipeFromDOM = function (gallerySelector) {

            // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
            // (children of gallerySelector)
            var parseThumbnailElements = function (el) {
              var thumbElements = el.getElementsByClassName('po-figure'),
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
              for (var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // 仅包括元素节点
                if (figureEl.nodeType !== 1) {
                  continue;
                }
                linkEl = figureEl.getElementsByTagName('a')[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // 创建幻灯片对象
                item = {
                  src: linkEl.getAttribute('href'),
                  w: parseInt(size[0], 10),
                  h: parseInt(size[1], 10)
                };


                if (figureEl.children.length > 2) {
                  // <figcaption> content
                  item.title = '';
                }

                if (linkEl.children.length > 0) {
                  // <img> 缩略图节点, 检索缩略图网址
                  item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
                items.push(item);
              }

              return items;
            };

            // 查找最近的父节点
            var closest = function closest(el, fn) {
              return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            // 当用户点击缩略图触发
            var onThumbnailsClick = function (e) {
              e = e || window.event;
              e.preventDefault ? e.preventDefault() : e.returnValue = false;

              var eTarget = e.target || e.srcElement;

              // find root element of slide
              var clickedListItem = closest(eTarget, function (el) {
                return (el.className && el.className.toUpperCase() === 'PO-FIGURE');
              });


              if (!clickedListItem) {
                return;
              }

              var clickedGallery = document.querySelector('.main-content-content');
              var childNodes = clickedGallery.getElementsByClassName('po-figure');
              var numChildNodes = childNodes.length;
              var nodeIndex = 0;
              var index;

              for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                  continue;
                }

                if (childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
                }
                nodeIndex++;
              }


              if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
              }
              return false;
            };

            var photoswipeParseHash = function () {
              var hash = window.location.hash.substring(1),
                params = {};

              if (hash.length < 5) {
                return params;
              }

              var vars = hash.split('&');
              for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                  continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                  continue;
                }
                params[pair[0]] = pair[1];
              }

              if (params.gid) {
                params.gid = parseInt(params.gid, 10);
              }

              return params;
            };

            var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
              var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

              items = parseThumbnailElements(galleryElement);

              // 这里可以定义参数
              options = {
                barsSize: {
                  top: 100,
                  bottom: 100
                },
                maxSpreadZoom: 3, //放大倍数
                fullscreenEl: false, // 是否支持全屏按钮
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                  // See Options -> getThumbBoundsFn section of documentation for more info
                  var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                  return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                }

              };

              if (fromURL) {
                if (options.galleryPIDs) {
                  for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                      options.index = j;
                      break;
                    }
                  }
                } else {
                  options.index = parseInt(index, 10) - 1;
                }
              } else {
                options.index = parseInt(index, 10);
              }

              if (isNaN(options.index)) {
                return;
              }

              if (disableAnimation) {
                options.showAnimationDuration = 0;
              }

              gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
              gallery.init();
            };

            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i < l; i++) {
              galleryElements[i].setAttribute('data-pswp-uid', i + 1);
              galleryElements[i].onclick = onThumbnailsClick;
            }

            var hashData = photoswipeParseHash();
            if (hashData.pid && hashData.gid) {
              openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
            }
          };

          initPhotoSwipeFromDOM('.main-content-content');
          document.getElementsByClassName('pswp__button pswp__button--share')[0].style.display = 'none'; //关闭分享按钮
          clearInterval(this.t_timer2);
        }

        if (t_count1 >= 5000) {
          t_count1 = 0;
          clearInterval(this.t_timer2);
        }
      }, 50)

      document.getElementById('navbarContent').style.display = 'none';
      document.querySelector('html').style.background = '#ffffff';
      document.querySelector('body').style.background = '#ffffff';
      this.getActiveDetail();
    },
    methods: {
      gotoMap() {
        if (!this.currentId && this.currentId != '0') {
          if (!this.$route.query.currentId && this.$route.query.currentId != '0') {

          } else {
            return;
          }
        }
        this.$router.push({
          name: 'baiduMap',
          params: {
            region: this.activeDetail['region'],
            address: this.activeDetail['address']
          }
        })
      },
      getActiveDetail() {
        let params = {};
        if (this.$route.query.currentId) {
          this.$store.dispatch('updateCurrentId', this.$route.query.currentId);
          this.$store.dispatch('updateCurrentAct', true);
          params = {
            func: '11102',
            data: [{
              actId: this.$route.query.currentId,
              userId: this.userId
            }]
          }
        } else {
          params = {
            func: '11102',
            data: [{
              actId: this.currentId,
              userId: this.userId
            }]
          };
        }
        this.$post({restUrl: 'queryActiveDetail', params: params, loading: true})
          .then((response) => {
            let ActiveDetail = response.data.data[0];
            this.activeDetail['actId'] = ActiveDetail['actId'];
            this.activeDetail['actName'] = ActiveDetail['actName'];
            this.activeDetail['beginTime'] = ActiveDetail['beginTime'].split(' ')[0].split('-')[1] + '/' + ActiveDetail['beginTime'].split(' ')[0].split('-')[2] + ' ' + ActiveDetail['beginTime'].split(' ')[1].split(':')[0] + ':' + ActiveDetail['beginTime'].split(' ')[1].split(':')[1];
            this.activeDetail['endTime'] = ActiveDetail['endTime'].split(' ')[0].split('-')[1] + '/' + ActiveDetail['endTime'].split(' ')[0].split('-')[2] + ' ' + ActiveDetail['endTime'].split(' ')[1].split(':')[0] + ':' + ActiveDetail['endTime'].split(' ')[1].split(':')[1];

            if (ActiveDetail['beginTime'].split(' ')[0] == ActiveDetail['endTime'].split(' ')[0]) {
              this.timeContent = `${ActiveDetail['beginTime'].split(' ')[0].split('-')[1]}/${ActiveDetail['beginTime'].split(' ')[0].split('-')[2]} ${ActiveDetail['beginTime'].split(' ')[1].split(':')[0]}:${ActiveDetail['beginTime'].split(' ')[1].split(':')[1]} - ${ActiveDetail['endTime'].split(' ')[1].split(':')[0]}:${ActiveDetail['endTime'].split(' ')[1].split(':')[1]}`;
            }

//            this.activeDetail['beginTime'] = this.$$timeFormate({date: ActiveDetail['beginTime'], format: 'M/D h:m'});
//            this.activeDetail['endTime'] = this.$$timeFormate({date: ActiveDetail['endTime'], format: 'M/D h:m'});
            this.activeDetail['address'] = ActiveDetail['address'];
            this.activeDetail['region'] = ActiveDetail['region'];
            this.activeDetail['scale'] = ActiveDetail['scale'];
            this.activeDetail['imgPath'] = `${PBHttpServer.activity.serverUrl}${ActiveDetail['imgPath']}`;
//            this.activeDetail['imgPath'] = `http://192.168.6.52:8890/${ActiveDetail['imgPath']}`;
            this.activeDetail['content'] = ActiveDetail['content'];
            this.activeDetail['isEnroll'] = ActiveDetail['isEnroll'] == '0' ? false : true;
            if (this.activeDetail['isEnroll'] && this.currentAct) {
              this.showbmTips = true;
            }
            this.activeDetail['enrollNumber'] = ActiveDetail['enrollNumber'] == '0' ? '0' : ActiveDetail['enrollNumber'];

            this.activeInfo['actId'] = ActiveDetail['actId'];
            this.activeInfo['actName'] = ActiveDetail['actName'];
            this.activeInfo['beginTime'] = ActiveDetail['beginTime'].split(' ')[0].split('-')[1] + '/' + ActiveDetail['beginTime'].split(' ')[0].split('-')[2] + ' ' + ActiveDetail['beginTime'].split(' ')[1].split(':')[0] + ':' + ActiveDetail['beginTime'].split(' ')[1].split(':')[1];
            this.activeInfo['endTime'] = ActiveDetail['endTime'].split(' ')[0].split('-')[1] + '/' + ActiveDetail['endTime'].split(' ')[0].split('-')[2] + ' ' + ActiveDetail['endTime'].split(' ')[1].split(':')[0] + ':' + ActiveDetail['endTime'].split(' ')[1].split(':')[1];
//            this.activeInfo['beginTime'] = this.$$timeFormate({date: ActiveDetail['beginTime'], format: 'M/D h:m'});
//            this.activeInfo['endTime'] = this.$$timeFormate({date: ActiveDetail['endTime'], format: 'M/D h:m'});
            this.activeInfo['address'] = ActiveDetail['address'];
            this.activeInfo['actId'] = ActiveDetail['actId'];
            this.activeInfo['region'] = ActiveDetail['region'];
            this.activeInfo['scale'] = ActiveDetail['scale'];
            this.activeInfo['imgPath'] = `${PBHttpServer.activity.serverUrl}${ActiveDetail['imgPath']}`;
//            this.activeInfo['imgPath'] = `http://192.168.6.52:8890/${ActiveDetail['imgPath']}`;

            this.$store.dispatch('updateActiveInfo', this.activeInfo);
          })
          .catch((res) => {
            console.log(res);
          });
      },
      cancelSelected1() {
        this.showEvent1 = false;
      },
      cancelSelected() {
        this.showEvent = false;
      },
      sharePage() { //分享
//        if (this.showEvent) {
//          this.showEvent = false
//        }
//        this.showEvent1 = !this.showEvent1;
        let url = this.$encodeURI(`${PBHttpServer.activity.shareUrl}?actId=${this.currentId}&userId=${this.userId}`);
        window.location.href = `pobo:uncheck=1&pageId=800012&type=0&title=${this.activeDetail.actName}&url=${url}`;
      },
      changeFont() {
        if (this.showEvent1) {
          this.showEvent1 = false
        }
        this.showEvent = true;
      },
      fontSelected(index, font) {
        this.fontActiveIndex = index;
        this.fontInfo['font1'] = font['font1'];
        this.fontInfo['font2'] = font['font2'];
        this.fontInfo['font3'] = font['font3'];
        this.fontInfo['font4'] = font['font4'];
        this.showEvent = false;
      },
      toSignUp() {
        let token = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : "1";
//        window.location.href = 'pobo:uncheck=0&pageId=905002&url=reg/view/reg-one.html';
        if (!token || token == '') {
          window.location.href = 'pobo:uncheck=0';
        } else {
          this.$router.push({name: 'signUp'});
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.t_timer1) {
        clearInterval(this.t_timer1);
      }
      if (this.t_timer2) {
        clearInterval(this.t_timer2);
      }
      if (this.t_timer3) {
        clearInterval(this.t_timer3);
      }
      next();
    }
  }
</script>
