<template>
  <div class="ranking_list">
    <common-nav>
      <span slot="body">权益排行榜</span>
      <span slot="footer" class="icon_calendar" @click="showEvent = true"></span>
      <!--<img src="../images/icon_calendar.png" slot="footer" class="icon_calendar"/>-->
    </common-nav>
    <div class="ranking_date">
      数据统计区间：{{$store.state.rankingTime.startTime}} 至 {{$store.state.rankingTime.endTime}}
    </div>
    <div class="tableBody" v-show="rankingData.length > 0">
      <div class="TheadWrap borderBottom">
        <table class="table1">
          <tbody>
          <tr>
            <td>
              <span>排名</span>
            </td>
            <td>
              <span>客户姓名</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="detailOuter">
          <table>
            <thead>
            <tr>
              <td><span>期末权益(万)</span></td>
              <td><span>日均权益(万)</span></td>
              <td><span>保证金(万)</span></td>
              <td><span>风险度(%)</span></td>
              <td><span>成交金额(万)</span></td>
              <td><span>成交手数</span></td>
              <td><span>出金(万)</span></td>
              <td><span>入金(万)</span></td>
              <td><span>净入入金(万)</span></td>
              <td><span></span></td>
            </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="ranking">
        <div class="TbodyInner">
          <table class="brief">
            <tbody>
            <tr v-for="(data,i) in rankingData" class="borderBottom">
              <td v-if="i == 0"><img src="../images/ranking1.png"/></td>
              <td v-else-if="i == 1"><img src="../images/ranking2.png"/></td>
              <td v-else-if="i == 2"><img src="../images/ranking3.png"/></td>
              <td v-else>
                <div>{{i + 1}}</div>
              </td>
              <td>
                <div>{{data.investorName }}</div>
                <div>{{data.capitalAccount }}</div>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="detailOuter">
            <table class="detail">
              <tbody>
              <tr v-for="(data,i) in rankingData" class="borderBottom">
                <td><span>{{data.finalEquity}}</span></td>
                <td><span>{{data.dailyEquity}}</span></td>
                <td><span>{{data.margin}}</span></td>
                <td><span>{{data.risk}}</span></td>
                <td><span>{{data.turnVolume }}</span></td>
                <td><span>{{data.volume}}</span></td>
                <td><span>{{data.yearGold}}</span></td>
                <td><span>{{data.yearDeposit}}</span></td>
                <td><span>{{data.netDeposit}}</span></td>
                <td><span></span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <multi-slide v-model="showEvent">
      <div class="bottom_modal">
        <div @click="selectTimeInterval(1)">本月</div>
        <div @click="selectTimeInterval(2)">近半年</div>
        <div @click="selectTimeInterval(3)">近一年</div>
        <div @click="selectTimeInterval(4)">自定义
        </div>
        <div @click="showEvent = false">取消</div>
      </div>
    </multi-slide>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        showEvent: false,
        rankingData: []
      }
    },
    created () {
      this.$store.dispatch('updataRankingTime', {
        startTime: this.GetDateStr(0),
        endTime: this.GetDateStr(0)
      })
      this.getInfo()
//      this.getData()
    },
    mounted () {
      Ps.initialize(document.getElementById('ranking'), {
        frozen: true,
        wheelSpeed: 200
      })
    },
    activated () {
      this.getData()
    },
    updated: function () {
      Ps.update(document.getElementById('ranking'))
    },
    methods: {
      //日期区间处理
      selectTimeInterval (num) {
        if (num == 1) {
          this.$store.dispatch('updataRankingTime', {
            startTime: this.$$timeFormate({date: this.GetDateStr(0), format: 'Y-M'}) + '-01',
            endTime: this.GetDateStr(0)
          })
          this.getData()
        } else if (num == 2) {
          this.$store.dispatch('updataRankingTime', {
            startTime: this.$$timeFormate({date: this.getTimeByParam(6), format: 'Y-M-D'}),
            endTime: this.GetDateStr(0)
          })
          this.getData()
        } else if (num == 3) {
          this.$store.dispatch('updataRankingTime', {
            startTime: this.$$timeFormate({date: this.getTimeByParam(12), format: 'Y-M-D'}),
            endTime: this.GetDateStr(0)
          })
          this.getData()
        } else if (num == 4) {
          this.$router.push('/setTime')
        }
        this.showEvent = false
      },
      //获取数据请求
      getData () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalRanking.url + _this.info.userId + '?beginDate=' + _this.$$timeFormate({
          date: _this.$store.state.rankingTime.startTime,
          format: 'YMD'
        }) + '&endDate=' + _this.$$timeFormate({
          date: _this.$store.state.rankingTime.endTime,
          format: 'YMD'
        }), {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.rankingData = data.data
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
