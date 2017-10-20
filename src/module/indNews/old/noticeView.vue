<template>
  <div>
    <div class="noticeView" v-if="isShowNews">
      <div>
        <notice-group v-for="data in info" :infoTitle="data.infoTitle" :upVote="data.upVote" :infoId="data.infoId"
                      :thumb="data.thumb" :time="setReleaseTime(data.createTime)" :labels="data.labels"></notice-group>
      </div>
    </div>
    <div class="noData" v-else>
      <img src="../images/noData.png"/>
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        info: [],
        isShowNews: true,
        currentPage:1
      }
    },
    mounted() {
      console.log('2');
      window.addEventListener('scroll', this.nPaging);
      this.setBodyBackground();
      this.request();
    },
    watch: {
      $route(to, from, next) {
        if (to.name == 'noticeView') {
          this.$emit('change-active-index', this.$route.params.type);
          this.request();
        }
      }
    },
    methods: {
      request() {
        let _this = this;
        _this.$loading.toggle(' ');
        _this.$axios.post(PBHttpServer.indNews.serverUrl, {
          func: "10101",
          data: [{
            infoType: this.$route.params.type,
            currentPage: _this.currentPage + '',
            pageSize: "20"

          }]
        }, {timeout: 10000}).then((data) => {
          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            if (data.data.length != 0) {
              _this.isShowNews = true;
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
      nPaging(){
        if (this.$route.name == 'noticeView') {
          if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            this.pagingRequest();
          }
        }

      },
      pagingRequest(){
        let _this = this;
        _this.currentPage += 1;
        _this.$axios.post(PBHttpServer.indNews.serverUrl, {
          func: "10101",
          data: [{
            infoType: this.$route.params.type,
            currentPage: _this.currentPage + '',
            pageSize: "20"

          }]
        }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            if (data.data.length != 0) {
              _this.info.push(data.data);
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
