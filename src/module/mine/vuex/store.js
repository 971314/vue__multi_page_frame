import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 111,
    isFisrt: false,
    userInfoAll: {
      avatar: '',
      petName: ``,
      sex: ``,
      age: 0,
      prefessionName: '',
      prefession: ``,
      email: '',
      userId: ''
    },
    prefessionList: [
      {
        proId: '0',
        proName: '无'
      }
    ]
  },
  mutations: {
    updateTest(state, payload) {
      state.test = payload.test
    },
    updateIsFisrt(state, payload) {
      state.isFisrt = payload.isFisrt
    },
    updateUserInfoAll(state, payload) {
      state.userInfoAll = payload.userInfoAll
    },
    updatePrefessionList(state, payload) {
      state.prefessionList = payload.prefessionList
    }
  },
  actions: {
    updateTest({commit}, test) {
      commit({type: 'updateTest', test: test})
    },
    updateIsFisrt({commit}, isFisrt) {
      commit({type: 'updateIsFisrt', isFisrt: isFisrt})
    },
    updateUserInfoAll({commit}, userInfoAll) {
      commit({type: 'updateUserInfoAll', userInfoAll: userInfoAll})
    },
    updatePrefessionList({commit}, prefessionList) {
      commit({type: 'updatePrefessionList', prefessionList: prefessionList})
    }
  },
  getters: {}
})

export default store
