import Schedule from '../../view/exhibitionPage/schedule.vue'
import Customer from '../../view/exhibitionPage/customer.vue'
import PotentialCustomer from '../../view/exhibitionPage/potentialCustomer.vue'
import NoPotentialCustomer from '../../view/exhibitionPage/noPotentialCustomer.vue'
import AccountOverView from '../../view/exhibitionPage/accountOverView.vue'
import BusinessPipeline from '../../view/exhibitionPage/businessPipeline.vue'
import FollowUpRecord from '../../view/exhibitionPage/followUpRecord.vue'
import CustomerInfo from '../../view/exhibitionPage/customerInfo.vue'
import PotentialCustomerInfo from '../../view/exhibitionPage/potentialCustomerInfo.vue'
import PotentialCustomerEdit from '../../view/exhibitionPage/potentialCustomerEdit.vue'
import PotentialCustomerAdd from '../../view/exhibitionPage/potentialCustomerAdd.vue'
import ccSetTime from '../../view/exhibitionPage/ccSetTime.vue'
import GetSex from '../../view/exhibitionPage/getSex.vue'
import PerformanceCenter from '../../view/exhibitionPage/performanceCenter.vue'

const routes = [
  {
    path: '/schedule',   //开户进度
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    children: [
      {
        path: 'potentialCustomer',  //潜在客户
        name: 'potentialCustomer',
        component: PotentialCustomer
      },
      {
        path: '',  //留存客户
        name: 'noPotentialCustomer',
        component: NoPotentialCustomer,
        children: [
          {
            path: '', //账户概览
            name: 'accountOverView',
            component: AccountOverView
          },
          {
            path: 'businessPipeline', //业务流水
            name: 'businessPipeline',
            component: BusinessPipeline
          },
          {
            path: 'followUpRecord', //跟进记录
            name: 'followUpRecord',
            component: FollowUpRecord
          }
        ]
      }
    ]
  },
  {
    path: '/customerInfo', //非潜在客户详细资料
    name: 'customerInfo',
    component: CustomerInfo
  },
  {
    path: '/potentialCustomerInfo', //潜在客户详细资料
    name: 'potentialCustomerInfo',
    component: PotentialCustomerInfo
  },
  {
    path: '/potentialCustomerEdit', //编辑潜在客户详细资料
    name: 'potentialCustomerEdit',
    component: PotentialCustomerEdit
  },
  {
    path: '/potentialCustomerAdd', //新增潜在客户详细资料
    name: 'potentialCustomerAdd',
    component: PotentialCustomerAdd
  },
  {
    path: '/ccSetTime',
    name: 'ccSetTime',
    component: ccSetTime
  },
  {
    path: '/getSex',
    name: 'getSex',
    component: GetSex
  },
  {    //业绩中心
    path: '/performanceCenter',
    name: 'performanceCenter',
    component: PerformanceCenter
  }
]


export default routes

