import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addFollow: {
      InvestorId : '', //投资者ID
      name : '',       //投资者姓名
      followType : '日常事务', //跟进类型
      followDesc : '', //内容
      followNote : '', //备注（处理结果）
      attach : []      //附件列表
    }
  },
  mutations: {
    updateAddFollow(state, payload) {
      state.addFollow = payload.addFollow
    }
  },
  actions: {
    updateAddFollow({commit}, addFollow) {
      commit({type: 'updateAddFollow', addFollow: addFollow})
    }
  },
})
