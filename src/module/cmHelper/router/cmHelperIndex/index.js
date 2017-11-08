import cmHelperIndex from '../../view/cmHelperIndex/cmHelperIndex.vue'
import cmTrends from '../../view/cmHelperIndex/cmTrends.vue'
import myAttention from '../../view/cmHelperIndex/myAttention.vue'
import info from '../../view/cmHelperIndex/info.vue'

const routes = [
  {path: '/cmHelperIndex', component: cmHelperIndex},
  {path: '/cmTrends', component: cmTrends},
  {path: '/myAttention', component: myAttention},
  {path: '/info/:id', component: info}
]


export default routes

