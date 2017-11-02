import 'lib-flexible'
import Vue from 'vue'
import Index from './Index.vue'
import pbUI from '../../components'
import Axios from 'axios'
import router from './router'
import store from './vuex/store'
import './utils/mixins'
// import filters from './utils/filters'
import ComponentList from './components'

Vue.prototype.$axios = Axios
Vue.use(pbUI)

const componentGater = Object.values(ComponentList)
for (let componentItem of componentGater) {
  Vue.component(componentItem.name, componentItem)
}

// for (let [k, v] of Object.entries(filters)) {
//   Vue.filter(k, v)
// }


const index = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Index)
})
