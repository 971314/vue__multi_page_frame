<template>
  <div>
    <div class="newsCat">
      <div :style="setMargin">
        <news-group v-for="data in newsList" :title="data.Title" :content="data.PreView"
                    :time="setReleaseTime(data.Pubtime)" :newsId="data.ID"></news-group>
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
        setMargin: {
          marginTop: '10px'
        },
        newsList: null,
        num: 0,
        tstart: null,
        tend: null,
        isShowNews:true
      }
    },
    watch: {
      $route(to, from, next) {
        if(to.name == 'news2' || to.name == 'news4' || to.name == 'news5'
          || to.name == 'news6' || to.name == 'news7' || to.name == 'news8' || to.name == 'news9'){
          this.newsListRequest2()
        }
      }
    },
    mounted() {
      console.log('111');
      this.setBodyBackground();
      this.newsListRequest2();
      window.addEventListener('scroll', this.aPaging);
      if (this.$route.params.numm == 1 || this.$route.params.numm == 2 || this.$route.params.numm == 3 || this.$route.params.numm == 4 || this.$route.params.numm == 5) {
        this.setMargin = {
          marginTop: '40px'
        }
      }
    },
    methods: {
      newsListRequest2() {
        document.getElementsByTagName('body')[0].scrollTop = 0;
        let _this = this, gp = {};
        _this.$loading.toggle(' ');
        if (_this.$route.query.group1 && _this.$route.query.group2) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '2',
            group1: _this.$route.query.group1,
            group2: _this.$route.query.group2,
            tstart: _this.GetDateStr(0) + ' 00:00:00',
            tend: _this.GetDateStr(0) + ' 23:59:59'
          }
        } else if (_this.$route.query.group1) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: _this.$route.query.group1,
            tstart: _this.GetDateStr(0) + ' 00:00:00',
            tend: _this.GetDateStr(0) + ' 23:59:59'
          }
        }
        _this.$axios.get(PBHttpServer.indNews.newsUrl, {
          params: gp
        }, {timeout: 10000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data && data.Indexes.length != 0) {
            _this.newsList = data.Indexes;
            if (_this.newsList.length < 5) {
              _this.pagingRequest();
            }
          }
        }).catch((error) => {
          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络错误');
        })
      },
      aPaging() {
        if (this.$route.path == '/news/1/domestic/2' || this.$route.path == '/news/1/commodity/3/rare/1' || this.$route.path == '/news/1/commodity/3/metal/2'
          || this.$route.path == '/news/1/commodity/3/farm/3' || this.$route.path == '/news/1/commodity/3/energy/4' || this.$route.path == '/news/1/commodity/3/ferrous/5'
          || this.$route.path == '/news/1/FITF/4') {
          if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            console.log('aaaa');
            this.pagingRequest();
          }
        }
      },
      pagingRequest() {
        let _this = this, gp = {};
        _this.num += 1;
//        _this.$loading.toggle(' ');
        if (_this.$route.query.group1 && _this.$route.query.group2) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '2',
            group1: _this.$route.query.group1,
            group2: _this.$route.query.group2,
            tstart: _this.GetDateStr(-_this.num) + ' 00:00:00',
            tend: _this.GetDateStr(-_this.num) + ' 23:59:59'
          }
        } else if (_this.$route.query.group1) {
          gp = {
            type: 'mu',
            doc: 'json',
            count: '20',
            gcount: '1',
            group1: _this.$route.query.group1,
            tstart: _this.GetDateStr(-_this.num) + ' 00:00:00',
            tend: _this.GetDateStr(-_this.num) + ' 23:59:59'
          }
        }
        _this.$axios.get(PBHttpServer.indNews.newsUrl, {
          params: gp
        }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data && data.Indexes.length != 0) {
            for (let key in data.Indexes) {
              _this.newsList.push({
                Title: data.Indexes[key].Title,
                PreView: data.Indexes[key].PreView,
                Pubtime: data.Indexes[key].Pubtime,
                ID: data.Indexes[key].ID
              });
            }
          }else{
            _this.pagingRequest();
          }
        }).catch((error) => {
//          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.log('网络错误');
        })
      }
    }
  }
</script>
