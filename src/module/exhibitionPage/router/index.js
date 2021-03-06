import Vue from 'vue'
import VueRouter from 'vue-router'

import Schedule from '../view/schedule.vue'
import Customer from '../view/customer.vue'
import PotentialCustomer from '../view/potentialCustomer.vue'
import NoPotentialCustomer from '../view/noPotentialCustomer.vue'
import AccountOverView from '../view/accountOverView.vue'
import BusinessPipeline from '../view/businessPipeline.vue'
import FollowUpRecord from '../view/followUpRecord.vue'
import CustomerInfo from '../view/customerInfo.vue'
import PotentialCustomerInfo from '../view/potentialCustomerInfo.vue'
import PotentialCustomerEdit from '../view/potentialCustomerEdit.vue'
import PotentialCustomerAdd from '../view/potentialCustomerAdd.vue'
import ccSetTime from '../view/ccSetTime.vue'
import GetSex from '../view/getSex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',   //开户进度
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
    path: '/potentialCustomerInfo', //潜在客户详细资料
    name: 'potentialCustomerInfo',
    component: PotentialCustomerInfo
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
  }
]

const router = new VueRouter({
  routes
})

export default router

