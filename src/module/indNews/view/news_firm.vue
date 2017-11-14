<template>
  <div class="news_firm">
    <div class="noticeTab swiper-container">
      <div class="swiper-wrapper" v-if="types && types.length !=0">
          <span class="swiper-slide" v-for="item in types"
                :class="{'width5':types.length > 4,'width4':types.length == 4, ' background': activeIndex == item.infoTypeId}"
                @click="tabClick(item.infoTypeId)" :style="tabStyle">{{item.infoTypeName}}</span>
      </div>
    </div>
    <div class="noticeView" v-if="isShowNews" id="noticeView">
      <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle"
                    :upVote="data.upVote" :infoId="data.infoId"
                    :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                    :isTop="data.isTop"></notice-group>
      <div class="borderBottom"></div>
    </div>
    <div class="noData" v-else>
      <img src="../images/noData.png"/>
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper';

  export default {
    data: function () {
      return {
        activeIndex: '',
        divWidth: null,
        aWidth: null,
        types: [],
        info: [],
        isShowNews: true,
        currentPage: 1,
        scrollTop: 0,
        tabStyle: {},
        pagingFlag: true,
        isPreviewList: []
      }
    },
    mounted() {
      if (pbE.isPoboApp) {
        if (pbE.SYS().isHasLocalFile('indNews', 1)) {
          this.isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
        }
      }
      this.setBodyBackground();
      this.request();
      this.detectScroll('noticeView', this.nPaging);
    },
    activated() {
//      this.scrollTop = 0;
      if (pbE.isPoboApp) {
        if (pbE.SYS().isHasLocalFile('indNews', 1)) {
          this.isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
        }
      }
      console.log('this.info', this.info);
      this.info.map((item) => {
        this.isPreviewList.map((previewItem) => {
          if (previewItem.type == 2 && item.infoId == previewItem.infoId) {
            item['isClick'] = true;
          }
        });
      });
      this.$forceUpdate();
      this.setBodyBackground();
      if(document.getElementsByClassName('noticeView')[0]){
        document.getElementsByClassName('noticeView')[0].scrollTop = this.scrollTop;
      }
      /*if (this.activeIndex && this.activeIndex != '') {
       this.tabClick(this.activeIndex);
       }*/
    },
    beforeRouteLeave(to, from, next) {
      if (from.name == 'newsFirm') {
        if(document.getElementsByClassName('noticeView')[0]){
          this.scrollTop = document.getElementsByClassName('noticeView')[0].scrollTop;
        }
        next();
      }
    },
    watch: {
      types(val) {
        if (val.length > 0) {
          setTimeout(() => {
            let swiper4 = new Swiper('.swiper-container', {
              slidesPerView: 'auto',
              observer: true,
              observeParents: true,
              initialSlide: 0,
              freeMode: true //加速滑动(更加流畅)
            });
          }, 50);
        }
      }
    },
    methods: {
//      父子组件响应
      changeActiveIndex(index) {
        this.activeIndex = index;
      },
//      tab切换
      tabClick(flag) {
        this.pagingFlag = true;
        this.currentPage = 1;
        this.activeIndex = flag;
        this.info = [];
        this.requestList(flag);
      },
      //tab数据请求
      request() {
        let _this = this;
//        _this.$loading.toggle(' ');
        _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
          func: "10107",
          data: [{}]
        }, {timeout: 30000}).then((data) => {
//          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            _this.types = data.data;
            if (_this.types && _this.types.length < 4) {
              _this.tabStyle = {
                width: 100 / _this.types.length + '%'
              }
            }
            if (this.$route.query.infoId) {
              _this.tabClick(this.$route.query.infoId);
            } else {
              _this.tabClick(_this.types[0].infoTypeId);
            }
          } else {
            _this.showToast(data.desc);
          }
        }).catch(function (error) {
//          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.error(error);
        });
      },
      //列表数据请求
      requestList(flag) {
        let _this = this;
        _this.$loading.toggle(' ');
        _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
          func: "10101",
          data: [{
            infoType: flag,
            currentPage: _this.currentPage + '',//_this.currentPage + ''
            pageSize: "10"
          }]
        }, {timeout: 30000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data, data.data.length);
          if (data.retHead == 0) {
            if (data.data.length != 0) {
              _this.isShowNews = true;
              if (pbE.isPoboApp) {
                if (this.isPreviewList && this.isPreviewList.length > 0) {
                  data.data.map((item) => {
                    this.isPreviewList.map((previewItem) => {
                      if (previewItem.type == 2 && item.infoId == previewItem.infoId) {
                        item['isClick'] = true;
                      }
                    });
                  });
                }
              }
              _this.info = data.data;
            } else {
              _this.isShowNews = false;
            }
          } else {
            _this.isShowNews = false;
            _this.showToast(data.desc);
          }
        }).catch(function (error) {
          _this.$loading.hide();
          _this.isShowNews = false;
          _this.showToast('网络超时，请稍后再试');
          console.error(error);
        });
      },
      //滚动条事件
      nPaging() {
        if (this.$route.name == 'newsFirm') {
          if (this.calculatedcroll('noticeView')) {
            this.pagingRequest(this.activeIndex);
          }
        }

      },
      //分页
      pagingRequest(flag) {
        console.log(this.currentPage);
        let _this = this;
        if (_this.pagingFlag) {
          _this.currentPage += 1;
          _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
            func: "10101",
            data: [{
              infoType: flag,
              currentPage: _this.currentPage + '',
              pageSize: "10"

            }]
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data;
            console.log(data);
            if (data.retHead == 0) {
              if (data.data.length != 0) {
                for (let i = 0; i < data.data.length; i++) {
                  _this.info.push({
                    infoTitle: data.data[i].infoTitle,
                    upVote: data.data[i].upVote,
                    infoId: data.data[i].infoId,
                    thumb: data.data[i].thumb,
                    createTime: data.data[i].createTime,
                    isTop: data.data[i].isTop
                  });

                }

                if (pbE.isPoboApp) {
                  if (this.isPreviewList && this.isPreviewList.length > 0) {
                    _this.info.map((item) => {
                      this.isPreviewList.map((previewItem) => {
                        if (previewItem.type == 2 && item.infoId == previewItem.infoId) {
                          item['isClick'] = true;
                        }
                      });
                    });
                  }
                }
                if (data.data.length < 10) {
                  console.log(_this.currentPage);
                  _this.pagingFlag = false;
                }
              }
            } else {
              _this.showToast(data.desc);
            }
          }).catch(function (error) {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.error(error);
          });
        }
      }
    }
  }
</script>
