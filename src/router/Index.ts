import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import SearchView from '@/views/Search.vue'
import DetailView from '@/views/detail/Index.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
  { path: '/detail', component: DetailView },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
