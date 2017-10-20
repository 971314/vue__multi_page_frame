/**
 * Created by pobo on 2017/9/8.
 */
function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
function reviseFileSize(value) {
  value = (value / 1024).toFixed(2);
  return value + 'KB';
}
function $$timeFormate(datePar, format) {     //时间格式化函数
  datePar = datePar.replace(/-/g,'/');
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
}

function setTitle(value) {
  value = value + '';
  value = value.substr(6);
  return value;
}

var HTTP_INFO = {
  activity: 'http://192.168.6.52:8890/poboactivityapp/1_0',
  newsUrl: 'http://pbzx1.pobo.net.cn/HdNews2/Web/Hd_NewsContent.aspx',
  serverUrl: 'http://pbnetserver.pobo.net.cn:8989/'
};
