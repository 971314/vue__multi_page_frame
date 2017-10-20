<template>
  <div class="news_dcd">
    <div class="newsTab2">
      <span @click="tabClick(1)" :class=" tabFlag == 1 ? 'background': ''">24小时</span>
      <span @click="tabClick(2)" :class=" tabFlag == 2 ? 'background': ''">国内国际</span>
      <span @click="tabClick(3)" :class=" tabFlag == 3 ? 'background': ''">商品期货</span>
      <span @click="tabClick(4)" :class=" tabFlag == 4 ? 'background': ''">金融期货</span>
    </div>
    <!--24 start-->
    <div class="hourTime" v-if="tabFlag == 1">
      <span>{{dateInfo | setDate}}</span>
      <!--<img src="../images/calendar@2x.png"/>
      <input type="date" id="data" @change="dataChange" v-model="dataValue"/>-->
    </div>
    <div class="timerShaft newsCat" v-if="tabFlag == 1" id="newsCat">
      <div class="zx-scroll-item" v-for="datas in newsList">
        <div class="timerShaftList" v-for="(data, index) in datas"
             :style="{'background-color': nowIndex == index ? colorInd : '#ffffff'}"
             :class="{'isPreview': data.isClick}">
          <div>
            <span>{{data.Pubtime.substr(11)}}</span>
            <i></i>
            <span class="wire"></span>
          </div>
          <div class="listInfo" @click="ClickItem(data, index)">
            <a>{{data.Title | setTitle}}</a>
            <i @click.stop="shareClick(data)"></i>
          </div>
        </div>
      </div>
    </div>
    <!--24 end-->
    <!--商品期货 start-->
    <div class="commodityDiv" v-if="tabFlag == 3">
      <span @click="tab2Click(1)" :class=" tab2Flag == 1 ? 'background': ''">稀贵金属</span>
      <span @click="tab2Click(2)" :class=" tab2Flag == 2 ? 'background': ''">金属市场</span>
      <span @click="tab2Click(3)" :class=" tab2Flag == 3 ? 'background': ''">农产品</span>
      <span @click="tab2Click(4)" :class=" tab2Flag == 4 ? 'background': ''">能源化工</span>
      <span @click="tab2Click(5)" :class=" tab2Flag == 5 ? 'background': ''">黑色金属</span>
    </div>
    <!--商品期货 end-->
    <!--国内国际/商品期货/金融期货-->
    <div class="newsCat" v-if="tabFlag == 3 || tabFlag == 2 || tabFlag == 4" id="newsCat">
      <div :style="setMargin" v-if="newsList">
        <news-group v-for="data in newsList" :class="{'isPreview': data.isClick}" :title="data.Title"
                    :content="data.PreView"
                    :time="setReleaseTime(data.Pubtime)" :newsId="data.ID"></news-group>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nowIndex: -1,
        colorInd: '#ffffff',
        setMargin: {
          marginTop: '10px'
        },
        newsList: [],
        num: 0,
        isShowNews: true,
        tabFlag: null,
        tab2Flag: null,
        info: [],
        currentPage: 1,
        group: null,
//24
        dateInfo: '',
        dateList: [],
        newsListLength: '',
        positionList: [],
        scrollTop: 0,
        isPreviewList: []
      }
    },
    created() {
      if (pbE.isPoboApp) {
        if (pbE.SYS().isHasLocalFile('indNews', 1)) {
          this.isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
        }
      }
      this.tabClick(1);
    },
    mounted() {
      this.detectScroll('newsCat', this.paging);
//      document.getElementById('newsCat').addEventListener('scroll',this.paging);
    },
    activated() {
      if (pbE.isPoboApp) {
        if (pbE.SYS().isHasLocalFile('indNews', 1)) {
          this.isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
        }
      }
      console.log('this.newsList', this.newsList);
      if (this.tabFlag == 1) {
        if (this.newsList.length > 0) {
          this.newsList[0].map((item) => {
            this.isPreviewList.map((previewItem) => {
              if (previewItem.type == 2 && item.ID == previewItem.infoId) {
                item['isClick'] = true;
              }
            });
          });
        }
      } else {
        this.newsList.map((item) => {
          this.isPreviewList.map((previewItem) => {
            if (previewItem.type == 2 && item.ID == previewItem.infoId) {
              item['isClick'] = true;
            }
          });
        });
      }
      this.$forceUpdate();
      this.setBodyBackground();
      if (document.getElementById('newsCat')) {
        document.getElementById('newsCat').scrollTop = this.scrollTop;
      }
    },
    beforeRouteLeave(to, from, next) {
      if (from.name == 'newsDCD' && document.getElementById('newsCat')) {
        this.scrollTop = document.getElementById('newsCat').scrollTop;
        next();
      }
    },
    methods: {
      ClickItem(data, index) {
        this.nowIndex = index;
        console.log('this.nowIndex', this.nowIndex);
        console.log('Index', index);
        this.colorInd = '#e6e6ec';
        let isPreviewList = [];
        let isAdd = true;
        if (pbE.isPoboApp) {
          if (pbE.SYS().isHasLocalFile('indNews', 1)) {
            isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
            console.log('isPreviewList', isPreviewList);
          }
        }

        if (isPreviewList && isPreviewList.length > 0) {
          isPreviewList.map((previewItem) => {
            if (previewItem.type == 2 && previewItem.infoId == data.ID) {
              isAdd = false;
            }
          });
        }
        if (isAdd) {
          if (isPreviewList.length >= 30) {
            isPreviewList.pop(); //删除最后一个元素
            isPreviewList.unshift({
              infoId: data.ID,
              type: 2        //type=2表示是在资讯下面
            });
          } else {
            isPreviewList.push({
              infoId: data.ID,
              type: 2        //type=2表示是在资讯下面
            });
          }
        }

        console.log('isPreviewList', isPreviewList);

        if (pbE.isPoboApp) {
          pbE.SYS().writeLocalFile('indNews', 1, JSON.stringify(isPreviewList));
        }
        setTimeout(() => {
          this.$router.push({path: '/details', query: {type: 1, newsId: data.ID}});
          this.colorInd = '#ffffff';
        }, 300);
      },
      tabClick(flag) {
        this.tabFlag = flag;
        this.newsList = [];
        if (flag == 1) {
          this.setMargin = {
            marginTop: '10px'
          };
          this.newsListRequest1();
        } else if (flag == 2) {
          this.setMargin = {
            marginTop: '10px'
          };
          this.group = ['10101'];
          this.newsListRequest2();
        } else if (flag == 3) {
          this.setMargin = {
            marginTop: '0px'
          };
          this.tab2Click(1);
        } else if (flag == 4) {
          this.setMargin = {
            marginTop: '10px'
          };
          this.group = ['30101', '30102'];
          this.newsListRequest2();
        }
      },
      tab2Click(flag) {
        this.tab2Flag = flag;
        if (flag == 1) {
          this.group = ['40102', '40202'];
          this.newsListRequest2()
        } else if (flag == 2) {
          this.group = ['40101', '40201'];
          this.newsListRequest2()
        } else if (flag == 3) {
          this.group = ['40104', '40204'];
          this.newsListRequest2()
        } else if (flag == 4) {
          this.group = ['40105', '40205'];
          this.newsListRequest2()
        } else if (flag == 5) {
          this.group = ['40103', '40203'];
          this.newsListRequest2()
        }
      },
      newsListRequest2() {
        document.getElementsByTagName('body')[0].scrollTop = 0;
        let _this = this, gp = {};
        _this.num = 0;
        _this.$loading.toggle(' ');
        if (this.group.length == 2) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '2',
            group1: this.group[0],
            group2: this.group[1],
            tflag: false
          }
        } else if (this.group.length == 1) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: this.group[0],
            tflag: false
          }
        }
        _this.$axios.get(PBHttpServer.indNews.newsUrl + 'Hd_LatestNewsList.aspx', {
          params: gp
        }, {timeout: 10000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data && data.Indexes.length != 0) {
            _this.newsList = data.Indexes;
            if (pbE.isPoboApp) {
              if (this.isPreviewList && this.isPreviewList.length > 0) {
                _this.newsList.map((item) => {
                  this.isPreviewList.map((previewItem) => {
                    if (previewItem.type == 2 && item.ID == previewItem.infoId) {
                      item['isClick'] = true;
                    }
                  });
                });
              }
            }
            if (_this.newsList.length < 5) {
              _this.pagingRequest();
            }
          }
          _this.detectScroll('newsCat', this.paging);
        }).catch((error) => {
          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络错误');
        })
      },
//      24请求
      newsListRequest1() {
        let _this = this;
        _this.num = 0;
        _this.$loading.toggle(' ');
        _this.$axios.get(PBHttpServer.indNews.newsUrl + 'Hd_LatestNewsList.aspx', {
          params: {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: '10301',
            tstart: _this.GetDateStr(0) + ' 00:00:00',
            tend: _this.GetDateStr(0) + ' 23:59:59'
          }
        }, {timeout: 10000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.Indexes && data.Indexes.length != 0) {
            _this.dateInfo = data.Indexes[0].Pubtime.substring(0, 10);
            _this.dateList.push(_this.dateInfo);
            _this.newsListLength = data.Indexes.length;
            _this.newsList.push(data.Indexes);
            if (pbE.isPoboApp) {
              if (this.isPreviewList && this.isPreviewList.length > 0) {
                _this.newsList[0].map((item) => {
                  this.isPreviewList.map((previewItem) => {
                    if (previewItem.type == 2 && item.ID == previewItem.infoId) {
                      item['isClick'] = true;
                    }
                  });
                });
              }
            }
            if (_this.newsListLength < 6) {
              _this.num += 1;
              _this.pagingRequest();
            }
          } else {
            _this.dateInfo = _this.dataValue.substring(0, 10);
            _this.newsListLength = 0;
            _this.newsList = [];
          }
          _this.detectScroll('newsCat', this.paging);
        }).catch((error) => {
          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络错误', error);
        })
      },
      paging() {
        if (this.$route.name == 'newsDCD') {
          if (this.tabFlag == 1) {
            if (this.calculatedcroll('newsCat')) {
              console.log("已经到最底部了！!");
              if (this.num < 8) {
                this.num += 1;
                this.pagingRequest();
              }
            }
            this.positionList.splice(0, this.positionList.length);
            let clientHeight = 0;
            let classList = document.getElementsByClassName('zx-scroll-item');
            for (let i = 0; i < classList.length; i++) {
              let tempHeight = classList[i].clientHeight;
              this.positionList.push(tempHeight);
              clientHeight += tempHeight;
            }
            let screenAvailHeight = this.getWindowHeight() - document.getElementsByClassName('hourTime')[0].clientHeight - document.getElementsByClassName('newsTab2')[0].clientHeight - 44 - 1;

            let nowIndex = getIndexFromTimeList(this.getScrollTop(), this.positionList);
            this.dateInfo = this.dateList[nowIndex];

            function getIndexFromTimeList(str, arr) {
              str = str / 1;
              let cout = 0 - screenAvailHeight,
                reIndex = 0,
                isTrue = true;
              if (str > cout) {
                arr.map((item, index) => {
                  cout += item / 1;
                  if (str <= (cout + 10) && isTrue) {
                    reIndex = index;
                    isTrue = false;
                  }
                });
                return reIndex;
              } else {
                return reIndex;
              }
            }
          } else {
            if (this.calculatedcroll('newsCat')) {
              this.pagingRequest();
            }
          }
        }
      },
      //分页请求
      pagingRequest() {
        let _this = this, gp = {};
        if (this.tabFlag == 1) {
          _this.$axios.get(PBHttpServer.indNews.newsUrl + 'Hd_LatestNewsList.aspx', {
            params: {
              type: 'mu',
              doc: 'json',
              count: '20',
              gcount: '1',
              group1: '10301',
              tstart: _this.GetDateStr(-this.num) + '' + ' 00:00:00',
              tend: _this.GetDateStr(-this.num) + '' + ' 23:59:59'
            }
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data.Indexes;
            console.log(data);
            if (data && data.length != 0) {
              _this.dateList.push(data[0].Pubtime.substring(0, 10));
              _this.newsList.push(data);
              if (pbE.isPoboApp) {
                if (this.isPreviewList && this.isPreviewList.length > 0) {
                  _this.newsList.map((item) => {
                    this.isPreviewList.map((previewItem) => {
                      if (previewItem.type == 2 && item.ID == previewItem.infoId) {
                        item['isClick'] = true;
                      }
                    });
                  });
                }
              }
            } else {
              _this.num += 1;
              _this.tstart = this.GetDateStr(-this.num) + '' + ' 00:00:00';
              _this.tend = this.GetDateStr(-this.num) + '' + ' 23:59:59';
              if(_this.num <= 8)
              _this.pagingRequest();
            }
          }).catch((error) => {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.log('网络超时，请稍后再试');
          })
        } else {
          _this.num += 1;
//        _this.$loading.toggle(' ');
          if (this.group.length == 2) {
            gp = {
              type: 'mu',
              doc: 'json',
              count: '20',
              gcount: '2',
              group1: this.group[0],
              group2: this.group[1],
              toid: _this.newsList[_this.newsList.length - 1].ID,
              tflag: false
            }
          } else if (this.group.length == 1) {
            gp = {
              type: 'mu',
              doc: 'json',
              count: '20',
              gcount: '1',
              group1: this.group[0],
              toid: _this.newsList[_this.newsList.length - 1].ID,
              tflag: false
            }
          }
          _this.$axios.get(PBHttpServer.indNews.newsUrl + 'Hd_LatestNewsList.aspx', {
            params: gp
          }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
            data = data.data;
            console.log(data);
            if (data && data.Indexes.length != 0) {
              if (_this.newsList[_this.newsList.length - 1].ID != data.Indexes[data.Indexes.length - 1].ID) {
                for (let key in data.Indexes) {
                  _this.newsList.push({
                    Title: data.Indexes[key].Title,
                    PreView: data.Indexes[key].PreView,
                    Pubtime: data.Indexes[key].Pubtime,
                    ID: data.Indexes[key].ID
                  });
                }
              }
              if (pbE.isPoboApp) {
                if (this.isPreviewList && this.isPreviewList.length > 0) {
                  _this.newsList.map((item) => {
                    this.isPreviewList.map((previewItem) => {
                      if (previewItem.type == 2 && item.ID == previewItem.infoId) {
                        item['isClick'] = true;
                      }
                    });
                  });
                }
              }

            } else {
              if (_this.num <= 10) {
                _this.pagingRequest();
              }
            }
          }).catch((error) => {
//          _this.$loading.hide();
            _this.showToast('网络超时，请稍后再试');
            console.log('网络错误');
          })
        }
      },
      shareClick(value) {
        location.href = 'pobo:uncheck=1&pageId=800012&title=' + value.Title.substr(6) + '&type=0&url=' + encodeURIComponent(PBHttpServer.indNews.shareUrl + 'type=1&newsId=' + value.ID);
      }
    }
  }
</script>
