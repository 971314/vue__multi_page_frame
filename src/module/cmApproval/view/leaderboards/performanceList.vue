<template>
  <div class="performance_list">
    <common-nav>
      <span slot="body">{{performanceData.name}}</span>
    </common-nav>
    <!--成交持仓排名-->
    <div class="performance_tab"
         v-show="flag == 3 || flag == 7">
      <div>
        <div @click="tabClick(1)" :class="tab1 == 1?'selected':''">
          <div>成交额</div>
          <span :class="tab1 == 1 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(2)" :class="tab1 == 2?'selected':''">
          <div>成交量</div>
          <span :class="tab1 == 2 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(3)" :class="tab1 == 3?'selected':''">
          <div>持仓额</div>
          <span :class="tab1 == 3 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(4)" :class="tab1 == 4?'selected':''">
          <div>持仓量</div>
          <span :class="tab1 == 4 ? 'selected':''"></span>
        </div>
      </div>
    </div>

    <!--客户数量-->
    <div class="performance_tab"
         v-show="flag == 2 || flag == 6">
      <div>
        <div @click="tabClick(5)" :class="tab1 == 5?'selected':''">
          <div>总客户数</div>
          <span :class="tab1 == 5 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(6)" :class="tab1 == 6?'selected':''">
          <div>开户数</div>
          <span :class="tab1 == 6 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(7)" :class="tab1 == 7?'selected':''">
          <div>活跃客户数</div>
          <span :class="tab1 == 7 ? 'selected':''"></span>
        </div>
      </div>
    </div>
    <div class="performance_tab2"
         v-show="flag == 2&& tab1 == 5 || flag == 2&& tab1 == 6||flag == 6&& tab1 == 5 || flag == 6&& tab1 == 6">
      <div>
        <span @click="tabClick2(0)" :class="tab2 == 0?'selected':''">全部</span>
        <span @click="tabClick2(1)" :class="tab2 == 1?'selected':''">股指客户</span>
        <span @click="tabClick2(2)" :class="tab2 == 2?'selected':''">期权客户</span>
      </div>
    </div>

    <!--手续费排名-->
    <div class="performance_tab3"
         v-show="flag == 4 || flag == 8">
      <div>
        <div @click="tabClick(8)" :class="tab1 == 8?'selected':''">
          <div>手续费</div>
          <span :class="tab1 == 8 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(9)" :class="tab1 == 9?'selected':''">
          <div>留存手续费</div>
          <span :class="tab1 == 9 ? 'selected':''"></span>
        </div>
      </div>
    </div>

    <!--资金情况排行-->
    <div class="performance_tab"
         v-show="flag == 1 || flag == 5">
      <div>
        <div @click="tabClick(10)" :class="tab1 == 10?'selected':''">
          <div>期末权益</div>
          <span
            :class="tab1 == 10 ? 'selected':''"></span></div>
        <div @click="tabClick(11)" :class="tab1 == 11?'selected':''">
          <div>日均权益</div>
          <span
            :class="tab1 == 11 ? 'selected':''"></span></div>
        <div @click="tabClick(12)" :class="tab1 == 12?'selected':''">
          <div>净入金</div>
          <span
            :class="tab1 == 12 ? 'selected':''"></span></div>
      </div>
    </div>

    <!--表头-->
    <div class="header">
      <div>
        <span>{{flag == 1 || flag == 2 || flag == 3 || flag == 4 ? '营业部名称' : '客户经理'}}</span>
        <!--成交持仓-->
        <span v-if="flag == 3 && tab1 == 1 || flag == 7 && tab1 == 1">成交额</span>
        <span v-if="flag == 3 && tab1 == 2 || flag == 7 && tab1 == 2">成交量</span>
        <span v-if="flag == 3 && tab1 == 3 || flag == 7 && tab1 == 3">持仓额</span>
        <span v-if="flag == 3 && tab1 == 4 || flag == 7 && tab1 == 4">持仓量</span>
        <!--客户数量-->
        <span v-if="flag == 2 && tab1 == 5 && tab2 == 0 || flag == 6 && tab1 == 5 && tab2 == 0">客户总数</span>
        <span v-if="flag == 2 && tab1 == 5  && tab2 == 1|| flag == 6 && tab1 == 5 && tab2 == 1">股指客户数</span>
        <span v-if="flag == 2 && tab1 == 5  && tab2 == 2|| flag == 6 && tab1 == 5 && tab2 == 2">期权客户数</span>

        <span v-if="flag == 2 && tab1 == 6 && tab2 == 0 || flag == 6 && tab1 == 6 && tab2 == 0">开户总数</span>
        <span v-if="flag == 2 && tab1 == 6  && tab2 == 1|| flag == 6 && tab1 == 6 && tab2 == 1">股指开户数</span>
        <span v-if="flag == 2 && tab1 == 6  && tab2 == 2|| flag == 6 && tab1 == 6 && tab2 == 2">期权开户数</span>

        <span v-if="flag == 2 && tab1 == 7 || flag == 6 && tab1 == 7">活跃客户数</span>
        <!--手续费-->
        <span v-if="flag == 4 && tab1 == 8 || flag == 8 && tab1 == 8">手续费</span>
        <span v-if="flag == 4 && tab1 == 9 || flag == 8 && tab1 == 9">留存手续费</span>
        <!--资金情况-->
        <span v-if="flag == 1 && tab1 == 10 || flag == 5 && tab1 == 10">期末权益</span>
        <span v-if="flag == 1 && tab1 == 11 || flag == 5 && tab1 == 11">日均权益</span>
        <span v-if="flag == 1 && tab1 == 12 || flag == 5 && tab1 == 12">净入金</span>
      </div>
    </div>

    <!--列表-->
    <div class="performance_list" id="performance_list" :style="{paddingBottom:footer?'48px':''}">
      <div class="group_list" v-for="(data,i) in performanceList" @click="jump(data)">
        <div>
          <img src="../../images/leaderboards/ranking1.png" v-if="i == 0"/>
          <img src="../../images/leaderboards/ranking2.png" v-else-if="i == 1"/>
          <img src="../../images/leaderboards/ranking3.png" v-else-if="i == 2"/>
          <div v-else>{{data.SEQ_NO}}</div>
          <span>{{data.INVESTOR_NAM}}</span>
          <span>{{ data.DAY_ORDER > 0 || data.DAY_ORDER < 0 ? $$transformData(data.DAY_ORDER) : data.DAY_ORDER == 0 ? data.DAY_ORDER : '--'}}</span>
        </div>
        <div v-show="i < 10"
             :style="{width: data.DAY_ORDER == 0 || !data.DAY_ORDER || data.DAY_ORDER < 0 || data.DAY_ORDER == '-'?'0':i == 0? '100%':calculationPercentage(data.DAY_ORDER,performanceList[0].DAY_ORDER)}"></div>
      </div>
    </div>

    <!--footer-->
    <div class="performance_list_footer" v-show="footer">
      <div>
        <span :class="footerFlag == 0 ? 'selected':''" @click="footerClick(0)">近一月</span>
        <span :class="footerFlag == 1 ? 'selected':''" @click="footerClick(1)">近三月</span>
        <span :class="footerFlag == 2 ? 'selected':''" @click="footerClick(2)">近半年</span>
        <span :class="footerFlag == 3 ? 'selected':''" @click="footerClick(3)">近一年</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        performanceList: [],
        footer: true,
        footerFlag: 1,
        tab1: 1,
        tab2: 1,
        flag: null,//分类选择 1 营业部资金情况 2营业部客户数量 3营业部客户成交持仓 4营业部交易手续费 5客户资金情况 6客户数量 7客户成交持仓 8客户交易手续费
        type: null,//0 营业部 1 客户
        beginTime: '',
        endTime: ''
      }
    },
    computed: {
      ...mapState({
        performanceData: ({leaderboards}) => leaderboards.performanceData
      })
    },
    created () {

    },
    activated () {
      this.flag = this.performanceData.flag
      this.type = this.performanceData.type
      this.initialRequest()
    },
    mounted () {
    },
    methods: {
      //一级tab选择
      tabClick (flag) {
        document.getElementById('performance_list').scrollTop = 0
        this.tab1 = flag
        this.footerFlag = 0
        if (flag == 5 || flag == 6) {//客户数量一级tab切换默认二级tab
          this.tab2 = 0
        }
        if (flag == 1 || flag == 2 || flag == 3 || flag == 4 || flag == 6 || flag == 8 || flag == 7 || flag == 9 || flag == 11 || flag == 12) {
          this.footer = true//时间区间显示
        } else {
          this.footer = false//时间区间不显示
        }
        this.performanceList = []
        this.request()
      },
      //客户数量二级tab选择
      tabClick2 (flag) {
        this.tab2 = flag
        this.performanceList = []
        this.request()
      },
      //日期区间选择
      footerClick (flag) {
        this.footerFlag = flag
        this.performanceList = []
        this.request()
        /*if (flag == 1) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(1), format: 'YMD'})
        } else if (flag == 2) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(3), format: 'YMD'})
        } else if (flag == 3) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(6), format: 'YMD'})
        } else if (flag == 4) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(12), format: 'YMD'})
        }
        this.endTime = this.$$timeFormate({date: this.GetDateStr(0), format: 'YMD'})*/
      },
      //初始页面选择
      initialRequest () {
        if (this.flag == 1 || this.flag == 5) {
          this.tabClick(10)
        } else if (this.flag == 2 || this.flag == 6) {
          this.tabClick(5)
        } else if (this.flag == 3 || this.flag == 7) {
          this.tabClick(1)
        } else if (this.flag == 4 || this.flag == 8) {
          this.tabClick(8)
        }
      },
      //业绩排行榜数据
      request () {
        let flag = this.flag
        if (flag == 3 || flag == 7) {//持仓排名
          if (this.tab1 == 1) {//成交额
            this.customerPositionsRequest(0)
          } else if (this.tab1 == 2) {//成交量
            this.customerPositionsRequest(1)
          } else if (this.tab1 == 3) {//成交额
            this.customerPositionsRequest(2)
          } else if (this.tab1 == 4) {//持仓量
            this.customerPositionsRequest(3)
          }
        } else if (flag == 2 || flag == 6) {//客户数量
          if (this.tab1 == 5) {//总客户数
            if (this.tab2 == 0) {
              this.numberOfClientsRequest('00')
            } else if (this.tab2 == 1) {
              this.numberOfClientsRequest('01')
            } else if (this.tab2 == 2) {
              this.numberOfClientsRequest('02')
            }
          } else if (this.tab1 == 6) {//开户数
            if (this.tab2 == 0) {
              this.numberOfClientsRequest('10')
            }
            if (this.tab2 == 1) {
              this.numberOfClientsRequest('11')
            } else if (this.tab2 == 2) {
              this.numberOfClientsRequest('12')
            }
          } else if (this.tab1 == 7) {//活跃客户数
            this.numberOfClientsRequest(2)
          }
        } else if (flag == 4 || flag == 8) {//手续费排名
          if (this.tab1 == 8) {//手续费
            this.feeRequest(0)
          } else if (this.tab1 == 9) {//留存手续费
            this.feeRequest(1)
          }
        } else if (flag == 1 || flag == 5) {//资金情况排行
          if (this.tab1 == 10) {//期末权益
            this.fundingRequest(0)
          } else if (this.tab1 == 11) {//日均权益
            this.fundingRequest(1)
          } else if (this.tab1 == 12) {//净入金
            this.fundingRequest(2)
          }
        }
      },
      //资金排行
      fundingRequest (type) {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmApproval.serverUrl + this.urlList.fundingRanking.url + _this.info.userId + '?timeSpeed=' + _this.footerFlag + '&sortType=' + type + '&userType=' + this.performanceData.type, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.performanceList = data.data
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      },
      //客户数量排行
      numberOfClientsRequest (type) {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmApproval.serverUrl + this.urlList.numberOfClients.url + _this.info.userId + '?timeSpeed=' + _this.footerFlag + '&sortType=' + type + '&userType=' + this.performanceData.type, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.performanceList = data.data
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      },
      //持仓排行
      customerPositionsRequest (type) {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmApproval.serverUrl + this.urlList.customerPositions.url + _this.info.userId + '?timeSpeed=' + _this.footerFlag + '&sortType=' + type + '&userType=' + this.performanceData.type, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.performanceList = data.data
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      },
      //手续费排行
      feeRequest (type) {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmApproval.serverUrl + this.urlList.feeRanking.url + _this.info.userId + '?timeSpeed=' + _this.footerFlag + '&sortType=' + type + '&userType=' + this.performanceData.type, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.performanceList = data.data
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      },
      //跳转
      jump (data) {
        if (this.performanceData.type == 0) {
          this.$store.dispatch('updataDepartId', data.INVESTOR_ID)
          this.$store.dispatch('updataDepartName', data.INVESTOR_NAM)
          this.$router.push({name: 'departmentDetail'})
        } else if (this.performanceData.type == 1) {
          this.$store.dispatch('updataPersonnelId', data.INVESTOR_ID)
          this.$router.push({name: 'staffInfoDetail'})
        }
      }
    }
  }
</script>
