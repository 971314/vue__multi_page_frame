import settSheet from '../../view/basicAss/settSheet.vue'
import home from '../../view/basicAss/home.vue'
import capitalStatus from '../../view/basicAss/capitalStatus.vue'


const routes = [
  { path: '/settSheet', name: 'settSheet', component: settSheet },
  { path: '/home', name: 'home', component: home },
  { path: '/capitalStatus', name: 'capitalStatus', component: capitalStatus }
]

export default routes
