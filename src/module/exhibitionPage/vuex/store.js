import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 111,
    czType: 0, //操作类型 0 查看客户资料  1 编辑客户资料 2 新增潜在客户
    customerMessage: {
      OPENACCT_DT: '',
      FIRST_IN_DT: '',
      EXCHANGE_ID: ''
    },
    ccSetTime:''//持仓时间存储
  },
  mutations: {
    updateTest(state, payload) {
      state.test = payload.test
    },
    updateCzType(state, payload) {
      state.czType = payload.czType
    },
    updateCustomerMessage(state, payload) {
      state.customerMessage = payload.customerMessage
    },
    updateCcSetTime(state, payload) {
      state.ccSetTime = payload.ccSetTime
    }
  },
  actions: {
    updateTest({commit}, test) {
      commit({type: 'updateTest', test: test})
    },
    updateCzType({commit}, czType) {
      commit({type: 'updateCzType', czType: czType})
    },
    updateCustomerMessage({commit}, customerMessage) {
      commit({type: 'updateCustomerMessage', customerMessage: customerMessage})
    },
    updateCcSetTime({commit}, ccSetTime) {
      commit({type: 'updateCcSetTime', ccSetTime: ccSetTime})
    }
  },
  getters: {}
})

export default store
