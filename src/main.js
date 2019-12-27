import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VSelect from 'vue-select';
import VModal from 'vue-js-modal';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { MdIcon } from 'vue-material/dist/components';

// Global stylesheet imports
import '@/styles/global.scss';
import 'vue-material/dist/vue-material.min.css';
import "vue-select/src/scss/vue-select.scss";
import 'overlayscrollbars/css/OverlayScrollbars.css';


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

// Overlay scrollbars
Vue.component('overlay-scrollbar', OverlayScrollbarsComponent);

// Vue modal
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
