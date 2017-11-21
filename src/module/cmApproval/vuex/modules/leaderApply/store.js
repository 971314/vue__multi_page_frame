export default {
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
}
