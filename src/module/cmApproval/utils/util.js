module.exports = {
  
  //获取'年月日'
  getDate : function(date){
    var d = null;
    if(date){
      //将日期中的 - 替换成 / ，因为ios浏览器不支持 带 - 日期格式的转换
      date = date.replace(/-/g,"/")
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

  //根据日期分组
  sortGroup : function(arr,type){
    var map = {},
       dest = [];
      for(var i = 0; i < arr.length; i++){
        var ai = arr[i];
            ai.date = type==0 ? this.getDate(ai.PROBLEM_PROCESS_DT) : this.getDate(ai.UPDT)
        if(!map[ai.date]){
            dest.push({
                date: ai.date,
                data: [ai]
            });
            map[ai.date] = ai;
        }else{
            for(var j = 0; j < dest.length; j++){
                var dj = dest[j];
                if( dj.date == ai.date ){
                    dj.data.push(ai);
                    break;
                }
            }
        }
      }
    return dest;
  },

  //跟进类型名称 映射成 跟进code
  followTypeToCode : function(type){
    switch(type){
      case "日常事务": return "01";
      case "行情推送": return "02";
      case "答疑解惑": return "03";
      case "经验指导": return "04";
      case "持仓异常查询": return "05";
      case "下单错误投诉": return "06";
    }
  },

  //跟进code 映射成 跟进类型名称
  followCodeToType : function(code){
    switch(code){
      case "01": return "日常事务";
      case "02": return "行情推送";
      case "03": return "答疑解惑";
      case "04": return "经验指导";
      case "05": return "持仓异常查询";
      case "06": return "下单错误投诉";
    }
  },

  //按照日期（从大到小）进行排序
  dateSort : function(arr){
    arr.sort(function(a, b){
      return a.date > b.date ? -1 : 1;
    });
    return arr;
  },

  //日期加减
    addDate : function(dd,dadd){
      var a = null;

      if(dd){
        a = new Date(dd);
      }else{
        a = new Date();
      }

      a = a.valueOf();
      a = a + (dadd * 24 * 60 * 60 * 1000);
      a = new Date(a);

      var m = (a.getMonth() + 1)<10 ? '0' + (a.getMonth() + 1):(a.getMonth() + 1);
      var d = a.getDate()<10 ? '0' + a.getDate():a.getDate();

      return a.getFullYear() + '-' + m + '-' + d;
    },
    //获取'月日' 和 '时分'
    getDateDIY : function(date){
      var d = null;
      if(date){
        //将日期中的 - 替换成 / ，因为ios浏览器不支持 带 - 日期格式的转换
        date = date.replace(/-/g,"/")
        d = new Date(date);
      }else{
        d = new Date();
      }
      var m = (d.getMonth() + 1)<10 ? '0' + (d.getMonth() + 1):(d.getMonth() + 1);
      var date2 = d.getDate()<10 ? '0' + d.getDate():d.getDate();
      var getHours = d.getHours()<10 ? '0' + d.getHours():d.getHours();
      var getMinutes = d.getMinutes()<10 ? '0' + d.getMinutes():d.getMinutes();
      var DIY1 = m + '-' + date2;
      var DIY2 = getHours + ':' + getMinutes;
      return [DIY1, DIY2];
    }

}
