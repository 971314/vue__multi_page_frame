import MainIndex from '../../view/leaderApply/mainIndex.vue'
import DepartmentDetail from '../../view/leaderApply/departmentDetail.vue'
import InviolableRights from '../../view/leaderApply/inviolableRights.vue'
import Payments from '../../view/leaderApply/payments.vue'
import Poundage from '../../view/leaderApply/poundage.vue'
import ClosingPosition from '../../view/leaderApply/closingPosition.vue'
import GlancePer from '../../view/leaderApply/glancePer.vue'

const routes = [
  {
    path: '/',
    name: 'mainIndex',
    component: MainIndex
  },
  {
    path: '/departmentDetail',
    name: 'departmentDetail',
    component: DepartmentDetail,
    children: [
      {
        path: '/',
        name: 'inviolableRights',
        component: InviolableRights
      },
      {
        path: '/payments',
        name: 'payments',
        component: Payments
      },
      {
        path: '/poundage',
        name: 'poundage',
        component: Poundage
      },
      {
        path: '/closingPosition',
        name: 'closingPosition',
        component: ClosingPosition
      }
    ]
  },
  {
    path: '/glancePer',
    name: 'glancePer',
    component: GlancePer
  }
]

export default routes
