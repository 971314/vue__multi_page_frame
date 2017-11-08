/**
 * Created by fzj on 2017/11/6.
 *目的:模块集中中心
 */
import Vue from 'vue'
import Vuex from 'vuex'
import exhibitionPage from './modules/exhibitionPage/store'
import followUpRecord from './modules/followUpRecord/store'
import apply from './modules/apply/store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    exhibitionPage: exhibitionPage,
    followUpRecord: followUpRecord,
    apply: apply
  }
})
