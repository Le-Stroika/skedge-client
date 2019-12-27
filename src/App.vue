<template>
    <!-- <div id="app"> -->
    <theme-provider 
        id="App" 
        ref="baseRef" 
        :namespace="defaultNamespace" 
        use-root
    >
        <notification-register></notification-register>
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
import themes from "./theme/themes";

import ThemeProvider from "@/components/wrappers/ThemeProvider.vue";
import { DEFAULT_NAMESPACE, DEFAULT_THEME } from "./constants/generalConstants";

import NotificationRegister from "@/registers/NotificationRegister.vue";

export default {
    components: {
        ThemeProvider,
        NotificationRegister
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
            // Add all the themes
            Object.values(themes).forEach((themeData) => {
                this.addTheme({
                    name: themeData.name,
                    theme: themeData.theme,
                    override: true
                });
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
    #App {
        height: 100%;

        overflow: hidden;

        & #App__view {
            width: 100%;
            height: 100%;
        }
    }
</style>
