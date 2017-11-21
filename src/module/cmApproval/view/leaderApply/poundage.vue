<template>
  <div class="pound-age-content">
    <div class="sx-f-view">
      <div class="sx-f-header">手续费</div>
      <div ref="chart" class="sx-f-charts"></div>
    </div>
    <div class="lc-sxf-view">
      <div class="lc-sxf-header">留存手续费构成对比</div>
      <div ref="chart1" class="lc-sxf-charts"></div>
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
          color: ['#fe8b6c', '#41c5ee'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
          },
          legend: {
            data: ['本月手续费', '本月留存手续费'],
            x: 'left',
            itemWidth: 20,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}(万)`
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
            name: '本月手续费',
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
              name: '本月留存手续费',
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
            data: ['手续费', '客户数量'],
            x: 'left',
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}(万)`
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
            },
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
                show: false,
                lineStyle: {
                  color: ['#e4e7f0'],
                  type: 'solid'
                }
              }
            }],
          series: [{
            yAxisIndex: 0,
            name: '手续费',
            type: 'bar'
          },
            {
              yAxisIndex: 1,
              name: '客户数量',
              type: 'bar'
            }]
        }
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      this.getLeaderDepartCharge()
      this.getLeaderLeaderDepartChargeInfo()
    },
    methods: {
      getLeaderDepartCharge() { //leaderDepartCharge查询部门出入金
        this.$$axios({
          restUrl: 'leaderDepartCharge',
          join: [this.testUserId, this.testDepartId]
        })
          .then((response) => {
//            if (response.length <= 0 || !response[0]) {
//              return
//            }
            let xArray = []
            let yArray1 = []
            let yArray2 = []
            response['CHARGE'].map((item) => {
              xArray.push(item.TX_DT)
              yArray1.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            response['RETENTIONFEE'].map((item) => {
              yArray2.push((item.DAY_ORDER / 10000).toFixed(2))
            })
            let currentOption = {
              xAxis: {
                data: xArray
              },
              series: [
                {
                  data: yArray1
                },
                {
                  data: yArray2
                }
              ]
            }
            this.myCharts.setOption(currentOption)
          })
          .catch((res) => {
            console.log(res)
          })
      },
      getLeaderLeaderDepartChargeInfo() { //leaderDepartChargeInfo查询部门留存手续费结构
        this.$$axios({
          restUrl: 'leaderDepartChargeInfo',
          join: [this.testUserId, this.testDepartId]
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              return
            }
            let xArray = []
            let yArray1 = []
            let yArray2 = []
            response.map((item) => {
              xArray.push(item.S_NAM)
              yArray1.push(item.CUST_CNT)
              yArray2.push((item.CHARGE / 10000).toFixed(2))
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
            this.myCharts1.setOption(currentOption)
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  }
</script>
