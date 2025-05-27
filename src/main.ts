import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/Index.ts'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
