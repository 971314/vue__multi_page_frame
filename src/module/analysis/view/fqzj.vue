<template>
  <div class="fqzj">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="fqzj-title" slot="body">
        投资者复权资金曲线
      </div>
    </common-nav>
    <div class="time-show-line">
      数据日期: {{selectTime}}
      <div class="time-right-choose" @click="showSelectDiv">
        <span v-show="isSelected < 10" class="time-right-text" :class="{'choose-active': isShow}"
              v-text="selectedList[isSelected-1] < 12 ? `近${selectedList[isSelected-1]}月`:`近${selectedList[isSelected-1]/12}年`"></span>
        <span v-show="isSelected >=10" class="time-right-text" :class="{'choose-active': isShow}">自定义</span>
        <span class="down-choose" :class="{'up-choose': isShow}"></span>
      </div>
      <div class="dropdown-selected" v-show="isShow">
        <div class="dropdown-selected-option" :class="{'yield-option-active': isSelected === (index+1)}"
             @click="getSelectTime(index,item)" v-for="(item, index) in selectedList" :key="index">
          {{item < 12 ? `近${item}月` : `近${item / 12}年`}}
          <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
        </div>
        <div class="dropdown-zdy-option" :class="{'yield-option-active': isSelected === 10}" @click="getZdysj()">
          自定义
          <div class="dropdown-selected-active" v-show="isSelected === 10"></div>
        </div>
      </div>
      <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>
    </div>
    <div ref="chart" class="fqzj-charts"></div>
    <div class="fqzj-indicator">
      <div class="fqzj-indicator-item">
        <span class="fqzj-indicator-color fqzj-indicator-crj"></span>
        <span class="fqzj-indicator-text">出入金</span>
      </div>
      <div class="fqzj-indicator-item">
        <span class="fqzj-indicator-color fqzj-indicator-fqzjqx"></span>
        <span class="fqzj-indicator-text">复权资金曲线</span>
      </div>
      <div class="fqzj-indicator-item">
        <span class="fqzj-indicator-color fqzj-indicator-ljcrj"></span>
        <span class="fqzj-indicator-text">累计出入金</span>
      </div>
      <div class="fqzj-indicator-item">
        <span class="fqzj-indicator-color fqzj-indicator-yszjqx"></span>
        <span class="fqzj-indicator-text">原始资金曲线</span>
      </div>
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
        gobackUrl: 'goBack',
        isShow: false,  //是否显示弹层
        isSelected: 3, //是否选中
        selectedList: [//选择条件数组
          1,
          3,
          6,
          12
        ],
        selectTime: '20170212-20170712',
        myCharts: null,
        basicOption: {
          title: {
            text: '投资者复权资金曲线图',
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              color: '#1a1a1a'
            }
          },
          color: ['#fb8463', '#2868e8', '#add79a', '#52668c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            left: '2%',
            right: '6%',
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
              name: '资金(k)',
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
            }],
          series: [{
            name: '出入金',
            type: 'line',
            stack: '总量',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            symbol: 'circle', //正方形
            symbolSize: 3, //点的大小
            large: false
          },
            {
              name: '复权资金',
              type: 'line',
              stack: '总量',
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              symbol: 'circle', //正方形
              symbolSize: 3, //点的大小
              large: false
            },
            {
              name: '累计出入金',
              stack: '总量',
              type: 'line',
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              symbol: 'circle', //正方形
              symbolSize: 3, //点的大小
              large: false
            },
            {
              name: '原始资金曲线',
              type: 'line',
              stack: '总量',
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              symbol: 'circle', //正方形
              symbolSize: 3, //点的大小
              large: false
            }]
        }
      }
    },
    computed: {
      ...mapState([
        'fqzjTimeFrom',
        'fqzjTimeTo',
        'isUserfqzj'
      ])
    },
    mounted() {
      document.body.style.backgroundColor = '#ffffff';
      this.myCharts = echarts.init(this.$refs.chart);
      this.myCharts.setOption(this.basicOption);
    },
    activated() {
      document.body.style.backgroundColor = '#ffffff';
      if (this.isUserfqzj) {
        this.selectTime = `${this.$$timeFormate({
          date: this.fqzjTimeFrom,
          format: 'YMD'
        })}-${this.$$timeFormate({
          date: this.fqzjTimeTo,
          format: 'YMD'
        })}`;
        this.queryFQQX(this.fqzjTimeFrom, this.fqzjTimeTo);
      } else {
        this.isSelected = this.beforeSelectIndex;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(this.selectedList[this.isSelected - 1]), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryFQQX(pbUtils.dateFormat(this.getTimeByParam(this.selectedList[this.isSelected - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'));
      }
    },
    methods: {
      queryFQQX(startTime, endTime) { //查询盈亏分析
        let postParams = { //传入参数
          ST_DT: startTime,
          END_DT: endTime,
          INVESTOR_ID: this.UserID
        };
        let params = {
          'func': 2022,
          'type': 2,
          'account': '',
          'token': '',
          'data': [{
            'service': 'investor_analysis.104',
            'json': JSON.stringify(postParams)
          }]
        };
        this.$post({restUrl: 'queryFQQX', params: params, loading: true})
          .then(response => {
            let result = JSON.parse(response.data.data[0].proxyresult).body.result;
            let CRJ_array = [], FQZJ_array = [], LJCRJ_array = [], YSZJ_array = [];
            result.map((item) => {
              if (item.ID_NAM == "出入金") {
                let temp_array = [];
                temp_array[0] = item.ID_X;
                temp_array[1] = (item.ID_Y / 1000).toFixed(4);
                CRJ_array.push(temp_array);
              } else if (item.ID_NAM == "复权资金曲线") {
                let temp_array = [];
                temp_array[0] = item.ID_X;
                temp_array[1] = (item.ID_Y / 1000).toFixed(4);
                FQZJ_array.push(temp_array);
              } else if (item.ID_NAM == "累计出入金") {
                let temp_array = [];
                temp_array[0] = item.ID_X;
                temp_array[1] = (item.ID_Y / 1000).toFixed(4);
                LJCRJ_array.push(temp_array);
              } else if (item.ID_NAM == "原始资金曲线") {
                let temp_array = [];
                temp_array[0] = item.ID_X;
                temp_array[1] = (item.ID_Y / 1000).toFixed(4);
                YSZJ_array.push(temp_array);
              }

            });

            let currentOption;
            currentOption = {
              "series": [
                {
                  "data": CRJ_array,
                  "showSymbol": CRJ_array.length > 50 ? false : true
                },
                {
                  "data": FQZJ_array,
                  "showSymbol": FQZJ_array.length > 50 ? false : true
                },
                {
                  "data": LJCRJ_array,
                  "showSymbol": LJCRJ_array.length > 50 ? false : true
                },
                {
                  "data": YSZJ_array,
                  "showSymbol": YSZJ_array.length > 50 ? false : true
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
        this.isShow = !this.isShow;
      },
      getSelectTime(index, item) {
        this.isShow = false;
        this.isSelected = index + 1;
        this.beforeSelectIndex = index + 1;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(item), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryFQQX(pbUtils.dateFormat(this.getTimeByParam(item), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'));
        this.$store.dispatch('updateisUserfqzj', false);
      },
      closeSelectedDiv() {
        this.isShow = false;
      },
      getZdysj() {
        this.isShow = false;
        this.isSelected = 10;
        this.$router.push({name: 'zdytime'});
      }
    }
  }
</script>
