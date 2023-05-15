import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import BootstrapVue3 from 'bootstrap-vue-3'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import router from './routes/index';

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')


