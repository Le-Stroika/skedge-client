import Vue from 'vue';

import { getterTypes, mutationTypes, actionTypes } from '../types/index';

const CAMPUS_KEYS = {
    UTSG: "UTSG",
    UTM: "UTM",
    UTSC: "UTSC"
};

// -----------------------
// --- Check Functions ---
// -----------------------
const _checkCampusExists = (campusKey) => {
    if (!CAMPUS_KEYS[campusKey]) {
        throw `Error: campus '${campusKey}' does not exist`;
    }
};

// -------------------
// --- Store Setup ---
// -------------------

// Initial state
const state = {
    searchCampuses: {
        [CAMPUS_KEYS.UTSG]: true,
        [CAMPUS_KEYS.UTM]: false,
        [CAMPUS_KEYS.UTSC]: false
    },
};

const getters = {
    [getterTypes.GET_SEARCH_CAMPUS]: (state) => {
        return (campusKey) => {
            _checkCampusExists(campusKey);

            return state.searchCampuses[campusKey];
        }
    },
    [getterTypes.GET_SEARCH_CAMPUS_ALL]: (state) => {
        return state.searchCampuses;
    }
};

const mutations = {
    [mutationTypes.SET_SEARCH_CAMPUS]: (state, payload) => {
        const { campusKey, search } = payload;

        _checkCampusExists(campusKey);

        // Set campus to given search boolean
        Vue.set(state.searchCampuses, campusKey, search);
    }
};

const actions = {
    [actionTypes.SET_SEARCH_CAMPUS]: ({ commit }, payload) => {
        commit(mutationTypes.SET_SEARCH_CAMPUS, payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};