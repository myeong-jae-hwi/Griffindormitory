import { createApp } from 'vue'
import App from './App.vue'

<<<<<<< Updated upstream
createApp(App).mount('#app')
=======
import App from './App.vue';
import router from './router';
import BaseCard from './components/UI/BaseCard.vue'

const app = createApp(App);
app.use(router);

app.component('BaseCard', BaseCard);

app.mount('#app');
>>>>>>> Stashed changes
