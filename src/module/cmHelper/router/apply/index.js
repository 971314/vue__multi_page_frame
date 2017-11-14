import applyFast from '../../view/apply/applyFast.vue'
import applyFill from '../../view/apply/applyFill.vue'
import nonTemplate from '../../view/apply/nonTemplate.vue'
import applyOpt from '../../view/apply/applyOpt.vue'
import approvalDetails from '../../view/apply/approvalDetails.vue'
import approvalIndex from '../../view/apply/approvalIndex.vue'
import approvalProcess from '../../view/apply/approvalProcess.vue'
import equityRanking from '../../view/apply/equityRanking.vue'
import setTime from '../../view/apply/setTime.vue'
import logIn from '../../view/apply/logIn.vue'
import bindCRM from '../../view/apply/bindCRM.vue'

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
  {path: '/', component: logIn},//登录
  {path: '/bindCRM', component: bindCRM}//绑定CRM
]

export default routes
