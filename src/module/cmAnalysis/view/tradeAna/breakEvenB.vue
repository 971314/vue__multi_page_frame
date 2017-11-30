<template>
  <div class="break-evenb-analysis">
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
      <div class="yield-curve-pointer">
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color1"></div>
          <span class="pointer-item-text">盈亏比</span>
        </div>
        <div class="zhanwei-pointer"></div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color2"></div>
          <span class="pointer-item-text">盈亏</span>
        </div>
      </div>
      <div class="yield-curve-view yield-curve-view1">
        <div v-show="echarts1" class="yield-curve-chart" ref="chart1"></div>
        <div class="pobo-no-data1" v-show="!echarts1">
          <span class="no-data1-msg">暂无数据</span>
        </div>
      </div>
      <div class="yield-curve-pointer yield-curve-pointer1">
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color1"></div>
          <span class="pointer-item-text">平昨盈亏比</span>
        </div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color2"></div>
          <span class="pointer-item-text">平今盈亏比</span>
        </div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color3"></div>
          <span class="pointer-item-text">盈亏比</span>
        </div>
      </div>
      <div class="yield-curve-explain">
        <div class="curve-explain-item">
          <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
          <span class="explain-item-text">平今盈亏比= 日内仓盈利率总额/ (-日内仓亏损总额) * 100%</span>
        </div>
        <div class="curve-explain-item curve-explain-margin">
          <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
          <span class="explain-item-text">平昨盈亏比= 隔日仓盈利率总额/ (-隔日仓亏损总额) * 100%</span>
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
        yieldTitle: '盈亏比分析',
        echarts: true,
        echarts1: true,
        myCharts: null,
        myCharts1: null,
        basicOption: {
          color: ['#fe8b6c', '#41c5ee'],
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
//          legend: {
//            data: ['成交金额', '成交量'],
//            x: 'left',
//            itemWidth: 20,
//            itemHeight: 7,
//            selectedMode: false,
//            textStyle: {
//              color: '#808086',
//              fontSize: 10
//            },
//            formatter: function (name) {
//              if (name == '成交金额') {
//                return `${name}(万)`
//              } else {
//                return name
//              }
//            }
//          },
          grid: {
            top: '11%',
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
              name: '%',
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
            },
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
                show: false,
                lineStyle: {
                  color: ['#e4e7f0'],
                  type: 'solid'
                }
              }
            }],
          series: [{
            name: '盈亏比',
            type: 'line',
            symbol: 'circle',
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
            {
              name: '盈亏',
              type: 'bar',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              },
              yAxisIndex: 1
            }]
        },
        basicOption1: {
          color: ['#fe8b6c', '#41c5ee', '#fbc647'],
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
            top: '11%',
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
              name: '%',
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
            name: '平昨盈亏比',
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
              name: '平今盈亏比',
              type: 'line',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              },
            },
            {
              name: '盈亏比',
              type: 'line',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              },
            }
            ]
        }
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
          }
        ]
      }
      this.myCharts.setOption(this.basicOption)
      this.myCharts.setOption(currentOption)

      this.myCharts1 = echarts.init(this.$refs.chart1)
      let currentOption1 = {
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
              11.12,
              12.92,
              13.92,
              14.92,
              15.92,
              16.22,
              17.92,
              18.32,
              19.92,
              15.92,
              17.92,
              16.92,
              10.92,
              12.92,
              14.02,
              16.22,
              17.32,
              19.02,
            ]
          }
        ]
      }
      this.myCharts1.setOption(this.basicOption1)
      this.myCharts1.setOption(currentOption1)
    }
  }
</script>
