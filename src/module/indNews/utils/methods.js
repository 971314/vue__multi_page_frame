export default {
  methods: {
    getScrollTop() {
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
//文档的总高度
    getScrollHeight() {
      let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      let windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    //获取当前日期时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    },
    GetDateStr(AddDayCount) {
      let dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1;//获取当前月份的日期
      let d = dd.getDate();
      return y + "-" + m + "-" + d;
    },
    /*setReleaseTime(time) {
      let presentDate = this.getNowFormatDate(),
        timeStr = '';
      if (time) {
        if (time.substring(0, 10) == presentDate.substring(0, 10)) {
          timeStr = '今天&nbsp;' + this.$$timeFormate(time, "h:m");
        } else if (time.substring(0, 4) == presentDate.substring(0, 4) && time.substring(5, 10) != presentDate.substring(5, 10)) {
          timeStr = this.$$timeFormate(time, "M-D h:m")
        } else if (time.substring(0, 4) != presentDate.substring(0, 4)) {
          timeStr = this.$$timeFormate(time, "Y-M-D");
        }
      }
      return timeStr;
    },*/
    setReleaseTime(time) {
      let presentDate = this.getNowFormatDate(),
        timeStr = '';
      if (time) {
        if (time.substring(0, 10) == presentDate.substring(0, 10)) {
          timeStr = '今天&nbsp;' + time.substring(11, 16);
        } else if (time.substring(0, 4) == presentDate.substring(0, 4) && time.substring(5, 10) != presentDate.substring(5, 10)) {
          timeStr = time.substr(5, 5);
        } else if (time.substring(0, 4) != presentDate.substring(0, 4)) {
          timeStr = time.substr(0, 10);
        }
      }
      return timeStr;
    },
    setBodyBackground(flay) {
      if (flay == 1) {
        document.getElementsByTagName("body")[0].setAttribute("style", "background-color:white");
      } else {
        document.getElementsByTagName("body")[0].removeAttribute("style", "background-color:white");
      }
    },
    setSpecialStr(value) {
      value = value.replace(/\\u000a/g, '<br/>');
      value = value.replace(/\n/g, '<br/>');
      value = value.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
      return value;
    },
    //alert
    showMessage(msg, fun, off, type) {
      if (off) {
        if (off == 1) {
          if (msg && fun && type) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: "取消"
              },
                {
                  text: '确认',
                  click() {
                    fun(type)
                  }
                }],
            });
          } else if (msg && fun) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: "取消"
              },
                {
                  text: '确认',
                  click() {
                    fun()
                  }
                }],
            });
          }
        } else if (off == 2) {
          if (msg && fun && type) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: '确认',
                click() {
                  fun(type)
                }
              }],
            });
          } else if (msg && fun) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: '确认',
                click() {
                  fun()
                }
              }],
            });
          }
        }
      } else {
        this.$alert({
          maskClosable: true,
          message: msg,
          btns: [{
            text: '确认'
          }],
        });
      }
    },
    //时间格式化函数
    $$timeFormate(datePar, format) {
      datePar = datePar.replace(/-/g, '/');
      var date = new Date(datePar);
      var r;
      r = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        D: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        h: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        m: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        s: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      };
      for (var key in r) {
        format = new RegExp('(' + key + ')').test(format) ? format.replace(RegExp.$1, r[key]) : format;
      }
      return format;
    },
    //截取新闻内容里的’免责声明‘
    nterceptioniStr(val) {
      if (val.indexOf('免责声明') > -1) {
        val = val.substr(0, val.indexOf('免责声明') - 1);
      }
      return val;
    },
    showToast(text) {
      this.$toast(text);
    },
    newsConten(text) {
      if (text.substring(0, 10) == '<br/><br/>') {
        text = text.substring(10);
      }
      return text;
    },
    setContenWidth(dom) {
      let element = document.getElementsByClassName(dom);
      for (let i = 0; i < element.length; i++) {
        element[i].style.width = '100%';
        element[i].style.fontSize = '0';
      }
    },
    //计算元素滚动条
    calculatedcroll(el) {
      if (document.getElementById(el).clientHeight + document.getElementById(el).scrollTop == document.getElementById(el).scrollHeight || document.getElementById(el).clientHeight + 1 + document.getElementById(el).scrollTop == document.getElementById(el).scrollHeight) {
        return true
      } else {
        return false
      }
    },
    //检测元素滚动条事件
    detectScroll(el, fun) {
      document.getElementsByClassName(el)[0].addEventListener('scroll', fun);
    }
  }
}
