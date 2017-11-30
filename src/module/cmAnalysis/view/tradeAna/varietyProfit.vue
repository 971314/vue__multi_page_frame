<template>
  <div class="variety-profit-loss">
    <div class="yield-curve-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body" v-text="yieldTitle"></span>
      </common-nav>
      <div class="_pobo-select-group">
        <div class="time-select-timeline">
          数据日期:<span class="curve-time-line">20170212-20170712</span>
        </div>
        <div class="left-select-time">
          <span>近半年</span>
          <img src="../../images/tradeAna/xiala@2x.png"/>
        </div>
      </div>
    </div>
    <div class="yield-curve-center">
      <div class="yield-curve-view">
        <div v-show="echarts" class="yield-curve-chart" ref="chart"></div>
        <div class="pobo-no-data1" v-show="!echarts">
          <span class="no-data1-msg">暂无数据</span>
        </div>
      </div>
      <div class="yield-data-list">
        <div class="yield-data-header">
          关键指标
        </div>
        <div class="yield-data-item">
          <div class="data-item-title">最大盈利品种</div>
          <div class="data-item-legend">白糖</div>
          <div class="data-item-data">12,117,52</div>
        </div>
        <div class="yield-data-item">
          <div class="data-item-title">最大平今盈利品种</div>
          <div class="data-item-legend">玉米</div>
          <div class="data-item-data">17.52%</div>
        </div>
        <div class="yield-data-item">
          <div class="data-item-title">最大平昨盈利品种</div>
          <div class="data-item-legend">铜</div>
          <div class="data-item-data">12,117.52</div>
        </div>
      </div>
      <div class="yield-curve-explain">
        <div class="curve-explain-item">
          <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
          <span class="explain-item-text">平今盈亏: 日内交易盈亏</span>
        </div>
        <div class="curve-explain-item curve-explain-margin">
          <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
          <span class="explain-item-text">平昨盈亏: 隔日交易盈亏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  import moment from "moment";
  // 引入折线图
  require('echarts/lib/chart/line');
  //引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/legendScroll');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        yieldTitle: '品种盈亏',
        echarts: true,
        myCharts: null,
        basicOption: {
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff', '#a499dc', '#f78ab7', '5bcb9d', '#fea251', '#6b9feb', '#a0d468'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            },
            formatter: function (value, index) {
              for (let i = 0; i < value.length; i++) {
                if (value[i].value !== 0) {
                  return `${value[i].seriesName} : ${value[i].value}`;
                }
              }
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#606086'
            }
          },
          grid: {
            top: '12%',
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#e4e7f0'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#808086',
                fontSize: 8
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e4e7f0'],
                type: 'dashed'
              }
            }
          },
          yAxis: [
            {
              name: '万',
              type: "value",
              nameTextStyle: {
                showL: false,
                color: '#606086',
                fontSize: 8
              },
              axisLabel: {
                textStyle: {
                  color: '#606086',
                  fontSize: 8
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#e4e7f0'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#e4e7f0'],
                  type: 'solid'
                }
              }
            }],
          series: [
            {
              name: '白糖',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%',
              itemStyle: {
                normal: {
                  opacity: 1
                }
              }
            },
            {
              name: '铜',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '玉米',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '鸡蛋',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '螺纹钢',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '豆粕',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '淀粉',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '豆油',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '玻璃',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            },
            {
              name: '早稻',
              type: 'bar',
              barGap: 0,
              stack: '品种',
              barWidth: '60%'
            }
            ]
        },
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      let currentOption = {
        xAxis: {
          data: [
            '白糖',
            '铜',
            '玉米',
            '鸡蛋',
            '螺纹钢',
            '豆粕',
            '淀粉',
            '豆油',
            '玻璃',
            '早稻'
          ]
        },
        series: [
          {
            data: [
              70,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              40,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              43,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              20,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              -20,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              -25,
              0,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              -18,
              0,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              30,
              0,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              28,
              0
            ]
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              25
            ]
          }
        ]
      }
      this.myCharts.setOption(this.basicOption)
      this.myCharts.setOption(currentOption)
    }
  }
</script>
