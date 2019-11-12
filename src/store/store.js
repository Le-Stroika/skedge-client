import Vue from 'vue';
import Vuex from 'vuex';

import general from "@/store/modules/general";
import theme from "@/store/modules/theme";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        general,
        theme
    }
});
