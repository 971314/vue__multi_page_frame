<template>
  <div class="profit">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="profit-title" slot="body">
        资金回报率散点图
      </div>
    </common-nav>
    <div class="profit-select-group">
      <div class="profit-left-select" @click="showSelectDiv">
        <div class="left-select-title">
          品种:
        </div>
        <div class="left-select-content">
          <span class="select-text-current" :class="{'choose-active': isShow}"
                v-text="selectedList[isSelected-1].name"></span>
          <span class="dropdown-tria" :class="{'up-choose': isShow}"></span>
        </div>
      </div>
      <div class="profit-right-select" @click="showSelectDiv1">
        <div class="right-select-content">
          <span v-show="isSelected1 < 10" class="select-text-current" :class="{'choose-active': isShow1}"
                v-text="selectedList1[isSelected1-1] < 12 ? `近${selectedList1[isSelected1-1]}月`:`近${selectedList1[isSelected1-1]/12}年`"></span>
          <span v-show="isSelected1 >=10" class="select-text-current" :class="{'choose-active': isShow1}">自定义</span>
          <span class="dropdown-tria" :class="{'up-choose': isShow1}"></span>
        </div>
      </div>
      <div class="dropdown-selected" v-show="isShow">
        <div class="dropdown-selected-option" :class="{'profit-option-active': isSelected === (index+1)}"
             @click="getSelectTime(index)" v-for="(item, index) in selectedList" :key="index">
          {{item.name}}
          <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>

      <div class="dropdown-selected" v-show="isShow1">
        <div class="dropdown-selected-option" :class="{'profit-option-active': isSelected1 === (index+1)}"
             @click="getSelectTime1(index,item)" v-for="(item, index) in selectedList1" :key="index">
          {{item < 12 ? `近${item}月` : `近${item / 12}年`}}
          <div class="dropdown-selected-active" v-show="isSelected1 === (index+1)"></div>
        </div>
        <div class="dropdown-zdy-option" @click="getZdysj()" :class="{'profit-option-active': isSelected1 === 10}">
          自定义
          <div class="dropdown-selected-active" v-show="isSelected1 === 10"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow1" @click="closeSelectedDiv1()"></div>
    </div>
    <div ref="chart" class="profit-charts"></div>
    <div class="profit-data-date">
      数据日期: {{selectTime}}
    </div>
    <div class="profit-qcbj">
      <span class="profit-qcbj-title">期初本金:</span>
      <input type="number" v-model="deCapMoney" placeholder="请输入金额"/>
      <span class="profit-qcbj-title">元</span>
      <span class="profit-computed-button" @click="comdeCapMoney">计算</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {ProductType} from '../config/retInfo.js';
  import echarts from 'echarts/lib/echarts';
  //引入散点图
  require('echarts/lib/chart/scatter');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        deCapMoney: 0,
        beforeSelectIndex: 3,
        selectTime: '20170212-20170712',
        gobackUrl: 'goBack',
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
        dataArray: [],
        basicOption: {}
      }
    },
    mounted() {
      document.body.style.backgroundColor = '#ffffff';
      this.myCharts = echarts.init(this.$refs.chart);
      this.basicOption = {
        title: {
          text: '资金回报率散点分布图',
          left: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#1a1a1a'
          }
        },
        color: ['#fb8463'],
        tooltip: {
          trigger: 'axis',
//          position: function (pos, params, dom, rect, size) {
//            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
//            //console.log(pos[0]);
//
////            var obj = {top: 60};
////            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
////            return obj;
//          },
          axisPointer: {
            type: 'cross'
          }
        },
        grid: { //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
          left: '6%',
          right: '6%',
          bottom: '25',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '交易轮数',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: {
            color: '#808086',
            fontSize: 12
          },
          splitLine: {
            show: false
          },
//          splitNumber: 10,
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#808086',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e4e7f0'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '资金回报率%',
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
            show: true,
            lineStyle: {
              color: '#e4e7f0'
            }
          }
        },
        series: [{
          name: '交易轮数',
          type: 'scatter',
          symbol: 'rect', //正方形
          symbolSize: 7, //点的大小
          large: false,
          label: {
            emphasis: {
              show: true,
              position: 'left',
              textStyle: {
                color: 'blue',
                fontSize: 16
              }
            }
          },
          data: this.dataArray
        }]
      }
      this.myCharts.setOption(this.basicOption);
    },
    computed: {
      ...mapState([
        'ProfitTimeFrom',
        'ProfitTimeTo',
        'isUserProfit'
      ])
    },
    activated() { //(使用keep-alive时)进入路由时的操作
      document.body.style.backgroundColor = '#ffffff';
      if (this.isUserProfit) {
        this.selectTime = `${this.$$timeFormate({
          date: this.ProfitTimeFrom,
          format: 'YMD'
        })}-${this.$$timeFormate({
          date: this.ProfitTimeTo,
          format: 'YMD'
        })}`;
        this.queryProfit(this.ProfitTimeFrom, this.ProfitTimeTo, this.selectedList[this.isSelected - 1].code, parseInt(this.deCapMoney));
      } else {
        this.isSelected1 = this.beforeSelectIndex;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
//        this.queryProfit('2010-01-01', '2010-08-01', this.deCapMoney);
        this.queryProfit(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code, parseInt(this.deCapMoney));
      }
    },
    methods: {
      comdeCapMoney() {
        if (this.isUserProfit) {
          this.queryProfit(this.ProfitTimeFrom, this.ProfitTimeTo, this.selectedList[this.isSelected - 1].code, parseInt(this.deCapMoney));
        } else {
          this.queryProfit(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code, parseInt(this.deCapMoney));
        }
      },
      queryProfit(startTime, endTime, prductCode = "", deCap = 0) { //查询盈亏分析
        let postParams = { //传入参数
          ST_DT: startTime,
          END_DT: endTime,
          INVESTOR_ID: this.UserID,
          PRODUCT_CD: prductCode,
          DECAP: deCap
        };
        let params = {
          'func': 2022,
          'type': 2,
          'account': '',
          'token': '',
          'data': [{
            'service': 'investor_analysis.105',
            'json': JSON.stringify(postParams)
          }]
        };
        this.$post({restUrl: 'queryProfit', params: params, loading: true})
          .then(response => {
            let result = JSON.parse(response.data.data[0].proxyresult).body.result;
            let TdataArray = [];
            result.map((item) => {
              TdataArray.push([item.ID_X, item.ID_Y]); //toFixed(4)
            });
            let currentOption;
            currentOption = {
              title: {
                text: '资金回报率散点分布图',
                left: 'center',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14,
                  color: '#1a1a1a'
                }
              },
              color: ['#fb8463'],
              tooltip: {
                trigger: 'axis',
//          position: function (pos, params, dom, rect, size) {
//            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
//            //console.log(pos[0]);
//
////            var obj = {top: 60};
////            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
////            return obj;
//          },
                axisPointer: {
                  type: 'cross'
                }
              },
              grid: { //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
                left: '6%',
                right: '6%',
                bottom: '25',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                name: '交易轮数',
                nameLocation: 'middle',
                nameGap: 30,
                nameTextStyle: {
                  color: '#808086',
                  fontSize: 12
                },
                splitLine: {
                  show: false
                },
//                splitNumber: 10,
                axisTick: {
                  alignWithLabel: true,
                  show: false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#808086',
                    fontSize: 12
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#e4e7f0'
                  }
                }
              },
              yAxis: {
                type: 'value',
                name: '资金回报率%',
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
                  show: true,
                  lineStyle: {
                    color: '#e4e7f0'
                  }
                }
              },
              series: [{
                name: '交易轮数',
                type: 'scatter',
                symbol: 'rect', //正方形
                symbolSize: 7, //点的大小
                large: false,
                label: {
                  emphasis: {
                    show: true,
                    position: 'left',
                    textStyle: {
                      color: 'blue',
                      fontSize: 16
                    }
                  }
                },
                data: TdataArray
              }]
            };
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
        if (this.isUserProfit) {
          this.queryProfit(this.ProfitTimeFrom, this.ProfitTimeTo, this.selectedList[this.isSelected - 1].code, this.deCapMoney);
        } else {
          this.queryProfit(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code, this.deCapMoney);
        }
      },
      getSelectTime1(index, item) {
        this.isShow1 = false;
        this.isSelected1 = index + 1;
        this.beforeSelectIndex = index + 1;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(item), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryProfit(pbUtils.dateFormat(this.getTimeByParam(item), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code, this.deCapMoney);
        this.$store.dispatch('updateisUserProfit', false);
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
