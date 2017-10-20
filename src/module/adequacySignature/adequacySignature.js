import Vue from 'vue'
import VueRouter from 'vue-router'
import pbUI from '../../components'
import Index from './Index.vue'
import Signature from './view/Signature.vue'

Vue.use(VueRouter)
Vue.component(pbUI.CommonNav.name, pbUI.CommonNav)

const router = new VueRouter({
  routes: [
    {path: '/', component: Signature}
  ]
})

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(Index)
})
