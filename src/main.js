import './assets/main.css';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)
const options = {
    // You can set your default options here
};

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.use(Toast, options);

app.mount('#app')
