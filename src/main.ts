import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/Index.ts'

createApp(App).use(router).mount('#app')
