export default {
  state: {
    //快速申请入口模板信息
    apply: {},
    //快速申请指定模板信息
    template: {},
    //任务信息
    task: {
      bizTypeId: '',
      bizId: ''
    },
    //权益排行榜时间
    rankingTime: {
      startTime: '',
      endTime: ''
    },
    //选择客户信息存储
    chooseCustomer: {},
    // 审批人员信息
    approvedPersonnelInfo: {},
    //被申请对象
    appObject: {
      appObjectName: '选择申请人姓名'
    }
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
    updataChooseCustomer (state, payload) {
      state.chooseCustomer = payload.chooseCustomer
    },
    updataApprovedPersonnelInfo (state, payload) {
      state.approvedPersonnelInfo = payload.approvedPersonnelInfo
    },
    updataAppObject (state, payload) {
      state.appObject = payload.appObject
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
    updataChooseCustomer ({commit}, chooseCustomer) {
      commit({type: 'updataChooseCustomer', chooseCustomer: chooseCustomer})
    },
    updataApprovedPersonnelInfo ({commit}, approvedPersonnelInfo) {
      commit({type: 'updataApprovedPersonnelInfo', approvedPersonnelInfo: approvedPersonnelInfo})
    },
    updataAppObject ({commit}, appObject) {
      commit({type: 'updataAppObject', appObject: appObject})
    }
  }
}
