import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import SearchView from '@/views/Search.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
