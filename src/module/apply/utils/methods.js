export default {
  methods: {
    getInfo () {
      let info
      if (pbE.isPoboApp) {
        info = JSON.parse(pbE.SYS().getPrivateData('managerInfo'))
      } else {
        info = JSON.parse(localStorage.managerInfo)
        info = {userId: '1', crmAccount: '2', name: '3', departName: '0'}
      }
      this.info['userId'] = info.userId
      this.info['crmAccount'] = info.crmAccount //工号
      this.info['userName'] = info.name //姓名
      this.info['departName'] = info.departName  //营业部
    },
    /*
    * 获取par月日期*/
    getTimeByParam (par) {
      let dateTime = new Date()
      return new Date(dateTime.setMonth(dateTime.getMonth() - par))
    },
    /*
    * 获取AddDayCount天日期*/
    GetDateStr (AddDayCount) {
      let dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)//获取AddDayCount天后的日期
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1//获取当前月份的日期
      let d = dd.getDate()
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
    $$dateInterception (value, start, stop) {
      return value.substring(start, stop)
    }
  }
}
