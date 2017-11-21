import performanceClassification from '../../view/leaderboards/performanceClassification.vue'
import performanceList from '../../view/leaderboards/performanceList.vue'

const routes = [
  {
    path: '/performanceClassification',
    name: 'performanceClassification',
    component: performanceClassification
  },
  {
    path: '/performanceList',
    name: 'performanceList',
    component: performanceList
  }
]

export default routes
