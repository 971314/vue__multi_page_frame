import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import applyFast from '../view/applyFast.vue'
import applyFill from '../view/applyFill.vue'
import applyOpt from '../view/applyOpt.vue'
import approvalDetails from '../view/approvalDetails.vue'
import approvalIndex from '../view/approvalIndex.vue'
import approvalProcess from '../view/approvalProcess.vue'
import equityRanking from '../view/equityRanking.vue'
import setTime from '../view/setTime.vue'
import logIn from '../view/logIn.vue'
import bindCRM from '../view/bindCRM.vue'
import performanceClassification from '../view/performanceClassification.vue'
import performanceList from '../view/performanceList.vue'
import chooseCustomer from '../view/chooseCustomer.vue'

const routes = [
  {path: '/', component: applyFast},//选择申请
  {path: '/applyFill', component: applyFill},//填写模板
  {path: '/applyOpt', component: applyOpt},//模板选择
  {path: '/approvalIndex', component: approvalIndex},//审批进程
  {path: '/approvalDetails', component: approvalDetails},//申请详情
  {path: '/approvalProcess', component: approvalProcess},//申请进程
  {path: '/equityRanking', component: equityRanking},//权益排行榜
  {path: '/setTime', component: setTime},//自定义时间
  {path: '/logIn', component: logIn},//登录
  {path: '/bindCRM', component: bindCRM},//绑定CRM
  {path: '/performanceClassification', component: performanceClassification},//业绩排行分类
  {path: '/performanceList', component: performanceList},//业绩列表
  {path: '/chooseCustomer', component: chooseCustomer}//选择客户
]

const router = new VueRouter({
  routes
})
export default router
