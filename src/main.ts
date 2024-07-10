import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './style.scss'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueAxios, axios)
  .mount('#app')