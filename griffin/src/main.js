import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';
import BaseCard from './components/UI/BaseCard.vue';
import BaseBtn from './components/UI/BaseBtn.vue';
import AlartList from './components/UI/AlartList.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const app = createApp(App);
app.use(router);
app.use(store);

app.component('BaseCard', BaseCard);
app.component('BaseBtn', BaseBtn);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('alart-list',AlartList)
app.mount('#app');
