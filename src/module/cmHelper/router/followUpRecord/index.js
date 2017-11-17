import list from '../../view/followUpRecord/list'
import addAndEdit from '../../view/followUpRecord/addAndEdit'
import approTask from '../../view/followUpRecord/approTask'
import approProcess from '../../view/followUpRecord/approProcess'
import rejectTask from '../../view/followUpRecord/rejectTask'
import staffInfo from '../../view/followUpRecord/staffInfo'
import staffInfoF from '../../view/followUpRecord/staffInfoF'
import customerInfoList from '../../view/followUpRecord/customerInfoList'
import businessDpt from '../../view/followUpRecord/businessDpt'

const routes = [
      {path: '/list', name: 'list',component: list},
      {path: '/addAndEdit',name : 'addAndEdit' ,component: addAndEdit},
      {path: '/approTask',component: approTask},
      {path: '/approProcess',component: approProcess},
      {path: '/rejectTask',component: rejectTask},
      {path: '/staffInfo',component: staffInfo},
      {path: '/staffInfoF',component: staffInfoF},
      {path: '/customerInfoList',name: 'customerInfoList', component: customerInfoList},
      {path: '/businessDpt',name: 'businessDpt', component: businessDpt}
]

export default routes

