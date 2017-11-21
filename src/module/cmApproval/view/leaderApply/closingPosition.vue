<template>
  <div class="close-position-content">
    <div class="cj-cc-view">
      <div class="cj-cc-header">成交持仓</div>
      <div ref="chart" class="cj-cc-charts"></div>
    </div>
    <div class="cc-jg-view">
      <div class="cc-jg-header">持仓结构</div>
      <div class="cc-jg-group">
        <div class="cc-left-chart">
          <div class="cc-tab-group">
            <div class="cc-tab-wrapper">
              <div class="cc-tab-item" :class="{'cc-tab-selected': nowIndex == 1}"
                   @click="changeType('E', 1)">
                按交易所
              </div>
              <div class="cc-tab-item" :class="{'cc-tab-selected': nowIndex == 2}"
                   @click="changeType('P', 2)">
                按品种
              </div>
            </div>
          </div>
          <div ref="chart1" class="cc-jg-charts"></div>
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
  //引入饼状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/legendScroll');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        myCharts: null,
        myCharts1: null,
        nowIndex: 2,
        isclick: true,
        type: 'P',
        basicOption: {
          color: ['#fe8b6c', '#fe8b6c', '#41c5ee', '#41c5ee'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['本月成交金额', '本月成交量', '', '本月持仓金额', '本月持仓量'],
            x: 'left',
            itemWidth: 20,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}`
            }
          },
          grid: {
            top: '22%',
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
                return moment(value).format('YYYY-MM-DD')
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
            name: '本月成交金额',
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
              name: '本月成交量',
              type: 'bar',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              },
              yAxisIndex: 1
            },
            {
              name: '本月持仓金额',
              type: 'line',
              yAxisIndex: 0,
              symbol: 'circle',
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: '本月持仓量',
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
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff', '#a499dc', '#f78ab7', '#5bcb9d'],
          legend: {
            orient: 'vertical',
            right: 30,
            top: 'middle',
            bottom: 20,
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 13
            }
          },
          grid: {
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          series: [
            {
//              name: '访问来源',
              type: 'pie',
              radius: ['35%', '50%'],
              center: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      this.getLeaderDepartPosition()
      this.getLeaderDepartPositionInfo()
    },
    methods: {
      changeType(str, index) {
        if (!this.isclick) {
          return
        }
        this.isclick = false
        this.nowIndex = index
        this.type = str
        this.getLeaderDepartPositionInfo()
      },
      getLeaderDepartPosition() { //leaderDepartPosition查询部门成交持仓
        this.$$axios({
          restUrl: 'leaderDepartPosition',
          join: [this.testUserId, this.testDepartId]
        })
          .then((response) => {
//            if (response.length <= 0 || !response[0]) {
//              return
//            }
            let xArray = []
            let yArray1 = []
            let yArray2 = []
            let yArray3 = []
            let yArray4 = []
            response['HOLD_SUM'].map((item) => { //持仓金额
              xArray.push(item.TX_DT)
              yArray1.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            response['TURNVOLUME'].map((item) => { //成交金额
              yArray2.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            response['HOLD_CNT'].map((item) => {  //持仓量
              yArray3.push(item.DAY_ORDER)
            })
            response['VOLUME'].map((item) => {  //成交手数
              yArray4.push(item.DAY_ORDER)
            })
            let currentOption = {
              xAxis: {
                data: xArray
              },
              series: [
                {
                  data: yArray2
                },
                {
                  data: yArray4
                },
                {
                  data: yArray1
                },
                {
                  data: yArray3
                }
              ]
            }
            this.myCharts.setOption(currentOption)
          })
          .catch((res) => {
            console.log(res)
          })
      },
      getLeaderDepartPositionInfo() { //leaderDepartPositionInfo查询部门成交持仓结构
        this.$$axios({
          restUrl: 'leaderDepartPositionInfo',
          join: [this.testUserId, [this.testDepartId, ['type', this.type]]]
        })
          .then((response) => {
            this.isclick = true
            if (response.length <= 0 || !response[0]) {
              return
            }
            console.log(response, 'response')
            let xArray = []
            let yArray = []
            let currentOption
            response.map((item, index) => {
              xArray.push(item.PRODUCT_NAM)
              yArray.push({
                value: item.HOLD_CNT,
                name: item.PRODUCT_NAM
              })
            })
            if (xArray.length <= 7) {
              currentOption = {
                legend: {
                  data: xArray
                },
                series: [
                  {
                    data: yArray
                  }
                ]
              }
            } else {
              currentOption = {
                legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 0,
                  top: 'middle',
                  bottom: 0,
                  itemWidth: 7,
                  itemHeight: 7,
                  pageIconColor: '#808086',
                  pageIconInactiveColor: '#c0c6cd',
                  pageIconSize: '10',
                  pageButtonItemGap: 7,
                  textStyle: {
                    color: '#808086',
                    fontSize: 13
                  },
                  data: xArray
                },
                series: [
                  {
                    data: yArray
                  }
                ]
              }
            }
            console.log(currentOption, 'currentOption')
            this.myCharts1.setOption(currentOption)
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  }
</script>
