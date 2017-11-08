module.exports = {
  
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

  //根据日期分组
  sortGroup : function(arr,type){

    var cities = [];

    if(type==0){
        for (var i = 0; i < arr.length; i++) {
          if ( cities[this.getDate(arr[i].PROBLEM_PROCESS_DT)] ) {
              cities[this.getDate(arr[i].PROBLEM_PROCESS_DT)].push(arr[i])
          }
          else {
              cities[this.getDate(arr[i].PROBLEM_PROCESS_DT)] = [arr[i]]
          }
      }
    }else{
        for (var i = 0; i < arr.length; i++) {
          if ( cities[this.getDate(arr[i].UPDT)] ) {
              cities[this.getDate(arr[i].UPDT)].push(arr[i])
          }
          else {
              cities[this.getDate(arr[i].UPDT)] = [arr[i]]
          }
      }
    }

    var cList = [];
    var index = 0;
    for (var i in cities) {
        cList[index] = {'date':i,data:cities[i]};
        index ++;
    }

    return cList;
  }

}
