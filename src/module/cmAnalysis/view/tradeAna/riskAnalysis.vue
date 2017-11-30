<template>
    <div class="pobo-risk-analysis">
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
            <div class="data-item-title">最高风险度</div>
            <div class="data-item-data">00.00%</div>
          </div>
          <div class="yield-data-item">
            <div class="data-item-title">最低风险度</div>
            <div class="data-item-data">00.00%</div>
          </div>
          <div class="yield-data-item">
            <div class="data-item-title">日均风险度</div>
            <div class="data-item-data">00.00</div>
          </div>
          <div class="yield-data-item">
            <div class="data-item-title">有交易日均风险度</div>
            <div class="data-item-data">00.00</div>
          </div>
        </div>
        <div class="yield-curve-explain">
          <div class="curve-explain-item">
            <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
            <span class="explain-item-text">风险度指标= 公司保证金/权益</span>
          </div>
          <div class="curve-explain-item curve-explain-margin">
            <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
            <span class="explain-item-text">日均风险度指标= AVG(风险度指标)</span>
          </div>
          <div class="curve-explain-item curve-explain-margin">
            <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
            <span class="explain-item-text">有交易日= 当日有持仓或有成交</span>
          </div>
          <div class="curve-explain-item curve-explain-margin">
            <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
            <span class="explain-item-text">有交易日均风险度指标= AVG(有交易日风险度指标)</span>
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
          yieldTitle: '风险度分析',
          echarts: true,
          myCharts: null,
          basicOption: {
            color: ['#fe8b6c'],
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
              name: '风险度',
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
            }
          ]
        }
        this.myCharts.setOption(this.basicOption)
        this.myCharts.setOption(currentOption)
      }
    }
</script>
