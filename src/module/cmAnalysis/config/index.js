import tradeAna from './tradeAna/retUrl.js'
import basicAss from './basicAss/retUrl.js'
import tradeQuery from './tradeQuery/retUrl.js'
//地址总集合，使用方式： 例如要添加另一个模块a 则：Object.assign({},exhibitionPage, a)
const urlLargeSet = Object.assign({},tradeAna,basicAss,tradeQuery)

export default urlLargeSet
