import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';
import BaseCard from './components/UI/BaseCard.vue';
import BaseBtn from './components/UI/BaseBtn.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.component('BaseCard', BaseCard);
app.component('BaseBtn', BaseBtn);

app.mount('#app');
