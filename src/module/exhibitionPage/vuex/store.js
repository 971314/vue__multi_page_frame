import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 111
  },
  mutations: {
    updateTest(state, payload) {
      state.test = payload.test
    }
  },
  actions: {
    updateTest({commit}, test) {
      commit({type: 'updateTest', test: test})
    }
  },
  getters: {}
})

export default store
