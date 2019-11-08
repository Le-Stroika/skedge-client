import Vue from 'vue';
import VTooltip from 'v-tooltip';
import { MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

import '@/styles/global.scss';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.config.devtools = true; // TODO: remove

// Material UI 
Vue.use(MdIcon);

// V-tooltip
Vue.use(VTooltip);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
