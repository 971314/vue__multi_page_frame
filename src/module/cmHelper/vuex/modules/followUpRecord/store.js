export default{
  state: {
    jumpFlag : 1,//1：跳转客户信息详情 2：跳转新建跟进 3：跳转其他
    //跟进情况
    addFollow: {
      businessType : '',//1:留存客户跟进   2:潜在客户跟进
      followId : '',   //客户跟进Id
      InvestorId : '', //投资者ID
      name : '',       //投资者姓名
      followType : '', //跟进类型code
      followTypeName : '', //跟进类型
      followDesc : '', //内容
      followNote : '', //备注（处理结果）
      attach : []      //附件列表
    },
    //留存客户（已开户）
    investor : {
      INVESTOR_ID : '', //客户代码
      INVESTOR_NAM : '',//客户名称
      LINKTELEPHONE : '',//电话
      MOBILE_NO : '',    //移动电话
      OPEN_STS : '',    //新开户情况：1-新开户未入金 2-新开户有入金
      VIPTYP : '',      //客户星级
    },
    //潜在客户（未开户）
    pInvestor : {
      CUST_ID : '', //客户代码
      CUST_NAM : '',//客户名称
      CUST_SRC : '',//潜在客户客户来源
      INPUT_TIME : '',//创建时间
      LINKTELEPHONE : '',//潜在客户电话
      MOBILE_NO : ''//潜在客户移动电话
    }
  },
  mutations: {
    updateAddFollow(state, payload) {
      state.addFollow = payload.addFollow
    },
    updateInvestor(state, payload) {
      state.investor = payload.investor
    },
    updatepInvestor(state, payload) {
      state.pInvestor = payload.pInvestor
    },
    updatepJumpFlag(state, payload) {
      state.jumpFlag = payload.jumpFlag
    }
  },
  actions: {
    updateAddFollow({commit}, addFollow) {
      commit({type: 'updateAddFollow', addFollow: addFollow})
    },
    updateInvestor({commit}, investor) {
      commit({type: 'updateInvestor', investor: investor})
    },
    updatepInvestor({commit}, pInvestor) {
      commit({type: 'updatepInvestor', pInvestor: pInvestor})
    },
    updatepJumpFlag({commit}, jumpFlag) {
      commit({type: 'updatepJumpFlag', jumpFlag: jumpFlag})
    }
  },
  getters: {}
}
