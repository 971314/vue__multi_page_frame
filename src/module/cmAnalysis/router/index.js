import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入模块下的路由结构
import tradeAna from './tradeAna'
import basicAss from './basicAss'

let routes = []

routes = routes.concat(tradeAna,basicAss)

const router = new VueRouter({
  routes
})

export default router

