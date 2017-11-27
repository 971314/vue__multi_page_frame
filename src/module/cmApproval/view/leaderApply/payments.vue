<template>
  <div class="pay-ment-content">
    <div class="crj-db-view">
      <div class="crj-db-header">出入金对比</div>
      <div v-show="echarts1" ref="chart1" class="crj-db-charts"></div>
      <div class="pobo-no-data1" v-show="!echarts1">
        <span class="no-data1-msg">暂无数据</span>
      </div>
    </div>
    <div class="j-rj-view">
      <div class="j-rj-header">净入金</div>
      <div v-show="echarts2" ref="chart" class="j-rj-charts"></div>
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
          color: ['#fe8b6c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          legend: {
            data: ['净入金'],
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
            name: '净入金',
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
            data: ['入金', '出金'],
            x: 'left',
            itemWidth: 7,
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
            name: '入金',
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                opacity: 0.5
              }
            }
          },
            {
              name: '出金',
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
    computed: {
      ...mapState({
        departId: ({others}) => others.departId
      })
    },
    activated() {
      this.echarts1 = true
      this.echarts2 = true
      this.$parent.nowIndex = 2
      this.getLeaderDepartFundInfo()
    },
    methods: {
      getLeaderDepartFundInfo() { //leaderDepartFundInfo查询部门出入金
        this.$$axios({
          restUrl: 'leaderDepartFundInfo',
          join: [this.info.userId, this.departId],
          loading: true
        })
          .then((response) => {
            if (response.length <= 0 || !response[0]) {
              this.echarts1 = false
              this.echarts2 = false
              return
            }
            this.$forceUpdate()
            this.echarts1 = true
            this.echarts2 = true
            this.myCharts = echarts.init(this.$refs.chart)
            this.myCharts.setOption(this.basicOption)
            this.myCharts1 = echarts.init(this.$refs.chart1)
            this.myCharts1.setOption(this.basicOption1)
            let xArray = []
            let yArray1 = []
            let yArray2 = []
            let yArray3 = []
            response.map((item) => {
              xArray.push(item.TX_DT)
              yArray1.push(item.IN_AMT.toFixed(2))
              yArray2.push(item.OUT_AMT.toFixed(2))
              yArray3.push(item.PROFIT_AMT.toFixed(2))
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
            let currentOption1 = {
              xAxis: {
                data: xArray
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
            this.echarts1 = false
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
