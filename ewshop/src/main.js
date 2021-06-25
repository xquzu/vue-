import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';


import { Swipe, SwipeItem } from 'vant';

createApp(App)
    .use(Swipe).use(SwipeItem)
    .use(store).use(router).mount('#app')
