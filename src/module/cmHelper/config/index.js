import exhibitionPage from './exhibitionPage/retUrl.js'
import cmHelperIndex from './cmHelperIndex/retUrl.js'
import followUpRecord from './followUpRecord/retUrl.js'
import apply from './apply/retUrl.js'

//地址总集合，使用方式： 例如要添加另一个模块a 则：Object.assign({},exhibitionPage, a)
const urlLargeSet = Object.assign({},exhibitionPage,cmHelperIndex,followUpRecord,apply)

export default urlLargeSet
