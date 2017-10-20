<template>
  <div class="swiper-container">
    <div class="notice swiper-pagination">
      <div class="noticeTab">
        <div style="height: 44px;overflow-x: auto;white-space: nowrap;" v-if="types && types.length !=0">
          <span v-for="item in types"
                :class="{'width5':types.length > 4,'width4':types.length == 4, ' background': activeIndex == item.infoTypeId}"
                @click="tabClick(item.infoTypeId)" :style="tabStyle">{{item.infoTypeName}}</span>
        </div>
      </div>
    </div>
    <div class="noticeView swiper-wrapper" v-if="isShowNews">
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info"  :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :class="{'isPreview': data.isClick}" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
      <div class="swiper-slide">
        <notice-group v-for="data in info" :class="{'isPreview': data.isClick}" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)"
                      :labels="data.labels"></notice-group>
      </div>
    </div>
    <div class="noData" v-else>
      <img src="../images/noData.png"/>
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper';
  import {Pagination} from 'swiper'

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
        isPreviewList: []
      }
    },
    created() {
      if (pbE.isPoboApp) {
        if (pbE.SYS().isHasLocalFile('indNews', 1)) {
          this.isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
        }
      }
      this.setBodyBackground();
      this.request();
      window.addEventListener('scroll', this.nPaging);
    },
    activated() {
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

      this.currentPage = 1;
      this.scrollTop = 0;
      this.setBodyBackground();
      document.getElementsByTagName('body')[0].scrollTop = this.scrollTop;
      if (this.activeIndex && this.activeIndex != '') {
        this.tabClick(this.activeIndex);
      }
    },
    beforeRouteLeave(to, from, next) {
      if (from.name == 'newsFirm1') {
        this.scrollTop = this.getScrollTop();
        next();
      }
    },
    watch: {
      'info'(val) {
        if (val.length > 0) {
          console.log('123');
          let aa = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            observer: true,
            observeParents: true,
            resistance: true,
            onSlideChangeEnd: function (swiper) {
              swiper.update();
            }
          });
        }
      }
    },
    methods: {
      changeActiveIndex(index) {
        this.activeIndex = index;
      },
      tabClick(flag) {
        this.currentPage = 1;
        this.activeIndex = flag;
        this.info = [];
        this.requestList(flag);
      },
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
            console.log(this.$route.query.infoId);
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
      requestList(flag) {
        let _this = this;
        _this.$loading.toggle(' ');
        _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
          func: "10101",
          data: [{
            infoType: flag,
            currentPage: _this.currentPage + '',
            pageSize: "20"

          }]
        }, {timeout: 30000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            if (data.data.length != 0) {
              _this.isShowNews = true;
              _this.info = data.data;
              _this.info.map((item) => {
                this.isPreviewList.map((previewItem) => {
                  if (previewItem.type == 2 && item.infoId == previewItem.infoId) {
                    item['isClick'] = true;
                  }
                });
              });
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
      nPaging() {
        if (this.$route.name == 'newsFirm1') {
          if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            console.log(this.getScrollTop(), this.getWindowHeight(), this.getScrollTop() + this.getWindowHeight());
            this.pagingRequest(this.activeIndex);
          }
        }

      },
      pagingRequest(flag) {
        let _this = this;
        _this.currentPage += 1;
        _this.$axios.post(PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0', {
          func: "10101",
          data: [{
            infoType: flag,
            currentPage: _this.currentPage + '',
            pageSize: "20"

          }]
        }, {timeout: 30000}).then((data) => {
//          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            if (data.data.length != 0) {
              _this.info.push(data.data);
              _this.info.map((item) => {
                this.isPreviewList.map((previewItem) => {
                  if (previewItem.type == 2 && item.infoId == previewItem.infoId) {
                    item['isClick'] = true;
                  }
                });
              });
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
</script>
