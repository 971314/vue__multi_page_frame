<template>
  <div class="pay-ment-content">
    <div class="crj-db-view">
      <div class="crj-db-header">出入金对比</div>
      <div ref="chart1" class="crj-db-charts"></div>
    </div>
    <div class="j-rj-view">
      <div class="j-rj-header">净入金</div>
      <div ref="chart" class="j-rj-charts"></div>
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
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        myCharts: null,
        myCharts1: null,
        basicOption: {
          color: ['#fe8b6c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['本月净入金'],
            x: 'left',
            itemWidth: 20,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}(万) 273.22`
            }
          },
          grid: {
            top: '13%',
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
              scale: true,
              splitNumber: 5,
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
            name: '本月净入金',
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
        basicOption1: {
          color: ['#fe8b6c', '#41c5ee'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['本月入金', '本月出金'],
            x: 'left',
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}(万) 273.22`
            }
          },
          grid: {
            top: '13%',
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
            }],
          series: [{
            name: '本月入金',
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                opacity: 0.5
              }
            }
          },
            {
              name: '本月出金',
              type: 'bar',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              }
            }]
        }
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      this.getLeaderDepartFundInfo()
    },
    methods: {
      getLeaderDepartFundInfo() { //leaderDepartFundInfo查询部门出入金
        this.$$axios({
          restUrl: 'leaderDepartFundInfo',
          join: [this.testUserId, this.testDepartId]
        })
          .then((response) => {
//            if (response.length <= 0 || !response[0]) {
//              return
//            }
            let xArray = []
            let xArray1 = []
            let yArray1 = []
            let yArray2 = []
            let yArray3 = []
            response['GOLD'].map((item) => {
              xArray.push(item.TX_DT)
              yArray1.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            response['DEPOSIT'].map((item) => {
              yArray2.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            response['NETDEPOSIT'].map((item) => {
              xArray1.push(item.TX_DT)
              yArray3.push((item.DAY_ORDER / 10000).toFixed(2))
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
                  data: yArray1
                }
              ]
            }
            let currentOption1 = {
              xAxis: {
                data: xArray1
              },
              series: [
                {
                  data: yArray3
                }
              ]
            }
            this.myCharts1.setOption(currentOption)
            this.myCharts.setOption(currentOption1)
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  }
</script>
