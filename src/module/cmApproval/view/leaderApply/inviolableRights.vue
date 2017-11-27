<template>
  <div class="inviolable-rights-content">
    <div class="qy-bzj-view">
      <div class="qy-bzj-header">权益与保证金</div>
      <div v-show="echarts1" ref="chart" class="qy-bzj-charts"></div>
      <div class="pobo-no-data1" v-show="!echarts1">
        <span class="no-data1-msg">暂无数据</span>
      </div>
    </div>
    <div class="khqy-db-view">
      <div class="khqy-db-header">客户权益对比</div>
      <div ref="chart1" v-show="echarts2" class="khqy-db-charts"></div>
      <div class="pobo-no-data1" v-show="!echarts2">
        <span class="no-data1-msg">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
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
        echarts1: true,
        echarts2: true,
        basicOption: {
          color: ['#fe8b6c', '#41c5ee'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          legend: {
            data: ['期末权益', '期末保证金'],
            x: 'left',
            itemWidth: 20,
            itemHeight: 7,
            selectedMode: false,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              return `${name}(万)`
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#808086'
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
            name: '期末权益',
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
              name: '期末保证金',
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
              type: 'line'
            }
          },
          legend: {
            data: ['权益', '客户数量'],
            x: 'left',
            itemWidth: 7,
            itemHeight: 7,
            selectedMode: false,
            textStyle: {
              color: '#808086',
              fontSize: 10
            },
            formatter: function (name) {
              if (name == '权益') {
                return `${name}(万)`
              } else {
                return name
              }
//              return `${name}(万)`
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#808086'
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
            name: '权益',
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                opacity: 0.5
              }
            }
          },
            {
              yAxisIndex: 1,
              name: '客户数量',
              barGap: 0,
              itemStyle: {
                normal: {
                  opacity: 0.5
                }
              },
              type: 'bar'
            }]
        }
      }
    },
    computed: {
      ...mapState({
        departId: ({others}) => others.departId
      })
    },
    activated() {
      this.echarts1 = true
      this.echarts2 = true
      this.$parent.nowIndex = 1
      this.getLeaderDepartEquity()
      this.getLeaderDepartEquityInfo()
    },
    methods: {
      getLeaderDepartEquity() { //leaderDepartEquity查询部门权益
        this.$$axios({
          restUrl: 'leaderDepartEquity',
          join: [this.info.userId, this.departId],
          loading: true
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              this.echarts1 = false
              return
            }
            this.$forceUpdate()
            this.echarts1 = true
            this.myCharts = echarts.init(this.$refs.chart)
            this.myCharts.setOption(this.basicOption)

            let xArray = []
            let yArray1 = []
            let yArray2 = []
            response.map((item) => {
              xArray.push(item.TX_DT)
              yArray1.push(item.DEPOSIT.toFixed(2))
              yArray2.push(item.RI_AMT.toFixed(2))
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
            this.myCharts.setOption(currentOption)
          })
          .catch((res) => {
            this.echarts1 = false
            console.log(res)
          })
      },
      getLeaderDepartEquityInfo() { //leaderDepartEquityInfo查询部门权益结构
        this.$$axios({
          restUrl: 'leaderDepartEquityInfo',
          join: [this.info.userId, this.departId]
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              this.echarts2 = false
              return
            }
            this.$forceUpdate()
            this.echarts2 = true
            this.myCharts1 = echarts.init(this.$refs.chart1)
            this.myCharts1.setOption(this.basicOption1)
            let xArray = []
            let yArray1 = []
            let yArray2 = []
            response.map((item) => {
              xArray.push(item.S_NAM)
              yArray1.push(item.CUST_CNT)
              yArray2.push(item.RI_AMT.toFixed(2))
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
            this.echarts2 = false
            console.log(res)
          })
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.myCharts) {
        this.myCharts.clear()
      }
      if (this.myCharts1) {
        this.myCharts1.clear()
      }
      next()
    }
  }
</script>
