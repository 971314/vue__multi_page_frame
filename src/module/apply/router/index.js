import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import applyFast from '../view/applyFast.vue'
import applyFill from '../view/applyFill.vue'
import applyOpt from '../view/applyOpt.vue'
import approvalDetails from '../view/approvalDetails.vue'
import approvalIndex from '../view/approvalIndex.vue'
import approvalProcess from '../view/approvalProcess.vue'
import rankingList from '../view/rankingList.vue'

const routes = [
  {path: '/',component:applyFast},//选择申请
  {path: '/applyFill',component:applyFill},//填写模板
  {path: '/applyOpt',component:applyOpt},//模板选择
  {path: '/approvalIndex',component:approvalIndex},//审批进程
  {path: '/approvalDetails',component:approvalDetails},//申请详情
  {path: '/approvalProcess',component:approvalProcess},//申请进程
  {path: '/rankingList',component:rankingList},//权益排行榜
]

const router = new VueRouter({
  routes
});
export default router
