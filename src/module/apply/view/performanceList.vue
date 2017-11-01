<template>
  <div class="performance_list">
    <common-nav>
      <span slot="body">{{$store.state.performanceData.name}}</span>
    </common-nav>
    <!--成交持仓排名-->
    <div class="performance_tab"
         v-show="flag == 3 || flag == 7">
      <div>
        <div @click="tabClick(1)" :class="tab1 == 1?'selected':''">成交额<span :class="tab1 == 1 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(2)" :class="tab1 == 2?'selected':''">成交量<span :class="tab1 == 2 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(3)" :class="tab1 == 3?'selected':''">持仓额<span :class="tab1 == 3 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(4)" :class="tab1 == 4?'selected':''">持仓量<span :class="tab1 == 4 ? 'selected':''"></span>
        </div>
      </div>
    </div>

    <!--客户数量-->
    <div class="performance_tab"
         v-show="flag == 2 || flag == 6">
      <div>
        <div @click="tabClick(5)" :class="tab1 == 5?'selected':''">总客户数<span :class="tab1 == 5 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(6)" :class="tab1 == 6?'selected':''">开户数<span :class="tab1 == 6 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(7)" :class="tab1 == 7?'selected':''">活跃客户数<span :class="tab1 == 7 ? 'selected':''"></span>
        </div>
      </div>
    </div>
    <div class="performance_tab2"
         v-show="flag == 2&& tab1 == 5 || flag == 2&& tab1 == 6||flag == 6&& tab1 == 5 || flag == 6&& tab1 == 6">
      <div>
        <span @click="tabClick2(1)" :class="tab2 == 1?'selected':''">股指客户</span>
        <span @click="tabClick2(2)" :class="tab2 == 2?'selected':''">期权客户</span>
      </div>
    </div>

    <!--手续费排名-->
    <div class="performance_tab3"
         v-show="flag == 4 || flag == 8">
      <div>
        <div @click="tabClick(8)" :class="tab1 == 8?'selected':''">手续费<span :class="tab1 == 8 ? 'selected':''"></span>
        </div>
        <div @click="tabClick(9)" :class="tab1 == 9?'selected':''">留存手续费<span :class="tab1 == 9 ? 'selected':''"></span>
        </div>
      </div>
    </div>

    <!--资金情况排行-->
    <div class="performance_tab"
         v-show="flag == 1 || flag == 5">
      <div>
        <div @click="tabClick(10)" :class="tab1 == 10?'selected':''">期末权益<span
          :class="tab1 == 10 ? 'selected':''"></span></div>
        <div @click="tabClick(11)" :class="tab1 == 11?'selected':''">日均权益<span
          :class="tab1 == 11 ? 'selected':''"></span></div>
        <div @click="tabClick(12)" :class="tab1 == 12?'selected':''">净入金<span
          :class="tab1 == 12 ? 'selected':''"></span></div>
      </div>
    </div>

    <!--列表-->
    <div class="performance_list"
         :style="{top:flag == 2&& tab1 == 5 || flag == 2&& tab1 == 6||flag == 6&& tab1 == 5 || flag == 6&& tab1 == 6?'125px':'85px',bottom:footer?'49px':'0px'}">
      <div class="group_list" v-for="(data,i) in performanceList">
        <div>
          <img src="../images/ranking1.png" v-if="i == 0"/>
          <img src="../images/ranking2.png" v-else-if="i == 1"/>
          <img src="../images/ranking3.png" v-else-if="i == 2"/>
          <div v-else>{{i + 1}}</div>
          <span>{{data.name}}</span>
          <span>{{$$transformData(data.num)}}</span>
        </div>
        <div v-show="i < 10"
             :style="{width: i == 0? '100%':calculationPercentage(data.num,performanceList[0].num)}"></div>
      </div>
    </div>

    <!--footer-->
    <div class="performance_list_footer" v-show="footer">
      <div>
        <span :class="footerFlag == 1 ? 'selected':''" @click="footerClick(1)">近一月</span>
        <span :class="footerFlag == 2 ? 'selected':''" @click="footerClick(2)">近三月</span>
        <span :class="footerFlag == 3 ? 'selected':''" @click="footerClick(3)">近半年</span>
        <span :class="footerFlag == 4 ? 'selected':''" @click="footerClick(4)">近一年</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        performanceList: [
          {
            name: '北京西直门营业一部',
            num: '987654321'
          }, {
            name: '北京西直门营业一部',
            num: '977654321'
          }, {
            name: '北京西直门营业一部',
            num: '787654321'
          }, {
            name: '北京西直门营业一部',
            num: '687654321'
          }, {
            name: '北京西直门营业一部',
            num: '587654321'
          }, {
            name: '北京西直门营业一部',
            num: '487654321'
          }, {
            name: '北京西直门营业一部',
            num: '387654321'
          }, {
            name: '北京西直门营业一部',
            num: '287654321'
          }, {
            name: '北京西直门营业一部',
            num: '187654321'
          }, {
            name: '北京西直门营业一部',
            num: '117654321'
          }, {
            name: '北京西直门营业一部',
            num: '127654321'
          }, {
            name: '北京西直门营业一部',
            num: '137654321'
          }, {
            name: '北京西直门营业一部',
            num: '147654321'
          }, {
            name: '北京西直门营业一部',
            num: '157654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }, {
            name: '北京西直门营业一部',
            num: '167654321'
          }
        ],
        footer: true,
        footerFlag: 1,
        tab1: 1,
        tab2: 1,
        flag: null,//分类选择 1 营业部资金情况 2营业部客户数量 3营业部客户成交持仓 4营业部交易手续费 5客户资金情况 6客户数量 7客户成交持仓 8客户交易手续费
        type: null,//1 营业部 2 客户经理
        /* flag: 1,
         type: 1,*/
        beginTime: '',
        endTime: ''
      }
    },
    computed: {},
    created () {
      /*this.initialRequest()
      this.footerClick(1)*/
    },
    activated () {
      this.flag = this.$store.state.performanceData.flag
      this.type = this.$store.state.performanceData.type
      this.initialRequest()
      this.footerClick(1)
    },
    mounted () {
    },
    methods: {
      //一级tab选择
      tabClick (flag) {
        this.tab1 = flag
        if (flag == 1 || flag == 2 || flag == 3 || flag == 4 || flag == 6 || flag == 8 || flag == 7 || flag == 9 || flag == 11 || flag == 12) {
          this.footer = true
        } else {
          this.footer = false
        }
      },
      //二级tab选择
      tabClick2 (flag) {
        this.tab2 = flag
      },
      //日期区间选择
      footerClick (flag) {
        this.footerFlag = flag
        if (flag == 1) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(1), format: 'YMD'})
        } else if (flag == 2) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(3), format: 'YMD'})
        } else if (flag == 3) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(6), format: 'YMD'})
        } else if (flag == 4) {
          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(12), format: 'YMD'})
        }
        this.endTime = this.$$timeFormate({date: this.GetDateStr(0), format: 'YMD'})
      },
      //初始页面选择
      initialRequest () {
        if (this.flag == 1 || this.flag == 5) {
          this.tabClick(10)
        } else if (this.flag == 2 || this.flag == 6) {
          this.tabClick(5)
          this.tabClick2(1)
        } else if (this.flag == 3 || this.flag == 7) {
          this.tabClick(1)
        } else if (this.flag == 4 || this.flag == 8) {
          this.tabClick(8)
        }
      },
      //数据请求
      request () {
        let _this = this
        _this.$axios.post(PBHttpServer.apply.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/', {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.$toast('提交成功')
            setTimeout(() => {
              _this.$router.replace('/')
            }, 1500)
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          _this.$toast('网络超时，请稍后重试！')
          console.log(err)
        })
      }
    }
  }
</script>
