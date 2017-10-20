import util from './util'

module.exports = function(unit, dateArr, actualArr, forecastArr){

  //设置折线图 的偏移量
  var setPosition = function(dateArr){
    var l = dateArr.length;
    var left = '';
    var right = '';
    switch(l){
      case 2: left = '3%'; right = '10%'; break;
      case 3: left = '5%'; right = '10%'; break;
      case 4: left = '3%'; right = '10%'; break;
      case 8: left = '1%'; right = '1%'; break;
      default: left = '3%'; right = '13%'; break;
    }
    return [left,right];
  }

  //图表配置项
  var option = {

      animation:false,//取消动画效果
      title: {
          text: unit?'('+unit+')':'',
          subtext: '',
          x : 10,
          y : -3,
          textStyle: {
            fontWeight: 'normal',//标题颜色
            fontSize : 12,
            color: '#808086'
          }
      },
      //悬浮提示框
      tooltip: {
          show: true,
          trigger: 'axis',
          // 直线指示器样式设置
          axisPointer :{
            //type : 'none'
            type: 'line' ,
            lineStyle : {
              color: '#e4e7f0',
              width: 1,
              type: 'solid'
            }
          },
          padding: 5,
          //自定义显示的格式
          formatter: function (params,ticket,callback) {
            var res = params[0].axisValue + '<br/>';
            for (var i = 0, l = params.length; i < l; i++) {

              var temp =  toDecimal2(params[i].value);
              if(i==0){
                temp = '<span style="color:#FB8463">' + temp + '</span>';
              }
              res += params[i].seriesName + '&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + temp + '<br/>';
            }

            function toDecimal2(x) {
                var f = parseFloat(x);
                if (isNaN(f)) {
                  return '--';
                }
                var f = Math.round(x*100)/100;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs < 0) {
                  rs = s.length;
                  s += '.';
                }
                while (s.length <= rs + 2) {
                  s += '0';
                }
                return s;
            }

            return res;

        }

      },
      toolbox: {
          show: true,
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
          }
      },
      grid: {
        top: unit?'13%':'3%',
        left: setPosition(dateArr)[0],
        right: setPosition(dateArr)[1],
        bottom: '2%',
        containLabel: true
      },
      labelLine: {
          normal: {
              lineStyle: {
                  color: 'rgba(228, 231, 240, 0.5)'
              }
          }
      },
      itemStyle : {
          normal : {
              lineStyle:{
                  color:'#808086'
              }
          }
      },
      xAxis:  {
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show: false
          },
          boundaryGap: false,
          data: dateArr,
          //去掉X轴多出来的小竖线
          axisTick: {
            show: false
          },
          //设置坐标轴字体颜色和宽度
          axisLine:{
              lineStyle:{
                  color:'#808086',
                  width:0
              }
          },
          axisLabel:{
              textStyle:{
                fontSize:10
              },
              //interval:actualArr.length>4?1:0,//横轴坐标间隔
              interval : 'auto',
              rotate:0,//角度倾斜显示
              // margin:12
          }
      },
      yAxis: [
        {
          type: 'value',
          /*axisLabel: {
              formatter: '{value}%'
          },*/
          splitLine:{
            show: true,
            lineStyle:{
                color: ['#e4e7f0'],
                width: 1,
                type: 'solid'
            }
          },
          //去掉Y轴多出来的小竖线
          axisTick: {
            show: false
          },
          //设置坐标轴字体颜色和宽度
          axisLine:{
              lineStyle:{
                  color:'#808086',
                  width:0
              }
          },
        }
      ],
      series: [
          {
              name:'实际值',
              type:'line',
              data:actualArr,
              //从默认的空心改为实心圆
              symbol: 'circle',
              symbolSize : 4,
              //显示所有拐点
              showAllSymbol: true,
              //设置折线图颜色
              itemStyle : {
                  normal : {
                      lineStyle:{
                          width : 1,
                          color:'#FB8463'
                      }
                  }
              }
          },
          {
              name:'预期值',
              type:'line',
              data:forecastArr,
              //从默认的空心改为实心圆
              symbol: 'circle',
              symbolSize : 4,
              //显示所有拐点
              showAllSymbol: true,
              //设置折线图颜色
              itemStyle : {
                  normal : {
                      lineStyle:{
                          type : 'dashed',//显示虚线
                          width : 1,
                          color:'#2868E8'
                      }
                  }
              }
          }
      ]
  }
  
  return option;
}
