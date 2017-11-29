import 'lib-flexible'
import Vue from 'vue'
import Index from './Index.vue'
import pbUI from '../../components'
import Impression from 'vue-impression'
import router from './router'
import store from './vuex'
import './utils/mixins'
import ComponentList from './components'

Vue.use(pbUI)
Vue.use(Impression)
// import FastClick from 'fastclick'

// 去掉ios上300毫秒延迟
// FastClick.attach(document.body)

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
