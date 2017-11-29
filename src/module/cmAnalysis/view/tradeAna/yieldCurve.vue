<template>
  <div class="pobo-yield-curve">
    <div class="yield-curve-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body" v-text="yieldTitle"></span>
      </common-nav>
      <div class="_pobo-select-group">
        <div class="left-select-item">
          <span>近半年</span>
          <img src="../../images/tradeAna/xiala@2x.png"/>
        </div>
        <div class="right-select-item">
          <span>白糖</span>
          <img src="../../images/tradeAna/xiala@2x.png"/>
        </div>
      </div>
    </div>
    <div class="yield-curve-center">
      <div class="yield-curve-time">
        数据日期:<span class="curve-time-line">2017/10/05-1017/11/05</span>
      </div>
      <div class="yield-curve-view">
        <div v-show="echarts" class="yield-curve-chart" ref="chart"></div>
        <div class="pobo-no-data1" v-show="!echarts">
          <span class="no-data1-msg">暂无数据</span>
        </div>
      </div>
      <div class="yield-curve-pointer">
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color1"></div>
          <span class="pointer-item-text">累计收益率</span>
        </div>
        <div class="zhanwei-pointer"></div>
        <div class="curve-pointer-item">
          <div class="pointer-item-cicle pointer-item-color2"></div>
          <span class="pointer-item-text">本期盈亏</span>
        </div>
      </div>
      <div class="yield-data-list">
        <div class="yield-data-header">
          关键指标
        </div>
        <div class="yield-data-item">
          <div class="data-item-title">最高收益率</div>
          <div class="data-item-data">17.52%</div>
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
        yieldTitle: '收益率曲线',
        echarts: true,
        myCharts: null,
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
            },
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
                show: false,
                lineStyle: {
                  color: ['#e4e7f0'],
                  type: 'solid'
                }
              }
            }],
          series: [{
            name: '成交金额',
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
              name: '成交量',
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
    }
  }
</script>
