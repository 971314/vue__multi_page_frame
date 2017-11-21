/**
 * Created by fzj on 2017/11/6.
 *目的:模块集中中心
 */
import Vue from 'vue'
import Vuex from 'vuex'
import leaderApply from './modules/leaderApply/store'
import leaderboards from './modules/leaderboards/store'
import others from './modules/others/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    leaderApply: leaderApply,
    leaderboards: leaderboards,
    others : others
  }
})
