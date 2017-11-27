<template>
  <div class="pobo-account-overview">
    <div class="account-info">
      <div class="account-info-title"><span class="info-title-left">开户信息</span></div>
      <div class="info-detail-group">
        <div class="info-detail-time">
          开户时间<span class="detail-time-1a" v-text="customerMessage.OPENACCT_DT"></span><span v-if="customerMessage.EXCHANGE_NAM">({{customerMessage.EXCHANGE_NAM}})</span>
        </div>
        <div class="info-detail-rujin">
          入金时间<span class="detail-time-1a" v-text="customerMessage.FIRST_IN_DT"></span>
        </div>
      </div>
    </div>
    <div class="zijin-info">
      <div class="account-info-title"><span class="info-title-left">资金概览</span></div>
      <div class="no-message-tips" id="no-message-tips" style="display: none">暂无数据</div>
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
          <div class="info-table-body" style="padding-left: 19px;">
            <div class="info-table-row1">
              <div class="info-table-item">
                <div class="info-item-title">期初权益</div>
                <div class="info-item-num"
                     v-text="fundsTips.BEGINEQUITY == '0' || fundsTips.BEGINEQUITY == '-0' ? '-' : $$transformData(fundsTips.BEGINEQUITY)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">期末权益</div>
                <div class="info-item-num"
                     v-text="fundsTips.ENDEQUITY == '0' || fundsTips.ENDEQUITY == '-0' ? '-' : $$transformData(fundsTips.ENDEQUITY)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">保证金</div>
                <div class="info-item-num"
                     v-text="fundsTips.MARGIN_AMT == '0' || fundsTips.MARGIN_AMT == '-0' ? '-' : $$transformData(fundsTips.MARGIN_AMT)"></div>
              </div>
            </div>
            <div class="info-table-row2">
              <div class="info-table-item">
                <div class="info-item-title">净入金</div>
                <div class="info-item-num"
                     v-text="fundsTips.DEPOSIT == '0' || fundsTips.DEPOSIT == '-0' ? '-' : $$transformData(fundsTips.DEPOSIT)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">成交额</div>
                <div class="info-item-num"
                     v-text="fundsTips.VOLUME == '0' || fundsTips.VOLUME == '-0' ? '-' : $$transformData(fundsTips.VOLUME)"></div>
              </div>
              <div class="info-table-item">
                <div class="info-item-title">盈亏</div>
                <div class="info-item-num"
                     v-text="fundsTips.PROFITLOSS == '0' || fundsTips.PROFITLOSS == '-0' ? '-' : $$transformData(fundsTips.PROFITLOSS)"></div>
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
          <div class="chicang-choose-time">
            <div class="choose-time-group">
              <input class="chicang-time-input" type="date" v-model="ccTimeSet"/>
              <div class="choose-time-wrapper">
                <div class="chicang-time-show" v-text="ccTimeSet"></div>
                <div class="time-icon-wrapper">
                  <img class="chicang-time-icon" src="../../images/exhibitionPage/rili@2x.png"/>
                </div>
              </div>
            </div>
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
        ccTimeSet: '2010-04-01',
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
          DEPOSIT: '',
          VOLUME: '',
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
              type: 'line'
            },
            formatter: function (item) {
              return `${item[0].data[0]}<br />${item[0].seriesName}: ${item[0].data[1]}`
            }
          },
          axisPointer: { //修改提示框的颜色(包括x轴上的提示框)
            label: {
              backgroundColor: '#808086'
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
//            axisPointer: {
//              label: {
//                backgroundColor: '#808086'
//              }
//            }
          },
          xAxis: {
            type: 'time',
//            scale: true,
            boundaryGap: ['20%', '20%'],
            splitNumber: 4,
            axisLabel: {
              textStyle: {
                color: '#808086',
                fontSize: 11
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
              name: '(k)',  //资金变动
              scale: true,
              splitNumber: 5,
//              boundaryGap: ['20%', '20%'],
              type: "value",
              nameTextStyle: {
                color: '#808086',
                fontSize: 11
              },
              axisLabel: { //调整x轴的lable
                textStyle: {
                  color: '#808086',
                  fontSize: 11
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
            name: '期末权益',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
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
        ],
        basicOption1: {
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
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
            selectedMode: false,
            textStyle: {
              color: '#808086',
              fontSize: 13
            }
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
//              name: '访问来源',
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
              }
            }
          ]
        }
      }
    },
    computed: {
      ...mapState({
        customerMessage: ({exhibitionPage}) => exhibitionPage.customerMessage,
        ccSetTime: ({exhibitionPage}) => exhibitionPage.ccSetTime,
        investor: ({followUpRecord}) => followUpRecord.investor
      })
    },
    activated() {
      console.log(this.investor, 'investor')
      this.startTime = this.$$getCurrentMonth()
      this.endTime = this.$$timeFormate({date: this.$$getCurrentTime(), format: 'Y-M-D'})
      let Today = new Date()
      let Yesterday = new Date(Today.setDate(Today.getDate() - 1))
      this.ccTimeSet = this.$$timeFormate({date: Yesterday, format: 'Y-M-D'})

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
    watch: {
      ccTimeSet() {
        this.getPositionInfo()
      }
    },
    methods: {
      chooseccTime() {
        this.$router.push({
          name: 'ccSetTime'
        })
      },
      choosePZ(type, index) {
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
          join: [this.info.userId, [this.investor.INVESTOR_ID, ['beginDate', this.startTime], ['endDate', this.endTime]]]
        })
          .then((response) => {
            this.zjClick = true
            if (response['detail'].length <= 0) {
              this.fundsTips['MARGIN_AMT'] = '0'
              this.fundsTips['DEPOSIT'] = '0'
              this.fundsTips['VOLUME'] = '0'
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
              document.getElementById('no-message-tips').style.display = 'block'
              this.myCharts.setOption(currentOption)
              return
            }
            document.getElementById('no-message-tips').style.display = 'none'

            this.fundsTips['MARGIN_AMT'] = response['total'][0]['MARGIN_AMT']   //保证金
            this.fundsTips['DEPOSIT'] = response['total'][0]['DEPOSIT']  //上日结存
            this.fundsTips['VOLUME'] = response['total'][0]['VOLUME']  //本日结存
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
          join: [this.info.userId, [this.investor.INVESTOR_ID, ['date', this.ccTimeSet], ['type', this.chicangType]]]
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
                  if(total == 0) {
                    return `${name} 0`
                  }
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
