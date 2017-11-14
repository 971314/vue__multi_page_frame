import 'lib-flexible'
import Vue from 'vue'
import Index from './Index.vue'
import pbUI from '../../components'
import Axios from 'axios'
import router from './router'
import Impression from 'vue-impression'
import store from './vuex'
import './utils/mixins'
import ComponentList from './components'
import InfiniteScroll from 'mint-ui'

Vue.prototype.$axios = Axios //首次登陆需要的请求
Vue.use(Impression)
Vue.use(pbUI)
Vue.use(InfiniteScroll)

const componentGater = Object.values(ComponentList)

for (let componentItem of componentGater) {
  Vue.component(componentItem.name, componentItem)
}


const index = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
})
