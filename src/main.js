import './assets/css/main.css'
import {createApp, ref} from 'vue'
import App  from './App.vue'
import router from './router/router'
import user from "@/app/api/User/user.js";
if(localStorage.getItem('auth_token')){
    user.getUser()
}

const app = createApp(App)
app.use(router)

app.mount('#app')


