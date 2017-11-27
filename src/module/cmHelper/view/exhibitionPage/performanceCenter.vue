<template>
  <div class="pobo-performance-index">
    <div class="performance-index-header">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">我的业绩</span>
      </common-nav>
    </div>
    <div class="performance-index-center">
      <div class="index-header-grid">
        <div class="index-header-top">
          <div class="header-top-number" v-text="$$comma(PerformancBase.RI_AMT)"></div>
          <div class="header-top-title">客户权益(万) {{PerformancBase.TX_DT ? this.$$timeFormate({
            date: PerformancBase.TX_DT,
            format: 'M-D'
          }) : ''}}
          </div>
        </div>
        <div class="index-header-footer">
          <div class="header-footer-items">
            <div class="footer-items-number" v-text="PerformancBase.CUST_CNT"></div>
            <div class="footer-items-name">客户数量</div>
          </div>
          <div class="header-footer-items">
            <div class="footer-items-number" v-text="PerformancBase.CUST_ADD_M"></div>
            <div class="footer-items-name">月新增客户</div>
          </div>
        </div>
      </div>
      <div class="kehu-qy-view">
        <span class="kehu-qy-header">客户权益</span>
        <div ref="chart" class="kehu-qy-charts"></div>
      </div>
      <div class="khqy-db-view">
        <span class="khqy-db-header">客户权益对比</span>
        <div ref="chart1" class="khqy-db-charts"></div>
      </div>
      <div class="kehu-qyjg-view">
        <span class="kehu-qyjg-header">客户权益结构</span>
        <div ref="chart2" class="kehu-qyjg-charts"></div>
      </div>
      <div class="khsl-jg-view">
        <span class="khsl-jg-header">客户数量结构</span>
        <div ref="chart3" class="khsl-jg-charts"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  import moment from "moment";
  //引入折线图
  require('echarts/lib/chart/line');
  //引入柱状图
  require('echarts/lib/chart/bar');
  //引入饼状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');

  export default{
    data() {
      return {
        PerformancBase: {
          TX_DT: '',
          RI_AMT: '',
          CUST_CNT: '',
          CUST_ADD_M: ''
        },
        gobackUrl: 'goBack',
        myCharts: null,
        myCharts1: null,
        myCharts2: null,
        myCharts3: null,
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
          legend: {
            data: ['日均权益', '月末权益'],
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
            name: '日均权益',
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
              name: '月末权益',
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
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#808086'
            }
          },
          grid: {
            top: '13%',
            left: '1%',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['50以下', '100~50万'],
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
              scale: false,
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
              scale: false,
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
        },
        basicOption2: {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff', '#a499dc', '#f78ab7', '#5bcb9d'],
          legend: {
            orient: 'vertical',
            right: 30,
            top: 'middle',
            bottom: 20,
            itemWidth: 7,
            itemHeight: 7,
            selectedMode: false,
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
              radius: ['50%', '73%'],
              center: ['25%', '50%'],
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
        },
        basicOption3: {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff', '#a499dc', '#f78ab7', '#5bcb9d'],
          legend: {
            orient: 'vertical',
            right: 30,
            top: 'middle',
            bottom: 20,
            itemWidth: 7,
            itemHeight: 7,
            selectedMode: false,
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
              radius: ['50%', '73%'],
              center: ['25%', '50%'],
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
    activated() {
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      this.myCharts2 = echarts.init(this.$refs.chart2)
      this.myCharts2.setOption(this.basicOption2)
      this.myCharts3 = echarts.init(this.$refs.chart3)
      this.myCharts3.setOption(this.basicOption3)
      this.getTodayWorkPerformanc()
      this.getYearWorkPerformanc()
      this.getCustomerWorkPerformanc()
    },
    methods: {
      getTodayWorkPerformanc() { //获取个人业绩本月速览
        this.$$axios({
          restUrl: 'workPerformancBase',
          join: [this.info.userId]
        }).then((response) => {
          if (response.length <= 0 || !response[0]) {
            return
          }
          this.PerformancBase['TX_DT'] = response[0]['TX_DT']
          this.PerformancBase['RI_AMT'] = response[0]['RI_AMT']
          this.PerformancBase['CUST_CNT'] = response[0]['CUST_CNT']
          this.PerformancBase['CUST_ADD_M'] = response[0]['CUST_ADD_M']
        }).catch((res) => {
          console.log(res, 'res')
        })
      },
      getYearWorkPerformanc() { //获取个人业绩近一年历史
        this.$$axios({
          restUrl: 'workPerformancList',
          join: [this.info.userId]
        }).then((response) => {
          if (response.length <= 0 || !response[0]) {
            return
          }
          let xArray = []
          let yArray1 = []
          let yArray2 = []

          response.map((item) => {
            xArray.push(item.TX_DT)
            yArray1.push(item.RI_AMT_AVG)
            yArray2.push(item.RI_AMT)
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
        }).catch((res) => {
          console.log(res, 'res')
        })
      },
      getCustomerWorkPerformanc() { //客户权益结构
        this.$$axios({
          restUrl: 'workPerformancInfo',
          join: [this.info.userId]
        }).then((response) => {
          if (response.length <= 0 || !response[0]) {
            return
          }
          let xArray = []
          let yArray1 = []
          let yArray2 = []
          let yArrayPie1 = []
          let yArrayPie2 = []

          response.map((item) => {
            xArray.push(item.S_NAM)
            yArray1.push((item.RI_AMT / 10000).toFixed(0))
            yArray2.push(item.CUST_CNT)
            yArrayPie1.push({
              value: (item.RI_AMT / 10000).toFixed(0),
              name: item.S_NAM
            })
            yArrayPie2.push({
              value: item.CUST_CNT,
              name: item.S_NAM
            })
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
            legend: {
              data: xArray
            },
            series: [
              {
                data: yArrayPie1
              }
            ]
          }
          let currentOption2 = {
            legend: {
              data: xArray
            },
            series: [
              {
                data: yArrayPie2
              }
            ]
          }
          this.myCharts1.setOption(currentOption)
          this.myCharts2.setOption(currentOption1)
          this.myCharts3.setOption(currentOption2)
          console.log(response, 'response')
        }).catch((res) => {
          console.log(res, 'res')
        })
      }
    }
  }
</script>
