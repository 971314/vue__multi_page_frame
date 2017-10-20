module.exports = {

  countDate : function (now){

    var dateArr = [];

    //日期加减
    var addDate = function(dd,dadd, active){
      var o = {};
      var day = "";
      var a = null;

      if(dd){
        a = new Date(dd);
      }else{
        a = new Date();
      }

      a = a.valueOf();
      a = a + (dadd * 24 * 60 * 60 * 1000);
      a = new Date(a);

      switch (a.getDay()){
        case 1: day = '周一'; break;
        case 2: day = '周二'; break;
        case 3: day = '周三'; break;
        case 4: day = '周四'; break;
        case 5: day = '周五'; break;
        case 6: day = '周六'; break;
        default:day = '周日'
      }

      var m = (a.getMonth() + 1)<10 ? '0' + (a.getMonth() + 1):(a.getMonth() + 1);
      var d = a.getDate()<10 ? '0' + a.getDate():a.getDate();

      o.day = day;
      o.active = active;
      o.yearMonth = a.getFullYear() + '.' + m;
      o.date = a.getDate();
      o.localDateString = a.getFullYear() + '-' + m + '-' + d;

      return o;
    }

    for(var i=-15;i<=-1;i++){
      var d = addDate(now,i,false);
      dateArr.push(d);
    }

    dateArr.push(addDate(now,0, true));

    for(var i=1;i<=15;i++){
      var d = addDate(now,i,false);
      dateArr.push(d);
    }

    return dateArr;
  },

  //获取'年月'
  getYearMonth : function(date){
    var d = null;
    if(date){
      d = new Date(date);
    }else{
      d = new Date();
    }
    var m = (d.getMonth() + 1)<10 ? '0' + (d.getMonth() + 1):(d.getMonth() + 1);
    return d.getFullYear() + '.' + m;
  },

  //获取'年月日'
  getDate : function(date){
    var d = null;
    if(date){
      d = new Date(date);
    }else{
      d = new Date();
    }
    var m = (d.getMonth() + 1)<10 ? '0' + (d.getMonth() + 1):(d.getMonth() + 1);
    var date2 = d.getDate()<10 ? '0' + d.getDate():d.getDate();
    return d.getFullYear() + '-' + m + '-' + date2;
  },

  //对象深度拷贝
  deepClone : function(initalObj) {
    var obj = {};
    try {
        obj = JSON.parse(JSON.stringify(initalObj));
        return obj;
    } catch (e) {
      throw new Error(e);
    }
  },

  /*
   * 截取 金额 中的 数字部分 和 单位部分（如：'-12.2万元' 或 '-12.2%' 或 '12.2'），
   * 如果是（'1.00%-1.25%'）这种区间的情况，则取最高值（'1.25%'）
   */
  getNumAndUnit : function(str){
    var num = '',
        unit = '',
        index = -1,
        unitFlag = false,
        haveNeg = false;
    try{
        var negIndex = str.indexOf('-');
        if(negIndex && negIndex == 0){
          //去掉字符串的 "-"
          str = str.split('-')[1];
          haveNeg = true;
        }else if(negIndex && negIndex > 0){
          str = str.split('-')[1];
          haveNeg = false;
        }
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        for(var i=0;i<str.length;i++){
          if( reg.test(str.charAt(i)) ){
            //找到一个了 中文 字符，记录中文字符的 位置索引i
            index = i;
            unitFlag = true;
            break;
          }else if(str.indexOf("%")>-1 ){
            index = str.indexOf("%");
            unitFlag = true;
            break;
          }
        }

        if(haveNeg) num = '-';

        if(unitFlag){
          num += str.substring(0,index);
        }else{
          num += str.substring(0,str.length);
        }

        if(unitFlag){
          unit = str.substring(index,str.length);
        }else{
          unit = '';
        }

        return [num,unit];

    }catch(e){
      throw new Error(e);
    }

  },

  //【国家】过滤
  filterCountry : function (value) {
      switch(value){
        case "澳大利亚": return "aodaliya";
        case "德国": return "deguo";
        case "法国": return "faguo";
        case "加拿大": return "jianada";
        case "美国": return "meiguo";
        case "欧元区": return "ouyuanqu";
        case "日本": return "riben";
        case "瑞士": return "ruishi";
        case "新西兰": return "xinxilan";
        case "意大利": return "yidali";
        case "英国": return "yingguo";
        case "中国": return "zhongguo";
        default: return "";
      }
  },

  //按照日期（从小到大）进行排序
  dateSort : function(arr){
    arr.sort(function(a, b){
      return a.date > b.date ? 1 : -1;
    });
    return arr;
  }

}
