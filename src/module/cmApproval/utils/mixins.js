import Vue from 'vue'
import urlList from '../config'
import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['id'] = '123456'
Vue.mixin({
  data () {
    return {
      mixinTest: 'mixin测试',
      info: {
        userId: '',
        crmAccount: '',//.工号
        userName: '',//姓名
        departName: '',//营业部
        token: '',
        departId: '',
        accountType: ''
      },
      urlList: urlList,
      cPbeUrl: 'conf/h5/',
      cPcUrl: '../conf/h5/'
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    $$axios ({restUrl = '', join = [], options = {}, loading = false} = {}) {
      if (!restUrl) return ''
      loading && this.$$loading()
      let getUrl, jsonUrl, hostUrl = '', joinString = '', count = 0
      let tempOption = {
        // timeout: 10000,
        headers: {
          id: this.info.token
        }
      }
      jsonUrl = PBHttpServer.cmApproval.serverUrl

      // jsonUrl = 'http://192.168.6.49:8080/pobocmhelperapp/0.0.1/pc/'
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

      function isEmptyObject (obj) {
        for (let key in obj) {
          return false
        }
        return true
      }
      getUrl = join.length > 0 ? `${hostUrl}${urlList[restUrl].url}${joinString}` : `${hostUrl}${urlList[restUrl].url}`
      return new Promise((resolve, reject) => {
        if (isEmptyObject(options)) {
          axios[urlList[restUrl].type.toLowerCase()](getUrl, tempOption)
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
        } else {
          axios[urlList[restUrl].type.toLowerCase()](getUrl, Object.assign({}, options), tempOption)
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
        }
      })
    },
    $$loading () {
      //loading开始
      this.$loading.toggle('')
    },
    $$loaded () {
      //loading结束
      this.$loading.hide()
    },
    $$getCurrentTime () {
      let dateTime = new Date()
      return new Date(dateTime.setMonth(dateTime.getMonth()))
    },
    /*
     * 获取登录信息*/
    getInfo () {
      let info = pbE.isPoboApp ? pbE.SYS().getPrivateData('managerInfo') ? JSON.parse(pbE.SYS().getPrivateData('managerInfo')) : '' : sessionStorage.managerInfo ? JSON.parse(sessionStorage.managerInfo) : ''
      // let info = JSON.parse(pbE.isPoboApp ? pbE.SYS().getPrivateData('managerInfo') : sessionStorage.managerInfo)
      this.info['userId'] = info.userId
      // this.info['userId'] = '80000001'
      this.info['crmAccount'] = info.crmAccount //工号
      this.info['userName'] = info.name //姓名
      this.info['departName'] = info.departName  //营业部
      this.info['token'] = info.token
      this.info['departId'] = info.departId
      // this.info['accountType'] = 'C'
      this.info['accountType'] = info.accountType//登录账户类型
    },
    /*
     * 获取par前个月日期*/
    getTimeByParam (par) {
      let dateTime = new Date()
      return new Date(dateTime.setMonth(dateTime.getMonth() - par))
    },
    /*
     * 获取par个月日期*/
    getTimeParam (par) {
      let dateTime = new Date()
      return new Date(dateTime.setMonth(dateTime.getMonth() + par))
    },
    /*
     * 获取AddDayCount天日期*/
    GetDateStr (AddDayCount) {
      let dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)//获取AddDayCount天后的日期
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1//获取当前月份的日期
      let d = dd.getDate().toString().length < 2 ? '0' + dd.getDate() : dd.getDate()
      return y + '-' + m + '-' + d
    },
    /*
     * 时间格式化函数*/
    $$timeFormate ({date = new Date(), format = 'Y-M-D h:m:s', week = 0} = {}) {
      let r, wk, wk1
      if (Object.prototype.toString.call(date) === '[object String]'
      ) {
        date = date.replace(/-/g, '/') //解决ios上不兼容new Date('2017-01-01')
      }
      if(date.indexOf('.') >= 0){
        date = date.substring(0,date.indexOf('.')); //过滤掉 小数点以及 小数点后面的 字符
      }
      date = new Date(date);
      [wk, wk1] = [['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()], ['周天', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]]
      r = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        D: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        wk: Object.is(week, 0) ? wk : wk1,
        h: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        m: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
        s: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
        ms: date.getMilliseconds() < 10 ? `00${date.getMilliseconds()}` : (date.getMilliseconds() < 99 ? `0${date.getMilliseconds()}` : date.getMilliseconds())
      }
      for (let [k, v] of Object.entries(r)) {
        format = new RegExp(`(${k})`).test(format) ? format.replace(RegExp.$1, v) : format
      }
      return format
    },
    /*
     * 日期戳转换s:-*/
    $$getTimeFmt (value, s) {
      value = value + ''
      let yearServer = value.substr(0, 4)
      let monthServer = value.substr(4, 2)
      let dayServer = value.substr(6, 2)
      let hourServer = value.substr(8, 2)
      let minuteServer = value.substr(10, 2)
      let secondServer = value.substr(12, 2)
      if (yearServer && monthServer && dayServer && hourServer && minuteServer && secondServer) {
        return `${yearServer}${s}${monthServer}${s}${dayServer} ${hourServer}:${minuteServer}:${secondServer}`
      } else if (yearServer && monthServer && dayServer && hourServer && minuteServer) {
        return `${yearServer}${s}${monthServer}${s}${dayServer} ${hourServer}:${minuteServer}`
      } else if (yearServer && monthServer && dayServer) {
        return `${yearServer}${s}${monthServer}${s}${dayServer}`
      }
    },
    /*
     * 截取数据*/
    $$dateInterception (value, start, stop) {
      return value.substring(start, stop)
    },
    /*
     * 数字加逗号(去掉尾部多余的0)*/
    $$comma (parm, n = 3) {
      parm = Number((parm || 0)).toString()  //使用Number强转一下再toString
      let integer = ``,
        isNegativeNumber = false,
        decimal = ``,
        result = ``
      isNegativeNumber = parm / 1 > 0 ? false : true
      parm = parm.replace('-', '')
      integer = parm.split(`.`)[0]
      if (parm.split(`.`).length > 1) {
        decimal = parm.split(`.`)[1]
      }
      while (integer.length > 3) {
        result = `,${integer.slice(-n)}${result}`
        integer = integer.slice(0, integer.length - 3)
      }
      if (integer) {
        result = decimal ? `${integer}${result}.${decimal}` : `${integer}${result}`
      }

      if (isNegativeNumber && (parm / 1) != 0) {
        result = `-${result}`
      }
      return result
    },
    /*
     * 指标数值：默认保留两位小数，整数不保留，三位一逗号
     单位根据数值大小而定，默认保留两位小数：
     大于等于5位数，小于9位数：单位“万”
     大于等于9位数：单位“亿”
     //数字单位转换(万/亿/个位数不加小数点)*/
    $$transformData (data) {
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
      data = data.replace('-', '')
      integer = data.split(`.`)[0]

      if (data.split(`.`).length > 1) {
        decimal = data.split(`.`)[1]
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
    /*
     * 柱形图计算
     * data 计算数据
     * data1 依据数据*/
    calculationPercentage (data, data2) {
      return (100 / data2 * data) + '%'
    },
    /*
     *图片预览
     */
    imgModal (url) {
      this.$alert({
        maskClosable: true,
        message: '<img class="imgView" src="' + PBHttpServer.cmHelper.serverUrl + this.urlList.imageView.url + this.info.userId + '/' + url + '"/>',
        title: '预览'
      })
    },
    /*
     * 保留n位小数*/
    decimalPlaceReserved (data, n) {
      return Number(data).toFixed(n)
    },
    /*
     * 姓名截取5位 字符，后面显示...*/
    cutName (s) {
      if(!s){ return ""; }
      if(s.length > 5){
        return s.substring(0,5) + '...';
      }else{
        return s;
      }
    }
  }
})
