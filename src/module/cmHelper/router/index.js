import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入模块下的路由结构
import exhibitionPage from './exhibitionPage'
import cmHelperIndex from './cmHelperIndex'
import followUpRecord from './followUpRecord'
import apply from './apply'

let routes = []

routes = routes.concat(
  exhibitionPage,
  cmHelperIndex,
  followUpRecord,
  apply)

const router = new VueRouter({
  routes
})

export default router

