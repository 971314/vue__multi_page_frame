import approTask from '../../view/others/approTask.vue'
import approProcess from '../../view/others/approProcess.vue'
import rejectTask from '../../view/others/rejectTask.vue'
import businessDpt from '../../view/others/businessDpt.vue'
import staffInfo from '../../view/others/staffInfo.vue'
import staffInfoDetail from '../../view/others/staffInfoDetail.vue'
import staffInfoSearch from '../../view/others/staffInfoSearch.vue'
import approvalProcess from '../../view/others/approvalProcess.vue'
import preview from '../../view/others/preview.vue'

const routes = [
  { path: '/approTask', name: 'approTask', component: approTask },
  { path: '/approProcess', name: 'approProcess', component: approProcess },
  { path: '/rejectTask', name: 'rejectTask', component: rejectTask },
  { path: '/staffInfo', name: 'staffInfo', component: staffInfo },
  { path: '/staffInfoDetail', name: 'staffInfoDetail', component: staffInfoDetail },
  { path: '/businessDpt', name: 'businessDpt', component: businessDpt },
  { path: '/staffInfoSearch', name: 'staffInfoSearch', component: staffInfoSearch },
  {path: '/approvalProcess',name: 'approvalProcess', component: approvalProcess},//申请进程
  {path: '/preview',name: 'preview', component: preview}//预览
]

export default routes
