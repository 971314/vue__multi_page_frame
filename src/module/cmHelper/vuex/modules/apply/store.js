export default {
  state: {
    //快速申请入口模板信息
    apply: {},
    //快速申请指定模板信息
    template: {},
    //任务信息
    task: {},
    //详情
    taskDetails: {},
    //权益排行榜时间
    rankingTime: {
      startTime: '',
      endTime: ''
    },
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
    updataApprovedPersonnelInfo (state, payload) {
      state.approvedPersonnelInfo = payload.approvedPersonnelInfo
    },
    updataAppObject (state, payload) {
      state.appObject = payload.appObject
    },
    updataTaskDetails (state, payload) {
      state.taskDetails = payload.taskDetails
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
    updataApprovedPersonnelInfo ({commit}, approvedPersonnelInfo) {
      commit({type: 'updataApprovedPersonnelInfo', approvedPersonnelInfo: approvedPersonnelInfo})
    },
    updataAppObject ({commit}, appObject) {
      commit({type: 'updataAppObject', appObject: appObject})
    },
    updataTaskDetails ({commit}, taskDetails) {
      commit({type: 'updataTaskDetails', taskDetails: taskDetails})
    }
  }
}
