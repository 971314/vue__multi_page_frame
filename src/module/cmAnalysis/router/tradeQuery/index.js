import capitalFlow from '../../view/tradeQuery/capitalFlow.vue'
import closePosition from '../../view/tradeQuery/closePosition.vue'
import delivery from '../../view/tradeQuery/delivery.vue'
import entrustDeal from '../../view/tradeQuery/entrustDeal.vue'
import exercise from '../../view/tradeQuery/exercise.vue'
import fundInOut from '../../view/tradeQuery/fundInOut.vue'
import impawn from '../../view/tradeQuery/impawn.vue'
import position from '../../view/tradeQuery/position.vue'

const routes = [
  {
    path: '/capitalFlow',    //资金流水
    name: 'capitalFlow',
    component: capitalFlow
  },
  {
    path: '/closePosition',    //平仓明细
    name: 'closePosition',
    component: closePosition
  },
  {
    path: '/delivery',    //交割明细
    name: 'delivery',
    component: delivery
  },{
    path: '/entrustDeal',    //委托成交
    name: 'entrustDeal',
    component: entrustDeal
  },{
    path: '/exercise',    //行权明细
    name: 'exercise',
    component: exercise
  },{
    path: '/fundInOut',    //出入金
    name: 'fundInOut',
    component: fundInOut
  },{
    path: '/impawn',    //质押明细
    name: 'impawn',
    component: impawn
  },{
    path: '/position',    //持仓汇总
    name: 'position',
    component: position
  }
]

export default routes
