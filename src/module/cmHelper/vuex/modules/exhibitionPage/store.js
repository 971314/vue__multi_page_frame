export default {
  state: {
    test: 111,
    czType: 0, //操作类型 0 查看客户资料  1 编辑客户资料 2 新增潜在客户
    czSex: true,
    customerMessage: {
      OPENACCT_DT: '',
      FIRST_IN_DT: '',
      EXCHANGE_NAM: ''
    },
    ccSetTime: '2010-04-01', //持仓时间存储
    noPotSex: ''  //潜在客户的性别
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
    },
    updateNoPotSex(state, payload) {
      state.noPotSex = payload.noPotSex
    },
    updateCzSex(state, payload) {
      state.czSex = payload.czSex
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
    },
    updateNoPotSex({commit}, noPotSex) {
      commit({type: 'updateNoPotSex', noPotSex: noPotSex})
    },
    updateCzSex({commit}, czSex) {
      commit({type: 'updateCzSex', czSex: czSex})
    }
  },
  getters: {}
}

