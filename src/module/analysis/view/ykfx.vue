<template>
  <div class="ykfx">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="ykfx-title" slot="body">
        投资者盈利率
      </div>
    </common-nav>
    <div class="ykfx-select-group">
      <div class="ykfx-left-select" @click="showSelectDiv">
        <div class="left-select-title">
          周期:
        </div>
        <div class="left-select-content">
          <span class="select-text-current" :class="{'choose-active': isShow}"
                v-text="selectedList[isSelected-1].name"></span>
          <span class="dropdown-tria" :class="{'up-choose': isShow}"></span>
        </div>
      </div>
      <div class="ykfx-right-select" @click="showSelectDiv1">
        <div class="right-select-content">
          <span v-show="isSelected1 < 10" class="select-text-current" :class="{'choose-active': isShow1}"
                v-text="selectedList1[isSelected1-1] < 12 ? `近${selectedList1[isSelected1-1]}月`:`近${selectedList1[isSelected1-1]/12}年`"></span>
          <span v-show="isSelected1 >=10" class="select-text-current" :class="{'choose-active': isShow1}">自定义</span>
          <span class="dropdown-tria" :class="{'up-choose': isShow1}"></span>
        </div>
      </div>
      <div class="dropdown-selected" v-show="isShow">
        <div class="dropdown-selected-option" :class="{'ykfx-option-active': isSelected === (index+1)}"
             @click="getSelectTime(index)" v-for="(item, index) in selectedList" :key="index">
          {{item.name}}
          <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>

      <div class="dropdown-selected" v-show="isShow1">
        <div class="dropdown-selected-option" :class="{'ykfx-option-active': isSelected1 === (index+1)}"
             @click="getSelectTime1(index,item)" v-for="(item, index) in selectedList1" :key="index">
          {{item < 12 ? `近${item}月` : `近${item / 12}年`}}
          <div class="dropdown-selected-active" v-show="isSelected1 === (index+1)"></div>
        </div>
        <div class="dropdown-zdy-option" @click="getZdysj()" :class="{'ykfx-option-active': isSelected1 === 10}">
          自定义
          <div class="dropdown-selected-active" v-show="isSelected1 === 10"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow1" @click="closeSelectedDiv1()"></div>
    </div>
    <div ref="chart" class="ykfx-charts"></div>
    <div class="ykfx-data-date">
      数据日期: {{selectTime}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import echarts from 'echarts/lib/echarts';
  import moment from "moment";
  // 引入柱状图
  require('echarts/lib/chart/line');
  // 引入折线图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  export default{
    data() {
      return {
        beforeSelectIndex: 3,
        selectTime: '20170212-20170712',
        gobackUrl: 'goBack',
        dataFrom: this.$route.query.datafrom ? this.$route.query.datafrom : '',
        dataTo: this.$route.query.datato ? this.$route.query.datato : '',
        isShow: false,  //是否显示弹层---左边弹出层
        isShow1: false, //右边弹出层
        isSelected: 1, //是否选中  --左边弹出层
        isSelected1: 3, //是否选中  --右边弹出层
        selectedList: [//选择条件数组
          {
            name: "日",
            code: 'D'
          },
          {
            name: "周",
            code: 'W'
          },
          {
            name: "月",
            code: 'M'
          }
        ],
        selectedList1: [//选择条件数组
          1,
          3,
          6,
          12
        ],
        myCharts: null,
        basicOption: {
          title: {
            text: '投资者盈利率分析图',
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              color: '#1a1a1a'
            }
          },
          color: ['#e4e4f0', '#fb8463'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            left: '4%',
            right: '2%',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'time',
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
                color: ['#E8E8E8'],
                type: 'solid'
              }
            }
          },
          yAxis: [
            {
              name: '投资者盈亏(k)',
              scale: true,
              splitNumber: 5,
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
            }, {
              type: "value",
              name: '盈利率',
              scale: true,
              splitNumber: 5,
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
                  color: '#b1b1b1'
                }
              },
              splitLine: { //网格线
                show: false,
                lineStyle: {
                  color: ['#E8E8E8'],
                  type: 'solid'
                }
              }
            }],
          series: [{
            name: '投资者盈亏',
            type: 'bar',
            yAxisIndex: 0
          }, {
            name: '盈利率',
            type: 'line',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            symbol: 'circle', //正方形
            symbolSize: 3, //点的大小
            large: false,
            yAxisIndex: 1
          }]
        }
      }
    },
    computed: {
      ...mapState([
        'ykfxTimeFrom',
        'ykfxTimeTo',
        'isUserykfx'
      ])
    },
    activated() { //(使用keep-alive时)进入路由时的操作
      document.body.style.backgroundColor = '#ffffff';
      if (this.isUserykfx) {
        this.selectTime = `${this.$$timeFormate({
          date: this.ykfxTimeFrom,
          format: 'YMD'
        })}-${this.$$timeFormate({
          date: this.ykfxTimeTo,
          format: 'YMD'
        })}`;
        this.queryYkfx(this.ykfxTimeFrom, this.ykfxTimeTo, this.selectedList[this.isSelected - 1].code);
      } else {
        this.isSelected1 = this.beforeSelectIndex;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryYkfx(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
      }
    },
    mounted() {
      document.body.style.backgroundColor = '#ffffff';
      this.myCharts = echarts.init(this.$refs.chart);
      this.myCharts.setOption(this.basicOption);
    },
    methods: {
      queryYkfx(startTime, endTime, timeGroup) { //查询盈亏分析
        let postParams = { //传入参数
          ST_DT: startTime,
          END_DT: endTime,
          INVESTOR_ID: this.UserID,
          DAY_TYP: timeGroup
        };
        let params = {
          'func': 2022,
          'type': 2,
          'account': '',
          'token': '',
          'data': [{
            'service': 'investor_analysis.102',
            'json': JSON.stringify(postParams)
          }]
        };
        this.$post({restUrl: 'queryYkfx', params: params, loading: true})
          .then(response => {
            let YK_arr = [],
              YLL_arr = [];
            let result = JSON.parse(response.data.data[0].proxyresult).body.result;
            result.map((item) => {
              let TEMP_arr = [];
              if (Object.is(item.SEQ, 1)) {
                TEMP_arr[0] = item.ID_X;
                TEMP_arr[1] = (item.ID_Y / 1000).toFixed(2);
                YK_arr.push(TEMP_arr);
              } else if (Object.is(item.SEQ, 2)) {
                TEMP_arr[0] = item.ID_X;
                TEMP_arr[1] = item.ID_Y;
                YLL_arr.push(TEMP_arr);
              }

            });
            let currentOption = {
              "series": [
                {
                  "data": YK_arr
                },
                {
                  "data": YLL_arr,
                  "showSymbol": YLL_arr.length > 50 ? false : true
                }
              ]
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
        if (this.isUserykfx) {
          this.queryYkfx(this.ykfxTimeFrom, this.ykfxTimeTo, this.selectedList[this.isSelected - 1].code);
        } else {
          this.queryYkfx(pbUtils.dateFormat(this.getTimeByParam(this.selectedList1[this.isSelected1 - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
        }
      },
      getSelectTime1(index, item) {
        this.isShow1 = false;
        this.isSelected1 = index + 1;
        this.beforeSelectIndex = index + 1;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(item), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryYkfx(pbUtils.dateFormat(this.getTimeByParam(item), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'), this.selectedList[this.isSelected - 1].code);
        this.$store.dispatch('updateisUserykfx', false);
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
