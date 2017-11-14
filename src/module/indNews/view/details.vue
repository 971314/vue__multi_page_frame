<template>
  <div class="details">
    <common-nav :goback="false">
      <div slot="footer" class="navFooter">
        <i @click="changeFont"></i>
        <i @click="shareClick"></i>
      </div>
    </common-nav>
    <div class="content" :style="{paddingBottom:this.$route.query.type == 1?'20px':'70px'}">
      <div v-if="this.$route.query.newsId" class="title"
           :style="{fontSize: fontInfo.font1}" :class="{'big-title-font': fontInfo.font1 == '25px'}">
        {{particularsInfo.title | setTitle}}
      </div>
      <div v-else class="title" :style="{fontSize: fontInfo.font1,lineHeight:fontInfo.lineHeight1}"
           :class="{'big-title-font': fontInfo.font1 == '25px'}">
        {{particularsInfo.title}}
      </div>
      <div class="subTitle" :style="{fontSize: fontInfo.font2}">
        {{particularsInfo.time}} &nbsp;{{particularsInfo.source}}
      </div>
      <div class="mainBody" :style="{fontSize: fontInfo.font4}" v-html="newsConten(particularsInfo.content)"
           :class="{'big-content-font': fontInfo.font1 == '25px','moren-content-font': fontInfo.font1 == '21px','little-content-font': fontInfo.font1 == '18px'}"></div>
      <div v-show="particularsInfo.attachs">
        <a class="accessory" v-for="data in particularsInfo.attachs"
           :href="'pobo:uncheck=1&pageId=900004&scale=1&url='+ data.attachUrl">
          <!--:href="getDevice == 2?'pobo:uncheck=1&pageId=900004&url='+ data.attachUrl :data.attachUrl">-->
          <span>{{data.attachName}}</span>
          <span>({{data.attachSize | reviseFileSize}})</span>
        </a>
      </div>
      <div class="disclaimer" v-show="particularsInfo.disclaimer" :style="{fontSize: fontInfo.font2}">
        免责声明<br/>
        {{particularsInfo.disclaimer}}
      </div>
      <div class="disclaimer" v-show="this.$route.query.type == 1" :style="{fontSize: fontInfo.font2}">
        免责声明<br/>
        本文发布仅代表作者个人或公司观点，与本信息发布平台无关。文中陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完整性提供任何明示或暗示的保证。
      </div>
    </div>
    <div class="fonter" v-show="this.$route.query.type != 1">
      <div @click="lickClick">
        <span class="noLike"
              v-if="particularsInfo.isUpVote != 1">{{particularsInfo.upVote > 0 ? particularsInfo.upVote : '点赞'}}</span>
        <span class="like" v-else>{{particularsInfo.upVote > 0 ? particularsInfo.upVote : '点赞'}}</span>
      </div>
      <div @click="shareClick">
        <span class="colorShare">{{particularsInfo.share > 0 ? particularsInfo.share : '分享'}}</span>
      </div>
    </div>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isdetail: true,
        fontList: [
          {
            name: '小字体',
            font: {
              font1: '18px', //title
              font2: '13px',  //详细信息
              font3: '15px',  //小标题
              font4: '15px',  //正文内容
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
        fontActiveIndex: 1, //字体标志位
        showEvent: false,
        fontInfo: {
          font1: '21px', //title
          font2: '14px',  //详细信息
          font3: '17px',  //小标题
          font4: '17px'  //正文内容
        },
        particularsInfo: {
          title: '',
          time: '',
          source: '',
          content: ''
        }
      }
    },
    mounted: function () {
      this.setBodyBackground(1);
      this.particularsRequest();
      this.nativeInteraction();
    },
    activated() {
      this.nativeInteraction();
      this.particularsInfo = {
        title: '',
        time: '',
        source: '',
        content: ''
      };
      document.getElementsByTagName('body')[0].scrollTop = 0;
      this.setBodyBackground(1);
      this.particularsRequest();
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    watch: {
      'particularsInfo.content': (val) => {
        if (val.length > 0) {
          setTimeout(() => {
            let MainContent = document.getElementsByClassName('mainBody')[0];
            let ImgList = MainContent.getElementsByTagName('img');
            if (ImgList) {
              for (let k = 0; k < ImgList.length; k++) {
                let tempParent = ImgList[k].parentNode;
                if (tempParent.tagName.toUpperCase() != 'P') {
                  tempParent.style.width = '100%';
                  tempParent.style.fontSize = '0';
                  let TemplinkElP = document.createElement('p');
                  TemplinkElP.appendChild(ImgList[k]);
                  tempParent.appendChild(TemplinkElP);
                  tempParent = ImgList[k].parentNode;
                } else {
                  tempParent.style.width = '100%';
                  tempParent.style.fontSize = '0';
                }
                tempParent.setAttribute('class', 'po-figure');
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
                      item.title = figureEl.children[2].innerHTML;
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

                  var clickedGallery = document.querySelector('.mainBody');
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

              initPhotoSwipeFromDOM('.mainBody');
              document.getElementsByClassName('pswp__button pswp__button--share')[0].style.display = 'none'; //关闭分享按钮
            }
          }, 500);
        }
      }
    },
    methods: {
      changeFont() {
        if (this.showEvent1) {
          this.showEvent1 = false
        }
        this.showEvent = true;
      },
      cancelSelected() {
        this.showEvent = false;
      },
      fontSelected(index, font) {
        this.fontActiveIndex = index;
        this.fontInfo['font1'] = font['font1'];
        this.fontInfo['font2'] = font['font2'];
        this.fontInfo['font3'] = font['font3'];
        this.fontInfo['font4'] = font['font4'];
        this.showEvent = false;
      },
      particularsRequest() {
        let _this = this;
//        _this.$loading.toggle(' ');
        if (this.$route.query.type == 1 && this.$route.query.newsId) {
          _this.$axios.get(PBHttpServer.indNews.newsUrl + 'Hd_NewsContent.aspx', {
            params: {
              type: 'mu',
              doc: 'json',
              newsid: this.$route.query.newsId
            }
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data.News;
            console.log(data);
            _this.particularsInfo = {
              title: data.Title,
              time: this.$$timeFormate(data.Pubtime, "Y-M-D h:m"),
              source: data.Source,
              content: _this.nterceptioniStr(_this.setSpecialStr(data.Text))
//              content: _this.setSpecialStr(data.Text)
            }
          }).catch((error) => {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.log('网络错误');
          })
        } else if (this.$route.query.type == 2 && this.$route.query.info) {
          _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
            func: "10102",
            data: [{
              infoId: _this.$route.query.info,
              userId: _this.userId,
              token: _this.token
            }]
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data;
            console.log(data);
            if (data.retHead == 0) {
              _this.particularsInfo = {
                title: data.data[0].infoTitle,
                time: this.$$timeFormate(data.data[0].createTime, "Y-M-D h:m"),
                source: data.data[0].source,
                content: _this.setSpecialStr(data.data[0].content),
                attachs: data.data[0].attachs,
                isUpVote: data.data[0].isUpVote,
                upVote: data.data[0].upVote,
                infoId: data.data[0].infoId,
                share: data.data[0].share,
                disclaimer: data.data[0].disclaimer
              };
            } else {
              _this.showToast(data.desc);
            }
          }).catch(function (error) {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.error(error);
          });
        }
      },
      lickClick() {
        let _this = this;
        _this.token = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : "1";//token
        _this.userId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '1';//userId
        if (_this.token && _this.token != '') {
//        _this.$loading.toggle(' ');
          _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
            func: "10103",
            data: [{
              userId: _this.userId,
              token: _this.token,
              infoId: _this.particularsInfo.infoId + '',
              upVoteType: _this.particularsInfo.isUpVote == 1 ? 'N' : 'Y',
            }]
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data;
            console.log(data);
            if (data.retHead == 0) {
              if (_this.particularsInfo.isUpVote == 1) {
                _this.particularsInfo.isUpVote = 0
              } else {
                _this.particularsInfo.isUpVote = 1
              }
              _this.particularsInfo.upVote = data.data[0].upVote;
            } else {
              _this.showToast(data.desc);
            }
          }).catch((error) => {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.log(error, '网络超时，请稍后再试');
          })
        } else {
          location.href = 'pobo:uncheck=0'
        }

      },
      shareClick() {
        if(this.isShare){
          if (this.$route.query.type == 2 && this.$route.query.info) {
            location.href = 'pobo:uncheck=1&pageId=800012&title=' + this.particularsInfo.title + '&type=0&url=' + encodeURIComponent(PBHttpServer.indNews.shareUrl + 'type=' + this.$route.query.type + '&infoId=' + this.$route.query.info);
          } else if (this.$route.query.type == 1 && this.$route.query.newsId) {
            location.href = 'pobo:uncheck=1&pageId=800012&title=' + this.particularsInfo.title.substr(6) + '&type=0&url=' + encodeURIComponent(PBHttpServer.indNews.shareUrl + 'type=' + this.$route.query.type + '&newsId=' + this.$route.query.newsId);
          }
        }
      },
      nativeInteraction() {
        if (pbPage.getInitState()) {
          pbPage.addFunCallback(102001, this.shareFeedback);
        } else {
          pbPage.initPage({
            callbacks: [
              {fun: 102001, callback: this.shareFeedback}
            ]
          })
        }
      },
      shareFeedback(msg) {
        console.log(msg, msg.shareTap);
        let _this = this;
        if (msg && msg.shareTap >= 0) {
          _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
            func: "10104",
            data: [{
              userId: _this.userId ? _this.userId : '',
              token: _this.token ? _this.token : '',
              infoId: _this.particularsInfo.infoId + '',
              target: msg.shareTap + ''
            }]
          }).then((data) => {
            data = data.data;
            console.log(data);
            if (data.retHead == 0) {
              if (data.data[0]) {
                _this.particularsInfo.share = data.data[0].share;
              }
            } else {
              _this.showToast(data.desc);
            }
          }).catch((error) => {
            _this.showToast('网络超时，请稍后再试');
            console.log(error, '网络超时，请稍后再试');
          })
        }
      }
    }
  }
</script>
