/**
 * Created by pobo on 2017/8/1.
 */
import Vue from 'vue';
import axios from 'axios';
import RetUrl from '../config/retUrl.js';
import configServer from '../config/retServer';


let projectPrefix = '', projectJsonUrl = '';

for (let i = 0; i < configServer.projectConfig.length; i++) {
  if (configServer.projectConfig[i].environment == 'ENV_pro') {
    projectPrefix = configServer.projectConfig[i].ServerUrl;
    projectJsonUrl = configServer.projectConfig[i].JsonUrl;
  }
}

axios.defaults.headers['x-requested-with'] = "XMLHttpRequest"; //定义协议头

Vue.mixin({
  data() {
    return {
      projectPrefix: projectPrefix,
      projectJsonUrl: projectJsonUrl,
      UserID: '103087' //203014
    }
  },
  computed: {
    getCurrentTime() {
      let dateTime = new Date();
      return new Date(dateTime.setMonth(dateTime.getMonth()));
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
        // jsonUrl = await axios.get('../conf/h5/analysis.json');
        jsonUrl = PBHttpServer.analysis.serverUrl;
        console.log(jsonUrl);
        if (jsonUrl) {
          hostUrl = jsonUrl;
        }
        if (!isJson)
          getUrl = join ? `${hostUrl}${RetUrl[restUrl].url}/${join}` : `${hostUrl}${RetUrl[restUrl].url}`;
        else
          getUrl = join ? `${hosturlLocal}${restUrl}/${join}` : `${projectJsonUrl}${restUrl}`;
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
        timeout: 5000
      };
      try {
        jsonUrl = PBHttpServer.analysis.serverUrl;
        if (jsonUrl) {
          hostUrl = jsonUrl;
        }
        postUrl = join ? `${hostUrl}${RetUrl[restUrl].url}/${join}` : `${hostUrl}${RetUrl[restUrl].url}`;
        response = await axios.post(postUrl, params, Object.assign(tempOption, options));
        loading && this.$$loaded();
        return response;
      } catch (e) {
        console.log(123);
        console.log('PBHttpServer', PBHttpServer);
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
    getTimeByParam(par) {
      let dateTime = new Date();
      return new Date(dateTime.setMonth(dateTime.getMonth() - par));
    },
    $$timeFormate({date = new Date(), format = "Y-M-D h:m:s", week = 0} = {}) {     //时间格式化函数
      let r, wk, wk1;
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
    $$deepCopy(obj) { //深拷贝
      let str, newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj), //系列化对象
          newobj = JSON.parse(str); //还原
      } else {
        for (let i in obj) {
          newobj[i] = typeof obj[i] === 'object' ?
            this.$$deepCopy(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    $$broadcast(componentName, eventName, params) { //广播式触发事件--从上往下触发(适用于vue中)
      this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
          child.$emit.apply(child, [eventName].concat(params));
        } else {
          broadcast.apply(child, [componentName, eventName].concat([params]));
        }
      });
    },
    $$dispatch(componentName, eventName, params) {  //发散式触发事件--从下往上触发(适用于vue中)
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    $$comma(parm, n = 3) { //数字加逗号(去掉尾部多余的0)
      parm = Number((parm || 0)).toString();  //使用Number强转一下再toString
      let integer = ``,
        isNegativeNumber = false,
        decimal = ``,
        result = ``;
      isNegativeNumber = parm / 1 > 0 ? false : true;
      parm = parm.replace('-', '');
      integer = parm.split(`.`)[0];
      if (parm.split(`.`).length > 1) {
        decimal = parm.split(`.`)[1];
      }
      while (integer.length > 3) {
        result = `,${integer.slice(-n)}${result}`;
        integer = integer.slice(0, integer.length - 3);
      }
      if (integer) {
        result = decimal ? `${integer}${result}.${decimal}` : `${integer}${result}`;
      }

      if (isNegativeNumber && (parm / 1) != 0) {
        result = `-${result}`;
      }
      return result;
    }
  }
});
