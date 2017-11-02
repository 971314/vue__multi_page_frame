const urlList = {
  investorInfo: {
    name: '单一投资者基本信息',
    url: 'investor/base',
    type: 'Get'
  },
  investorOpen: {
    name: '单一投资者开户信息',
    url: 'investor/open',
    type: 'Get'
  },
  fundInfo: {
    name: '单一投资者上一日资金情况',
    url: 'investor/fundInfo',
    type: 'Get'
  },
  positionInfo: {
    name: '单一投资者上一日持仓情况',
    url: 'investor/position',
    type: 'Get'
  },
  investorBusinessHall: {
    name: '投资者掌厅流水',
    url: 'investorBusinessHall/flow',
    type: 'Get'
  },
  pInvestorInfo: {
    name: '单一潜在客户信息',
    url: 'pInvestor/detail',
    type: 'Get'
  },
  pInvestorDelete: {
    name: '删除潜在客户',
    url: 'pInvestor/detail',
    type: 'Delete'
  },
  pInvestorAdd: {
    name: '新增潜在用户',
    url: 'pInvestor/detail',
    type: 'POST'
  },
  pInvestorEdit: {
    name: '编辑潜在用户',
    url: 'pInvestor/detail',
    type: 'put'
  },
  investorFollowList: {
    name: '查询某个留存客户跟进列表',
    url: 'investorFollow/list',
    type: 'Get'
  },
  pInvestorFollowList: {
    name: '查询某个潜在客户跟进列表',
    url: 'pInvestorFollow/list',
    type: 'Get'
  },
  opScheduleList: {
    name: '查询开户进度列表',
    url: 'opSchedule/list',
    type: 'Get'
  }
}

export default urlList
