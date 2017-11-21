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
  }
}

export default urlList
