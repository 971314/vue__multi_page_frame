export default {
  state: {
    departId : '',           //部门编号
    departName : '',         //部门名称
    departPageReturn : '',   //进入部门列表页面后，跳回【1跳转员工资料 ''营业部详情】 
    personnelId : '',        //员工编号 
    personnelName : '',        //员工姓名
    process : {
      businessKeyId : '',    //流程实例编号
      processId : '',        //流程类型编号
      taskId : '',           //任务编号
      flag : '',             //1同意  2驳回
      message : '',          //意见  
      taskFlag : ''          //1待审批  2已审批 
    },
    proHis : {
      appStatusName : '',//审核状态
      processName : '',  //申请内容
      appDateTime : ''   //提交时间
    },
    departIdArr : [],    //当前查询的部门层级，的查询id
    pageTitle : ['营业部'],
    searchType : ''      //1：搜员工  2：搜部门
  },
  mutations: {
    updataProcess (state, payload) {
      state.process = payload.process
    },
    updataDepartId (state, payload) {
      state.departId = payload.departId
    },
    updataDepartPageReturn (state, payload) {
      state.departPageReturn = payload.departPageReturn
    },
    updataDepartName (state, payload) {
      state.departName = payload.departName
    },
    updataPersonnelId (state, payload) {
      state.personnelId = payload.personnelId
    },
    updataPersonnelName (state, payload) {
      state.personnelName = payload.personnelName
    },
    updataProHis (state, payload) {
      state.proHis = payload.proHis
    },
    updatadePartIdArr (state, payload) {
      state.departIdArr = payload.departIdArr
    },
    updataPageTitle (state, payload) {
      state.pageTitle = payload.pageTitle
    },
    updataSearchType (state, payload) {
      state.searchType = payload.searchType
    }
  },
  actions: {
    updataProcess ({commit}, process) {
      commit({type: 'updataProcess', process: process})
    },
    updataDepartId ({commit}, departId) {
      commit({type: 'updataDepartId', departId: departId})
    },
    updataDepartPageReturn ({commit}, departPageReturn) {
      commit({type: 'updataDepartPageReturn', departPageReturn: departPageReturn})
    },
    updataDepartName ({commit}, departName) {
      commit({type: 'updataDepartName', departName: departName})
    },
    updataPersonnelId ({commit}, personnelId) {
      commit({type: 'updataPersonnelId', personnelId: personnelId})
    },
    updataPersonnelName ({commit}, personnelName) {
      commit({type: 'updataPersonnelName', personnelName: personnelName})
    },
    updataProHis ({commit}, proHis) {
      commit({type: 'updataProHis', proHis: proHis})
    },
    
    updatadePartIdArr ({commit}, departIdArr) {
      commit({type: 'updatadePartIdArr', departIdArr: departIdArr})
    },
    updataPageTitle ({commit}, pageTitle) {
      commit({type: 'updataPageTitle', pageTitle: pageTitle})
    },
    updataSearchType ({commit}, searchType) {
      commit({type: 'updataSearchType', searchType: searchType})
    }
  },
  getters: {}
}
