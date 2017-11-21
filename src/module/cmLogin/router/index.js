import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import logIn from '../view/logIn.vue'
import bindCRM from '../view/bindCRM.vue'

const routes = [
  {path: '/', component: logIn},//登录
  {path: '/bindCRM', component: bindCRM}//绑定CRM
]

const router = new VueRouter({
  routes
})
export default router
