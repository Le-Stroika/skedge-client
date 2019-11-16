import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VSelect from 'vue-select';
import { MdIcon } from 'vue-material/dist/components';

// Global stylesheet imports
import 'vue-material/dist/vue-material.min.css';
// import 'vue-select/dist/vue-select.css';
import "vue-select/src/scss/vue-select.scss";
import '@/styles/global.scss';

// App and route imports
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.config.devtools = true; // TODO: remove

// Material UI 
Vue.use(MdIcon);

// V-tooltip
Vue.use(VTooltip);

// Vue-Select
Vue.component('v-select', VSelect);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
