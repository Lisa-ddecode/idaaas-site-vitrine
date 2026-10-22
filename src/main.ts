import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'

document.documentElement.dataset.environment = import.meta.env.VITE_APP_ENV

createApp(App).mount('#app')
