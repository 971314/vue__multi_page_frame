import YieldCurve from '../../view/tradeAna/yieldCurve.vue'
import BreakEven from '../../view/tradeAna/breakEven.vue'
import BreakEvenB from '../../view/tradeAna/breakEvenB.vue'
import VarietyProfit from '../../view/tradeAna/varietyProfit.vue'
import RiskAnalysis from '../../view/tradeAna/riskAnalysis.vue'
import Rehabilitation from '../../view/tradeAna/rehabilitation.vue'
import RateReturnFunds from '../../view/tradeAna/rateReturnFunds.vue'

const routes = [
  {
    path: '/',    //收益率曲线
    name: 'yieldCurve',
    component: YieldCurve
  },
  {
    path: '/breakEven',    //盈亏分析
    name: 'breakEven',
    component: BreakEven
  },
  {
    path: '/breakEvenB',    //盈亏比分析
    name: 'breakEvenB',
    component: BreakEvenB
  },
  {
    path: '/varietyProfit',    //品种盈亏
    name: 'varietyProfit',
    component: VarietyProfit
  },
  {
    path: '/riskAnalysis',    //风险度分析
    name: 'riskAnalysis',
    component: RiskAnalysis
  },
  {
    path: '/rehabilitation',    //复权资金
    name: 'rehabilitation',
    component: Rehabilitation
  },
  {
    path: '/rateReturnFunds',    //资金回报率
    name: 'rateReturnFunds',
    component: RateReturnFunds
  }
]

export default routes
