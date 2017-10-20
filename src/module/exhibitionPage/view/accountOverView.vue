<template>
  <div class="pobo-account-overview">
    <div class="account-info">
      <div class="account-info-title"><span class="info-title-left">开户信息</span></div>
      <div class="info-detail-group">
        <div class="info-detail-time">
          开户时间<span class="detail-time-1a">2012-12-26</span>(大商所/上期所)
        </div>
        <div class="info-detail-rujin">
          入金时间<span class="detail-time-1a">2012-12-26</span>
        </div>
      </div>
    </div>
    <div class="zijin-info">
      <div class="account-info-title"><span class="info-title-left">资金概览</span></div>
      <div ref="chart" class="zijin-charts"></div>
      <div class="chart-tab-group">
        <div class="chart-item-list">
          <div class="chart-tab-item chart-item-active">本月</div>
          <div class="chart-tab-item">近半年</div>
          <div class="chart-tab-item">近一年</div>
          <div class="chart-tab-item">至今</div>
        </div>
      </div>
      <div class="zijin-info-table">
        <div class="info-table-wrapper">
          <div class="info-table-header">
            <div class="info-header-dot"></div>
            <div class="info-header-time">
              2017-06-22 至 2017-09-22
            </div>
          </div>
          <div class="info-table-body">
            <div class="info-table-row1">
              <div class="info-table-item">
                <div class="info-item-title">期初权益</div>
                <div class="info-item-num">1,544万</div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">期末权益</div>
                <div class="info-item-num">1,544,235</div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">净入金</div>
                <div class="info-item-num">1,544235</div>
              </div>
            </div>
            <div class="info-table-row2">
              <div class="info-table-item">
                <div class="info-item-title">累计盈亏</div>
                <div class="info-item-num">1,544,235</div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">成交额</div>
                <div class="info-item-num">1,544,235</div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">保证金</div>
                <div class="info-item-num">1,544235</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-info">
      <div class="account-info-title"><span class="info-title-left">持仓结构</span></div>
      <div class="chicang-chart-group">
        <div class="chicang-left-chart">
          <div ref="chart1" class="product-charts"></div>
        </div>
        <div class="chicang-right-pointer">
          <div class="chicang-pointer-item">
            <div class></div>
          </div>
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
  // 引入饼状图
  require('echarts/lib/chart/pie');
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
          color: ['#5c90f9'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            top: '13%',
            left: '4%',
            right: '6%',
            bottom: '0',
            containLabel: true,
            show: true,
            borderColor: '#e4e7f0', //边框线设置
            borderWidth: '1'
          },
          xAxis: {
            type: 'time',
//            scale: true,
            boundaryGap: ['20%', '20%'],
            splitNumber: 4,
            axisLabel: {
              textStyle: {
                color: '#808086',
                fontSize: 12
              },
              formatter: function (value, index) {
                return moment(value).format('MM-DD')
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#e4e7f0'
              }
            },
            axisTick: { //坐标刻度是否显示
              show: false
            },
            splitLine: { //网格线
              show: false,
              lineStyle: {
                color: ['#e4e7f0'],
                type: 'dashed'
              }
            }
          },
          yAxis: [
            {
              name: '资金变动(k)',
              scale: true,
              splitNumber: 5,
//              boundaryGap: ['20%', '20%'],
              type: "value",
              nameTextStyle: {
                color: '#808086',
                fontSize: 12
              },
              axisLabel: { //调整x轴的lable
                textStyle: {
                  color: '#808086',
                  fontSize: 12
                }
              },
              axisTick: {
                show: false
              },
              axisLine: { //y轴坐标线颜色
                show: false,
                lineStyle: {
                  color: '#e4e7f0'
                }
              },
              splitLine: { //网格线
                show: true,
                lineStyle: {
                  color: ['#e4e7f0'],
                  type: 'dashed'
                }
              }
            }],
          series: [{
            name: '资金',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
              ['2016-07-01', 17.12],
              ['2016-07-02', 17.92],
              ['2016-07-03', 16.92],
              ['2016-07-04', 15.92],
              ['2016-07-05', 18.92],
              ['2016-07-06', 17.22],
              ['2016-07-07', 17.92],
              ['2016-07-08', 17.32],
              ['2016-07-09', 17.92],
              ['2016-07-10', 14.92],
              ['2016-07-11', 16.92],
              ['2016-07-12', 19.92],
              ['2016-07-13', 12.92],
              ['2016-07-14', 15.92],
              ['2016-07-15', 17.02],
              ['2016-07-16', 18.22],
              ['2016-07-17', 15.32],
              ['2016-07-18', 17.02],
            ],
            areaStyle: {
              normal: {
                color: '#5c90f9',
                opacity: 0.1
              }
            },
            lineStyle: {
              normal: {
                width: 1
              }
            }
          }]
        },
        dataValue: [
          {
            name: '直接访问',
            value: 335
          },
          {
            name: '邮件营销',
            value: 310
          },
          {
            name: '联盟广告',
            value: 234
          },
          {
            name: '视频广告',
            value: 135
          },
          {
            name: '搜索引擎',
            value: 1548
          },
          {
            name: '测试1',
            value: 135
          },
          {
            name: '测试2',
            value: 1548
          }
        ],
        basicOption1: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: ['#48b488', '#ec5353', '#f9a154', '#e76e9f', '#8e81cf', '#44aaf3', '#8dddff'],
          legend: {
//            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 'middle',
            bottom: 20,
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: '#808086',
              fontSize: 13
            },
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '测试1', '测试2']
          },
          grid: {
            top: '3%',
            left: '4%',
            right: '6%',
            bottom: '0',
            containLabel: true
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['43%', '65%'],
              center: ['32%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
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
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'},
                {value: 135, name: '测试1'},
                {value: 1548, name: '测试2'}
              ]
            }
          ]
        }
      }
    },
    mounted() {
//      this.$parent.nowIndex = 1
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      let vm = this
      let currentOption = {
        legend: {
          formatter(name) {
            let total = 0
            let currentValue = 0
            vm.dataValue.map((item) => {
              total += item.value
              if (item.name == name) {
                currentValue = item.value
              }
            })
            let percent = ((currentValue / total) * 100).toFixed(2)
            return `  ${name}    ${percent}%`
          }
        }
      }
      this.myCharts1.setOption(currentOption)
    }
  }
</script>
