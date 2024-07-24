import { createApp } from 'vue';
import './bootstrap';
import app from './components/app.vue';
import router from './router';

createApp(app).use(router).mount('#app');