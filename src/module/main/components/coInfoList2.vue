<template>
  <div class="infolist2 content-news" v-if="newsList.length > 0">

    <div class="main-header-title">
      <main-header :leftTitle="tabs.name" :toWhere=" moreLink ? 'pobo:uncheck=1&pageId=900005&url=' + moreLink + infoTypeId : ''"></main-header>
    </div>

    <div class="news-content">

      <!-- 模板1 （今日头条、研究报告）-->
      <div class="news-item group" v-if="templateType==1" v-for="item in newsList">
        <a class="cell" :href="item.ctype == 2 ? 'pobo:uncheck=1&pageId=900005&url=activity/index.html#/activityDetail?currentId=' + item.infoId : 'pobo:uncheck=1&pageId=900005&url=indNews/index.html?#/details?type=2&info=' + item.infoId">
          <span class="cell-body">
              <div class="media flex-align-top">
                  <div class="media-body">
                    <section>
                      <h3 class="ellipsis2" v-html="item.title || item.infoTitle">
                      </h3>
                      <span v-if="item.upVote > 0" class="media-dianzan">{{item.upVote}}赞</span>
                    </section>
                  </div>
                  <div class="media-object">
                    <span v-if="!infoTypeId">{{item.bizType}}</span>
                    <!-- <img :src="item.thumb" class="border-circle"/> -->
                    <img v-lazy="item.thumb" class="border-circle"/>

                  </div>
              </div>
          </span>
        </a>
      </div>

      <!-- 模板2 （公司公告）-->
      <div class="news-item group template2" v-if="templateType==2" v-for="item in newsList">
        <a class="cell" :href="'pobo:uncheck=1&pageId=900005&url=indNews/index.html?#/details?type=2&info=' + item.infoId">
          <span class="cell-body">
              <div class="media flex-align-top">
                  <div class="media-body">
                    <h3 class="ellipsis" v-html="item.infoTitle"></h3>
                  </div>
              </div>
          </span>
        </a>
        <span class="template2-time">
        {{$$timeFormate({date:item.updateTime, format: 'M-D'})}}
        </span>
      </div>

    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import MainHeader from './moreHeader.vue';

  export default {
    name: 'infolist2',
    props: {
      coInstance: {
        type: String,
        default: ''
      }
    },

    components:{
      MainHeader
    },
    data() {
      return {
        newsList: [],    //栏目下对应的列表数据
        tabs: {},        //栏目
        webService: PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0',  //请求url
        templateType : 1,//模板类型
        moreLink : '',   //点击【更多】跳转的链接地址
        infoTypeId : ''  //栏目类型
      }
    },
    created() {
      var _this = this;

      //读取配置文件
      /*if (pbE.isPoboApp) {
        var mainlist = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json"));
        _this.tabs = mainlist[_this.coInstance].data;
        _this.moreLink = mainlist[_this.coInstance].data.moreLink;
        _this.templateType = mainlist[_this.coInstance].templateType;
        _this.infoTypeId = _this.tabs.params.data[0].infoType || '';
        _this.getNews(_this.tabs);
      } else {
        _this.$axios.get(_this.confUrl + 'main.json').then(function (data) {
          var mainlist = data.data;
          _this.tabs = mainlist[_this.coInstance].data;
          _this.moreLink = mainlist[_this.coInstance].data.moreLink;
          _this.templateType = mainlist[_this.coInstance].templateType;
          _this.infoTypeId = _this.tabs.params.data[0].infoType || '';
          _this.getNews(_this.tabs);
        }).catch(function (err) {
          console.log('服务器异常', err)
        });
      }*/
      _this.$axios.get(_this.confUrl + 'main.json').then(function (data) {
          _this.tabs = data.data[_this.coInstance];
          _this.moreLink = _this.tabs.moreLink;
          _this.templateType = _this.tabs.templateType;
          _this.infoTypeId = _this.tabs.infoType || '';
          _this.getNews(_this.tabs);
          _this.initPage();
        }).catch(function (err) {
          console.log('服务器异常', err)
        });
    },
    mounted() {
      //this.initPage();
    },

    methods: {
      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addReloadFunByKey('infolist2'+this.infoTypeId, this.pageReload);
        } else {
          pbPage.initPage({
            reload: this.pageReload
          });
          //  	this.pageReload();
        }
      },
      pageReload() {
        this.getNews(this.tabs);
      },
      //获取栏目下的 数据
      getNews(obj) {
        var _this = this;
        var params = {
          "func":obj.func,
          "data": [{  }]
        };
        if(obj.infoType){
          params.data = [{
            "infoType": obj.infoType,
            "currentPage":"1",
            "pageSize":obj.pageSize
          }]
        }
        _this.$axios.post(_this.webService, params).then(function (result) {
            var CONTENTS = result.data.data;
            if (obj.infoType === '10101') {
              console.log('result',result);
            }
            _this.newsList = CONTENTS;
          }).catch(function (err) {
            console.log('服务器异常', err)
          });
      },
      $$timeFormate({date = new Date(), format = "Y-M-D h:m:s", week = 0} = {}) {     //时间格式化函数
        let r, wk, wk1;
        if (Object.prototype.toString.call(date) === '[object String]') {
          date = date.replace(/-/g, '/'); //解决ios上不兼容new Date('2017-01-01')
        }
        date = new Date(date);
        [wk, wk1] = [['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()], ['周天', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]];
        r = {
          Y: date.getFullYear(),
          M: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
          D: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
          wk: Object.is(week, 0) ? wk : wk1,
          h: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
          m: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
          s: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
          ms: date.getMilliseconds() < 10 ? `00${date.getMilliseconds()}` : (date.getMilliseconds() < 99 ? `0${date.getMilliseconds()}` : date.getMilliseconds())
        };
        for (let [k, v] of Object.entries(r)) {
          format = new RegExp(`(${k})`).test(format) ? format.replace(RegExp.$1, v) : format;
        }
        return format;
      }

    }
  }
</script>
