import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VSelect from 'vue-select';
import SimpleBar from 'simplebar-vue';
import { MdIcon } from 'vue-material/dist/components';

// Global stylesheet imports
import '@/styles/global.scss';
import 'vue-material/dist/vue-material.min.css';
import "vue-select/src/scss/vue-select.scss";
import "simplebar/dist/simplebar.min.css";

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

// Simplebar
Vue.component('simple-bar', SimpleBar);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
