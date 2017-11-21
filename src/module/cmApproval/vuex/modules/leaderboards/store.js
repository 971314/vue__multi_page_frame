export default {
  state: {
    //业绩排行榜入口信息存储
    performanceData: {},
  },
  mutations: {
    updataPerformanceData (state, payload) {
      state.performanceData = payload.performanceData
    }
  },
  actions: {
    updataPerformanceData ({commit}, performanceData) {
      commit({type: 'updataPerformanceData', performanceData: performanceData})
    }
  },
  getters: {}
}
