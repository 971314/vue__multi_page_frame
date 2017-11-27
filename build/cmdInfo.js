/**
 * Created by fzj on 2017/8/17.
 */

module.exports = { //自定义打包模块数量
  conf: {
    cmd: ['condition', 'alerted', 'stopProfit', 'main', 'mine', 'account', 'eCalendar', 'mrkHot', 'indNews', 'jgdx', 'activity', 'analysis', 'adequacy', 'adequacySignature','cmApproval', 'cmHelper', 'cmLogin']
  },
  wq: {
    cmd: ['cmHelper', 'cmApproval', 'cmLogin', 'mine']
  },
  condition: {
    cmd: ['condition', 'alerted', 'stopProfit', 'main', 'mine', 'account']
  },
  sdx: {
    cmd: ['adequacy', 'adequacySignature']
  },
  V3_3: {
    cmd: ['main','mine','eCalendar','mrkHot','indNews','jgdx','activity','adequacy', 'adequacySignature']
  },
  fzj: {
    cmd: ['cmApproval', 'cmHelper', 'cmLogin']
  }
}

