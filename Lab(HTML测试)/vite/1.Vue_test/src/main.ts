import { createApp } from 'vue'
import Pages from './router/Pages.vue' //页面引入
import router from './router' 				//router引入

createApp(Pages).use(router).mount('#Pages')
