/**
 * Created by fzj on 2017/11/6.
 *目的:模块集中中心
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tradeAna from './modules/tradeAna/store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tradeAna: tradeAna
  }
})
