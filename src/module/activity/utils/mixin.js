/**
 * Created by pobo on 2017/9/6.
 */
import Vue from 'vue';
import axios from 'axios';
import RetUrl from '../config/retUrlInfo.js';

axios.defaults.headers['x-requested-with'] = "XMLHttpRequest"; //定义协议头
let isShare = pbE.isPoboApp?pbE.SYS().readConfig("conf/h5/main.json")?JSON.parse(pbE.SYS().readConfig("conf/h5/main.json")).appSetting.isShare:false : false
Vue.mixin({
  data() {
    return {
      userId: pbE.isPoboApp ? (pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '0') : '0',
      token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : "1",//token
      serverUrl: PBHttpServer.activity.serverUrl ,
      UrlInfo: RetUrl,
      isShare:isShare
    }
  },
  methods: {
    async $get({restUrl = '', isJson = false, join = false, options = {}, loading = false} = {}) {
      if (!restUrl) return '';
      let response, getUrl, jsonUrl, hostUrl = '', hosturlLocal = '';
      loading && this.$$loading();
      let tempOption = {
        timeout: 5000
      };
      try {
        jsonUrl = PBHttpServer.activity.serverUrl;
        // jsonUrl = 'http://192.168.6.52:8890/';
        if (jsonUrl) {
          hostUrl = jsonUrl;
        }
        if (!isJson)
          getUrl = join ? `${hostUrl}${RetUrl[restUrl].url}/${join}` : `${hostUrl}${RetUrl[restUrl].url}`;
        else
          getUrl = join ? `${hosturlLocal}${restUrl}/${join}` : `${hosturlLocal}${restUrl}`;
        response = await axios.get(getUrl, Object.assign(tempOption, options));
        loading && this.$$loaded();
        return response;
      } catch (e) {
        loading && this.$$loaded();
        if (res.message.split(' ')[0] == 'timeout') { //延时操作
          this.$toast("请求超时，请稍后再试");
        } else {
          this.$toast("请求服务器失败，请稍后再试");
        }
        throw new Error(e);
      }
    },
    async $post({restUrl = '', params = {}, join = false, options = {}, loading = false} = {}) {
      if (!restUrl) return '';
      let response, postUrl, jsonUrl, hostUrl = '';
      loading && this.$$loading();
      let tempOption = {
        timeout: 10000
      };
      try {
        jsonUrl = PBHttpServer.activity.serverUrl;
        // jsonUrl = 'http://192.168.6.52:8890/';
        if (jsonUrl) {
          hostUrl = jsonUrl;
        }
        postUrl = join ? `${hostUrl}${RetUrl[restUrl].url}/${join}` : `${hostUrl}${RetUrl[restUrl].url}`;
        response = await axios.post(postUrl, params, Object.assign(tempOption, options));
        loading && this.$$loaded();
        return response;
      } catch (e) {
        loading && this.$$loaded();
        if (e.message.split(' ')[0] == 'timeout') { //延时操作
          this.$toast("请求超时，请稍后再试");
        } else {
          this.$toast("请求服务器失败，请稍后再试");
        }
        throw new Error(e);
      }
    },
    $$loading() {
      //loading开始
      this.$loading.toggle('');
    },
    $$loaded() {
      //loading结束
      this.$loading.hide();
    },
    $$timeFormate({date = new Date(), format = "Y-M-D h:m:s", week = 0} = {}) {     //时间格式化函数
      let r, wk, wk1;
      if (Object.prototype.toString.call(date) === '[object String]') {
        date = date.replace(/-/g,'/'); //解决ios上不兼容new Date('2017-01-01')
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
    },
    $encodeURI(url) { //加密解密
      return window.encodeURIComponent(url ? url : window.location);
    },
    $decodeURI(url) {
      return window.decodeURIComponent(url);
    },
    $getParam() {
      let url = location.search;
      let theRequest = new Object();
      if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    $getScrollTop() {
      let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    },
    $getViewPortWidth() { //获取屏幕可视宽度
      return window.document.documentElement.getBoundingClientRect().width;
    },
    $getViewPortHeight() {//获取屏幕可视高度
      return window.document.documentElement.getBoundingClientRect().height;
    }
  }
});
