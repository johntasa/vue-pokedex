import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/fonts.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia.use(piniaPluginPersistedstate))
app.use(router)
app.mount('#app')
