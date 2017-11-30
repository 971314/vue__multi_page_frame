<template>
    <div class="pobo-bail-bunds">
      <div class="yield-curve-header">
        <common-nav :search="false" :message="false" :service="false" :goback="false"
                    :gobackUrl="gobackUrl">
          <span slot="body" v-text="yieldTitle"></span>
        </common-nav>
        <div class="_pobo-select-group">
          <div class="left-select-item">
            <span>本月</span>
            <img src="../../images/tradeAna/xiala@2x.png"/>
          </div>
          <div class="right-select-item">
            <span>全部品种</span>
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
        <div class="yield-curve-explain">
          <div class="curve-explain-item">
            <img src="../../images/tradeAna/dengpaotishi@2x.png" class="explain-item-img" />
            <span class="explain-item-text">保证资金回报率=纯利/每轮最大保证金占用</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  import moment from "moment";
  //引入散点图
  require('echarts/lib/chart/scatter');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/legendScroll');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        yieldTitle: '保证金回报率散点',
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
            right: '2%',
            bottom: '27',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name: '交易轮数',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
              color: '#808086',
              fontSize: 12
            },

            axisLabel: {
              textStyle: {
                color: '#808086',
                fontSize: 8
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
            name: '交易轮数',
            type: 'scatter',
            symbol: 'circle', //正方形
            symbolSize: 7, //点的大小
            large: false,
            label: {
              emphasis: {
                show: true,
                position: 'left',
                textStyle: {
                  color: 'blue',
                  fontSize: 16
                }
              }
            }
          }]
        },
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      let currentOption = {
        series: [
          {
            data: [
              [0.1,10.12],
              [0.2,15.92],
              [0.3,18.92],
              [0.4,12.92],
              [0.5,16.92],
              [0.6,13.22],
              [0.7,12.92],
              [0.8,11.32],
              [0.9,15.92],
              [1.0,13.92],
              [1.1,11.92],
              [1.2,18.92],
              [1.3,17.92],
              [1.4,16.92],
              [1.5,15.02]
            ]
          }
        ]
      }
      this.myCharts.setOption(this.basicOption)
      this.myCharts.setOption(currentOption)
    }
  }
</script>
