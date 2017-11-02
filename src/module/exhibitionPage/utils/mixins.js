import Vue from 'vue'
import urlList from '../config/retUrl.js'
import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.mixin({
  data() {
    return {
      mixinTest: 'mixin测试'
    }
  },
  methods: {
    $$axios({restUrl = '', join = [], options = {}, loading = false} = {}) {
      if (!restUrl) return ''
      loading && this.$$loading()
      let getUrl, jsonUrl, hostUrl = '', joinString = '', count = 0
      let tempOption = {
        timeout: 10000,
        headers: {
          'x-requested-with': "XMLHttpRequest",
          'Content-Type': 'application/x-www-form-urlencoded',
          'id': "123456"
        }
      }
      // jsonUrl = PBHttpServer.activity.serverUrl
      jsonUrl = 'http://192.168.6.49:8080/pobocmhelperapp/0.0.1/pc/'
      if (jsonUrl) {
        hostUrl = jsonUrl
      }

      if (join.length > 0) {
        for (let k of join) {
          if (Object.prototype.toString.call(k) === '[object Array]') {
            count = 0
            for (let v of k) {
              if (Object.prototype.toString.call(v) === '[object Array]') {
                if (count > 0) {
                  joinString += `&${v[0]}=${v[1]}`
                } else {
                  joinString += `${v[0]}=${v[1]}`
                }
                count++
              } else {
                joinString += `/${v}?`
              }
            }
          } else {
            joinString += `/${k}`
          }
        }
      }

      getUrl = join.length > 0 ? `${hostUrl}${urlList[restUrl].url}${joinString}` : `${hostUrl}${urlList[restUrl].url}`
      return new Promise((resolve, reject) => {
        axios[urlList[restUrl].type.toLowerCase()](getUrl, Object.assign(tempOption, options))
          .then(res => {
            loading && this.$$loaded()

            if (res.data.retHead == 0) {
              resolve ? resolve(res.data.data || {}) : null
            }
            // this.$toast(res.data.desc)
            reject ? reject(res) : null
          }, res => {
            loading && this.$$loaded()
            // if (res.message.split(' ')[0] == 'timeout') { //延时操作
            //   this.$toast("请求超时，请稍后再试");
            // }else {
            //   this.$toast("请求服务器失败，请稍后再试")
            // }
            reject ? reject(res) : null
          })
      })
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
    },
    $$transformData(data) { //数字单位转换(万/亿/个位数不加小数点)
      data = Number((data || 0)).toString()
      let integer = ``,
        decimal = ``,
        isNegativeNumber = false,
        result = ``,
        unit = ``,
        n = 0,
        tempArr = [],
        tempNumber = null

      isNegativeNumber = data / 1 > 0 ? false : true
      data = data.replace('-', '');
      integer = data.split(`.`)[0];

      if (data.split(`.`).length > 1) {
        decimal = data.split(`.`)[1];
      }
      if (integer.length >= 5 && integer.length < 9) {
        unit = `万`
        n = 4
      }
      else if (integer.length >= 9) {
        unit = `亿`
        n = 8
      }
      tempArr = integer.split('')
      if (n > 0) {
        tempArr.splice(integer.length - n, 0, '.')
      }
      tempNumber = tempArr.join('')
      if (n <= 0) {
        tempNumber = Number(tempNumber)
      } else {
        tempNumber = Number(tempNumber).toFixed(2)
      }
      result = integer.split('').splice(0, integer.length - n).length > 3 ? this.$$comma(integer.split('').splice(0, integer.length - n).join('')) : integer.split('').splice(0, integer.length - n).join('')
      tempNumber = tempNumber.toString()

      if (tempNumber.indexOf('.') > -1) {
        decimal = `${tempNumber}${decimal}`
      } else {
        decimal = `${tempNumber}.${decimal}`
      }
      decimal = decimal.split(`.`)[1] ? decimal.split(`.`)[1].slice(0, 2) : ``
      if (decimal)
        decimal = decimal.length >= 2 ? decimal : `${decimal}0`

      if (decimal) {
        result = `${result}.${decimal}`
      }

      if (isNegativeNumber) {
        result = `-${result}${unit}`
      } else {
        result = `${result}${unit}`
      }
      return result
    },
    $$getTimeFmt(value) {
      value = value + '';
      let yearServer = value.substr(0, 4);
      let monthServer = value.substr(4, 2);
      let dayServer = value.substr(6, 2);
      let hourServer = '';
      let mintueServer = '';
      if (value.length > 8) {
        hourServer = value.substr(8, 2);
        mintueServer = value.substr(10, 2);
      }
      if (hourServer && mintueServer) {
        return `${yearServer}-${monthServer}-${dayServer} ${hourServer}:${mintueServer}`;
      }
      return `${yearServer}-${monthServer}-${dayServer}`;
    },
    $$getCurrentTime() {
      let dateTime = new Date();
      return new Date(dateTime.setMonth(dateTime.getMonth()));
    }
  }
})
