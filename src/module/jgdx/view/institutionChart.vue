<template>
  <div class="full-height">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl" class="pb-jgdx">
      <span slot="body" v-text="rankingTitle"></span>
    </common-nav>
    <div class="container">
      <div class="share">
        <div class="header-select" style="display: inline-block; width: 130px;">
          <flex class="row" style="margin: 0;">
            <flex-item class="text-center item" style="padding: 0;">
              <div class="selection-component">
                <div class="selection-show" @click="toggle0">
                  <span v-text="tradeDate.name"></span>
                  <div :class="{'arrow-down': direction1,'arrow-up': !direction1}"></div>
                </div>
              </div>
            </flex-item>
          </flex>
        </div>
        <!--<a :href="'pobo:pageId=800012&type=0&title=机构动向&des=机构动向&url='+share" class="btn-share"></a>-->
      </div>
      <div v-for="chart in charts" :ref="chart" style="display: none; height:300px; margin-top: 20px; z-index: 999;"></div>
    </div>
      <multi-slide v-model="showEvent1">
        <p style="padding: 5px 10px;"><img src="../../../assets/images/cityred.png"
                                           style="height: 15px;margin-right: 5px;">请选择时间: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':tradeDate.value == t.value}" v-for="t in tradeDates"
                 v-text="t.name" @click="selectDate(t)">
            </div>
          </div>
        </div>
      </multi-slide>

  </div>
</template>
<script>
  import moment from "moment";
  // import echarts from "echarts";
  // 引入 ECharts 主模块
  import echarts from 'echarts/lib/echarts';
  // 引入柱状图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  export default {
    data() {
      return {
        showEvent1: false,
        direction1: true,
        gobackUrl: 'goBack',
        rankingTitle: '机构动向',
        share: "",
        basicOption: '',
        showOptions: false,
        memberId: this.$route.query.memberId,
        tickerCode: this.$route.query.tickerCode,
        typeId: this.$route.query.typeId,
        tradeDate: {},
        tradeDates: [{
          name: "最近一周",
          value: 7
        }, {
          name: "最近一个月",
          value: 30
        }, {
          name: "最近三个月",
          value: 90
        }],
        charts: ["c1", "c2", "c3"],
        myCharts: []
      }
    },
    created() {
      this.share = this.$encodeURI(this.projectPrefix[0] + "index.html#" + this.$route.fullPath);
    },
    mounted() {
      this.selectDate(this.tradeDates[1]);
      document.getElementById('navbarContent').style.display = 'none';
    },
    watch: {
      showEvent1(val) {
        if (!val) {
          this.direction1 = true;
        }
      }
    },
    methods: {
      toggle0() {
        this.showEvent1 = true;
        this.direction1 = false;
      },
      selectDate(tradeDate) {
        this.showEvent1 = false;
        this.direction1 = true;
        if (this.tradeDate.value == tradeDate.value) {
          return;
        }
        this.tradeDate = tradeDate;
        this.setOption();
        this.setCodeOption();
      },
      setOption() {
        this.$post([1, "lineChartProductRanking"], {
          memberId: this.memberId / 1,
          tickerCode: this.tickerCode,
          typeId: this.typeId / 1,
          tradeDate: this.tradeDate.value
        }).then(res => {
          console.log(111);
          console.log(res);
          this.typeId = this.typeId / 1;

          let legTitle = '';
          let legColor = '';

          if (this.typeId === 2) {
            legTitle = '多头';
            legColor = '#fe1b1b';
          }else if (this.typeId === 3) {
            legTitle = '空持';
            legColor = '#9bd183';
          }else if (this.typeId === 4) {
            legTitle = '净头寸';
            legColor = '#2868e8';
          }
          this.basicOption = {
            title: {
              left: "center",
              text: `${res['name']} ${res['code']}合约持仓量走势图`,
              top: -5
            },
            color: [`${legColor}`],
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              x: 'left',
              padding: [30, 30, 30, 30],
              data: [`${legTitle}`],
              selected: {
                '多持': true,
                '空持': true,
                '净头寸': true
              }
            },
            grid: {
              left: '10',
              right: '20',
              bottom: '10',
              top: '20%',
              containLabel: true
            },
            xAxis: {
              type: 'time',
              boundaryGap: false,
              axisLabel: {
                textStyle: {
                  color: '#000000',
                  fontSize: 10 // 让字体变大
                },
                rotate: 15,
                formatter: function (value, index) {
                  return moment(value).format('YYYYMMDD')
                }
              },
              splitLine: { //网格线
                show: true,
                lineStyle: {
                  color: ['#E8E8E8'],
                  type: 'solid'
                }
              },
              axisLine: { //y轴坐标线颜色
                lineStyle: {
                  color: '#b1b1b1'
                }
              },
              axisTick: { //坐标刻度是否显示
                show: false
              }
            },
            yAxis: {
              type: "value",
              axisLabel: { //调整x轴的lable
                textStyle: {
                  color: '#000000',
                  fontSize: 8 // 让字体变大
                }
              },
              axisTick: {
                show: false
              },
              axisLine: { //y轴坐标线颜色
                lineStyle: {
                  color: '#b1b1b1'
                }
              },
              splitLine: { //网格线
                show: true,
                lineStyle: {
                  color: ['#E8E8E8'],
                  type: 'solid'
                }
              }
            },
            series: [{
              name: `${legTitle}`,
              type: 'line',
              symbol: 'none'
            }]
          };
            let series = [];
            let data = [];
            for (let k = 0; k < res['list'].length; k++) {
              data.push([moment(res['list'][k].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res['list'][k].volume]);
            }
            series[0] = {
              data: data
            }
          this.$refs[this.charts[0]][0].style.display = 'block';
          this.myCharts[0] = echarts.init(this.$refs[this.charts[0]][0]);
          this.myCharts[0].setOption(this.basicOption);

          this.myCharts[0].setOption({
            series: series
          });
        });
      },
      setCodeOption() {
        this.$post([1, "lineChartContractRanking"], {
          memberId: this.memberId / 1,
          tickerCode: this.tickerCode,
          typeId: this.typeId / 1,
          tradeDate: this.tradeDate.value
        }, false, undefined, true).then((res) => {
          console.log(222);
          this.typeId = this.typeId / 1;

          let legTitle = '';
          let legColor = '';

          if (this.typeId === 2) {
            legTitle = '多头';
            legColor = '#fe1b1b';
          }else if (this.typeId === 3) {
            legTitle = '空持';
            legColor = '#9bd183';
          }else if (this.typeId === 4) {
            legTitle = '净头寸';
            legColor = '#2868e8';
          }


          for (let i = 0; i < res.length; i++) {
            let series = [];
              let data = [];
              for (let k = 0; k < res[i]['list'].length; k++) {
                data.push([moment(res[i]['list'][k].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i]['list'][k].volume]);
              }
              series[0] = {
                data: data
              }
            this.$refs[this.charts[i + 1]][0].style.display = 'block';
            this.myCharts[i + 1] = echarts.init(this.$refs[this.charts[i + 1]][0]);

            this.basicOption = {
              title: {
                left: "center",
                text: `${res[i]['name']} ${res[i]['code']}合约持仓量走势图`,
                top: -5
              },
              color: [`${legColor}`],
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                x: 'left',
                padding: [30, 30, 30, 30],
                data: [`${legTitle}`],
                selected: {
                  '多持': true,
                  '空持': true,
                  '净头寸': true
                }
              },
              grid: {
                left: '10',
                right: '20',
                bottom: '10',
                top: '20%',
                containLabel: true
              },
              xAxis: {
                type: 'time',
                boundaryGap: false,
                axisLabel: {
                  textStyle: {
                    color: '#000000',
                    fontSize: 10 // 让字体变大
                  },
                  rotate: 15,
                  formatter: function (value, index) {
                    return moment(value).format('YYYYMMDD')
                  }
                },
                splitLine: { //网格线
                  show: true,
                  lineStyle: {
                    color: ['#E8E8E8'],
                    type: 'solid'
                  }
                },
                axisLine: { //y轴坐标线颜色
                  lineStyle: {
                    color: '#b1b1b1'
                  }
                },
                axisTick: { //坐标刻度是否显示
                  show: false
                }
              },
              yAxis: {
                type: "value",
                axisLabel: { //调整x轴的lable
                  textStyle: {
                    color: '#000000',
                    fontSize: 8 // 让字体变大
                  }
                },
                axisTick: {
                  show: false
                },
                axisLine: { //y轴坐标线颜色
                  lineStyle: {
                    color: '#b1b1b1'
                  }
                },
                splitLine: { //网格线
                  show: true,
                  lineStyle: {
                    color: ['#E8E8E8'],
                    type: 'solid'
                  }
                }
              },
              series: [{
                name: `${legTitle}`,
                type: 'line',
                symbol: 'none'
              }]
            };
            this.myCharts[i + 1].setOption(this.basicOption);
            this.myCharts[i + 1].setOption({
              series: series
            });
            //    this.myCharts[i].hideLoading();
          }
        });
      }
    }
  }
</script>
