import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

import { MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.config.productionTip = false;

// Material UI 
Vue.use(MdIcon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
