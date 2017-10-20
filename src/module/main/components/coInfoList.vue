<template>
  <div class="content-news">
    <div class="tabbar-content clearfix">
      <div class="tab-item" v-for="(item, index) in tabs">
        <a class="title-wrapper" @click="changeShowLine(index)">
          <p :class="{alive: iNow == index}">{{item.name}}</p>
          <div class="tab-line" :class="{active: iNow == index}"></div>
        </a>
      </div>
      <div class="tab-more" @click="moreInfo">
        <a class="title-wrapper">
          <p>更多 <img class="more" src="../images/more.png" alt="更多"></p>
        </a>
      </div>
    </div>
    <div class="news-content" v-show="iNow === 0">
      <div class="news-item" v-for="item in newsList1">
        <a class="news-title"
           :href="'pobo:uncheck=1&pageId=900004&title=详细信息&url=info/view/info-de.html?newsId='+item.ID">
          <span class="content-title" v-html="item.Title"></span>
          <span class="time-content">{{item.Pubtime}}</span>
        </a>
      </div>
    </div>
    <div class="news-content" v-show="iNow === 1">
      <div class="news-item" v-for="item in newsList2">
        <a class="news-title"
           :href="'pobo:uncheck=1&pageId=900004&title=详细信息&url=info/view/info-de.html?newsId='+item.ID">
          <span class="content-title" v-html="item.Title"></span>
          <span class="time-content">{{item.Pubtime}}</span>
        </a>
      </div>
    </div>
    <div class="news-content" v-show="iNow === 2">
      <div class="news-item" v-for="item in newsList3">
        <a class="news-title"
           :href="'pobo:uncheck=1&pageId=900004&title=详细信息&url=info/view/info-de.html?newsId='+item.ID">
          <span class="content-title" v-html="item.Title"></span>
          <span class="time-content">{{item.Pubtime}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'infolist',
    props: {
      coInstance: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        newsList1: [],
        newsList2: [],
        newsList3: [],
        tabs: [],//选项卡数据
        tags: false,
        iNow: 0,  //tab选项卡标志
        webService: '',
        count: 0,
        flag: true,

      }
    },
    created() {
      var _this = this;
      if (pbE.isPoboApp) {
        var mainlist = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json"));
        _this.tabs = mainlist[_this.coInstance].data;
        _this.webService = mainlist[_this.coInstance].webservice;
      } else {
        _this.$axios.get(_this.confUrl + 'main.json').then(function (data) {
          var mainlist = data;
          _this.tabs = mainlist.data[_this.coInstance].data;
          _this.webService = mainlist.data[_this.coInstance].webservice;
          _this.getNews(_this.tabs[_this.iNow]);
        }).catch(function (err) {
          _this.$axios.get("../"+ _this.pbconfUrl + 'main.json').then(function (data) {
            var mainlist = data;
            _this.tabs = mainlist.data[_this.coInstance].data;
            _this.webService = mainlist.data[_this.coInstance].webservice;
            _this.getNews(_this.tabs[_this.iNow]);
          });
          console.log('服务器异常', err)
        });
      }
    },
    mounted() {
      this.initPage();
      if (this.tabs.length > 0) {
        this.getNews(this.tabs[this.iNow]);
      }
    },
    methods: {
      changeShowLine(index) {//切换tab选项卡
        this.iNow = index;
        this.getNews(this.tabs[index]);
      },
      moreInfo() {//更多链接
        window.location.href = "pobo:uncheck=1&pageId=904000&url=info/index.html";
      },
      callback_90004(msg) {
        /*console.log(msg,'9004');
        var _this = this;
        var CONTENTS = msg.jData.Indexes.slice(0, _this.count);
        for (var i = 0; i < CONTENTS.length; i++) {
          CONTENTS[i].Pubtime = CONTENTS[i].Pubtime.split(' ')[0];
        }
        if (this.flag) {
          this.flag = false;
          _this.newsList1 = CONTENTS;
          _this.newsList2 = CONTENTS;
          _this.newsList3 = CONTENTS;
        }
        if (this.iNow === 0) {
          _this.newsList1 = CONTENTS;
        } else if (this.iNow === 1) {
          _this.newsList2 = CONTENTS;
        } else if (this.iNow === 2) {
          _this.newsList3 = CONTENTS;
        }*/
      },
      initPage() {
        if (pbPage.getInitState()) {
//          pbPage.addModuleCallback(90004, this.callback_90004);
          pbPage.addReloadFunByKey('infolist', this.pageReload);

        } else {
          pbPage.initPage({
            reload: this.pageReload
//            callbacks: [{module: 90004, callback: this.callback_90004}]
          });
          this.pageReload();
        }

      },
      pageReload() {

      },
      getNews(obj) {
        var _this = this;
        if (obj.count) {
          _this.count = obj.count;
        }
      /*  if (pbE.isPoboApp) {
          pbE.INFO().infoQueryListWithJson(JSON.stringify({
            type: 'mu',
            groupIDs: obj.ids,
            doc: 'json',
            count: obj.count
          }));
        }
        else {*/
        var gp = {gcount: obj.ids.length, count: obj.count};
        for (var i = 0; i < gp.gcount; i++) {
          gp["group" + (i + 1)] = obj.ids[i];
        }
        gp['type'] = 'mu';
        gp['doc'] = 'json';
        console.log(gp);
        _this.$axios.get(_this.webService, {params: gp}).then(function (result) {
//            console.log(result);
          var CONTENTS = result.data.Indexes.slice(0, obj.count);
//            var CONTENTS = JSON.parse(result).Indexes.slice(0, obj.count);
          for (var i = 0; i < CONTENTS.length; i++) {
            CONTENTS[i].Pubtime = CONTENTS[i].Pubtime.split(' ')[0];
          }
          if (_this.flag) {
            _this.flag = false;
            _this.newsList1 = CONTENTS;
            _this.newsList2 = CONTENTS;
            _this.newsList3 = CONTENTS;
          }
          if (_this.iNow === 0) {
            _this.newsList1 = CONTENTS;
          } else if (_this.iNow === 1) {
            _this.newsList2 = CONTENTS;
          } else if (_this.iNow === 2) {
            _this.newsList3 = CONTENTS;
          }
          //    _this.newsList = JSON.parse(result).Indexes.slice(0, obj.count);
        }).catch(function (err) {
          console.log('服务器异常', err)
        });
//        }
      },
      timeFmt(date) {
        var Y = date.getFullYear() + '-',
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
          D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ',
          h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':',
          m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':',
          s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return Y + M + D + h + m + s;
      }
    }
  }
</script>
