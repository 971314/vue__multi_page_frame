const urlList = {
  leaderApprove: {
    name: '查看我要处理的审批',
    url: 'leader/leaderApprove/list',
    type: 'Get'
  },
  accountApproveDetail: {
    name: '查看任务详情',
    url: 'accountApprove/detail',
    type: 'Get'
  },
  dealApproval: {
    name: '处理某个审批',
    url: 'leader/leaderApprove/detail',
    type: 'Post'
  },
  getDepartList: {
    name: '查询部门列表',
    url: 'leader/depart/list',
    type: 'get'
  },
  getStaffList: {
    name: '查询员工列表',
    url: 'leader/personnel/list',
    type: 'get'
  },
  getStaffDetail: {
    name: '查询员工基本信息',
    url: 'leader/personnel/detail',
    type: 'get'
  },
  getAccountApproveHis: {
    name: '查看任务的审批历史',
    url: 'accountApproveHis/detail',
    type: 'get'
  }
  
}

export default urlList
