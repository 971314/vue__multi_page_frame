<template>
  <div class="pobo-rehab-funds">
    <div class="yield-curve-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body" v-text="yieldTitle"></span>
      </common-nav>
      <div class="_pobo-select-group">
        <div class="time-select-timeline">
          数据日期:<span class="curve-time-line">2017/02/12-2017/07/12</span>
        </div>
        <div class="left-select-time">
          <span>自定义</span>
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
      <div class="yield-curve-pointer">
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color1"></div>
          <span class="pointer-item-text">出入金</span>
        </div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color2"></div>
          <span class="pointer-item-text">累计出入金</span>
        </div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color3"></div>
          <span class="pointer-item-text">原始资金</span>
        </div>
      </div>
      <div class="yield-curve-pointer">
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color4"></div>
          <span class="pointer-item-text">复权资金</span>
        </div>
      </div>
      <div class="yield-curve-explain">
        <div class="curve-explain-item">
          <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
          <span class="explain-item-text">复权资金: 根据投资者盈亏和累计出入金情况, 对投资者的资金进行复权。<br />如投资者为净入金, 则投资者起始资金调整为初始资金 + 累计进入金;<br />如投资者为净出金,则每日资金调整为当日资金+累计出入金;<br />如客户频繁出入金, 根据客户盈亏情况和出入金情况综合判断, 给客户人工设置一个初始资金。</span>
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

  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/legendScroll');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        yieldTitle: '复权资金曲线',
        echarts: true,
        myCharts: null,
        basicOption: {
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#808086'
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
            axisLabel: {
              textStyle: {
                color: '#808086',
                fontSize: 8
              },
              formatter: function (value, index) {
                return moment(value).format('YYYY-MM')
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#e4e7f0'
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
                color: '#808086',
                fontSize: 8
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
          series: [{
            name: '出入金',
            type: 'line',
            symbol: 'circle',
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
            {
              name: '累计出入金',
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: '原始资金',
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: '复权资金',
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }]
        },
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      let currentOption = {
        xAxis: {
          data: [
            '2016-07-01',
            '2016-07-02',
            '2016-07-03',
            '2016-07-04',
            '2016-07-05',
            '2016-07-06',
            '2016-07-07',
            '2016-07-08',
            '2016-07-09',
            '2016-07-10',
            '2016-07-11',
            '2016-07-12',
            '2016-07-13',
            '2016-07-14',
            '2016-07-15',
            '2016-07-16',
            '2016-07-17',
            '2016-07-18'
          ]
        },
        series: [
          {
            data: [
              10.12,
              15.92,
              18.92,
              12.92,
              16.92,
              13.22,
              12.92,
              11.32,
              15.92,
              13.92,
              11.92,
              18.92,
              17.92,
              16.92,
              15.02,
              14.22,
              12.32,
              19.02,
            ]
          },
          {
            data: [
              17.12,
              17.92,
              16.92,
              15.92,
              18.92,
              17.22,
              17.92,
              17.32,
              17.92,
              14.92,
              16.92,
              19.92,
              12.92,
              15.92,
              17.02,
              18.22,
              15.32,
              17.02,
            ]
          },
          {
            data: [
              -17.12,
              10.92,
              13.92,
              -6.92,
              8.92,
              15.22,
              19.92,
              18.32,
              12.92,
              11.92,
              14.92,
              18.92,
              19.92,
              -17.92,
              12.02,
              13.22,
              11.32,
              10.02,
            ]
          },
          {
            data: [
              19.12,
              11.92,
              16.92,
              10.92,
              18.92,
              12.22,
              17.92,
              19.32,
              9.92,
              8.92,
              16.92,
              18.92,
              -12.92,
              -15.92,
              -17.02,
              14.22,
              19.32,
              -17.02,
            ]
          }
        ]
      }
      this.myCharts.setOption(this.basicOption)
      this.myCharts.setOption(currentOption)
    }
  }
</script>
