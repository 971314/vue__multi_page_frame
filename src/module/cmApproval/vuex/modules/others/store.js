export default {
  state: {
    process : {
      businessKeyId : '',    //流程实例编号
      processId : '',        //流程类型编号
      taskId : '',           //任务编号
      flag : 1,              //1同意  2驳回
      message : ''           //意见  
    }
  },
  mutations: {
    updataProcess (state, payload) {
      state.process = payload.process
    }
  },
  actions: {
    updataProcess ({commit}, process) {
      commit({type: 'updataProcess', process: process})
    }
  },
  getters: {}
}
