import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import './style.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(
  piniaPluginPersistedstate
)
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

createApp(App).use(pinia).use(router).mount('#app')
