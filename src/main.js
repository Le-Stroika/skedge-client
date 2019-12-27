import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VSelect from 'vue-select';
import VModal from 'vue-js-modal';
import VNotification from "vue-notification";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

import * as IconRegister from "./registers/IconRegister";

// Global stylesheet imports
import '@/styles/global.scss';
import "vue-select/src/scss/vue-select.scss";
import 'overlayscrollbars/css/OverlayScrollbars.css';


// App and route imports
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.config.devtools = true; // TODO: remove

// Register all the used icons
IconRegister.registerIcons();

// V-tooltip
Vue.use(VTooltip);

// Vue-Select
Vue.component('v-select', VSelect);

// Overlay scrollbars
Vue.component('overlay-scrollbar', OverlayScrollbarsComponent);

// Vue modal
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

// Vue notification
Vue.use(VNotification);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
