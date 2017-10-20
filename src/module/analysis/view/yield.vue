<template>
  <div class="yield">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="yield-title" slot="body">
        业绩基本分析
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

    <div class="yield-tab-selected">
      <div class="tab-selected-items" :class="{'yield-tab-active': tabIndex === (index+1)}"
           @click="tabSelect(index,item.pathName)"
           v-for="(item, index) in tabList">
        {{item.name}}
        <div class="tab-indicator-line" v-if="tabIndex === (index+1)"></div>
      </div>
    </div>
    <router-view :inve-analy="tabList"></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {InvestorAnaLysisInfo} from '../config/retInfo.js';
  export default{
    data() {
      return {
        beforeSelectIndex: 3,
        gobackUrl: 'goBack',
        isShow: false,  //是否显示弹层
        isSelected: 3, //是否选中
        tabIndex: 1, //tab选项卡指示值
        selectedList: [//选择条件数组
          1,
          3,
          6,
          12
        ], //弹出层数据
        tabList: InvestorAnaLysisInfo,
        selectTime: '20170212-20170712'
      }
    },
    computed: {
      ...mapState([
        'YeildTimeFrom',
        'YeildTimeTo',
        'isUserYield'
      ])
    },
    activated() {
      document.body.style.backgroundColor = '#f7f7fa';
      if (this.isUserYield) {
        this.selectTime = `${this.$$timeFormate({
          date: this.YeildTimeFrom,
          format: 'YMD'
        })}-${this.$$timeFormate({
          date: this.YeildTimeTo,
          format: 'YMD'
        })}`;
        this.queryAllInfo(this.YeildTimeFrom, this.YeildTimeTo);
      } else {
        this.isSelected = this.beforeSelectIndex;
        this.selectTime = `${pbUtils.dateFormat(this.getTimeByParam(this.selectedList[this.isSelected - 1]), 'yyyyMMdd')}-${pbUtils.dateFormat(this.getCurrentTime, 'yyyyMMdd')}`;
        this.queryAllInfo(pbUtils.dateFormat(this.getTimeByParam(this.selectedList[this.isSelected - 1]), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'));
      }
    },
    mounted() {
      document.body.style.backgroundColor = '#f7f7fa';
    },
    methods: {
      queryAllInfo(startTime, endTime) { //查询投资者整体业绩分析
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
            'service': 'investor_analysis.101',
            'json': JSON.stringify(postParams)
          }]
        };
        this.$post({restUrl: 'queryAllInfo', params: params, loading: true})
          .then(response => {
            let result = JSON.parse(response.data.data[0].proxyresult).body.result;
            result.map((resItem) => {
              this.tabList.map((tabItem) => {
                tabItem.list.map((tab) => {
                  tab.map((iteminfo) => {
                    if (iteminfo.code === resItem.CHITEMCODE) {
                      iteminfo.value = Object.is(Number(resItem.ITEMVALUE), NaN) ? (resItem.ITEMVALUE ? resItem.ITEMVALUE : '0') : this.$$comma(resItem.ITEMVALUE, 3);
                    }
                  });
                });
              });
            });
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
        this.queryAllInfo(pbUtils.dateFormat(this.getTimeByParam(item), 'yyyy-MM-dd'), pbUtils.dateFormat(this.getCurrentTime, 'yyyy-MM-dd'));
        this.$store.dispatch('updateisUserYield', false);
      },
      closeSelectedDiv() {
        this.isShow = false;
      },
      tabSelect(index, pathName) {
        this.tabIndex = index + 1;
        this.$router.replace({name: pathName});
      },
      getZdysj() {
        this.isShow = false;
        this.isSelected = 10;
        this.$router.push({name: 'zdytime'});
      }
    }
  }
</script>
