import applyFast from '../../view/apply/applyFast.vue'
import applyFill from '../../view/apply/applyFill.vue'
import nonTemplate from '../../view/apply/nonTemplate.vue'
import applyOpt from '../../view/apply/applyOpt.vue'
import approvalDetails from '../../view/apply/approvalDetails.vue'
import approvalIndex from '../../view/apply/approvalIndex.vue'
import approvalProcess from '../../view/apply/approvalProcess.vue'
import equityRanking from '../../view/apply/equityRanking.vue'
import setTime from '../../view/apply/setTime.vue'
import preview from '../../view/apply/preview.vue'
import intermediary from '../../view/apply/intermediary.vue'
import information from '../../view/apply/information.vue'

const routes = [
  {path: '/applyFast', name: 'applyFast', component: applyFast},//选择申请
  {path: '/applyFill', component: applyFill},//模板申请
  {path: '/nonTemplate', component: nonTemplate},//非模板申请
  {path: '/applyOpt', component: applyOpt},//模板选择
  {path: '/approvalIndex', name: 'approvalIndex', component: approvalIndex},//审批进程
  {path: '/approvalDetails', component: approvalDetails},//申请详情
  {path: '/approvalProcess', component: approvalProcess},//申请进程
  {path: '/equityRanking', name: 'equityRanking', component: equityRanking},//权益排行榜
  {path: '/setTime', component: setTime},//自定义时间
  {path: '/preview', component: preview},//预览
  {path: '/intermediary', component: intermediary},//居间人
  {path: '/information', component: information}//消息
]

export default routes
