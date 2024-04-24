import './assets/main.css';
import { createApp } from 'vue';

import App from './App.vue';
import axios from 'axios';
import router from './router';

// создаем экземпляр Vue
const app = createApp(App);

// устанавливаем свойство $server на экземпляр Vue
app.config.globalProperties.$server = 'http://77.222.54.191:3000/';

// добавляем плагины
app.use(router);
app.use(axios);

// монтируем приложение
app.mount('#app');
