import leaderApply from './leaderApply/retUrl.js'
import others from './others/retUrl.js'
import leaderboards from './leaderboards/retUrl.js'

//地址总集合，使用方式： 例如要添加另一个模块a 则：Object.assign({},exhibitionPage, a)
const urlLargeSet = Object.assign({}, leaderApply, others, leaderboards)

export default urlLargeSet
