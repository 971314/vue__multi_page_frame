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

  //按照日期（从小到大）进行排序
  dateSort : function(arr, attr){
    arr.sort(function(a, b){
      return a[attr] < b[attr] ? -1 : 1;
    });
    return arr;
  },

    //获取'月日' 和 '时分'
    getDateDIY : function(date){

      var d = null;
      if(date){
        //将日期中的 - 替换成 / ，因为ios浏览器不支持 带 - 日期格式的转换
        date = date.replace(/-/g,"/")
        if(date.indexOf('.') >= 0){
          date = date.substring(0,date.indexOf('.'));
        }
        console.log(date);
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
    },

    //按照字母排序，并且'#'放最后
    sortGroupDIY(list){
          var cList = [];
          var index = 0;
          var hasOther = null;
          if (list) {
            for (var i in list) {
              if(i=="#"){
                hasOther = {'pinyin': i, 'data': list[i]};
                continue;
              }else{
                cList[index] = {'pinyin': i, 'data': list[i]};
              }
              index++;
            }
            //按照字母顺序排序
            cList.sort(function(m,n){    
                var s = m.pinyin;    
                var e = n.pinyin;    
                if(s>e){    
                    return 1    
                }else if(s<e){    
                    return -1;    
                }else{    
                    return 0;    
                }    
            }); 
            if(hasOther){
               cList.push(hasOther);
            }
            return cList;
          }
    }

}
