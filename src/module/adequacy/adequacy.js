import Vue from 'vue'
import VueRouter from 'vue-router'
import Impression from 'vue-impression'
import Axios from 'axios'
import pbUI from '../../components'
import Index from './Index.vue'
import Adequacy from './view/Adequacy.vue'
import SelectDept from './view/SelectDept.vue'
import SelectProfession from './view/SelectProfession.vue'
import Info from './view/Info.vue'
import InfoS from './view/InfoS.vue'
import InfoSub from './view/InfoSub.vue'
import InfoCard from './view/InfoCard.vue'
import Qrt from './view/Qrt.vue'
import Qcm from './view/Qcm.vue'
import Qnr from './view/Qnr.vue'
import VideoCheck from './view/VideoCheck.vue'
import AgreementList from './view/AgreementList.vue'
import Success from './view/Success.vue'
import Failure from './view/Failure.vue'
import NeighbourCounter from './view/NeighbourCounter.vue'
import store from './vuex/store'
import browser from './common/browser'
import mixins from './common/mixins'
import filters from './common/filters'
import util from './common/util'

Vue.mixin(mixins)
Vue.use(VueRouter)
Vue.use(Impression)
Vue.component(pbUI.CommonNav.name, pbUI.CommonNav)
Vue.component(pbUI.Loading.name, pbUI.Loading)
Vue.prototype.$axios = Axios // Vue.prototype.$http = Axios ; Vue.use(Axios)

// 统一设置ajax请求超时时长
Axios.interceptors.request.use(function (config) {
  config.timeout = 1000 * 30 // 30秒
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log('error', error, 111, error.config.validateStatus)
  // Do something with request error
  return Promise.reject(error)
})

for (let [key, val] of Object.entries(filters)) {
  Vue.filter(key, val)
}

const router = new VueRouter({
  routes: [
    {path: '/', component: Adequacy},
    {path: '/info', component: Info},
    {path: '/infoS', component: InfoS},
    {path: '/infoSub', component: InfoSub},
    {path: '/infoCard', component: InfoCard},
    {path: '/qnr/:num', component: Qnr},
    {path: '/qcm', component: Qcm},
    {path: '/qrt', component: Qrt},
    {path: '/selectDept', component: SelectDept},
    {path: '/selectProfession', component: SelectProfession},
    {path: '/videoCheck', component: VideoCheck},
    {path: '/agreementList', component: AgreementList},
    {path: '/success', component: Success},
    {path: '/failure', component: Failure},
    {path: '/neighbourCounter', component: NeighbourCounter}
  ]
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

if (browser.versions.mobile && store.state.env === 'production') {
  let cfAdequacyJson = JSON.parse(pbE.SYS().readConfig('conf/h5/cfAdequacy.json')) // eslint-disable-line
  bootstrap(store, cfAdequacyJson)
} else {
  Axios.get(util.getApiUrl(store.state, 'cfAdequacyJson')).then((response) => {
    bootstrap(store, response.data)
  }).catch(e => {
    console.error(e)
  })
}


function getToken (store, callback) {
  Axios.post(util.getApiUrl(store.state, 'getToken'), {
    'func': 1001,
    'type': 0,
    'data': [{}]
  }).then(response => {
    if (response.data.data) {
      let token = response.data.data[0]['13']
      if (token) {
        store.state.token = token
        callback && callback()
      } else {
        window.alert('获取token不能为空')
      }
    }
  }).catch(e => {
    window.alert('获取token失败')
    console.error('get token error.', e)
  })
}

function bootstrap (store, cfAdequacyJson) {
  store.state.cfAdequacyJson = cfAdequacyJson
  Object.assign(store.state.basicInfo, store.state.cfAdequacyJson.basicInfo)

  // 这2个是请求图片服务的，和其他url不一样
  store.state[store.state.env].apiUrls.viewAgreementByPng = cfAdequacyJson.serverUrl2 + store.state[store.state.env].apiUrls.viewAgreementByPng
  store.state[store.state.env].apiUrls.makeAgreements = cfAdequacyJson.serverUrl2 + store.state[store.state.env].apiUrls.makeAgreements
  store.state[store.state.env].apiUrls.signatureAndUploadAgreements = cfAdequacyJson.serverUrl2 + store.state[store.state.env].apiUrls.signatureAndUploadAgreements

  if (store.state.env === 'production') {
    let deviceInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo()) // eslint-disable-line
    store.state.brokerId = deviceInfo.jgid // 读取机构id
    store.state.production.serverUrl = cfAdequacyJson.serverUrl

    Vue.config.devtools = false
    Vue.config.slient = true
    Vue.config.errorHandler = console.error
    Vue.config.warnHandler = console.warn
    Vue.config.productionTip = false
  }

  // 获取token（其实就是sessionid）
  getToken(store, () => {
    new Vue({ // eslint-disable-line
      el: '#app',
      store,
      router,
      render: h => h(Index)
    })
  })
}
