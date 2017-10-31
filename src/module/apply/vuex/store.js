import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apply: {
      tplTypeName: '',//模板名称
      tplTypeModel: '',//模板类型模式
      tplType: '',//模板类型
    },
    template: {
      tplId: '',
      tplName: ''
    },
    task: {
      bizTypeId: '',
      bizId: ''
    },
    rankingTime: {
      startTime: '',
      endTime: ''
    },
    performanceData: {}
  },
  mutations: {
    updataApply (state, payload) {
      state.apply = payload.apply
    },
    updataTemplate (state, payload) {
      state.template = payload.template
    },
    updataTask (state, payload) {
      state.task = payload.task
    },
    updataRankingTime (state, payload) {
      state.rankingTime = payload.rankingTime
    },
    updataPerformanceData (state, payload) {
      state.performanceData = payload.performanceData
    }
  },
  actions: {
    updataApply ({commit}, apply) {
      commit({type: 'updataApply', apply: apply})
    },
    updataTemplate ({commit}, template) {
      commit({type: 'updataTemplate', template: template})
    },
    updataTask ({commit}, task) {
      commit({type: 'updataTask', task: task})
    },
    updataRankingTime ({commit}, rankingTime) {
      commit({type: 'updataRankingTime', rankingTime: rankingTime})
    },
    updataPerformanceData ({commit}, performanceData) {
      commit({type: 'updataPerformanceData', performanceData: performanceData})
    }
  }
})

export default store
