<template>
  <div class="ranking_list">
    <common-nav>
      <span slot="body">权益排行榜</span>
    </common-nav>
    <div class="tableBody">
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
              <td><span>最新入金时间</span></td>
              <td><span>月盈亏(万)</span></td>
              <td><span>半年盈亏(万)</span></td>
              <td><span>年盈亏(万)</span></td>
              <td><span>保证金(万)</span></td>
              <td><span>风险度(%)</span></td>
              <td><span>成交手数</span></td>
              <td><span>留存手数</span></td>
              <td><span>业绩占比(%)</span></td>
              <td><span>佣金提成(%)</span></td>
              <td><span>年出金(万)</span></td>
              <td><span>年入今(万)</span></td>
              <td><span>年净入金(万)</span></td>
              <td></td>
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
              <td v-else="i == 2">
                <div>{{i}}</div>
              </td>
              <td>
                <div>{{data.customerName}}</div>
                <div>{{data.capitalAccount}}</div>
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
                <td><span>{{data.depositDate}}</span></td>
                <td><span>{{data.monthlyIncome}}</span></td>
                <td><span>{{data.halfYearIncome}}</span></td>
                <td><span>{{data.oneYearIncome}}</span></td>
                <td><span>{{data.margin}}</span></td>
                <td><span>{{data.risk}}</span></td>
                <td><span>{{data.volume}}</span></td>
                <td><span>{{data.keepVolume}}</span></td>
                <td><span>{{data.ratio}}</span></td>
                <td><span>{{data.commission}}</span></td>
                <td><span>{{data.yearGold}}</span></td>
                <td><span>{{data.yearDeposit}}</span></td>
                <td><span>{{data.netDeposit}}</span></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        rankingData: [
          {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }, {
            customerName: '稽伟明',
            capitalAccount: '072322567',
            finalEquity: '123456',
            dailyEquity: '123456',
            depositDate: '123456',
            monthlyIncome: '12346',
            halfYearIncome: '12346',
            oneYearIncome: '12346',
            margin: '12346',
            risk: '12346',
            volume: '12346',
            keepVolume: '12346',
            ratio: '12346',
            commission: '12346',
            yearGold: '12346',
            yearDeposit: '12346',
            netDeposit: '12346'
          }
        ]
      }
    },
    mounted () {
      Ps.initialize(document.getElementById('ranking'), {
        frozen: true,
        wheelSpeed: 200
      })
    },
    updated: function () {
      Ps.update(document.getElementById('ranking'))
    },
    methdos: {}
  }
</script>
