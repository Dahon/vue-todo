import { createApp } from 'vue';
import {router} from './router';
import store from './store'

import "gitart-vue-dialog/dist/style.css";
import App from './App.vue';

import './styles/global.scss'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');


