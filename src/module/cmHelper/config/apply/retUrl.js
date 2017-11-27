const urlList = {
  approvalModules: {
    name: '申请模块',
    url: 'tpl/list/'
  },
  approvalSelect: {
    name: '选择模块',
    url: 'tpl/detail/'
  },
  approvalSubmit: {
    name: '任务提交/查看任务详情/撤销任务',
    url: 'accountApprove/detail/'
  },
  approvalToView: {
    name: '查看审批',
    url: 'accountApprove/list/'
  },
  /*approvalDetails: {
    name: '查看任务详情',
    url: 'accountApprove/detail/'
  },
  approvalRevoked: {
    name: '撤销任务',
    url: 'accountApprove/detail/'
  },*/
  approvalHistory: {
    name: '查看任务的审批历史',
    url: 'accountApproveHis/detail/'
  },
  approvalRanking: {
    name: '权益排行',
    url: 'investorRightsRanking/info/'
  },
  approvalLog: {
    name: '登录',
    url: 'authentication/session/'
  },
  approvalBind: {
    name: '绑定',
    url: 'account/binding/'
  },
  inquireApprovedPersonnel: {
    name: '查询审批人员信息',
    url: 'accountApproveMessage/detail/'
  },
  imageUpload: {
    name: '图片上传',
    url: 'image/upload/'
  },
  imageView: {
    name: '图片查看',
    url: 'attachImages/'
  },
  intermediary: {
    name: '获取居间人列表',
    url: 'mediator/list'
  }
}

export default urlList
