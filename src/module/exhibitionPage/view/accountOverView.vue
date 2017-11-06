<template>
  <div class="pobo-account-overview">
    <div class="account-info">
      <div class="account-info-title"><span class="info-title-left">开户信息</span></div>
      <div class="info-detail-group">
        <div class="info-detail-time">
          开户时间<span class="detail-time-1a" v-text="customerMessage.OPENACCT_DT"></span>({{customerMessage.EXCHANGE_NAM}})
        </div>
        <div class="info-detail-rujin">
          入金时间<span class="detail-time-1a" v-text="customerMessage.FIRST_IN_DT"></span>
        </div>
      </div>
    </div>
    <div class="zijin-info">
      <div class="account-info-title"><span class="info-title-left">资金概览</span></div>
      <div ref="chart" class="zijin-charts"></div>
      <div class="chart-tab-group">
        <div class="chart-item-list">
          <div class="chart-tab-item" :class="{'chart-item-active': zjIndex == 0}" @click="zijinChose(0)">本月</div>
          <div class="chart-tab-item" :class="{'chart-item-active': zjIndex == 6}" @click="zijinChose(6)">近半年</div>
          <div class="chart-tab-item" :class="{'chart-item-active': zjIndex == 12}" @click="zijinChose(12)">近一年</div>
          <div class="chart-tab-item" :class="{'chart-item-active': zjIndex == 100}" @click="zijinChose(100)">本年至今</div>
        </div>
      </div>
      <div class="zijin-info-table">
        <div class="info-table-wrapper">
          <div class="info-table-header">
            <div class="info-header-dot"></div>
            <div class="info-header-time" v-text="`${startTime} 至 ${endTime}`">
            </div>
          </div>
          <div class="info-table-body">
            <div class="info-table-row1">
              <div class="info-table-item">
                <div class="info-item-title">期初权益</div>
                <div class="info-item-num"
                     v-text="fundsTips.BEGINEQUITY == '0' ? '无' : $$transformData(fundsTips.BEGINEQUITY)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">期末权益</div>
                <div class="info-item-num"
                     v-text="fundsTips.ENDEQUITY == '0' ? '无' : $$transformData(fundsTips.ENDEQUITY)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">保证金</div>
                <div class="info-item-num"
                     v-text="fundsTips.MARGIN_AMT == '0' ? '无' : $$transformData(fundsTips.MARGIN_AMT)"></div>
              </div>
            </div>
            <div class="info-table-row2">
              <div class="info-table-item">
                <div class="info-item-title">上日结存</div>
                <div class="info-item-num"
                     v-text="fundsTips.PRE_RI_AMT == '0' ? '无' : $$transformData(fundsTips.PRE_RI_AMT)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">本日结存</div>
                <div class="info-item-num"
                     v-text="fundsTips.TODAY_RI_AMT == '0' ? '无' : $$transformData(fundsTips.TODAY_RI_AMT)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">盈亏</div>
                <div class="info-item-num"
                     v-text="fundsTips.PROFITLOSS == '0' ? '无' : $$transformData(fundsTips.PROFITLOSS)"></div>
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
          <div class="chicang-choose-time" @click="chooseccTime">
            <div class="chicang-time-show" v-text="this.ccSetTime"></div>
            <img class="chicang-time-icon" src="../images/rili@2x.png"/>
          </div>
          <div class="chicang-tab-group">
            <div class="chicang-tab-wrapper">
              <div class="chicang-tab-item" :class="{'chicang-tab-selected': pzIndex == 1}" @click="choosePZ('P',1)">
                按品种
              </div>
              <div class="chicang-tab-item" :class="{'chicang-tab-selected': pzIndex == 2}" @click="choosePZ('E',2)">
                按交易所
              </div>
            </div>
          </div>
          <div ref="chart1" class="product-charts"></div>
        </div>
        <div class="chicang-right-pointer">
          <div class="chicang-pointer-item">
          </div>
        </div>
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
  // 引入饼状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        pzIndex: 1, //持仓选项卡
        pzClick: true, //设置持仓选项卡多次点击无效
        zjClick: true, //设置资金选项卡多次点击无效
        zjIndex: 0, //资金选项卡
        startTime: '', //开始时间
        endTime: '',  //结束时间
        chicangTime: '2017-01-01', //持仓时间
        chicangType: 'P', //持仓类型
        fundsTips: {
          MARGIN_AMT: '',
          PRE_RI_AMT: '',
          TODAY_RI_AMT: '',
          PROFITLOSS: '',
          BEGINEQUITY: '',
          ENDEQUITY: ''
        },
        myCharts: null,
        myCharts1: null,
        basicOption: {
          color: ['#5c90f9'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (item) {
              return `${item[0].data[0]}<br />${item[0].seriesName}: ${item[0].data[1]}`
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
            PRODUCT_NAM: '直接访问',
            HOLD_CNT: 335
          },
          {
            PRODUCT_NAM: '邮件营销',
            HOLD_CNT: 310
          },
          {
            PRODUCT_NAM: '联盟广告',
            HOLD_CNT: 234
          },
          {
            PRODUCT_NAM: '视频广告',
            HOLD_CNT: 135
          },
          {
            PRODUCT_NAM: '搜索引擎',
            HOLD_CNT: 1548
          },
          {
            PRODUCT_NAM: '测试1',
            HOLD_CNT: 135
          },
          {
            PRODUCT_NAM: '测试2',
            HOLD_CNT: 1548
          }
        ],
        basicOption1: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: ['#fe8b6c', '#41c5ee', '#fbc647', '#8dddff', '#a499dc', '#f78ab7', '#5bcb9d'],
          legend: {
//            type: 'scroll',
            orient: 'vertical',
            right: 20,
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
              radius: ['28%', '44%'],
              center: ['31%', '50%'],
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
    computed: {
      ...mapState([
        'customerMessage',
        'ccSetTime'
      ])
    },
    mounted() {
      this.startTime = this.$$getCurrentMonth()
      this.endTime = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})

      this.startTime = '2010-01-01'
      this.endTime = '2010-05-01'
      this.chicangTime = '2010-04-01'

      this.getFundInfo()
      this.getPositionInfo()
      this.myCharts = echarts.init(this.$refs.chart)
      this.myCharts.setOption(this.basicOption)
      this.myCharts1 = echarts.init(this.$refs.chart1)
      this.myCharts1.setOption(this.basicOption1)
      this.myCharts.on('click', (params) => {
        console.log(params)
      })
      let vm = this
      let currentOption = {
        legend: {
          formatter(name) {
            let total = 0
            let currentValue = 0
            vm.dataValue.map((item) => {
              total += item.HOLD_CNT
              if (item.PRODUCT_NAM == name) {
                currentValue = item.HOLD_CNT
              }
            })
            let percent = ((currentValue / total) * 100).toFixed(2)
            return `  ${name}    ${percent}%`
          },
        }
      }
      this.myCharts1.setOption(currentOption)
    },
    methods: {
      chooseccTime() {
        this.$router.push({
          name: 'ccSetTime'
        })
      },
      choosePZ(type, index) {
        if (!this.pzClick) {
          return
        }
        this.pzClick = false
        this.pzIndex = index
        this.chicangType = type
        this.getPositionInfo()
      },
      zijinChose(index) {
        if (!this.zjClick) {
          return
        }
        this.zjClick = false
        this.zjIndex = index
        if (index == 0) {
          this.startTime = this.$$getCurrentMonth()
          this.endTime = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
        } else if (index == 100) {
          this.startTime = this.$$getCurrentYear()
          this.endTime = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
        } else {
          this.startTime = this.$$timeFormate({date: this.$$getTimeByParam(index), format: 'Y-M-D'})
          this.endTime = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
        }
        this.getFundInfo();
      },
      $$getCurrentMonth() {
        let Today = new Date()
        let Year = Today.getFullYear()
        let Month = Today.getMonth() + 1
        return `${Year}-${Month}-01`
      },
      $$getCurrentYear() {
        let Today = new Date()
        let Year = Today.getFullYear()
        return `${Year}-01-01`
      },
      $$getTimeByParam(par) {
        let dateTime = new Date();
        return new Date(dateTime.setMonth(dateTime.getMonth() - par));
      },
      getFundInfo() { //获取单一投资者某一段时间的资金情况
        this.$$axios({
          restUrl: 'fundInfo',
          join: [this.userId, [this.investorId, ['beginDate', this.startTime], ['endDate', this.endTime]]]
        })
          .then((response) => {
            this.zjClick = true
            if (response['detail'].length <= 0) {
              this.fundsTips['MARGIN_AMT'] = '0'
              this.fundsTips['PRE_RI_AMT'] = '0'
              this.fundsTips['TODAY_RI_AMT'] = '0'
              this.fundsTips['PROFITLOSS'] = '0'
              this.fundsTips['BEGINEQUITY'] = '0'
              this.fundsTips['ENDEQUITY'] = '0'
              let currentOption = {
                series: [
                  {
                    data: []
                  }
                ]
              }
              this.myCharts.setOption(currentOption)
              return
            }
            this.fundsTips['MARGIN_AMT'] = response['total'][0]['MARGIN_AMT']   //保证金
            this.fundsTips['PRE_RI_AMT'] = response['total'][0]['PRE_RI_AMT']  //上日结存
            this.fundsTips['TODAY_RI_AMT'] = response['total'][0]['TODAY_RI_AMT']  //本日结存
            this.fundsTips['PROFITLOSS'] = response['total'][0]['PROFITLOSS']  //盈亏
            this.fundsTips['BEGINEQUITY'] = response['total'][0]['BEGINEQUITY']  //期初权益
            this.fundsTips['ENDEQUITY'] = response['total'][0]['ENDEQUITY'] //期末权益
            let dataList = []
            response['detail'].map((item) => {
              let tempArrayList = []
              tempArrayList.push(item.TX_DT)
              tempArrayList.push((item.TODAY_RI_AMT / 1000).toFixed(2))
              dataList.push(tempArrayList)
            })
            let currentOption = {
              series: [
                {
                  data: dataList
                }
              ]
            }
            this.myCharts.setOption(currentOption)
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      getPositionInfo() {  //获取单一投资者上一日持仓情况
        this.$$axios({
          restUrl: 'positionInfo',
          join: [this.userId, [this.investorId, ['date', this.ccSetTime], ['type', this.chicangType]]]
        })
          .then((response) => {
            this.pzClick = true
            this.dataValue = []
            this.dataValue = response
            let vm = this
            let legendList = []
            let seriesList = []

            this.dataValue.sort((item1, item2) => {
              return item2.HOLD_CNT - item1.HOLD_CNT
            })

            this.dataValue.map((item) => {
              legendList.push(item.PRODUCT_NAM)
              seriesList.push({
                value: item.HOLD_CNT,
                name: item.PRODUCT_NAM
              })
            })
            let currentOption = {
              legend: {
                formatter(name) {
                  let total = 0
                  let currentValue = 0
                  vm.dataValue.map((item) => {
                    total += item.HOLD_CNT / 1
                    if (item.PRODUCT_NAM == name) {
                      currentValue = item.HOLD_CNT / 1
                    }
                  })
                  let percent = ((currentValue / total) * 100).toFixed(2)
                  return `${name} ${percent}%`
                },
                data: legendList
              },
              series: [
                {
                  data: seriesList
                }
              ]
            }
            this.myCharts1.setOption(currentOption)
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
