import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';//绝对不要加.ts后缀
import store from './store/index'

createApp(App).use(router).use(store).mount("#app");
