<template>
  <div class="moneyPaid">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="moneyPaid-title" slot="body">
        投资者盈亏分析
      </div>
    </common-nav>
    <div class="moneyPaid-select-group">
      <div class="moneyPaid-left-select" @click="showSelectDiv">
        <div class="left-select-title">
          品种:
        </div>
        <div class="left-select-content">
          <span class="select-text-current" :class="{'choose-active': isShow}"
                v-text="selectedList[isSelected-1].name"></span>
          <span class="dropdown-tria" :class="{'up-choose': isShow}"></span>
        </div>
      </div>
      <div class="moneyPaid-right-select" @click="showSelectDiv1">
        <div class="right-select-content">
          <span v-show="isSelected1 < 10" class="select-text-current" :class="{'choose-active': isShow1}"
                v-text="selectedList1[isSelected1-1] < 12 ? `近${selectedList1[isSelected1-1]}月`:`近${selectedList1[isSelected1-1]/12}年`"></span>
          <span v-show="isSelected1 >=10" class="select-text-current" :class="{'choose-active': isShow1}">自定义</span>
          <span class="dropdown-tria" :class="{'up-choose': isShow1}"></span>
        </div>
      </div>
      <div class="dropdown-selected" v-show="isShow">
        <div class="dropdown-selected-option" :class="{'moneyPaid-option-active': isSelected === (index+1)}"
             @click="getSelectTime(index)" v-for="(item, index) in selectedList" :key="index">
          {{item.name}}
          <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>

      <div class="dropdown-selected" v-show="isShow1">
        <div class="dropdown-selected-option" :class="{'moneyPaid-option-active': isSelected1 === (index+1)}"
             @click="getSelectTime1(index,item)" v-for="(item, index) in selectedList1" :key="index">
          {{item < 12 ? `近${item}月` : `近${item / 12}年`}}
          <div class="dropdown-selected-active" v-show="isSelected1 === (index+1)"></div>
        </div>
        <div class="dropdown-zdy-option" @click="getZdysj()" :class="{'moneyPaid-option-active': isSelected1 === 10}">
          自定义
          <div class="dropdown-selected-active" v-show="isSelected1 === 10"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow1" @click="closeSelectedDiv1()"></div>
    </div>

    <div class="chart-indicator">
      <div class="common-indictor">
        <div class="common-indictor-title">
          <span class="duotou-indictor-pg"></span>
          <span class="indictor-title-item">多头盈亏</span>
        </div>
        <div class="duotou-indictor-content" v-text="duotouPrice">
          3,973,365
        </div>
      </div>
      <div class="common-indictor">
        <div class="common-indictor-title">
          <span class="shouxu-indictor-pg"></span>
          <span class="indictor-title-item">手续费(元)</span>
        </div>
        <div class="duotou-indictor-content" v-text="shouxuPrice">
          3,973,365
        </div>
      </div>
      <div class="common-indictor">
        <div class="common-indictor-title">
          <span class="kongtou-indictor-pg"></span>
          <span class="indictor-title-item">空头盈亏</span>
        </div>
        <div class="duotou-indictor-content" v-text="kongtouPrice">
          3,973,365
        </div>
      </div>
      <div class="common-indictor">
        <div class="common-indictor-title">
          <span class="pinzhong-indictor-pg"></span>
          <span class="indictor-title-item">品种盈亏(元)</span>
        </div>
        <div class="duotou-indictor-content" v-text="zongYKPrice">
          3,973,365
        </div>
      </div>
    </div>

    <div ref="chart" class="moneyPaid-charts"></div>
    <div class="moneyPaid-data-date">
      数据日期: {{selectTime}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {ProductType} from '../config/retInfo.js';
  import echarts from 'echarts/lib/echarts';
  //引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');


  export default{
    data() {
      return {
        duotouPrice: '',
        kongtouPrice: '',
        shouxuPrice: '',
        zongYKPrice: '',
        beforeSelectIndex: 3,
        selectTime: '20170212-20170712',
        gobackUrl: "goBack",
        isShow: false,  //是否显示弹层---左边弹出层
        isShow1: false, //右边弹出层
        isSelected: 1, //是否选中  --左边弹出层
        isSelected1: 3, //是否选中  --右边弹出层
        selectedList: ProductType,
        selectedList1: [//选择条件数组
          1,
          3,
          6,
          12
        ],
        myCharts: null,
        basicOption: {
          title: {
            text: '投资者盈亏分析图',
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              color: '#1a1a1a'
            }
          },
          color: ['#5c90f9', '#2868e8', '#add79a', '#fb8463'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (value, index) {
//              value.map((item) => {
//                  console.log(item.value);
//                  return item.value !== 0 ? item.value: 0;
//              });
              for (let i = 0; i < value.length; i++) {
                if (value[i].value !== 0) {
                  return value[i].value;
                }
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['多头盈亏', '空头盈亏', '手续费', '总盈亏'],
              axisTick: {
                alignWithLabel: true,
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#e4e7f0'
                }
              }

            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '(k)',
              nameLocation: 'end',
              nameGap: 15,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                color: '#808086',
                fontSize: 12
              },
              axisLabel: {
                textStyle: {
                  color: '#808086',
                  fontSize: 12
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e4e7f0'
                }
              }

            }
          ],
          series: [
            {
              name: '多头盈亏',
              type: 'bar',
              stack: '盈亏',
              barWidth: '16%',
              data: [0, 0, 0, 0],
              itemStyle: {
                normal: {
                  barBorderRadius: 20
                },
                emphasis: {
                  barBorderRadius: 20
                }
              }
            },
            {
              name: '空头盈亏',
              type: 'bar',
              stack: '盈亏',
              barWidth: '16%',
              data: [0, 0, 0, 0],
              itemStyle: {
                normal: {
                  barBorderRadius: 20
                },
                emphasis: {
                  barBorderRadius: 20
                }
              }
            },
            {
              name: '手续费',
              type: 'bar',
              stack: '盈亏',
              barWidth: '16%',
              data: [0, 0, 0, 0],
              itemStyle: {
                normal: {
                  barBorderRadius: 20
                },
                emphasis: {
                  barBorderRadius: 20
                }
              }
            },
            {
              name: '总盈亏',
              type: 'bar',
              stack: '盈亏',
              barWidth: '16%',
              data: [0, 0, 0, 0],
              itemStyle: {
                normal: {
                  barBorderRadius: 20
                },
                emphasis: {
                  barBorderRadius: 20
                }
              }
            }

          ]
        }
      }
    },
    computed: {
      ...mapState([
        'MoneyPaidTimeFrom',
        'MoneyPaidTimeTo',
        'isUserMoneyPaid'
      ])
    },
    activated() { //(使用keep-alive时)进入路由时的操作
      document.body.style.backgroundColor = '#ffffff';
      if (this.isUserMoneyPaid) {
        this.selectTime = `${this.$$timeFormate({
          date: this.MoneyPaidTimeFrom,
          format: 'YMD'
        })}-${this.$$timeFormate({
          date: this.MoneyPaidTimeTo,
          format: 'YMD'
        })}`;
        this.queryMoneyEarn(this.MoneyPaidTimeFrom, this.MoneyPaidTimeTo, this.selectedList[this.isSelected - 1].code);
      } else {
        this.isSelected1 = this.beforeSelectIndex;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryMoneyEarn(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
      }
    },
    deactivated() { //(使用keep-alive时)离开路由时的操作
//      console.log('deactivated');
    },
    mounted() {
      document.body.style.backgroundColor = '#ffffff';
      this.myCharts = echarts.init(this.$refs.chart);
      this.myCharts.setOption(this.basicOption);
    },
    methods: {
      queryMoneyEarn(startTime, endTime, prductCode = "") { //查询盈亏分析
        let postParams = { //传入参数
          ST_DT: startTime,
          END_DT: endTime,
          INVESTOR_ID: this.UserID,
          PRODUCT_CD: prductCode
        };
        let params = {
          'func': 2022,
          'type': 2,
          'account': '',
          'token': '',
          'data': [{
            'service': 'investor_analysis.103',
            'json': JSON.stringify(postParams)
          }]
        };
        this.$post({restUrl: 'queryMoneyEarn', params: params, loading: true})
          .then(response => {
            let result = JSON.parse(response.data.data[0].proxyresult).body.result;
            let currentOption;
            if (result.length < 1) {
              currentOption = {
                title: {
                  text: '投资者盈亏分析图',
                  left: 'center',
                  textStyle: {
                    fontWeight: 'normal',
                    fontSize: 14,
                    color: '#1a1a1a'
                  }
                },
                color: ['#5c90f9', '#2868e8', '#add79a', '#fb8463'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross'
                  },
                  formatter: function (value, index) {
                    for (let i = 0; i < value.length; i++) {
                      if (value[i].value !== 0) {
                        return value[i].value;
                      }
                    }
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '0',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['多头盈亏', '空头盈亏', '手续费', '总盈亏'],
                    axisTick: {
                      alignWithLabel: true,
                      show: false
                    },
                    axisLabel: {
                      show: false
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#e4e7f0'
                      }
                    }

                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '(k)',
                    nameLocation: 'end',
                    nameGap: 15,
                    axisLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    nameTextStyle: {
                      color: '#808086',
                      fontSize: 12
                    },
                    axisLabel: {
                      textStyle: {
                        color: '#808086',
                        fontSize: 12
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        color: '#e4e7f0'
                      }
                    }

                  }
                ],
                series: [
                  {
                    name: '多头盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '空头盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '手续费',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '总盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  }

                ]
              };
              this.duotouPrice = '0';
              this.kongtouPrice = '0';
              this.shouxuPrice = '0';
              this.zongYKPrice = '0';
            } else {
              currentOption = {
                title: {
                  text: '投资者盈亏分析图',
                  left: 'center',
                  textStyle: {
                    fontWeight: 'normal',
                    fontSize: 14,
                    color: '#1a1a1a'
                  }
                },
                color: ['#5c90f9', '#2868e8', '#add79a', '#fb8463'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross'
                  },
                  formatter: function (value, index) {
                    for (let i = 0; i < value.length; i++) {
                      if (value[i].value !== 0) {
                        return value[i].value;
                      }
                    }
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '0',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['多头盈亏', '空头盈亏', '手续费', '总盈亏'],
                    axisTick: {
                      alignWithLabel: true,
                      show: false
                    },
                    axisLabel: {
                      show: false
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#e4e7f0'
                      }
                    }

                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '(k)',
                    nameLocation: 'end',
                    nameGap: 15,
                    axisLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    nameTextStyle: {
                      color: '#808086',
                      fontSize: 12
                    },
                    axisLabel: {
                      textStyle: {
                        color: '#808086',
                        fontSize: 12
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        color: '#e4e7f0'
                      }
                    }

                  }
                ],
                series: [
                  {
                    name: '多头盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [(result[0].ID_Y / 1000).toFixed(2), 0, 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '空头盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, (result[1].ID_Y / 1000).toFixed(2), 0, 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '手续费',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, (result[2].ID_Y / 1000).toFixed(2), 0],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  },
                  {
                    name: '总盈亏',
                    type: 'bar',
                    stack: '盈亏',
                    barWidth: '16%',
                    data: [0, 0, 0, (result[3].ID_Y / 1000).toFixed(2)],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 20
                      },
                      emphasis: {
                        barBorderRadius: 20
                      }
                    }
                  }

                ]
              };
              this.duotouPrice = this.$$comma(result[0].ID_Y);
              this.kongtouPrice = this.$$comma(result[1].ID_Y);
              this.shouxuPrice = this.$$comma(result[2].ID_Y);
              this.zongYKPrice = this.$$comma(result[3].ID_Y);
            }
            this.myCharts.setOption(currentOption);
          })
          .catch(res => {
            console.log(res);
          });
      },
      showSelectDiv() {
        if (this.isShow1) {
          this.isShow1 = false;
        }
        this.isShow = !this.isShow;
      },
      showSelectDiv1() {
        if (this.isShow) {
          this.isShow = false;
        }
        this.isShow1 = !this.isShow1;
      },
      getSelectTime(index) {
        this.isShow = false;
        this.isSelected = index + 1;
        if (this.isUserMoneyPaid) {
          this.queryMoneyEarn(this.MoneyPaidTimeFrom, this.MoneyPaidTimeTo, this.selectedList[this.isSelected - 1].code);
        } else {
          this.queryMoneyEarn(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
        }
      },
      getSelectTime1(index, item) {
        this.isShow1 = false;
        this.isSelected1 = index + 1;
        this.beforeSelectIndex = index + 1;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(item), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryMoneyEarn(pbUtils.dateFormat(this.getTimeByParam(item), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
        this.$store.dispatch('updateisUserMoneyPaid', false);
      },
      closeSelectedDiv() {
        this.isShow = false;
      },
      closeSelectedDiv1() {
        this.isShow1 = false;
      },
      getZdysj() {
        this.isShow1 = false;
        this.isSelected1 = 10;
        this.$router.push({name: 'zdytime'});
      }
    }
  }
</script>
