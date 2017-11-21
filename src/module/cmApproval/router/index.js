import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入模块下的路由结构
import leaderApply from './leaderApply'
import leaderboards from './leaderboards'
import others from './others'

let routes = []

routes = routes.concat(
  leaderApply, leaderboards,others)

const router = new VueRouter({
  routes
})

export default router

