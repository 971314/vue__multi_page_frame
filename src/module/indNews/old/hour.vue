<template>
  <div class="hour">
    <div class="hourTime">
      <span>{{dateInfo | setDate}}</span>
      <!--<img src="../images/calendar@2x.png"/>
      <input type="date" id="data" @change="dataChange" v-model="dataValue"/>-->
    </div>
    <div class="timerShaft">
      <div class="zx-scroll-item" v-for="datas in newsList">
        <div class="timerShaftList" v-for="data in datas">
          <div>
            <span>{{data.Pubtime.substr(11)}}</span>
            <i></i>
            <span class="wire"></span>
          </div>
          <div class="listInfo" @click="$router.push({path:'/details',query:{type:1,newsId:data.ID}})">
            <a>{{data.Title | setTitle}}</a>
            <i @click.stop="shareClick"></i>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="noData" v-else>
      <img src="../images/noData.png"/>
      <span>暂无数据</span>
    </div>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {

        positionList: [],
        dataValue: null,
        newsList: [],
        dateInfo: '',
        dateList: [],
        tstart: this.getNowFormatDate().substring(0, 10) + ' 00:00:00',//开始时间
        tend: this.getNowFormatDate().substring(0, 10) + ' 23:59:59',//结束时间
        num: 0,//分页计数
//        scroll: false,
        scrollDate: '',
        newsListLength: '',
        isShowNews: true
      }
    },
    mounted() {
      this.newsListRequest1();
      window.addEventListener('scroll', this.paging);
    },
    activated() {
      document.getElementsByTagName('body')[0].scrollTop = 0;
    },
    methods: {
      dataChange() {
        document.getElementsByTagName('body')[0].scrollTop = 0;
        this.tstart = this.dataValue + ' 00:00:00';
        this.tend = this.dataValue + ' 23:59:59';
        this.newsListRequest1();
      },
      paging() {
        if (this.$route.path == '/news/1/hour/1') {
          if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            console.log("已经到最底部了！!");
            if (this.num < 8) {
              this.num += 1;
              this.tstart = this.GetDateStr(-this.num) + '' + ' 00:00:00';
              this.tend = this.GetDateStr(-this.num) + '' + ' 23:59:59';
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
        }
      },
      newsListRequest1() {
        let _this = this;
        _this.num = 0;
        _this.$loading.toggle(' ');
        _this.$axios.get(PBHttpServer.indNews.newsUrl, {
          params: {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: '10301',
            tstart: _this.tstart,
            tend: _this.tend
          }
        }, {timeout: 10000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          if (data.Indexes && data.Indexes.length != 0) {
            _this.dateInfo = data.Indexes[0].Pubtime.substring(0, 10);
            _this.dateList.push(_this.dateInfo);
            _this.newsListLength = data.Indexes.length;
            _this.newsList.push(data.Indexes);
            if (_this.newsListLength < 6) {
              _this.num += 1;
              _this.tstart = _this.GetDateStr(-_this.num) + '' + ' 00:00:00';
              _this.tend = _this.GetDateStr(-_this.num) + '' + ' 23:59:59';
              _this.pagingRequest();
            }
          } else {
            console.log('123');
            _this.dateInfo = _this.dataValue.substring(0, 10);
            _this.newsListLength = 0;
            _this.newsList = [];
          }
        }).catch((error) => {
          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络错误');
        })
      },
      pagingRequest() {
        let _this = this;
//        _this.$loading.toggle(' ');
        _this.$axios.get(PBHttpServer.indNews.newsUrl, {
          params: {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: '10301',
            tstart: _this.tstart,
            tend: _this.tend
          }
        }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
          data = data.data.Indexes;
          console.log(data);
          if (data && data.length != 0) {
//            _this.dateInfo = data[0].Pubtime.substring(0, 10);
            _this.dateList.push(data[0].Pubtime.substring(0, 10));
            _this.newsList.push(data);
          } else {
            console.log('123');
            _this.num += 1;
            _this.tstart = this.GetDateStr(-this.num) + '' + ' 00:00:00';
            _this.tend = this.GetDateStr(-this.num) + '' + ' 23:59:59';
            _this.pagingRequest();
          }
        }).catch((error) => {
//          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络超时，请稍后再试');
        })
      },
      shareClick() {
        console.log('分享');
        location.href = 'pobo:uncheck=1&pageId=800012&type=0&url=' + encodeURIComponent(PBHttpServer.indNews.shareUrl + this.$route.query.type + '&newsId=' + this.$route.query.newsId);
      }
    }
  }
</script>
