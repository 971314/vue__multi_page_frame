import cmHelperIndex from '../../view/cmHelperIndex/cmHelperIndex.vue'
import cmTrends from '../../view/cmHelperIndex/cmTrends.vue'
import myAttention from '../../view/cmHelperIndex/myAttention.vue'

const routes = [
  {path: '/cmHelperIndex', name: 'cmHelperIndex', component: cmHelperIndex},
  {path: '/cmTrends', name: 'cmTrends', component: cmTrends},
  {path: '/myAttention', name: 'myAttention', component: myAttention}
]


export default routes

