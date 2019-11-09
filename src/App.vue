<template>
    <!-- <div id="app"> -->
    <theme-provider 
        id="App" 
        ref="baseRef" 
        :namespace="defaultNamespace" 
        use-root
    >
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/summer">Summer Scheduler</router-link>|
            <router-link to="/fall-winter">Fall/Winter Scheduler</router-link>
        </div> -->
        <div id="App__view">
            <router-view />
        </div>
    </theme-provider>
    <!-- </div> -->
    
</template>

<script>
import { getterTypes, actionTypes } from "./store/types";
import { mapActions, mapGetters } from "vuex";

import { CSSPlugin, AttrPlugin } from "gsap/all";

// Themes
import DarkTheme from "./theme/themes/dark";

import ThemeProvider from "@/components/wrappers/ThemeProvider.vue";

// TODO: move out to separate constants file
const DEFAULT_NAMESPACE = "default";
const DEFAULT_THEME = "dark";

export default {
    components: {
        themeProvider: ThemeProvider
    },
    data() {
        return {
            defaultNamespace: DEFAULT_NAMESPACE
        }
    },
    created() {
        // Instantiate Vuex data
        this.instantiateThemes();
        this.instantiateNamespaces();
    },
    mounted() {
        // NOTE: this prevents the CSSPlugin and the AttrPlugin from getting tree shaked
        const plugins = [ CSSPlugin, AttrPlugin ];
    },
    methods: {
        ...mapActions({
            addTheme: actionTypes.ADD_THEME,
            addNamespace: actionTypes.ADD_NAMESPACE,
        }),
        instantiateThemes() {
            // Add dark theme
            this.addTheme({
                name: DarkTheme.name,
                theme: DarkTheme.theme,
                override: true
            });
        },
        instantiateNamespaces() {
            // Add default namespace
            this.addNamespace({
                name: DEFAULT_NAMESPACE,
                targetTheme: DEFAULT_THEME,
                override: true
            })
        }
    }
}
</script>

<style lang="scss">
    // Import global styles and functions
    // @import "@/styles/global.scss"; 

    #App {
        height: 100%;

        overflow: hidden;

        & #App__view {
            width: 100%;
            height: 100%;
        }
    }
</style>
