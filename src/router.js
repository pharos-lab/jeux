import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import Mastermind from './pages/Mastermind.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/mastermind', component: Mastermind },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router