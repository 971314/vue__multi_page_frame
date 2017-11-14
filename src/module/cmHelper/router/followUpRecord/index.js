import list from '../../view/followUpRecord/list'
import addAndEdit from '../../view/followUpRecord/addAndEdit'
import approTask from '../../view/followUpRecord/approTask'
import approProcess from '../../view/followUpRecord/approProcess'
import rejectTask from '../../view/followUpRecord/rejectTask'
import staffInfo from '../../view/followUpRecord/staffInfo'
import customerInfoList from '../../view/followUpRecord/customerInfoList'

const routes = [
      {path: '/list', name: 'list',component: list},
      {path: '/addAndEdit',name : 'addAndEdit' ,component: addAndEdit},
      {path: '/approTask',component: approTask},
      {path: '/approProcess',component: approProcess},
      {path: '/rejectTask',component: rejectTask},
      {path: '/staffInfo',component: staffInfo},
      {path: '/customerInfoList',name: 'customerInfoList', component: customerInfoList}
]

export default routes

